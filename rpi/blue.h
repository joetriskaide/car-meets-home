#ifndef BLUE_H_
#define BLUE_H_

#define BLUE_ERROR 1000
#define BLUE_NOT_CONNECTED 1001

int blue_rssi(char *address);
int blue_lq(char *address);
int blue_connect(char *address);
int blue_disconnect();

#endif /* BLUE_H_ */
