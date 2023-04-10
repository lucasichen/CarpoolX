import { View, Text, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import CustomButton from '../../components/CustomButton'
import { useNavigation, useRoute } from '@react-navigation/native'

function getPassengersStart(taxiId, callback){
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
        console.log("Got users", data.data)
        return data.data;
      }else{
        callback(false)
      }
    })
    .catch(error =>{
      console.error("Error occured ->: ", error)
    })
  }

const ViewPeopleStart = () => {

    const route = useRoute();
    const navigation = useNavigation()
    const {taxiToFind} = route.params
    const [passengers, setPassengers] = useState([])
    const [havePassengers, setHavePassengers] = useState(false)

    const onEndPressed = () =>{
        navigation.navigate("EndOfRide")
    }

    useEffect(() => {
        console.log(passengers, "refresh passengers");
      }, [passengers]);
      
      const onRefreshPressed = async() => {
        newPassengers = await getPassengersStart(taxiToFind);
        if (newPassengers == undefined) {
          console.log("No passengers");
          return;
        }
        console.log(newPassengers, "new passengers to set");
        try {
          setPassengers(newPassengers);
        } catch (error) {
          console.log("cant set passengers");
        }
        setHavePassengers(true);
      }

    useEffect(() => {
    console.log(passengers, "passengers to set");
    }, [passengers]);
    
    useEffect(() => {
    const fetchData = async () => {
        taxiId = rideToFind;
        const newPassengers = await getPassengers(taxiToFind);
        if (newPassengers == undefined) {
        console.log("No passengers");
        return;
        }
        try {
        setPassengers(newPassengers);
        } catch (error) {
        console.log("cant set passengers");
        }
        setHavePassengers(true);
    }
    fetchData();
    }, []);

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Current users on ride:</Text>
                <View style={styles.passengers}>
                    <Text>{passengers}</Text>
                </View>
                <View>
                    <CustomButton
                        text="Refresh"
                        onPress={onRefreshPressed}
                        type="PRIMARY"
                    />
                </View>
            </View>
            <View style={styles.endtrip}>
                <CustomButton
                    text="End Trip"
                    onPress={onEndPressed}
                    type="DELETE"
                />
            </View>
        </View>
    )
}

export default ViewPeopleStart

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 40,
        marginHorizontal: 20,
        marginVertical: 100
    },
    passengers: {
        marginVertical: 20,
        alignItems: 'center',
    },
    endtrip: {
        marginVertical: 250,
    }
})
