/**
 * 
 * @description api call to report user route
 * @param {*} email  
 * @param {*} callback 
 */


export function verifyUser(email, callback) {
    return fetch('http://10.0.2.2:5000/verify', {
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
            console.log('User verified');
            return true
        } else {
            callback(false);
        }
    }).catch(err => {
        console.log('error: ',err);
        callback(false);
    }
    );
}


export function sendEvent(location, date, attendees, emails){
    return fetch('http://10.0.2.2:5000/privateEvent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date: date,
            location: location,
            attendees: attendees,
            emails: emails
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            console.log('Event created');
            return true
        } else {
            callback(false);
        }
    }).catch(err => {
        console.log('error: ',err);
        callback(false);
    }
    );
}


