from flask import Flask, request, jsonify
app = Flask(__name__)

# Members API Route
@app.route('/members')
def members():
    return {'members': ['John', 'Bob', 'Mary']}

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    
    # do some authentication here
    # for example, check if username and password match a user in a database
    
    if username == 'myusername' and password == 'mypassword':
        return jsonify({'success': True})
    else:
        return jsonify({'success': False})

if __name__ == '__main__':
    app.run(debug=True)