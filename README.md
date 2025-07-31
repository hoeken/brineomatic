# Brine-o-Matic 9000

An open hardware project to automate marine watermakers aka reverse osmosis systems.  It consists of:

* electronics design based on esp32 to read sensors and control the machine
* watermaker plumbing + electronics reference design with part numbers
* example 3d printable control panel for automating a [Rainman](https://www.rainmandesal.com/) watermaker
* firmware with intuitive UI for controlling the watermaker from your phone, computer, MFD, etc.

## Electronics

Brineomatic is based around an ESP32-S3 chip with loads of features including WiFi.  The board itself has the following features:

* Based on ESP32-S3 with USB C
* 12-24v DC power in (max 30v)
* 4 x solenoid / relay drivers
* 2 x 5v servo headers
* DC motor driver - 2A
* DS18B20 temperature sensor connector
* Connector for [DF Robot TDS sensor board](https://www.dfrobot.com/product-1662.html)
* Low Pressure sensor (4-20ma style)
* High Pressure sensor (4-20ma style)
* Flowmeter connector (pulse style)

![Image of Brine-o-matic 9000 Rev A Electronics](/assets/brineomatic-rev-a-annotated.jpg)

## User Interface / Firmware

Brine-o-matic is part of my Yarrboard project and uses a common firmware and UI.  It runs a local webserver that you can interact with in many different ways.  I find it easiest to use either a phone, laptop, or an MFD on my boat.  Currently only B&G chart plotters are supported, but I will gladly add support for any other devices that can handle loading an HTML5 app.

The app handles all aspects of setting up, configuring, running, and controlling your watermaker.  It supports 3 different run modes (fill, time, volume), automatic flushing, pickling / depickling, a manual mode, etc.  It has configurable settings for limits on pressures, salinity, flowrate, temperature, etc.  It also has a completely open API to allow you to control the watermaker.  The API is also useful for bringing in data from SignalK such as tank levels and water temperature (used in salinity calculations).

### Idle / Autoflush Wait Mode

![Image of Brine-o-matic 9000 Rev A Electronics](/assets/brineomatic-idle.png)

### Running Mode

~todo

### Flush Mode

![Image of Brine-o-matic 9000 Rev A Electronics](/assets/brineomatic-flushing.png)

## Reference Design

This project was started in order to automate my Rainman watermaker on my own personal boat.  The goals were to have minimal modifications to the original equipment, and to allow for graceful failure where the watermaker can be switched to manual mode very easily.  All of the critical digital sensors (flowrate, pressure, salinity) have an analog backup, and all of the critical actuated outputs (high pressure valve, diverter valve, flush/pickle) can be disabled and swapped to manual mode by removing a few easy to access screws.

![Image of Brine-o-matic 9000 Rev A Electronics](/assets/rainman-install.jpg)

You can find information on the reference implementation in the files in this repository. They contain example schematics for plumbing, sensors, wiring, AC contactor wiring, etc.

There is also a 3D model with a control panel layout and parts for automating a Rainman watermaker.  This is available as a STEP file that should be editable with FreeCAD.  The actual design was done in Fusion360 which is available through the link below.

### Downloads:

* [Plumbing and Wiring Schematics](/diagrams)
* [Fusion 360 Model](https://a360.co/3zufXJO) 
* [Rainman Control Panel STEP file](/models/Rainman%20Control%20Panel.step?raw=true)
* [Brineomatic Rev A PCB Case](/models/Brineomatic%20Case%20Rev%20A.step?raw=true)

## Electronics Todo (REV-B)

* add TMC5160T / TMC2209 stepstick compatible header
* add 2nd flowmeter input (brine)
* remove thermistor input
* add extra tds input (brine waste)
* change tds input to match dfrobot tds sensor
* add power LEDs
* add motor leds
* add switch status leds
* drill holes on plug in terminal blocks are too big
* extend board fingers under connectors to support
  * usb connector too
* switch to 0603 components
* add ptc fuses on all outputs (solenoid, motor, 5v, 12/24v, etc)
* consolidate to single 5v power supply
* remove dc motor driver