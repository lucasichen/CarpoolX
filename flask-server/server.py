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

# print(account_controller.refresh('APJWN8fbHiIq4QWOF1EaAPO4YW4GFaB4_5KOQZGdnzX5AcXIdLw_I0pu_5vDVtPRo2H5p__1DnhKJgv1aX6Ki7VzntJ_c-aWVinrwfhpQPcTPi2zFmOEFc2XT3UiS3Y7EE2DaLtXnwgtnT3YNOmuhLDcd9FV-poAIlKFLuhUEvSXK5wMOgWlFEUg3hYwXkFG7TcXDiNT_kTHd5WxGdZDucNuPjO5Qr8yRQ'))
# print(account_controller.get_user('eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg3YzFlN2Y4MDAzNGJiYzgxYjhmMmRiODM3OTIxZjRiZDI4N2YxZGYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmlkZXNoYXJleC03YzY2MCIsImF1ZCI6InJpZGVzaGFyZXgtN2M2NjAiLCJhdXRoX3RpbWUiOjE2ODAzNzkxNDIsInVzZXJfaWQiOiI1TkxVNmV1Y1M5UkZaMDJNVFVucXZrSnRYN20xIiwic3ViIjoiNU5MVTZldWNTOVJGWjAyTVRVbnF2a0p0WDdtMSIsImlhdCI6MTY4MDM3OTU1MCwiZXhwIjoxNjgwMzgzMTUwLCJlbWFpbCI6Imx1Y2FzQGljaGVuLmNhIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImx1Y2FzQGljaGVuLmNhIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.aZGC6Ju1Tri8qHI0aku0sxLMh5bfhXx6PlMSMorXwUWZG22ZWVbwnYKg7_1nl1EMl861iWKBr-1CbqExczLwfaw-8CgbyxfoTajpNlS0GqM-KUxqbKY7g5HeURLsu4D5TJjFodYlwnUep5_xHwh2-vIFyY34Ojz0idoxk3-2tZD6xbSZrj1oOkntNdMOtQGQcvskmytRIJQAbVkFcW5G0PoRnNpl8pTwCa9F_uZBLaV0b_CnOkN78e-XEnERxo_NJQS5f_68GgIsrdFtX5jvSNauLTh1Ql-5qW02YtJ6XYGwzix9Rs6tRuuIhBh8CZ2oBCMy3bvcmmr5ka5ZoNq_Kw'))

if __name__ == '__main__':
    app.run(debug=True)


