import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useCallback } from 'react'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from '../../components/common/Icon';
import ConfirmationDialog from '../../components/ConfirmationDialog';

const PrivateEventScreen = () => {
    const navigation = useNavigation();
    const [location, setLocation] = useState(null);
    const [attendees, setAttendees] = useState('');
    const [emails, setEmails] = useState([]);
    const [isConfirmationVisible, setConfirmationVisible] = useState(false);

    const handleEnter = () => {

        setConfirmationVisible(true);
    }

    const handleDismiss = () => {

    }

    const handleConfirm = () => {

    }


    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <Text style={styles.title}>Event infromation</Text>
                <Text>
                    How many people will require ride service
                </Text>
                <CustomInput
                    placeholder="Number of attendees" 
                    value={attendees}
                    setValue={setAttendees}
                />
                <Text>
                    Please enter the emails of the individuals that will be using the service
                </Text>
                <CustomInput
                    placeholder="Attendees emails"
                    value={emails}
                    setValue={setEmails}
                />
                <Text style={styles.text}>
                    Please note that only attendees who have a registered account will be able to use the service
                </Text>
                <CustomButton
                    text="Enter"
                    onPress={handleEnter}
                    type="PRIMARY"
                />
                
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    root: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    container: {
        width: '100%',
        alignItems: 'center',
        height: '100%',
        padding: 20,
        paddingTop: 40,
        },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text: {
        fontSize: 12,
        color: "#051C60",
        margin: 10,
      },
});

export default PrivateEventScreen;
