from adxl345 import ADXL345

class Peluche:
    def __init__(self):
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

        # Analog ports
        self.analog_temperature = 0
        self.air_sensor = 1

        # Digital ports
        self.led_pin = 7

        self.nb_leds = 1
        self.led_is_on = False

        grovepi.pinMode(self.led_pin, "OUTPUT")
        grovepi.pinMode(self.air_sensor, "INPUT")
        time.sleep(1) # Just in case
        grovepi.chainableRgbLed_init(self.led_pin, self.nb_leds)
        # change color to green
        grovepi.storeColor(0, 255, 0)

    def get_temperature(self):
        """Return the temperature"""
        try:
            import grovepi
        except ImportError:
            return
        # On pin A0
        return grovepi.temp(self.analog_temperature, '1.2')

    def get_accelerometer(self):
        """Return the current acceleration"""
        try:
            import grovepi
        except ImportError:
            return
        adxl = ADXL345()
        return adxl.getAxes(True)

    def get_air_quality(self):
        """Return the current acceleration"""
        try:
            import grovepi
        except ImportError:
            return 0
        return grovepi.analogRead(self.air_sensor)

    def poll_sensors(self, onPressed, onReleased):
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
                if not button_pressed and self.is_button_pressed():
                    button_pressed = True
                    print("Button ")
                    onPressed()
                elif button_pressed and not self.is_button_pressed():
                    button_pressed = False
                    onReleased()
            except IOError as e:
                print("Error:" + str(e))

    def change_light(self, isOn):
        """
        Switch the light ON or OFF.
        """
        try:
            import grovepi
        except ImportError:
            return
        if isOn:
            grovepi.chainableRgbLed_pattern(self.led_pin, 0, 0)
            self.led_is_on = True
        else:
            grovepi.chainableRgbLed_test(self.led_pin, self.nb_leds, 0)
            self.led_is_on = False