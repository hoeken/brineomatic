# Rev D

* Add 2nd ADS1115
  * pre-filter pressure - jst 2.0
  * mid-filter pressure - jst 2.0
  * spare tds / raw adc sensor - pin headers
  * spare 420ma sensor - pin headers
  * alert pin -> gpio3 could work (jtag select, default high)
    * alternatively, gpio46 could work
    * gpio0 / boot w/ 0 ohm jumper (already pulled high)