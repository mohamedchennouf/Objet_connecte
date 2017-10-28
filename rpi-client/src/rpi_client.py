from REST_server import start_REST_server
import argparse
from sensors_actions import *
from threading import Thread

SERVER_PORT = 8080
SERVER_ADDRESS = "192.168.1.165"

def send_data(data):
    """
    Send data to the remote server. The data is a python dictionnary that will
    be translated to json before being sent.
    """
    import requests
    import json
    url = 'http://' + SERVER_ADDRESS + ':' + str(SERVER_PORT) + '/button';
    headers = {
        'Content-type':'application/json'
    }
    response = requests.post(url, json=json.dumps(data), headers=headers)
    print(response)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument('server_address', type=str, nargs='?', default='localhost', help='The address of the REST server')
    parser.add_argument('server_port', type=int, nargs='?', default=8080, help='The port of the REST server')
    args = parser.parse_args()
    SERVER_ADDRESS = args.server_address
    SERVER_PORT = args.server_port

    init_sensors()
    polling_thread = Thread(target=poll_sensors, args=[
                            lambda: send_data({'type': 'button', 'connector':button, 'status':'pressed'}),
                            lambda: send_data({'type': 'button', 'connector':button, 'status':'released'})])
    polling_thread.start()
    start_REST_server()

