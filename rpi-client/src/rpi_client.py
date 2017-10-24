import grovepi
import time

# Connect the Grove Button to digital port D3
# SIG,NC,VCC,GND
button = 3

SERVER_PORT = 8080
SERVER_ADDRESS = "192.168.1.165"

def send_data():
    import requests
    import json
    url = 'http://' + SERVER_ADDRESS + ':' + str(SERVER_PORT) + '/button';
    data = {
        'text': 'The super duper button was pressed.'
    }
    headers = {
        'Content-type':'application/json'
    }
    response = requests.post(url, json=json.dumps(data), headers=headers)
    print(response)

if __name__ == "__main__":
    grovepi.pinMode(button, "INPUT")
    button_pressed = False
    while True:
        try:
            if not button_pressed and grovepi.digitalRead(button):
                button_pressed = True
                send_data()
            elif button_pressed and not grovepi.digitalRead(button):
                button_pressed = False
        except IOError as e:
            print("Error:" + str(e))
