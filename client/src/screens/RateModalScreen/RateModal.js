import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import CustomButton from '../../components/CustomButton';
import StarRating from '../../components/StarRating';
import { useNavigation,useFocusEffect } from '@react-navigation/native';

function rateUser(username, rating, success) {

}
const RateUser = ({route}) => {
    const navigation = useNavigation();
    const [rating, setRating] = useState(0);


    const username = route.params.paramKey;
    const callback = (option) => {
        setRating(option);
    }
    const onClosePressed = () => {
        setVisible(false)
    }
    const onRatePressed = () => {
        console.warn(rating)
        // ------------------ rate user ------------------
        // ------------------ goes back -------------------
        navigation.goBack();
    }

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
              <StarRating
                parentCallback={callback}/>
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
});

export default RateUser;
