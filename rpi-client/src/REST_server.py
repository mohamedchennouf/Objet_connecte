from bottle import Bottle
from bottle import request
from bottle import run
import flask
import json
from sensors_actions import *
import time
app = flask.Flask(__name__)



@app.route('/light', methods=['GET'])
def get_light():
    return json.dumps({'status':'ON'})

@app.route('/light', methods=['POST'])
def post_light():
    status = request.json.get("status")
    if status == 'ON':
        print("Switching the light on.")
        peluche.change_light(True)
    else:
        print("Switching the light off.")
        peluche.change_light(False)
    return #json.dumps({'status':status})

# https://stackoverflow.com/questions/12232304/how-to-implement-server-push-in-flask-framework
def accelerometer_stream():
    global peluche
    while True:
        tmp = peluche.is_button_pressed()
        print("Peluche accelerometer status {}".format(tmp))
        yield "data: {}\n\n".format(tmp)
        time.sleep(1)

@app.route('/accelerometer')
def accelerometer():
    return flask.Response(accelerometer_stream(), mimetype="text/event-stream")

def temperature_stream():
    global peluche
    while True:
        tmp = peluche.get_temperature()
        print("Peluche temperature: {}".format(tmp))
        yield "data: {}\n\n".format(tmp)
        time.sleep(1)

@app.route('/temperature')
def temperature():
    return flask.Response(temperature_stream(), mimetype="text/event-stream")

def start_REST_server(_peluche):
    """
    Start the REST server.
    You should probably spawn this in a sperate thread, as this function will
    never return.
    """
    global peluche
    peluche = _peluche
    app.run(host='0.0.0.0', port=7896, debug=True, threaded=True)