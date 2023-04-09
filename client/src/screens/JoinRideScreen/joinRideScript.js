export function getRideOffers(destination, callback) {
    return fetch('http://10.0.2.2:5000/getrides', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            destloc: destination,
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Data from getRideOffers: ", data)
        if (data.success){
            callback(true, data.resp)
        }
        else{
            callback(false, data.resp)
        }
    })
    .catch(error =>{
        console.error("Error occured at here ->: ", error)
      })
}