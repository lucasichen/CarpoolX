import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';

const TermsOfUseScreen = () =>{
    const navigation = useNavigation();
    const onbackPressed = () => {
        navigation.navigate('Register');
    }
    return (
     <View style={styles.container}>
            <Text style={styles.title}>Sample Terms of Use</Text>
            <ScrollView 
            style={styles.tcContainer}
            >
                <Text style={styles.tcP}>Welcome to RideShareX. If you continue to browse and use this app, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern RideShareX’s relationship with you in relation to this app. If you disagree with any part of these terms and conditions, please do not use our app.</Text>
                <Text style={styles.tcP}>The term ‘RideShareX’ or ‘us’ or ‘we’ refers to the owner of the app whose registered office is McMaster. Our company registration number is McMaster. The term ‘you’ refers to the user or viewer of our app.</Text>
                    <Text style={styles.tcL}>{'\u2022'} The content of the pages of this app is for your general information and use only. It is subject to change without notice.</Text>
                    <Text style={styles.tcL}>{'\u2022'} This app uses cookies to monitor browsing preferences. If you do allow cookies to be used, the following personal information may be stored by us for use by third parties: [insert list of information].</Text>
                    <Text style={styles.tcL}>{'\u2022'} Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this app for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</Text>
                    <Text style={styles.tcL}>{'\u2022'} Your use of any information or materials on this app is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this app meet your specific requirements.</Text>
                    <Text style={styles.tcL}>{'\u2022'} This app contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</Text>
                    <Text style={styles.tcL}>{'\u2022'} All trademarks reproduced in this app, which are not the property of, or licensed to the operator, are acknowledged on the app.
Unauthorised use of this app may give rise to a claim for damages and/or be a criminal offence.</Text>
                    <Text style={styles.tcL}>{'\u2022'} From time to time, this app may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the app(s). We have no responsibility for the content of the linked app(s).</Text>
                    <Text style={styles.tcL}>{'\u2022'} Your use of this app and any dispute arising out of such use of the app is subject to the laws of England, Northern Ireland, Scotland and Wales.</Text>
                <Text style={styles.tcP}>The use of this app is subject to the following terms of use</Text>
            </ScrollView>
            <CustomButton
                text="Back to Registration"
                onPress={onbackPressed}
                type="TERTIARY"/>
      </View>
    );

}

const { width , height } = Dimensions.get('window');

const styles = {

  container:{
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
      fontSize: 22,
      alignSelf: 'center'
  },
  tcP: {
      marginTop: 10,
      marginBottom: 10,
      fontSize: 12
  },
  tcP:{
      marginTop: 10,
      fontSize: 12
  },
  tcL:{
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 10,
      fontSize: 12
  },
  tcContainer: {
      marginTop: 15,
      marginBottom: 15,
      height: height * .7
  },

  button:{
      backgroundColor: '#136AC7',
      borderRadius: 5,
      padding: 10
  },

}

export default TermsOfUseScreen;