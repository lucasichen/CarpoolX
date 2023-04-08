from flask import Flask, request, jsonify
from main.controllers.account_controller import AccountController
from main.controllers.rideshare_controller import RideshareController
from main.controllers.taxi_controller import TaxiController

# initialize the flask app
app = Flask(__name__)

# initialize the account controller with the firebase service account key
account_controller = AccountController()
rideshare_controller = RideshareController()
taxi_controller = TaxiController()

# Signup API route
@app.route('/register', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    result = account_controller.create_account(name, email, password)
    print("signup: ", result)
    return result

# Login API route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    result = account_controller.login(email, password)
    return result

@app.route('/requestRide', methods=['POST'])
def requestRide():
    id_token = request.headers.get('Authorization')
    # wait till user is verified by getting uid from id_token
    uid = account_controller.get_uid(id_token)
    data = request.get_json()
    pickupLoc = data.get('pickuploc')
    destLoc = data.get('destloc')
    capacity = data.get('capacity')
    result = rideshare_controller.create_ride(uid, pickupLoc, destLoc, capacity)
    return result
    
@app.route('/getrides', methods=['POST']) 
def get_ride():
    data = request.get_json()
    destloc = data.get('destloc')
    ride_id = rideshare_controller.get_rides(destloc)
    return ride_id

@app.route('/user', methods=['GET'])
def user():
    id_token = request.headers.get('Authorization')
    result = account_controller.get_user(id_token)
    return result

@app.route('/user', methods=['POST'])
def update_user():
    id_token = request.headers.get('Authorization')
    data = request.get_json()
    name = data.get('name')
    if data.get('age'): age = data.get('age')
    else: age = ''
    result = account_controller.update_user(id_token, name, age)
    return result

@app.route('/user', methods=['DELETE'])
def delete_user():
    id_token = request.headers.get('Authorization')
    result = account_controller.delete_user(id_token)
    return result

@app.route('/taxi/information', methods=['POST'])
def taxi_information():
    data = request.get_json()
    taxi_id = data.get('taxi_id')
    print("taxi_id: ", taxi_id)
    result = taxi_controller.taxi_information(taxi_id)
    return result

@app.route('/user/report', methods=['POST'])
def report_user():
    data = request.get_json()
    user_id = data.get('user_id')
    result = account_controller.report_user(user_id)
    return result

if __name__ == '__main__':
    app.run(debug=True)


