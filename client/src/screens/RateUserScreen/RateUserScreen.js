import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const RateUserScreen = ({route}) => {
    const navigation = useNavigation();
    const userList = route.params.paramKey

    return (
        <View style={styles.root}>
            <Text style={{ fontSize: 30 }}>Rate your fellow riders!</Text>
            <View style={styles.userL}>
                {userList.map((name) => (
                    <CustomButton
                        text={"Rate " + name}
                        onPress={() => navigation.navigate('RateModal', {paramKey: name})}
                        type="NAME"/>
                ))}

            </View>
        </View>

    )
}



const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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

export default RateUserScreen;
