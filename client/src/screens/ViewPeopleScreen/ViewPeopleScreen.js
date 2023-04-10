import { View, Text, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import CustomButton from '../../components/CustomButton'
import { useNavigation, useRoute } from '@react-navigation/native'

function getPassengers(taxiId, calback){
    console.log("Getting users...")
    return fetch('http://10.0.2.2:5000/getpassengers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            taxi_id: taxiId
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

const ViewPeopleScreen = () => {

    const route = useRoute();
    const navigation = useNavigation()
    const {rideToReturn} = route.params
    const [passengers, setPassengers] = useState([])

    const passengersDisplay = passengers.map((passenger) => {
        <Text>{passenger}</Text>
    })

    const onRefreshPressed = () => {

        newPassengers = getPassengers(rideToReturn)
        console.log(newPassengers)
        setPassengers(newPassengers)
    }
    return(
        <View style={styles.container}>
            <Text>Current users on ride:</Text>
            {/* {passengersDisplay} */}
            <CustomButton
                text="Refresh"
                onPress={onRefreshPressed}
                type="PRIMARY"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 40,
        marginHorizontal: 20,
        marginVertical: 100
    }
})

export default ViewPeopleScreen