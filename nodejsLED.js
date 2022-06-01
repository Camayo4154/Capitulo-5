// Simple Node.js example program to set up User LED3 to be turned on or off from
//  the Linux console. 
// Written by Derek Molloy for the book "Exploring BeagleBone: Tools and 
// Techniques for Building with Embedded Linux" by John Wiley & Sons, 2014
// ISBN 9781118935125. Please see the file README.md in the repository root 
// directory for copyright and GNU GPLv3 license information. 
// Ignore the first two arguments (nodejs and the program name)
var myArgs = process.argv.slice(2);
var LED3_PATH = "/sys/class/leds/beaglebone:green:usr3"
var LED1_PATH = "/sys/class/leds/beaglebone:green:usr1"
function writeLED( filename, value, path ){
var fs = require('fs');
try {
// The next call must be syncronous, otherwise the timer will not work
fs.writeFileSync(path+filename, value);
}
catch (err) {
console.log("The Write Failed to the File: " + path+filename);
}
}
function removeTrigger(){
writeLED("/trigger", "none", LED3_PATH);
}
console.log("Starting the LED Node.js Program");
if (myArgs[0]==null){
console.log("There is an incorrect number of arguments.");
console.log(" Usage is: nodejs nodejsLED.js command");
console.log(" where command is one of: on, off, flash or status.");
process.exit(2); //exits with the error code 2 (incorrect usage)
}
switch (myArgs[0]) {
case 'on':
console.log("Encendiendo los LEDS");
removeTrigger();
writeLED("/brightness", "1", LED3_PATH);
writeLED("/brightness", "1", LED1_PATH);
break;
case 'off':
console.log("Apagando los LEDS");
removeTrigger();
writeLED("/brightness", "0", LED3_PATH);
writeLED("/brightness", "0", LED1_PATH);
break;
case 'flash':
console.log("LEDS intermitentes");
writeLED("/trigger", "timer", LED3_PATH);
writeLED("/delay_on", "100", LED3_PATH);
writeLED("/delay_off", "100", LED3_PATH);
writeLED("/trigger", "timer", LED1_PATH);
writeLED("/delay_on", "50", LED1_PATH);
writeLED("/delay_off", "50", LED1_PATH);
break;
case 'status':
console.log("Obteniendo estado de los LEDS");
fs = require('fs');
fs.readFile(LED3_PATH+"/trigger", 'utf8', function (err, data) {
if (err) { return console.log(err); }
console.log(data);
});
fs.readFile(LED1_PATH+"/trigger", 'utf8', function (err, data) {
if (err) { return console.log(err); }
console.log(data);
});
break;
default:
console.log("Comando inválido");
}
console.log("Fin del script");
