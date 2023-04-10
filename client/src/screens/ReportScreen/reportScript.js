/**
 * 
 * @description api call to report user route
 * @param {*} email  
 * @param {*} callback 
 */
export function reportUser(email, callback) {
    return fetch('http://10.0.2.2:5000/user/report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            console.log('User reported');
            return data
        } else {
            callback(false);
        }
    }).catch(err => {
        console.log('error: ',err);
        callback(false);
    }
    );
}