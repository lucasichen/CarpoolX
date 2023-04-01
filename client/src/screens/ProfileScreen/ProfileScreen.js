import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput';
import CustomUserIcon from '../../components/CustomUserIcon';
import ConfirmationDialog from '../../components/ConfirmationDialog';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();
    const [isConfirmationVisible, setConfirmationVisible] = useState(false);
    const [actionType, setActionType] = useState('');

    const handleDelete = () => {
        setActionType('delete');
        setConfirmationVisible(true);
    };

    const handleConfirmationDismiss = () => {
        setConfirmationVisible(false);
    };

    const handleConfirmationConfirm = () => {
        // handle the delete confirmation here
        setConfirmationVisible(false);
    };

    const handleUpdate = () => {
        // handle the update here
        setActionType('update');
        setConfirmationVisible(true);
    };

    return (
        <View style={styles.root}>
            {isConfirmationVisible && 
                    <ConfirmationDialog
                    actionType={actionType}
                    onDismiss={handleConfirmationDismiss}
                    onConfirm={handleConfirmationConfirm}
                />
                }
            <View style={styles.container}>
                <Text style={styles.title}>Your Profile</Text>
                <CustomUserIcon initials="LC" />
                <CustomInput
                    placeholder="Full Name"
                    value={name}
                    setValue={setName} 
                    type="ionicon"
                    icon="person"
                />
                <CustomInput
                    placeholder="Age"
                    value={age}
                    setValue={setAge} 
                    type="ant"
                    icon="idcard"
                />
                <CustomInput
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                    type="fontisto"
                    icon="email"
                />
                <CustomButton
                    text="Update"
                    onPress={handleUpdate}
                    type="PRIMARY" />
                <CustomButton
                    text="Delete Account"
                    onPress={handleDelete}
                    type="DELETE"
                />
            </View>
        </View>
    );
};

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
        color: '#051C60',
        margin: 10,
    },
    link: {
        color: '#3B7CFF',
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
    container_delete: {
        marginTop: 100,
        width: '100%',
    },
    confirmation_container: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
});

export default ProfileScreen;
