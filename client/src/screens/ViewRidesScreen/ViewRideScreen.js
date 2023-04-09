import { View, Text, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import CustomButton from '../../components/CustomButton'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Button } from 'react-native-paper'

const ViewRideScreen = () => {
    const route = useRoute();
    const navigation = useNavigation()
    const {rideToReturn} = route.params
    const rideArr = rideToReturn.rides
    const [rideToFind, setRideNum] = useState(null)

    const buttonComponents = rideArr.map((number) =>
        <CustomButton
            text={`Taxi ${number}`}
            type="PRIMARY"
            onPress={() => setRideNum(number)}
        />
    )

    const renderMain = () => {
        if (rideArr.length == 0){
            return (
                <View style={styles.container}>
                    <Text>No available rides. Sorry about that :/</Text>
                </View>
            )
        }else{
            return (
                <View style={styles.container}>
                    <Text>The available rides</Text>
                    <Text>Please select one</Text>

                    <View style={styles.buttonStyle}>
                        {buttonComponents}
                    </View>
                    <Text>Your selected taxi is:</Text>
                    <Text>{rideToFind}</Text>
                    <View style={styles.start_button}>
                        <CustomButton
                            text="Start Ride"
                            //onPress={onStartPressed}
                            type="PRIMARY"
                        />
                    </View>
                </View>
            )
        }
    }
    
    return (
        <View>
            {renderMain()}
        </View>
    )
}

export default ViewRideScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 40,
        marginHorizontal: 20,
        marginVertical: 100
    },
    buttonStyle: {
        marginVertical: 20,
    },
    start_button: {
        marginTop: 40,
        alignItems: 'center',
        marginHorizontal: 80
      }
})