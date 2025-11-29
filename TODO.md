## Electronics Todo (REV-C)

* copy esp32-s3 changes from sendit (usb, crystal, etc)
* add pullup resistor to ads1115 alert
* change pulldown resistor on mosfets to 10k or add buffer chip like on frothfet
* add two holes somewhere mid board to mount board to bottom case
* move 5v led to ESP32_5V
* move piezo off GPIO39 + switch to passive + add diode + move to esp32_5v
* move buttons to smt switch inside, add holes in case top to poke
* move bottom connectors left 1-2mm
* add extra relay/solenoid output (if possible)
* add extra temperature output
* stack TDS inputs
* move temperature sensors to top
* move stepper to bottom
* move power to bottom (if possible)
* change buzzer to Huaneng QMB-09B-03 + diode
* add test points for 3.3v, 5.0v, 24v, gnd, sda, scl
* all test points -> 1.5x0.7
* add pin headers for any extra IO + i2c
* change voltage inputs from 0-3.3v to 0-2.048v on the ads11145
  * 100 ohm sense resistor on 4-20ma sensors
  * what about tds sensors?  11.0 kΩ / 8.0 kΩ voltage divider
* add MAX-485 chip + termination resistor + jumper

### Done

* top/bottom edge should be straight across