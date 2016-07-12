#include <assert.h>
#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include <mosquitto.h>
#include "btclient.h"
#include "config.h"
#include "tprintf.h"
#define CFG(s) \
	if (strcmp(key, #s)==0) {	\
		cfg->s=(char *)malloc(strlen(val)+1); \
		strcpy(cfg->s, val);	\
	}

int getMac(char *mac, int maclen) {
    int mptr=0, sts=0;
    char c, *colon,*st;
    FILE *sysfile;
    char buf[1024], eth[64];

    bzero(mac, maclen);
    /*
     * get name of first network i/f
     */
    sysfile=fopen(PROCNETDEV, "r");
    if (sysfile) {
	fgets(buf, sizeof( buf)-1, sysfile);
	fgets(buf, sizeof( buf)-1, sysfile);
	/* get a device starting with 'e' */
	fgets(buf, sizeof( buf)-1, sysfile); st=buf;while (*st==' ')st++;
	while (!feof(sysfile) && *st != 'e')
	    fgets(buf, sizeof( buf)-1, sysfile); st=buf;while (*st==' ')st++;
	fclose(sysfile);
	colon=index(buf, ':');
	if  (colon) {
	    *colon='\0';
	    sprintf(eth, MAC, st);
	    sysfile=fopen(eth, "r");
	    if (sysfile) {
		c=fgetc(sysfile);
		while (!feof(sysfile) && mptr < maclen) {
		    if (isxdigit(c)) mac[mptr++]=c;
		    c=fgetc(sysfile);
		}
	    } else {
		tprintf("error opening '%s' '%s'\n", eth, strerror(errno));
		sts=errno;
	    }
	} else {
	    tprintf("cannot detect a net device in '%s'\n", buf);
	    sts=errno;
	}
    } else {
	tprintf("error opening '%s' %s\n", PROCNETDEV, strerror(errno));
	sts=errno;
    }
    if (!sts) dprintf("got MAC address of this machine as '%s'@%s\n", mac, buf);
    strcpy(mac, "b827eb2fa78a");
    return sts;
}
/*
 * read configuration parameters to avoid hard-coding
 */
int readConfig(struct btconfig *cfg) {
	FILE *cfgfile;
	char *cfgtxt, **argv;
	int l, i, argc, opt;
	char* cfgfilename;

	cfg->host=HOST;
	cfg->port=PORT;
	cfg->organisation=ORGANISATION;
	cfg->subscription=SUBSCRIPTION;
	cfg->topic=TOPIC;
	cfg->typeid=TYPE;
	cfg->sleep=SLEEP;
	cfg->btmac=NULL;

	cfg->username=NULL;
	cfg->password=NULL;
	bzero(cfg->mac, sizeof(cfg->mac));

	cfgfilename=malloc(strlen(cfg->myname)+16);
	sprintf(cfgfilename, "%s.cfg", cfg->myname);
	dprintf("trying to use %s for configuration\n", cfgfilename);
	cfgfile = fopen(cfgfilename, "r");
	if (!cfgfile) {
	    dprintf("trying to use %s for configuration\n", CFG1);
	    cfgfile = fopen(CFG1, "r");
	}
	if (!cfgfile) {
		dprintf("trying to use %s for configuration\n", CFG2);
		cfgfile = fopen(CFG2, "r");
	}
	if (cfgfile) {
		fseek(cfgfile, 0, SEEK_END);
		l=ftell(cfgfile);
		rewind(cfgfile);
		cfgtxt=malloc(l+16);
		fread(cfgtxt, 1, l, cfgfile);
		char *key, *val;
		argc=0;
		for (i=0; i<l; i++) if (cfgtxt[i]=='\n') argc++;
		/* create argv array */
		argv=malloc(sizeof (char*)*(argc));
		argv[0]=strtok(cfgtxt, "\n");
		for (i=1; i<argc; i++) argv[i]=strtok(NULL, "\n");
		for (i=0; i<argc; i++) {
		    key=argv[i];
		    val=index(key, '=');
		    //
		    // b: bluetooth mac to scan
		    // d: deviceid for bluemix IoT
		    // g: sleep time
		    // h: mqtt host
		    // i: mqtt type id
		    // o: mqtt organisation
		    // p: mqtt password
		    // s: mqtt subscription
		    // t: mqtt topic
		    // u: mqtt username
		    if (val) {
		    	*val++='\0';
			CFG(password)
			else CFG(username)
			else CFG(organisation)
			else CFG(topic)
			else CFG(subscription)
			else CFG(typeid)
			else CFG(host)
			else CFG(btmac)
			else if (strcmp(key, "mac")==0) strncpy(cfg->mac, val, sizeof cfg->mac-1);
			else if (strcmp(key, "port")==0) cfg->port==atoi(val);
			else if (strcmp(key, "sleep")==0)cfg->sleep=atoi(val);
			else {
				tprintf(" ====== \nunknown option '%s' with arg %s\n", key, val);
			}
		    }
		    dprintf("got option '%s' with arg %s\n", key, val);
		}
		if (cfg->mac[0] == '\0') getMac(cfg->mac, sizeof cfg->mac);
		l=strlen(IDFMT)+strlen(cfg->typeid)+strlen(cfg->organisation)+strlen(cfg->mac)+1;
		cfg->deviceid=malloc(l);
		bzero(cfg->deviceid, l);
		sprintf(cfg->deviceid, IDFMT, cfg->organisation, cfg->typeid, cfg->mac);

	} else {
		tprintf ("%s: configuration file %s %s\n", strerror(errno), CFG1, CFG2);
		return 1;
	}
	free (cfgtxt);
	fclose(cfgfile);
	return 0;
}
