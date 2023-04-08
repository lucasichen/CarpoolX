import * as Keychain from 'react-native-keychain';

/**
 * 
 * @description retrieve tokens from keychain
 * @returns tokens from keychain
 */
export const retrieveTokens = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials && credentials.password) {
        const tokens = JSON.parse(credentials.password);
        return tokens;
      }
    } catch (error) {
      console.log(error);
    }
};

/**
 * @description api call to get user profile info
 * @param {*} pickup 
 * @param {*} dest 
 * @param {*} capacity 
 * @param {*} callback 
 * @returns 
 */
export function startRide(idToken, pickup, dest, capacity, callback){
    console.log(idToken,'scripe')
    return fetch('http://10.0.2.2:5000/requestRide', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': idToken
        },
        body: JSON.stringify({
            pickuploc: pickup,
            destloc: dest,
            capacity: capacity,

        })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.success){
        console.log("Created Ride")
        return data.data;
      }else{
        callback(false);
      }
    })
    .catch(error =>{
      console.error("Error occured ->: ", error)
    })
  }