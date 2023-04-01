import * as Keychain from 'react-native-keychain';

/**
 * 
 * @description store session token in keychain
 * @param {*} sessionToken 
 * @param {*} idToken 
 * @param {*} refreshToken 
 */
const storeSessionToken = async (token) => {
    try {
      await Keychain.setGenericPassword('auth', JSON.stringify(token));
    } catch (error) {
      console.log(error);
    }
  };

/**
 * 
 * @description api call to login user route
 * @param {*} email 
 * @param {*} password 
 * @param {*} callback 
 */
export function loginUser(email, password, callback) {
    return fetch('http://10.0.2.2:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            console.log('User log in');
            token={'idToken': data['data']['idToken'],'refreshToken': data['data']['refreshToken']}
            console.log(token);
            storeSessionToken(token);
            console.log('token set from client');
            console.log('user logged in')
            callback(true);
        } else {
        callback(false);
        }
    })
    .catch(err => {
        console.log('error: ',err);
        callback(false);
    });
}
