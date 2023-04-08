/**
 * 
 * @description This function is used to find the taxi in the database
 * @param {*} taxiCode 
 * @param {*} callback 
 * @returns 
 */
export const findTaxi = async(taxiCode, callback) => {
    const code = await taxiCode
    console.log('attempting to find taxi with code: ', code)
    return fetch('http://10.0.2.2:5000/taxi/information', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            taxi_id: code
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            console.log('Taxi found');
            return data
        } else {
            console.log('Taxi not found');
            callback(false);
        }}).catch(err => {
        console.log('error: ',err);
        callback(false);
    });
}

export const user_information = async(uid, callback) => {
    const id = await uid
    console.log('attempting to find user with id: ', id)
    return fetch('http://10.0.2.2:5000/user/info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: id
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            console.log('User found', data);
            return data
        } else {
            console.log('User not found');
            callback(false);
        }}).catch(err => {
        console.log('error: ',err);
        callback(false);
    });
}
