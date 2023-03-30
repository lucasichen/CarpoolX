from flask import Flask
app = Flask(__name__)

# Members API Route
@app.route('/api/members')
def members():
    return {'members': ['John', 'Bob', 'Mary']}

if __name__ == '__main__':
    app.run(debug=True)