#!/bin/bash 
function aircon {
    :
}
if [ "$TOPIC" == "iot-2/cmd/switch/fmt/text" ];then
	echo 1>&2 "set state of switch2 to $PAYLOAD"
	#pilight-control -d "switch2" -s $PAYLOAD
	[ "$PAYLOAD" == "on" ] && arg="-o4"
	[ "$PAYLOAD" == "off" ] && arg="-f4"
	[ "$arg" != "" ] && sispmctl $arg
fi
