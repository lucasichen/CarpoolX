import * as Keychain from 'react-native-keychain';

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
