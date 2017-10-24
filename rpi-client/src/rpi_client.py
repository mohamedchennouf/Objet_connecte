import argparse

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

def loop():
    import grovepi

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

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument('server_address', type=str, nargs='?', default='localhost', help='The address of the REST server')
    parser.add_argument('server_port', type=int, nargs='?', default=8080, help='The port of the REST server')
    args = parser.parse_args()
    SERVER_ADDRESS = args.server_address
    SERVER_PORT = args.server_port
    loop()

