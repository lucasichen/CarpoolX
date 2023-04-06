import { View, Text, StyleSheet, FlatList, Button } from 'react-native'
import React, { useState, useCallback } from 'react'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ConfirmationDialog from '../../components/ConfirmationDialog';

const PrivateEventScreen = () => {
    const navigation = useNavigation();
    const [location, setLocation] = useState(null);
    const [attendees, setAttendees] = useState('');
    const [email, setEmail] = useState('');
    const [isConfirmationVisible, setConfirmationVisible] = useState(false);
    const [isMaxVisible, setMaxVisible] = useState(false);
    const [actionType, setActionType] = useState('');
    const [emails, setEmails] = useState([]);
    const [counter, setCounter] = useState(0);

    const handleEnter = () => {
        setActionType('event');
        setConfirmationVisible(true);
    }

    const handleNext = () => {
        if(counter < attendees) {
            const newEmail = emails.concat(email);
            setEmails(newEmail);
            setEmail('');
        } else {
            setMaxVisible(true);
        }
        setCounter(counter => counter + 1);
    }

    const handleDismiss = () => {
        setConfirmationVisible(false);
    }

    const handleConfirm = () => {
        setConfirmationVisible(false);
        //save the event to the database 
        //seperate the emails

    }


    return (
        <View style={styles.root}>
            {isConfirmationVisible &&
                <ConfirmationDialog
                actionType={actionType}
                onCancel={handleDismiss}
                onConfirm={handleConfirm}
                />
            }
            <Text style={[styles.title, {paddingTop: 40}]}>Event information</Text>
            <View style={styles.attendInfo}>
                <Text>
                    How many people will require ride service
                </Text>
                <CustomInput
                    placeholder="Number of attendees" 
                    value={attendees}
                    setValue={setAttendees}
                />
                <Text style={[{paddingTop:20}]}>
                    Please enter the emails of the individuals that will be using the service
                </Text>
                <CustomInput
                    placeholder='Attendee email' 
                    value={email}
                    setValue={setEmail}
                />
                <Text style={styles.text}>
                    Please note that only attendees who have a registered account will be able to use the service
                </Text>
                {isMaxVisible && <Text>Maximum number of attendee emails received</Text>}
            </View>
                <CustomButton 
                    text="Next"
                    onPress={handleNext}
                    type="PRIMARY"
                />
            <Text style={styles.main}>Emails</Text>
            <FlatList 
                data={emails}
                renderItem={({item}) => <Text style={styles.text}>{item}</Text>}
            />
            <CustomButton 
                    text="Create Event"
                    onPress={handleEnter}
                    type="PRIMARY"
                />
        </View>
    )

}


const styles = StyleSheet.create({
    root: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        padding: 20,
    },
    attendInfo: {
        width: '100%',
        alignItems: 'center',
        height: 300,
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
    main: {
        fontSize: 12,
        color: "#000000",
        margin: 10,

    }

});

export default PrivateEventScreen;
