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
    email = data.get('email')
    password = data.get('password')
    result = account_controller.create_account(email, password)
    print("signup: ",result)
    return result

# Login API route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    result = account_controller.login(email, password)
    print("login: ",result)
    return result

if __name__ == '__main__':
    app.run(debug=True)


