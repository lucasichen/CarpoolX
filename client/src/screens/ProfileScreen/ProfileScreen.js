import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput';
import CustomUserIcon from '../../components/CustomUserIcon';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { getUserProfile, changeUserInfo, deleteUser } from './profileScript';

/**
 * @description ProfileScreen component
 * @returns {JSX.Element} The ProfileScreen component
 */
const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [initials, setInitials] = useState('');
    const navigation = useNavigation();
    const [isConfirmationVisible, setConfirmationVisible] = useState(false);
    const [actionType, setActionType] = useState('');

    /**
     * @description useEffect hook to retrieve tokens from keychain
     */
    useEffect(() => {
        getUserProfileData();
    }, []);

    /**
     * @description get user profile data
     * @returns {Promise<void>}
     */
    const getUserProfileData = async () => {
        let userProfile = await getUserProfile();
        if (userProfile) {
            console.log(userProfile);
            setName(userProfile.name);
            setEmail(userProfile.email);
            handleInitials(userProfile.name);
            if (!userProfile.age == 0){
                setAge(userProfile.age);
            } else {
                setAge('');
            }
        } else {
            console.log('Failed to retrieve user profile');
        }
    };

    const handleInitials = (username) => {
        const nameArray = username.split(' ');
        if (nameArray.length === 1) {
            setInitials(tonameArray[0].charAt(0).toUpperCase());
        } else {
            setInitials(nameArray[0].charAt(0).toUpperCase() + nameArray[1].charAt(0).toUpperCase());
        }
    };
    
    /**
     * @description handle the delete button press
     */
    const handleDelete = () => {
        setActionType('delete');
        setConfirmationVisible(true);
    };

    /**
     * @description handle the update button press
     */
    const handleUpdate = () => {
        // handle the update here
        setActionType('update');
        setConfirmationVisible(true);
    };

    /**
     * @description handle the confirmation dialog dismiss
     */
    const handleConfirmationDismiss = () => {
        console.log('confirmation dismissed');
        setConfirmationVisible(false);
    };

    /**
     * @description handle the confirmation dialog confirm
     */
    const handleConfirmationConfirm = async () => {
        // handle the delete confirmation here
        setConfirmationVisible(false);
        if (actionType === 'update') {
            console.log('update confirmed');
            // handle the update confirmation here
            await changeUserInfo(name, age);
            getUserProfileData();
        }
        if (actionType === 'delete') {
            console.log('delete confirmed');
            // handle the delete confirmation here
            let delete_data = await deleteUser();
            console.log(delete_data);
            navigation.navigate('Login');
        }
    };

    return (
        <View style={styles.root}>
            {isConfirmationVisible && 
                <ConfirmationDialog
                actionType={actionType}
                onCancel={handleConfirmationDismiss}
                onConfirm={handleConfirmationConfirm} />
                }
            <View style={styles.container}>
                <Text style={styles.title}>Your Profile</Text>
                <CustomUserIcon initials={initials} />
                <Text style={styles.email}>{email}</Text>
                <CustomInput
                    value={name}
                    setValue={setName} 
                    type="ionicon"
                    icon="person" />
                <CustomInput
                    placeholder="Age"
                    value={age}
                    setValue={setAge} 
                    type="ant"
                    icon="idcard" />
                <CustomButton
                    text="Update"
                    onPress={handleUpdate}
                    type="PRIMARY" />
                <CustomButton
                    text="Delete Account"
                    onPress={handleDelete}
                    type="DELETE" />
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
    email: {
        fontSize: 16,
        color: '#051C60',
        paddingBottom: 10,
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
