import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import StarRating from '../../components/StarRating';
import { useNavigation,useFocusEffect } from '@react-navigation/native';

/**
 *
 * @description api call to register user route
 * @param {*} username
 * @param {*} rating
 */
function rateUser(username, rating, callback) {

}

/**
 * @description RegisterScreen component
 * @returns {JSX.Element} The RegisterScreen component
 */
const RateUser = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [rating, setRating] = useState(0);
    const [showUsernameError, setUsernameError] = useState(false);
    const [showRatingError, setRatingError] = useState(false);
    const [showUError, setShowUError] = useState('Please enter name of user');
    const [showRError, setShowRError] = useState('Please provide a rating');
    const callback = (option) => {
        setRating(option);
    }

    /**
     * @description Validates the name, email, password and confirm password and calls the register api
     */
    const onRatePressed = () => {
        console.warn(rating)
        let hasError = false;
        // ------------------ name validation ------------------
        if (username === '') {
        } else {

        }
        // ------------------ rating validation ------------------


        // ------------------ rate user ------------------
        if (!hasError) {
            rateUser(username, rating, success => {
                if (success) {

                } else {

                }
            })
        }
    }

    /**
     * @description Resets the variables to their initial state if the user navigates away from this screen
     */
    const resetVars = useCallback(() => {
        return () => {
            setUsername('');
            setRating(0)
            setUsernameError(false);
        }
    }, [])
    useFocusEffect(resetVars);  // reset the variables when the user navigates away from this screen
    return (
        <View style={styles.root}>
            <Text style={styles.title}>Rate a User</Text>
            <CustomInput
                placeholder="Username"
                value={username}
                setValue={setUsername}
                type="ionicon"
                icon="person" />
            <View style={styles.error}>
                {showUsernameError && <Text style={styles.error_message}>{showUError}</Text>}
            </View>
            <StarRating
                parentCallback={callback}/>
            <View style={styles.error}>
                {showRatingError && <Text style={styles.error_message}>{showRErrorError}</Text>}
            </View>
            <CustomButton
                text="Rate User"
                onPress={onRatePressed}
                type="PRIMARY"/>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: 'white',
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        height: '100%',
        paddingTop: 200,
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
    error: {
        height: 20,
        width: '100%',
        alignItems: 'flex-start',
    },
    error_message: {
        color: 'red',
        fontSize: 12,
        marginBottom: 5,
        marginLeft: 10,
    },
});

export default RateUser;