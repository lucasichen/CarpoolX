import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View, Button, Modal } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import StarRating from '../../components/StarRating';
import { useNavigation,useFocusEffect } from '@react-navigation/native';


/**
 *
 * @description api call to register user route
 * @param {*} username
 * @param {*} rating
 * @param success
 */
function rateUser(username, rating, success) {

}

/**
 * @description RegisterScreen component
 * @returns {JSX.Element} The RegisterScreen component
 */
const RateUser = () => {
    const navigation = useNavigation();
    const userList = ["rafeed", "allison", "henushan", "lucas"];



    /**
     * @description Resets the variables to their initial state if the user navigates away from this screen
     */
    const resetVars = useCallback(() => {
        return () => {

        }
    }, [])
    useFocusEffect(resetVars);  // reset the variables when the user navigates away from this screen
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>Rate your fellow riders!</Text>
            <View style={styles.userL}>
                {userList.map((name) => (
                    <CustomButton
                        text={"Rate " + name}
                        onPress={() => navigation.navigate('RateModal', {paramKey: name})}
                        type="PRIMARY"/>
                ))}

            </View>
        </View>

    )
}



const styles = StyleSheet.create({
    root: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 20,
        height: '100%',
        paddingTop: 200,
        paddingBottom: 400
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#051C60",
        margin: 10,
    },
    text: {
        fontSize: 12,
        color: "#051C60",
        margin: 10,
    },
    link: {
        color: "#3B7CFF",
    },
    userL: {
        padding:100,
        display: 'flex',
        flexDirection: 'column',
    }
});

export default RateUser;