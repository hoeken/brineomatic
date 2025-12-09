## Electronics Todo (REV-C)

* power on glitch:
  * test with scope
  * test with 10k pulldown
  * https://github.com/atomic14/esp32-s3-pinouts
* switch to smt standoffs?  sendit test board y/n
* schematic review

## 3D Print Todo

* update the case for rev c
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
* added extra esd protection on input pins
* add test points for 3.3v, 5.0v, 24v, gnd, sda, scl
* all test points -> 1.5x0.7
* 165 ohm to 100 ohm sense resistor on 4-20ma sensors to better use ADC range
* gate resistor to 220ohm / pulldown to 10k
* ao3400a changed to Si2318 for a little bit more headroom with 24v supplies.
* added back up usb serial converter headers
* added more esd protection to the 24v / 5v / 3.3v power rails
* made attachment points a bit wider