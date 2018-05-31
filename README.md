# QTiny Slider
Range slider extension for Qlik Sense

The extension enables the user to select the data via the slider.
## Features:
  * Dual Value Slider
  * Custom Min and Max value
  * Data Selection via Slider 
  * Custom CSS

## Usage:
* Add Dimension(should be numerical) to the Slider
* In the Settings:
           
       1. Set Max and Min of the Slider
       2. Create 2 temp variables in qlik (e.g "vHigh", "vLow")
       3. Give the variable names to "Variable High" and "Variable Low"
       4. Define CSS: to change color, use: --range-color:green;
       5. If the dimension refers to data, tick the Date Format option, which would convert the integers to date
![alt text](https://github.com/nfire11/QTiny_Slider/blob/master/sample1.png "Sample")


* Then
* Finally
