# Brine-o-Matic 9000

An open hardware project to automate marine watermakers aka reverse osmosis systems.  It consists of:

* electronics design based on esp32 to read sensors and control the machine
* watermaker plumbing + electronics reference design with part numbers
* example 3d printable design for automating a Rainman watermaker
* firmware with intuitive UI for controlling the watermaker from your phone, computer, MFD, etc.

## Electronics

Brineomatic is based around an ESP32-S3 chip with loads of features including WiFi.  The board itself has the following features:

* Based on ESP32-S3 with USB C
* 12-24v DC power in
* 4 x solenoid / relay drivers
* 2 x 5v servo headers
* DC motor driver - 2A
* DS18B20 temperature sensor connector
* TDS sensor connector (for DF Robot TDS Sensor board - https://www.dfrobot.com/product-1662.html)
* Low Pressure sensor (4-20ma style)
* High Pressure sensor (4-20ma style)
* Flowmeter connector (pulse style)

## User Interface / Firmware

Brine-o-matic is part of my Yarrboard project and uses a common firmware and UI.  It runs a local webserver that you can interact with in many different ways.  I find it easiest to use either a phone, laptop, or an MFD on my boat.  Currently only B&G chart plotters are supported, but I will gladly add support for any other devices that can handle loading an HTML5 app.

The app handles all aspects of setting up, configuring, running, and controlling your watermaker.  It supports 3 different run modes (fill, time, volume), automatic flushing, pickling / depickling, a manual mode, etc.  It has configurable settings for limits on pressures, salinity, flowrate, temperature, etc.  It also has a completely open API to allow you to control the watermaker.  The API is also useful for bringing in data from SignalK such as tank levels and water temperature (used in salinity calculations).

## Reference Design

You can find information on the reference implementation in the files in this repository as both PDF and Draw.io editable files. They contain example schematics for plumbing, sensors, wiring, AC contactor wiring, etc.

There is also a 3D model with a control panel layout and parts for automating a Rainman watermaker.  This is available as a STEP file that should be editable with FreeCAD.  The actual design was done in Fusion360 and I will try to figure out how to share that file on here.

## Electronics Todo:

* add TMC5160T / TMC2209 stepstick compatible header
* change tds input to match dfrobot tds sensor
* add power LEDs
* add motor leds
* add switch status leds
* drill holes on plug in terminal blocks are too big
* extend board fingers under connectors to support
  * usb connector too
* switch to 0603 components
* switch to onboard esp32-s3
* add ptc fuses on all outputs (solenoid, motor, 5v, 12/24v, etc)
