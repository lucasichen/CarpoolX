# CarpoolX
Welcome to CarpoolX, where we will match make you with riders going along or to the same destination. This is a andriod app create with React Native, Python, Flask, Firebase, and Google Maps API.

![Images](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHI2ZnlxdmhwZXA5NWtnOW9ienRnbnY1NGJrZmVnMWgzbThudXhiaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ai0otc0890ZC7S1R0J/giphy.gif)

<details open>
<summary>Demo</summary>
https://github.com/lucasichen/CarpoolX/assets/71472753/595b9a01-d076-4b9a-a158-b78892de9d3e

## Requirements
- Android SDK
- Latest Java
- Latest NodeJS
- Python 3.10

## Tech stack
- Frontend: `React Native`
- Backend: `Python` and `Flask`
- Database: `Firebase`

## Getting Started
### Set up Flask env
- Place firebase credentials file into `model` folder in `flask-server/main`
- Create a `.venv` folder in `flask-server` folder
- cd into `flask-server` folder
- Run `pipenv install` to download required packages

### Set up React-Native and Android SDK for INTEL
- Please watch this [video](https://www.youtube.com/watch?v=oorfevovPWw) as well as refer to this [guide](https://reactnative.dev/docs/environment-setup?guide=native) for the most updated instructions
- Then cd in the `client` folder and run `npm install` to download required packages.

### To run environments
- create a .env file in the client folder with your Google API key or inside `client\android\app\src\main\AndroidManifest.xml` under `android:value`
- and place your firebase credentials json file in the folder `flask-server/main/model`
- in `flask-server` run `pipenv run server.py`
- in `client` run `npx react-native start`

#### Sources Used
- Frontend:
  - [Login Auth](https://www.youtube.com/watch?v=ALnJLbjI7EY)

