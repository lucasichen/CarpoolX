/**
 * 
 * @description api call to report user route
 * @param {*} usercode  
 * @param {*} callback 
 */
export function reportUser(usercode, callback) {
    return fetch('http://10.0.2.2:5000/user/report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usercode: usercode
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            console.log('User reported');
            callback(true);
        } else {
            callback(false);
        }
    }).catch(err => {
        console.log('error: ',err);
        callback(false);
    }
    );
}