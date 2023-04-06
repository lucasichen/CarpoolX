import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useCallback } from 'react'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from '../../components/common/Icon';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { reportUser } from './reportScript';

const ReportScreen = () => {
    const [code , setCode] = useState('')
    const [showError, setShowError] = useState(false)
    const [showEError, setShowEError] = useState('Please enter valid taxi code');
    const navigation = useNavigation();
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
    const [actionType, setActionType] = useState(''); // the type of action the user is confirming

    const handleConfirmationDismiss = () => {
        setIsConfirmationVisible(false);
    }

     /**
     * @description handle the confirmation dialog confirm
     */
     const handleConfirmationConfirm = () => {
        // handle the delete confirmation here
        setIsConfirmationVisible(false);
        let resp = reportUser(code);
        console.log(resp)
        console.log('person reported');
        setCode('');
        setShowError(false);
    };

    const handleSubmitCode = () => {
        if (code === '') {
            setShowError(true);
            setShowEError('Please enter valid user code');
        } else {
            setIsConfirmationVisible(true);
        }
    }

    /**
    * @description Resets the variables to their initial state if the user navigates away from this screen
    */
    const resetVars = useCallback(() => {
        return () => {
            setCode('');
            setShowError(false);
            setIsConfirmationVisible(false);
        }
    }, [])
    useFocusEffect(resetVars);  // reset the variables when the user navigates away from this screen

    return (
        <View style={styles.root}>
            {isConfirmationVisible && 
                <ConfirmationDialog
                actionType='report'
                onCancel={handleConfirmationDismiss}
                onConfirm={handleConfirmationConfirm} />}
        <View style={styles.container}>
            <View style={styles.container_title}>
            <Text style={styles.title}>Report a Passenger</Text>
            </View>
            <View style={styles.container_taxi}>
            <Icon name="report" type="material" color="red" size={100}/>
            </View>
            <View style={styles.container_text}>
            <Text style={styles.instructions}>Please enter the passenger's user code.</Text>
            </View>
            <CustomInput
            placeholder="Enter User Code"
            value={code}
            setValue={setCode}
            type="ionicon"
            icon="barcode" />
            <View style={styles.error}>
                {showError && <Text style={styles.error_message}>{showEError}</Text>}
            </View>
            <View style={styles.container_report}>
                <CustomButton
                text="Report Person"
                onPress={handleSubmitCode}
                type="DELETE" />
            </View>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: '100%',
    },
    container: {
        width: '100%',
        height: '40%',
        alignItems: 'center',
        padding : 40,
        marginTop: 70,
    },
    container_title: {
        maxWidth: 300,
    },
    container_taxi: {
        marginTop: 20,
    },
    container_text: {
        marginTop: 20,
        marginBottom: 20,
        width: '80%',
    },
    container_report :{
        width: '100%',
    },
    instructions: {
        textAlign: 'center',
        color: 'black',
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
    title: {
        fontSize: 40,
        fontFamily: 'UberMoveTextBold',
        color: 'black',
        textAlign: 'center',
        },
});

export default ReportScreen