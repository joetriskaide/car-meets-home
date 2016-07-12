#ifndef CONFIG_H
#define CONFIG_H

struct btconfig {
	/* set by config */
	char *myname;
	char *username;
	char *password;
	char *organisation;
	char *topic;
	char *subscription;
	char *typeid;
	char *host;
	int port;
	int sleep;
	/* from system */
	char mac[64];
	/* computed from above */
	char *deviceid;	
	char *btmac;
};
int readConfig(struct btconfig *cfg);
/* default values and pattern/costants */
#define SUBSCRIPTION "iot-2/cmd/+/fmt/json"
#define TOPIC "iot-2/evt/status/fmt/json"
#define HOST "quickstart.messaging.internetofthings.ibmcloud.com"
#define PORT 1883

#define ORGANISATION "quickstart"
#define TYPE "joetest"
#define IDFMT "d:%s:%s:%s"
#define MAC "/sys/class/net/%s/address"
#define PROCNETDEV "/proc/net/dev"

#define CFG1 "./btclient.cfg"
#define CFG2 "/etc/btclient.cfg"
#endif
