export function rateUser(name,rating) {
    return fetch('http://10.0.2.2:5000/rateuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                rating: rating
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success){
                    console.log("Got users", data.data)
                    return data.data;
                }else{
                    callback(false)
                }
            })
            .catch(error =>{
                console.error("Error occured ->: ", error)
            }
        )
    
}