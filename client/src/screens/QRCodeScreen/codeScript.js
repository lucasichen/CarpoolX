/**
 * 
 * @description This function is used to find the taxi in the database
 * @param {*} taxiCode 
 * @param {*} callback 
 * @returns 
 */
export const findTaxi = (taxiCode, callback) => {
    return fetch('http://10.0.0.2:5000/taxi/information', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            taxiCode: taxiCode
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            console.log('Taxi found');
            callback(true);
        } else {
            console.log('Taxi not found');
            callback(false);
        }}).catch(err => {
        console.log('error: ',err);
        callback(false);
    });
}
