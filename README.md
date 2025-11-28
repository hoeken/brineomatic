![Hardware: Open Source](https://img.shields.io/badge/Hardware-Open%20Source-brightgreen?logo=opensourcehardware&logoColor=white)
![Status: Active](https://img.shields.io/badge/Status-Active-success.svg)
![Web UI](https://img.shields.io/badge/Web%20UI-HTML5%20%2B%20Bootstrap5-blue?logo=googlechrome&logoColor=white)
![MQTT](https://img.shields.io/badge/MQTT-Supported-purple?logo=mqtt&logoColor=white)
![SignalK](https://img.shields.io/badge/SignalK-Integrated-0aa?logo=simpleicons)
![3D Models](https://img.shields.io/badge/3D%20Models-STEP%20Included-lightgrey?logo=fusion360&logoColor=white)


# Brineomatic — Open Hardware Watermaker Automation Controller

Brineomatic is an open-hardware, open-firmware controller that fully automates marine reverse-osmosis watermakers. Designed for DIY builders and cruising sailors, it provides **sensor-driven automation**, **robust safety checks**, and **remote web-based control**, while remaining easy to service, modify, and adapt to nearly any watermaker—including Rainman, Spectra, DIY builds, and traditional AC pump systems.

Built on the **ESP32-S3**, Brineomatic integrates pressure sensors, flow meters, temperature sensing, and salinity monitoring with intelligent control of pumps, valves, and a high-pressure valve stepper motor. It automates the entire operating lifecycle: production runs, freshwater flushes, safety shutdowns, and chemical pickling/depickling.

Brineomatic is part of the **Yarrboard** ecosystem and benefits from its modular firmware channels, UI components, validation framework, and hardware abstraction layers.

---

# Table of Contents

1. [Features](#features)  
2. [Hardware](#hardware)  
3. [Software Architecture](#software-architecture)  
4. [Installation & Setup](#installation--setup)  
5. [Operation](#operation)  
6. [API & Integrations](#api--integrations)  
7. [Reference Designs](#reference-designs)  
8. [Downloads](#downloads)  
9. [Revision History](#revision-history)  
10. [License](#license)

---

# Features

## Automation
- Automatic run cycles  
- Time-based, volume-based, or salinity-based production  
- Automatic freshwater flush (time / volume / salinity modes)  
- Full pickling + depickling sequences  
- Manual mode for direct hardware testing  
- Tank-level-based stop support  
- NTP-synced autoflush intervals  

## Safety
Brineomatic continuously monitors critical values and stops safely on failure:
- High/low membrane pressure  
- High/low filter pressure  
- High product salinity  
- Low product/brine flowrate  
- Low total flowrate (combined)  
- Diverter valve closed failure  
- Motor over-temperature  
- Flush valve stuck open  
- Comprehensive timeout handling  

## User Interface
- Local HTML5 web interface served directly from the ESP32  
- Fast, mobile-friendly design  
- Works on phones, laptops, and supported MFDs  
- Real-time dashboard with flow, pressure, salinity, temperature, and tank level  
- Full configuration editor (validated input)  
- Event/status indicators  
- Optional sound notifications (success/error melodies)  

## Integrations
- MQTT publishing (structured JSON)  
- SignalK tank level + temperature support  
- HTTP/REST endpoints  
- WebSocket real-time events  

---

# Hardware

## Controller Board

Brineomatic is built around the ESP32-S3 with USB-C, using modular Yarrboard channels for relays, servos, steppers, and IO expansion.

### Core capabilities:
- ESP32-S3 module with WiFi and USB-C  
- 12–30 V DC input with onboard power regulation  
- 4 × relay/solenoid drivers  
- 1 × stepper motor driver  
- 2 × 5V servo connectors  
- 2 × flowmeter inputs (product + brine)  
- 2 × TDS connectors (product + brine)
- 2 × 4–20 mA pressure sensor inputs (filter + membrane)  
- DS18B20 motor temperature sensor  
- Optional Modbus VFD pump support (GD20, etc.)  
- Cooling fan output  
- I²C expansion + test points (3.3V, 5V, 24V, SDA, SCL, GND)

## Sensors and Inputs

- Filter pressure (4–20 mA)  
- Membrane pressure (4–20 mA)  
- Product salinity (TDS)  
- Brine salinity (TDS)  
- Product flowrate (pulse)  
- Brine flowrate (pulse)  
- Motor temperature (DS18B20)  
- Water temperature (for salinity compensation)  
- Tank level (via SignalK or API)

## Outputs

- Boost pump (relay)  
- High-pressure pump (relay or Modbus VFD)  
- High-pressure valve (stepper motor)  
- Diverter valve (servo)  
- Flush valve (relay)  
- Cooling fan (relay)

## Mechanical Files

- Controller case (STEP)  
- Rainman retrofit control panel (STEP)  
- Fusion 360 reference assembly

Files are located under `/models/` and `/diagrams/`.

---

# Software Architecture

## Firmware Structure

The firmware uses the Yarrboard modular ecosystem:
- Shared channel classes (RelayChannel, ServoChannel, StepperChannel)  
- High-level state machine  
- Real-time FreeRTOS task for automation  
- Non-blocking I/O  
- ADS1115 averaging helpers  
- OneWire/DS18B20 sensor handling  
- JSON configuration/validation system  

## State Machine

Brineomatic transitions through well-defined states:

- **STARTUP** – Initialize hardware, restore state  
- **IDLE** – Waiting, autoflush scheduling  
- **MANUAL** – Direct hardware control  
- **RUNNING** – Production cycle  
- **STOPPING** – Shutdown sequence  
- **FLUSHING** – Freshwater flushing  
- **PICKLING** – Chemical preservation  
- **DEPICKLING** – Re-entry into service  
- **PICKLED** – Long-term storage  

Every stage includes structured safety checks, timeouts, and error recovery.

## Sensor Processing

- Configurable sample averaging  
- 4–20 mA scaling for pressure sensors  
- Temperature-compensated salinity calculation  
- Flowmeter pulse accumulation and volumetric tracking  
- Timed error checks with configurable thresholds  

## Configuration

- JSON config for each backups 
- General, hardware, and safeguard sections  
- Runtime updates via UI or API  
- EEPROM last flush time persistence  

---

# Installation & Setup

## Building the Firmware
- Install PlatformIO  
- Select the Brineomatic environment  
- Build and upload via USB-C  

## Wiring & Plumbing

See `/diagrams/` for:
- Sensor wiring (flowmeter, tds, pressure, etc)
- Plumbing setup
- Actuator wiring (relays, stepper, and servo)
- Rainman retrofit specifics  

## Network Setup
- Device is configured using Improv Wifi 
- Open `https://www.improv-wifi.com/` in Chrome
- Click either Bluetooth or Serial to configure WiFi.
- Connect to `http://brineomatic.local` or direct to IP
- IP address can be found over serial monitor during bootup

## Initial Configuration
- Declare which sensors are present  
- Declare which actuators are present
- Enter hardware configuration details
- Test each sensor and actuator (MANUAL mode)
- Select desired error checking (more is better)
- Set tank capacity  
- Configure autoflush mode + interval
- Select units (pressure, temperature, flow, etc.)

---

# Operation

## Normal Run Cycle
Supports three modes:
- **Tank Fill**  
- **Time-based**  
- **Volume-based**  

Brineomatic will:
1. Initialize hardware  
2. Pre-pressurize via boost pump  
3. Ramp high-pressure pump  
4. Wait for membrane pressure  
5. Verify product flowrate  
6. Verify product salinity  
7. Close diverter valve  
8. Produce water while watching for errors  
9. Stop based on time, volume, tank level, or user  
10. Finish with with autoflush

## Flush Cycle
Supports three modes:
- **Time-based**  
- **Volume-based**  
- **Brine Salinity-based**  

## Pickling / Depickling
Runs high pressure pump for a set period of time to fill the machine with pickling solution.  Also stores the pickled state in non-volatile memory in case of reboot.

## Error Handling
If any threshold fails after a configurable time period, the controller:
- Stops the machine
- Stores result code  
- Resets all valve states 
- Disables pumps  
- Logs result  
- Returns to IDLE

Error codes include membrane pressure failures, filter clogging, salinity issues, motor temperature, total flowrate loss, and more.

---

# API & Integrations

## HTTP API
- Uses same JSON protocol / command structure as websocket.

## MQTT
Publishes all available information:
- Pressures  
- Flowrates  
- Salinity  
- Temperatures  
- Outut Status  
- Volumes  

Under topic:  
`yarrboard/watermaker/*`

## WebSocket
Realtime interactive control of the machine.

## SignalK
All the same data as MQTT, but in SignalK delta format with the `watermaker/brineomatic/*` path.

---

# Reference Designs

## Rainman Retrofit

This project was started in order to automate my Rainman watermaker on my own personal boat.  The goals were to have minimal modifications to the original equipment, and to allow for graceful failure where the watermaker can be switched to manual mode very easily.  All of the critical digital sensors (flowrate, pressure, salinity) have an analog backup, and all of the critical actuated outputs (high pressure valve, diverter valve, flush, and boost pump) can be bypassed to manual mode by removing a few easy to access screws.

These files demonstrate how to automate a Rainman watermaker with minimal modification and fail-safe fallback to manual mode.

![Image of Brine-o-matic 9000 Rev A Electronics](/assets/rainman-install.jpg)

You can find information on the reference implementation in the files in this repository. They contain example schematics for plumbing, sensors, wiring, AC contactor wiring, etc.

There is also a 3D model with a control panel layout and parts for automating a Rainman watermaker.  This is available as a STEP file that should be editable with FreeCAD.  The actual design was done in Fusion360 which is available through the link below.

## Adapting to Other Watermakers
Guidance for:
- AC high-pressure pumps  
- DC gear pumps  
- Commercial RO units  
- DIY builds  

---

# Downloads

* [Plumbing and Wiring Schematics](/diagrams)
* [Fusion 360 Model](https://a360.co/3zufXJO) 
* [Rainman Control Panel STEP file](/models/Rainman%20Control%20Panel.step?raw=true)
* [Brineomatic Rev A PCB Case](/models/Brineomatic%20Case%20Rev%20A.step?raw=true)

---

# Revision History

## Hardware
- **Rev A** – Initial board - Ran for ~800 hours and ~100k liters of production.
- **Rev B** – Integrated esp32-s3, USB C, stepper driver, more sensors.
- **Rev C (in progress)**  
  - Additional mounting holes  
  - Moving piezo, 5V LED  
  - Improved test point layout  
  - Additional IO headers  
  - Expanded relay outputs  
  - More accurate sensor reading  
  - Updated buzzer components  

## Firmware
See Git commit history for detailed changelog.

---

# License

Brineomatic is open source and released under:

- **Firmware:** GPLv3  
- **Hardware:** Open Hardware License (OHL)  

Contributions are welcome!
