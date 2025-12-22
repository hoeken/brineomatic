## Electronics Todo (REV-C)

* stepper motor routing
  * move to 3 vias on +24v side and 2 vias per side on motor side
  * dont have trace continue through vias
* add modbus TVS devices
* add locating holes
* add pcb number
* switch to 1.5A on the usb fuse
* add caps to u4 output (max40200)
* L2 -> 3.3v power plane
* add inline resistor to temperature sensor + servo inputs - 10ohm
* remove thermal relief on smt components for gnd fill
* add more gnd vias to SMBJ30CA
* add 1nF caps to +ve voltage on teh 24v/5v connectors
* add test points to bottom
* add fiducials if possible
* 2/3 caps in parallel with D16 - 1nf / 50v (24v input esd diode)
* add 1uf to output of U3 (lm74700)
* fuse silkscreen covered
* change Rlim to 82k
* voltage divider on EN pin to turn on at 12v (EN = 2v) -> connect to VIN not 24v
* Rotate C8\C7 and wider VIN
* feedback trace thicker and further isolated
* 5v traces thicker
* 100R on tmc2209 enable
* make all signal outputs into outputs (pressure, flow, temp, etc.)
* redraw tds connector
* redraw servo connector
* make sure we have bulk cap and tvs on 5v after ideal diode
* switch pulldown to before 220R on mosfets (no voltage divider)
* solenoid diode schematic -> schottky symbol
* add 5v tvs to servo connector
* move current 5v tvs to product/brine flow connectors, delete from power supply portion


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
* switch to rt7272b for 24v -> 5v regulator
* added bulk cap to 5v rail