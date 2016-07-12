/*
Copyright (c) 2009-2014 Roger Light <roger@atchoo.org>

All rights reserved. This program and the accompanying materials
are made available under the terms of the Eclipse Public License v1.0
and Eclipse Distribution License v1.0 which accompany this distribution.
 
The Eclipse Public License is available at
   http://www.eclipse.org/legal/epl-v10.html
and the Eclipse Distribution License is available at
  http://www.eclipse.org/org/documents/edl-v10.php.
 
Contributors:
   Roger Light - initial implementation and documentation.
*/

#include <assert.h>
#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#ifndef WIN32
#include <unistd.h>
#else
#include <process.h>
#include <winsock2.h>
#define snprintf sprintf_s
#endif

#include <mosquitto.h>
#include "config.h"
#include "btclient.h"
#include "blue.h"
#include "tprintf.h"

#define CONN_OFF 0
#define CONN_OK 1
#define CONN_ERR -1
int is_connected=CONN_OFF;	/* 1 ok, -1 err */
struct btconfig cfg;

void bt_disconnect_callback(struct mosquitto *mqtt, void *obj, int result) {
	dprintf("disc cb %d '%s'\n", result, mosquitto_connack_string(result));
	is_connected=CONN_OFF;
}
void bt_connect_callback(struct mosquitto *mqtt, void *obj, int result) {
	dprintf("conn cb %d '%s'\n", result, mosquitto_connack_string(result));
	is_connected=(result==0?CONN_OK:CONN_ERR);
	if (is_connected==CONN_OK) {
		mosquitto_subscribe(mqtt, NULL, cfg.subscription, 0);
	}
}

void bt_log_callback(struct mosquitto *mqtt, void *obj, int level, const char *str) {
	dprintf ("log cb: '%s'\n", str);
}

void bt_message_callback(struct mosquitto *mqtt, void *udata, const struct mosquitto_message *message) {
	dprintf("msg cb topic='%s' payload='%s'\n", message->topic, message->payload);
/*
 * A execute script btclient.d/command.sh
 */
	int pid,sts;
	pid = fork();
	switch (pid) {
	case 0:		// child, execute shell script
		setenv("TOPIC", message->topic, 1);
		setenv("PAYLOAD", message->payload, 1);
		sts=execl("btclient.d/mqtt-command.sh", "mqtt-command", (const char*)NULL);
		tprintf("something went wrong with execl(), error='%s'\n", strerror(errno));
	break;
	case -1:	// error
		tprintf("something went wrong with fork(), error='%s'\n", strerror(errno));
	break;
	default:	// parent
		wait(&sts);
	break;
	}

}

void bt_subscribe_callback(struct mosquitto *mqtt, void *obj, int mid, int qos_count, const int *granted_qos) {
	dprintf("sub cb %d subscriptions\n", qos_count);
}

int publish_bt(struct mosquitto *mqtt) {
	char buf[1024];
	int n;
	int sts;
	int valid, rssi, lq;
	
	lq=blue_lq(cfg.btmac);
	rssi=blue_rssi(cfg.btmac);
	if (rssi > 999 || lq > 999) {
		tprintf("BT not connected, reconnecting\n");
		blue_disconnect();
		blue_connect(cfg.btmac);
		lq=blue_lq(cfg.btmac);
		rssi=blue_rssi(cfg.btmac);
	}	
	valid= (rssi < 999 && lq < 999);
	if (valid) {
		n = sprintf(buf, PAYLOAD, lq, rssi);
		tprintf("BT MQTT msg '%s'\n", buf);
		sts=mosquitto_publish(mqtt, NULL, TOPIC, strlen(buf), buf, 0, false);
	} else {
		tprintf("BT not connected\n");
	}
	return sts;
}

int main(int argc, char *argv[]) {
	struct mosquitto *mqtt = NULL;
	int sts;
	
	cfg.myname=argv[0];
	readConfig(&cfg);
	mosquitto_lib_init();

	mqtt = mosquitto_new(cfg.deviceid, 1, NULL);
	if(!mqtt){
		tprintf("Cannot Initialize MQTT library\n");
		mosquitto_lib_cleanup();
		return 1;
	}
	mosquitto_connect_callback_set(mqtt, bt_connect_callback);
	mosquitto_disconnect_callback_set(mqtt, bt_disconnect_callback);

	mosquitto_log_callback_set(mqtt, bt_log_callback);
	mosquitto_message_callback_set(mqtt, bt_message_callback);
	mosquitto_subscribe_callback_set(mqtt, bt_subscribe_callback);

	dprintf("now setting username and password to %s/*************\n", cfg.username);
	sts=mosquitto_username_pw_set(mqtt, cfg.username, cfg.password);
	if(sts) {
		tprintf("Error setting username/password\n");
		return sts;
	}
	dprintf("now connection using host=%s port=%d\n", cfg.host, cfg.port);
	sts = mosquitto_connect_bind(mqtt, cfg.host, cfg.port, 60, NULL);

	if(sts) {
		tprintf("Error connecting to %s:%d as %s\n", HOST, PORT, IDFMT);
		return sts;
	}


	sts = mosquitto_loop_start(mqtt);

	blue_connect(cfg.btmac);
	for (;is_connected != CONN_ERR;) {
		if (is_connected == CONN_OK) publish_bt(mqtt); 
		else dprintf("waiting for connection to come up\n", "");
		sleep(cfg.sleep);
	}
	blue_disconnect();
	mosquitto_destroy(mqtt);
	mosquitto_lib_cleanup();

	return sts;
}

