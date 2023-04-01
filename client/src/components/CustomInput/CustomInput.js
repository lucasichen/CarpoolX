import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from '../common/Icon';
// import Icon from 'react-native-vector-icons/Ionicons'
import FAIcon from 'react-native-vector-icons/FontAwesome';

const ifPassword = (icon) => {
    if (icon === 'lock') {
        return (
            <Icon style={styles.password_icon} type='ant' name="eye" size={20}/>
        );
    }
}

/**
 * 
 * @description This is the CustomInput component. It is a custom input component that is used in the LoginScreen component.
 * @param {*} value for the value of the input
 * @param {*} setValue for setting the value of the input
 * @param {*} placeholder for placeholder text
 * @param {*} secureTextEntry for hiding password
 * @param {*} type for icon library
 * @param {*} icon for icon name
 * @returns 
 */
const CustomInput = ({value, setValue, placeholder, secureTextEntry, type, icon}) => {
    return (
        <View style={styles.container}>
            <Icon style={styles.icon} type={type} name={icon} size={20}/>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry} />
            <Icon style={styles.password_icon} />
            {ifPassword(icon)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 5,
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        fontSize: 16,
        padding: 10,
    },
    icon: {
        marginTop: 12,
    },
    password_icon: {
        marginTop: 12,
        marginLeft: 'auto',
    },
});
export default CustomInput;