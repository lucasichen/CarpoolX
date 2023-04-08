export function getRideOffers(destination) {
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
        return data
    })
    .catch(error =>{
        console.error("Error occured at here ->: ", error)
      })
}