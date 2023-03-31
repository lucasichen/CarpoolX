from flask import Flask, request, jsonify
from main.controllers import AccountController

# initialize the flask app
app = Flask(__name__)

# initialize the account controller with the firebase service account key
account_controller = AccountController('flask-server\main\service\serviceAccountKey.json')

@app.route('/login', methods=['POST'])
def create_user():
    data = request.get_json()
    email = data['email']
    password = data['password']
    result = account_controller.create_account(email, password)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
