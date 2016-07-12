# car-meets-home
A Tutorial how to use a Bluetooth device on a Raspberry PI to send proximity data to IBM Watson IoT Platform and or GPS data from a car  to switch an appliance on and off when leaving/approaching home.

Connected cars and smart homes are hot topics these days in the IoT domain. 
If you look closer, you find that connected cars and smart homes form silos. Yes, a smart
home resident is able to turn on lights and appliances with his mobile phone. 

But why can't the car, as it is approaching the smart home, do exactly the same thing?

This project uses IBM Bluemix and Node-RED to connect a car to a smart home,  enabling the car to automatically activate household features, such as turning on the lights and adjusting the air conditioning. We will use a Raspberry Pi to sense the signal strength of a Bluetooth device in the smart home and send that information to the Watson IoT Platform. Then, based on the signal strength, we will turn on an electrical appliance using that Bluetooth device. Also, we will use GPS-based tracking of the car, creating a geo-fence around the smart home to be able to essentially connect your car to your home.

**Installation**:
You should read the tutorial on developerworks [url tbd]. This repository lets you access the entire sources code.

The code is split in three parts:
- Under the directory `rpi`, you will find the sources form the Bluetooth client on a Raspberry Pi
- Under the directory `flows`, you will find the flows for Node-RED. Each flow is considered to put on a separate tab. Make life easier, even it is not necessary. Copy the content of the file and use the Import => Clipboard function of node red to import the flows. The flows read and write a database which is in Bluemix a service called `car-meets-home-cloudantNoSQLDB` and a database in this services called `car-meets-home`. You may want to change the service/database name according to your settings in the coudant nodes.
- The other directories are "standard", they contain an HTML file, some JS files and pics for the dashboard, which is described in the last chapter of the above mentioned article Node-RED to connect a car to a smart home, 
enabling the car to automatically activate household features, such as turning on the lights and adjusting the air conditioning.

