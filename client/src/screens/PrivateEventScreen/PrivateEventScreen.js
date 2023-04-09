import { View, Text, StyleSheet, FlatList, Button } from 'react-native'
import React, { useState, useCallback } from 'react'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import {sendEvent, verifyUser} from './privateEventScript'

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
    const [showEmailError, setShowEmailError] = useState(false);
    const [date, setDate] = useState('');
    const [eventID, setEvent] = useState(0);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleEnter = () => {
        setActionType('event');
        setConfirmationVisible(true);
    }

    const handleNext = () => {
        setShowEmailError(false);
        if(counter < attendees) {
            setMaxVisible(false);
            // ----- checking they entered emails ----
            if (!emailRegex.test(email)) {
                setShowEmailError(true);
            } else {
                const newEmail = emails.concat(email);
                setEmails(newEmail);
                setEmail('');
                setCounter(counter => counter + 1);
            }
        } else {
            setMaxVisible(true);
        }
    }

    const handleDismiss = () => {
        setConfirmationVisible(false);
    }

    const handleConfirm = () => {
        setConfirmationVisible(false);
        setDate('')
        setAttendees('')
        setEmails([])
        for(let i =0; i < attendees; i++){
            verifyUser(emails[i]);
        }
        sendEvent(location, date, attendees, emails);
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
                    Enter the date and time of the event
                </Text>
                <CustomInput
                    placeholder="Date"
                    value={date}
                    setValue={setDate}
                />
                <Text>
                   This will have the location 
                </Text>
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
                {isMaxVisible && <Text style={styles.errorMsg}>Maximum number of attendee emails received</Text>}
                {showEmailError && <Text style={styles.errorMsg}>Invalid email</Text>}
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
        height: 380,
        padding: 20,
        paddingTop: 20,
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

    },
    errorMsg: {
        color: 'red',
        fontSize: 12,
      },

});

export default PrivateEventScreen;
