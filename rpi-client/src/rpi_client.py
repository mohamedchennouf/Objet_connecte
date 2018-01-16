from REST_server import start_REST_server
import argparse
from sensors_actions import *

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument('server_address', type=str, nargs='?', default='localhost', help='The address of the REST server')
    parser.add_argument('server_port', type=int, nargs='?', default=8080, help='The port of the REST server')
    args = parser.parse_args()
    SERVER_ADDRESS = args.server_address
    SERVER_PORT = args.server_port

    p = Peluche()

    start_REST_server(p)

