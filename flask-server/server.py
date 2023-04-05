from flask import Flask, request, jsonify
from main.controllers.account_controller import AccountController
from main.controllers.rideshare_controller import RideshareController

# initialize the flask app
app = Flask(__name__)

# initialize the account controller with the firebase service account key
account_controller = AccountController()
rideshare_controller = RideshareController()

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

@app.route('/requestride', methods=['POST'])
def request_ride():
    data = request.get_json()
    pickupLoc = data.get('pickuploc')
    destLoc = data.get('destloc')
    capacity = data.get('capacity')
    result = rideshare_controller.create_ride(pickupLoc, destLoc, capacity)
    return result
    
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
    result = account_controller.taxi_information(taxi_id)
    return result

@app.route('/user/report', methods=['POST'])
def report_user():
    data = request.get_json()
    user_id = data.get('user_id')
    result = account_controller.report_user(user_id)
    return result

if __name__ == '__main__':
    app.run(debug=True)


