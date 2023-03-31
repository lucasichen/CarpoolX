import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';

/**
 * 
 * @description This is the PrivacyPolicyScreen component. It is the screen that the user sees when they click on the Privacy Policy button on the RegisterScreen.
 * @returns {JSX.Element} The PrivacyPolicyScreen component
 */
const PrivacyPolicyScreen = () =>{
    const navigation = useNavigation();
    const onbackPressed = () => {
        navigation.navigate('Register');
    }
    return (
     <View style={styles.container}>
            <Text style={styles.title}>Sample Privacy Policy</Text>
            <ScrollView 
            style={styles.tcContainer}
            >
                <Text style={styles.tcP}>We are committed to maintaining the accuracy, confidentiality, and security of your personally identifiable information ("Personal Information"). As part of this commitment, our privacy policy governs our actions as they relate to the collection, use and disclosure of Personal Information. Our privacy policy is based upon the values set by the Canadian Standards Association's Model Code for the Protection of Personal Information and Canada's Personal Information Protection and Electronic Documents Act.</Text>
                <Text style={styles.tcP}>We are responsible for maintaining and protecting the Personal Information under our control. We have designated an individual or individuals who is/are responsible for compliance with our privacy policy.</Text>
                    <Text style={styles.tcL}>{'\u2022'} We collect, use and disclose Personal Information to provide you with the product or service you have requested and to offer you additional products and services we believe you might be interested in. The purposes for which we collect Personal Information will be identified before or at the time we collect the information. In certain circumstances, the purposes for which information is collected may be clear, and consent may be implied, such as where your name, address and payment information is provided as part of the order process.</Text>
                    <Text style={styles.tcL}>{'\u2022'} Knowledge and consent are required for the collection, use or disclosure of Personal Information except where required or permitted by law. Providing us with your Personal Information is always your choice. However, your decision not to provide certain information may limit our ability to provide you with our products or services. We will not require you to consent to the collection, use, or disclosure of information as a condition to the supply of a product or service, except as required to be able to supply the product or service.</Text>
                    <Text style={styles.tcL}>{'\u2022'} Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this app for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</Text>
                    <Text style={styles.tcL}>{'\u2022'} Your use of any information or materials on this app is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this app meet your specific requirements.</Text>
                    <Text style={styles.tcL}>{'\u2022'} The Personal Information collected will be limited to those details necessary for the purposes identified by us. With your consent, we may collect Personal Information from you in person, over the telephone or by corresponding with you via mail, facsimile, or the Internet.</Text>
                    <Text style={styles.tcL}>{'\u2022'} Personal Information may only be used or disclosed for the purpose for which it was collected unless you have otherwise consented, or when it is required or permitted by law. Personal Information will only be retained for the period of time required to fulfill the purpose for which we collected it or as may be required by law.</Text>
                    <Text style={styles.tcL}>{'\u2022'} From time to time, this app may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the app(s). We have no responsibility for the content of the linked app(s).</Text>
                    <Text style={styles.tcL}>{'\u2022'} Your use of this app and any dispute arising out of such use of the app is subject to the laws of England, Northern Ireland, Scotland and Wales.</Text>
                <Text style={styles.tcP}>The use of this app is subject to the following privacy policy.</Text>
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

export default PrivacyPolicyScreen;