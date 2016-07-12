LDFLAGS=-lmosquitto -liw -lbluetooth
CFLAGS=-g -O0

.PHONY: all install uninstall reallyclean clean

all : btclient wlexample

btclient: btclient.o config.o blue.o tprintf.o
wlexample: wlexample.o

reallyclean : clean

clean : 
	-rm -f *.o btclient
##
btclient.o: btclient.c config.h btclient.h blue.h
wlexample.o: wlexample.c
config.o: config.c btclient.h config.h
blue.o: blue.c blue.h
tprintf.o: tprintf.c
