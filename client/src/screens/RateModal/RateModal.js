import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View, Modal, Button } from 'react-native';
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
const RateUser = ({route}) => {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(true);
    const [rating, setRating] = useState(0);
    const [showUsernameError, setUsernameError] = useState(false);
    const [showRatingError, setRatingError] = useState(false);
    const [showUError, setShowUError] = useState('Please enter name of user');
    const [showRError, setShowRError] = useState('Please provide a rating');

    const username = route.params.paramKey;
    const callback = (option) => {
        setRating(option);
    }
    const onClosePressed = () => {
        setVisible(false)
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
        navigation.goBack();
    }

    /**
     * @description Resets the variables to their initial state if the user navigates away from this screen
     */
    const resetVars = useCallback(() => {
        return () => {
            setRating(0)
        }
    }, [])
    useFocusEffect(resetVars);  // reset the variables when the user navigates away from this screen
    return (
            <Modal transparent={true} animationType={"fade"}>
            <View style={styles.root}>
                <Text style={styles.title}>
                    {route.params.paramKey}
                </Text>
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
            </Modal>

    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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