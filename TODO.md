## Electronics Todo (REV-D)


### 5v Regulator Not Functional

Board powered from 12/24v.

* 24v led lights up
* 12v measured on TP15 (after TPS26630)
* PGOOD = 12v
* Power draw = 0.045A / 0.55W
* FB = between 0.5v and 1.125v
* 5v = steady 0.5v
* 3.3v = steady 0.2v

R23 = 81.8k (ok)
R25 = 60k (ok)
R26 = 11.5k (ok)
R24 = 24k (ok)


Modifications:

* Remove C21 - 220uF (no change)
* Remove D10 / D1 / D2 - SMAJ5.0 (unipolar part w/ wrong symbol and polarity!!!)

### Flowmeter ✅

* Getting 5v pulses on test pad
* Clean 3.3v pulses on gpio 1
* Probably software

### TDS ✅

* Getting clean analog - probably software

### Stepper Motor ✅

### Servos ✅

* need advanced mode

### Pressure Sensor ✅

* need ADC fixed

### Motor / Water Temp 🛑

* possibly the current limiting resistor 100R
* it seems GPIO39 just doesn't want to work for onewire

Modifications:

* Remove R8
* Remove R9
* Bodge from TP4 to TP35