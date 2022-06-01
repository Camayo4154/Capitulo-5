import Adafruit_BBIO.ADC as ADC
import Adafruit_BBIO.GPIO as GPIO
import time

# Configurar P9_42 (GPIO 7) como entrada
GPIO.setup("P9_42", GPIO.IN)

# Configurar conversion ADC
ADC.setup()

# Loop infinito, se cierra con crl+c
while True:
    # Read analog pins P9_36 (AIN5) and P9_38 (AIN3)
    x_input = ADC.read("P9_36")
    y_input = ADC.read("P9_38")

    # Imprimir valores del joystick
    print("X:{0:1.2f}, Y:{1:1.2f}".format(x_input, y_input))

    
    # Si el pin 42 esta en alto, se muestra el mensaje
    if GPIO.input("P9_42") == GPIO.HIGH:
        print("Joystick pulsado.")

    # Delay de 0.5 seg
    time.sleep(0.5)
