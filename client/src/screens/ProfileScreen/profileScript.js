import * as Keychain from 'react-native-keychain';

/**
 * 
 * @description retrieve tokens from keychain
 * @returns tokens from keychain
 */
const retrieveTokens = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials && credentials.password) {
        const tokens = JSON.parse(credentials.password);
        console.log(tokens);
        return tokens;
      }
    } catch (error) {
      console.log(error);
    }
};

/**
 * @description api call to get user profile info 
 * @param {*} callback
 * @returns user profile info
 */
export async function getUserProfile(callback) {
    tokens = await retrieveTokens();
    idToken = tokens['idToken'];
    return fetch('http://10.0.2.2:5000/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': idToken
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            console.log('User profile retrieved');
            console.log(data.data)
            return data.data; // Return the data.data from the function
        } else {
            return false; // Return false in case of failure
        }
    })
    .catch(err => {
        console.log('error: ',err);
        return false; // Return false in case of failure
    });
}

/**
 * 
 * @description api call to change user info route
 * @param {*} name 
 * @param {*} age 
 * @param {*} callback 
 * @returns 
 */
export async function changeUserInfo(name, age, callback) {
    // Retrieve tokens
    tokens = await retrieveTokens();
    idToken = tokens['idToken'];
    user_body = JSON.stringify({name: name, age: age})
    // Check if age is empty
    if (age == '') {user_body = JSON.stringify({name: name})}
    console.log('attempting to change user info')
    return fetch('http://10.0.2.2:5000/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': idToken
        },
        body: user_body
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            console.log('User profile changed');
            console.log(data)
            return data; // Return the data from the function
        } else {
            return false; // Return false in case of failure
        }
    })
    .catch(err => {
        console.log('error: ',err);
        return false; // Return false in case of failure
    });
}

/**
 * 
 * @description api call to delete user route
 * @param {*} callback 
 * @returns 
 */
export async function deleteUser(callback) {
    tokens = await retrieveTokens();
    idToken = tokens['idToken'];
    console.log('attempting to delete user')
    return fetch('http://10.0.2.2:5000/user', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': idToken
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            console.log('User deleted');
            console.log(data)
            return data; // Return the data from the function
        } else {
            return false; // Return false in case of failure
        }
    })
    .catch(err => {
        console.log('error: ',err);
        return false; // Return false in case of failure
    }); 
}

/**
 * 
 * @description api call to change user password route
 * @param {*} callback 
 * @returns 
 */
export async function logOutUser(callback) {
    // delete tokens from keychain
    try {
        await Keychain.resetGenericPassword();
        console.log('keychain cleared');
        return true;
    } catch (error) {
        console.log(error);
        callback(false);
    }
}