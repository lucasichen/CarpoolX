from flask import Flask, request, jsonify
from main.controllers.account_controller import AccountController

# initialize the flask app
app = Flask(__name__)

# initialize the account controller with the firebase service account key
account_controller = AccountController()

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

@app.route('/users', methods=['DELETE'])
def delete_user():
    id_token = request.headers.get('Authorization')
    result = account_controller.delete_user(id_token)
    return result

if __name__ == '__main__':
    app.run(debug=True)


