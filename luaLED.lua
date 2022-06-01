#!/usr/bin/lua5.3
local LED1_PATH = "/sys/class/leds/beaglebone:green:usr1/"
local LED3_PATH = "/sys/class/leds/beaglebone:green:usr3/" 

-- Example function to write a value to the GPIO
function writeLED(directory, filename, value)
   file = io.open(directory..filename, "w") -- append dir and file names
   file:write(value)                        -- write the value to the file
   file:close()
end

print("Iniciando la ejecucion del programa luaLED")
if arg[1]==nil then                         -- no argument provided?
   print("Este programa requiere un comando")
   print("   Estructura: ./luaLED.lua comando usrx")
   print("donde comando puede ser: on, off, o estado")
   print ("donde usrx puede ser: usr1 o usr3")
   do return end
end
if arg[2]=="usr1" then
if arg[1]=="on" then
   print("Encendiendo el LED")
   writeLED(LED1_PATH, "trigger", "none")
   os.execute("sleep 0.1")
   writeLED(LED1_PATH, "brightness", "1")
elseif arg[1]=="off" then
   print("Apagando el LED")
   writeLED(LED1_PATH, "trigger", "none")
   os.execute("sleep 0.1")
   writeLED(LED1_PATH, "brightness", "0")
elseif arg[1]=="estado" then
   print("Obteniendo el estado del LED")
   file = io.open(LED1_PATH.."brightness", "r")
   print(string.format("El estado del LED es: %s.", file:read()))
   file:close()
else
   print("Comando inválido!")
end
elseif arg[2]=="usr3" then
if arg[1]=="on" then
print("Encendiendo el LED")
writeLED(LED3_PATH, "trigger", "none")
os.execute("sleep 0.1")
writeLED(LED3_PATH, "brightness", "1")
elseif arg[1]=="off" then
print("Apagando el LED")
writeLED(LED3_PATH, "trigger", "none")
os.execute("sleep 0.1")
writeLED(LED3_PATH, "brightness", "0")
elseif arg[1]=="estado" then
print("Obteniendo el estado del LED")
file = io.open(LED3_PATH.."brightness", "r")
print(string.format("The LED state is %s.", file:read()))
file:close()
else
print("Comando inválido!")
end
end
print("End of the Lua LED Program")
