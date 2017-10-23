import grovepi
import time

# Connect the Grove Button to digital port D3
# SIG,NC,VCC,GND
button = 3

SERVER_PORT = 9278
SERVER_ADDRESS = "localhost"

def send_data():
    import requests
    url = 'http://' + SERVER_ADDRESS + ':' + SERVER_PORT + '/button';
    data = {
        'text': 'The super duper button was pressed.'
    }
    response = requests.post(url, data=json.dumps(data))

if __name__ == "__main__":
    grovepi.pinMode(button, "INPUT")
    button_pressed = False
    while True:
        try:
            if not button_pressed and grovepi.digitalRead(button):
                button_pressed = True
                send_data()
            elif button_pressed:
                button_pressed = False
        except IOError:
            print("Error")