/**
 * 
 * @description api call to report user route
 * @param {*} email  
 * @param {*} callback 
 */

/*
export function verifyUser(email, callback) {
    return fetch('', {
        method: 'POST',
        headers: {

        },
        body: JSON.stringify({
            email: email
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            console.log('User verified');
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


function sendEvent(location, date, attendees){
    return fetch('' , {
        method: 'POST',
        headers: {
            
        }
        body: JSON.stringify({
    
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            console.log('User verified');
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


