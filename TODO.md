## Electronics Todo (REV-C)

* change voltage inputs from 0-3.3v to 0-2.048v on the ads11145
  * 100 ohm sense resistor on 4-20ma sensors (test on sendomatic)
* add test points for 3.3v, 5.0v, 24v, gnd, sda, scl
* all test points -> 1.5x0.7
* add 1-2 holes somewhere mid board to mount board to bottom case
* schematic review
* edc checks
* finalize component placement
* route board
* via stitching
* drc
* bom + placement check

## 3D Print Todo

* Din rail mount: https://github.com/hzeller/din-rail-clip-mount
* add holes in case top for buttons

### Done

* top/bottom edge should be straight across
* add pullup resistor to ads1115 alert
* move 5v led to ESP32_5V
* change pulldown resistor on mosfets to 10k or add buffer chip like on frothfet
* add MAX-485 chip + termination resistor
* add extra temperature output
* move piezo off GPIO39
* stack TDS inputs
* copy esp32-s3 changes from sendit (usb, crystal, etc)
* add extra relay/solenoid output (if possible)
* removed vref circuitry from tmc2209 stepper driver
* change buzzer to Huaneng QMB-09B-03 + diode
* move buttons to smt switch inside, 
* move bottom connectors left 1-2mm
* move temperature sensors to top
* move power to bottom
