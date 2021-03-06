import flask
from flask import request
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
    return ('', 204) #json.dumps({'status':status})

# https://stackoverflow.com/questions/12232304/how-to-implement-server-push-in-flask-framework
def accelerometer_stream_():
    global peluche
    while True:
        tmp = peluche.get_accelerometer()
        print("Peluche accelerometer status {}".format(tmp))
        yield "{}\n\n".format(tmp)
        time.sleep(1)

@app.route('/accelerometer-stream')
def accelerometer_stream():
    return flask.Response(accelerometer_stream_(), mimetype="text/event-stream")

@app.route('/accelerometer')
def accelerometer():
    return "{}\n\n".format(peluche.get_accelerometer())

def temperature_stream_():
    global peluche
    while True:
        tmp = peluche.get_temperature()
        print("Peluche temperature: {}".format(tmp))
        yield "{}\n\n".format(tmp)
        time.sleep(1)

@app.route('/temperature-stream')
def temperature_stream():
    return flask.Response(temperature_stream_(), mimetype="text/event-stream")

@app.route('/temperature')
def temperature():
    return "{}\n\n".format(peluche.get_temperature())

def sound_level_stream_():
    global peluche
    while True:
        tmp = peluche.get_sound_level()
        print("Peluche sound level: {}".format(tmp))
        yield "{}\n\n".format(tmp)
        time.sleep(1)

@app.route('/sound-level-stream')
def sound_level_stream():
    return flask.Response(sound_level_stream_(), mimetype="text/event-stream")

@app.route('/sound-level')
def sound_level():
    return "{}\n\n".format(peluche.get_temperature())

def air_quality_stream_():
    global peluche
    while True:
        tmp = peluche.get_air_quality()
        print("Peluche air quality: {}".format(tmp))
        yield "{}\n\n".format(tmp)
        time.sleep(1)

@app.route('/air-quality-stream')
def air_quality_stream():
    return flask.Response(air_quality_stream_(), mimetype="text/event-stream")

@app.route('/air-quality')
def air_quality():
    return "{}\n\n".format(peluche.get_air_quality())

@app.route('/berceuse', methods=['POST'])
#@app.route('/play-sound', methods=['POST'])
def play_wav():
    url = request.get_json()["url"]

    from subprocess import call
    call(["omxplayer", url])

    return ('', 200)

def start_REST_server(_peluche):
    """
    Start the REST server.
    You should probably spawn this in a sperate thread, as this function will
    never return.
    """
    global peluche
    peluche = _peluche
    app.run(host='0.0.0.0', port=7896, debug=True, threaded=True)
