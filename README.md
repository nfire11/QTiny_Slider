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
           
       1. Set the Max and Min values of the slider
       2. Create 2 temp variables in qlik (e.g "vHigh", "vLow")
       3. Give the variable names to "Variable High" and "Variable Low"
       4. Define CSS: to change color, use: --range-color:green;
       5. If the dimension refers to data, tick the Date Format option, which would convert the integers to date
![alt text](https://github.com/nfire11/QTiny_Slider/blob/master/sample1.png "Sample")
##### For Date Values, Create a column in data load script via num(date) to convert them into numbers.

