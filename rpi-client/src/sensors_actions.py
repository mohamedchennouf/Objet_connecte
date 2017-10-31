import time
# Connect the Grove Button to digital port D3
# SIG,NC,VCC,GND
# Digital
button = 3
led_pin = 7

nb_leds = 1

def init_sensors():
    """
    Init the pins in the right mode and init the modules that require it.
    """
    try:
        import grovepi
    except ImportError:
        print("Module GrovePi does not exist. Running in sandbox mode.")
        print("No actions will be taken regarding the sensors.")
        return
    import time

    grovepi.pinMode(button, "INPUT")
    grovepi.pinMode(led_pin, "OUTPUT")
    time.sleep(1) # Just in case
    grovepi.chainableRgbLed_init(led_pin, nb_leds)
    # change color to green
    grovepi.storeColor(0, 255, 0)

def poll_sensors(onPressed, onReleased):
    """
    Indefinitely poll the sensors, and notify changes to the configured server.
    You should probably spawn this in a new thread since this will never return
    (unless GrovePi is not installed).

    The two parameters are callbacks that are called when the state of the
    button changes.
    """
    try:
        import grovepi
    except ImportError:
        return

    button_pressed = False
    while True:
        try:
            if not button_pressed and grovepi.digitalRead(button):
                button_pressed = True
                onPressed()
            elif button_pressed and not grovepi.digitalRead(button):
                button_pressed = False
                onReleased()
        except IOError as e:
            print("Error:" + str(e))

def change_light(isOn):
    """
    Switch the light ON or OFF.
    """
    try:
        import grovepi
    except ImportError:
        return
    if isOn:
        # set led 1 to green
        grovepi.chainableRgbLed_pattern(7, 0, 0)
        time.sleep(.5)
    else:
        grovepi.chainableRgbLed_test(led_pin, nb_leds, 0)