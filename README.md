# CarpoolX
## Requirements
- Android SDK
- Latest Java
- Latest NodeJS
- Python 3.10

## Tech stack
- Frontend: `React Native`
- Backend: `Python` and `Flask`
- Database: `Firebase`

## Setting up environment
### Set up Flask env
- Place firebase credentials file into `model` folder in `flask-server/main`
- Create a `.venv` folder in `flask-server` folder
- cd into `flask-server` folder
- Run `pipenv install` to download required packages

### Set up React-Native and Android SDK for INTEL
- Please watch this [video](https://www.youtube.com/watch?v=oorfevovPWw) as well as refer to this [guide](https://reactnative.dev/docs/environment-setup?guide=native) for the most updated instructions
- Then cd in the `client` folder and run `npm install` to download required packages.

### To run environments
- create a .env file in the client folder with your google api key
- and place your firebase credentials json file in the folder `flask-server/main/model`
- in `flask-server` run `pipenv run server.py`
- in `client` run `npx react-native start`

#### Sources Used
- Frontend:
  - [Login Auth](https://www.youtube.com/watch?v=ALnJLbjI7EY)

