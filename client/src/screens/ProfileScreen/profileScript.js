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

