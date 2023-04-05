import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import Icon from '../common/Icon'
import { useNavigation } from '@react-navigation/native'

const data = [
    {
        id: '1',
        title: 'Request ride',
        image: 'https://links.papareact.com/3pn',
        screen: 'RequestRide',
    },
    {
        id: '2',
        title: 'Join ride',
        image: 'https://ubernewsroomapi.10upcdn.com/wp-content/uploads/2022/10/Icone-Taxi-1-360x200.png',
        screen: 'JoinRide',
    },
    {
        id: '3',
        title: 'Private Ride',
        image: 'https://links.papareact.com/7pf',
        screen: 'PrivateEvent',
    },
    {
        id: '4',
        title: 'Report Person',
        image: 'https://www.pngmart.com/files/21/Red-Alert-PNG.png',
        screen: 'Report',
    },
]

const NavOptions = () => {
    const navigation = useNavigation()
    return (
      <FlatList 
            data={data}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => navigation.navigate(item.screen)} >
                    <View>
                        <Image
                            style={[styles.flatlist_image, item.title === 'Join ride' && styles.joinRideImage, item.title === 'Report Person' && styles.reportPersonImage]}
                            source={{ uri: item.image }}
                        />
                    </View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Icon style={styles.arrow} type="ant" name="arrowright"/>
                </TouchableOpacity>
            )}
      />
    )
  }
  
const styles = StyleSheet.create({
    container: {
        padding: 5,
        paddingBottom: 20,
        paddingTop: 10,
        backgroundColor: '#E2E8F0',
        margin: 10,
        width: 140,
        borderRadius: 10,
    },
    flatlist_image: {
        width: 120,
        height: 120,
        marginLeft: 10,
        resizeMode: 'contain',
    },
    joinRideImage: {
        width: 130,
        marginLeft: 0,
    },
    reportPersonImage: {
        width: 100,
        marginLeft: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: 'black',
        textAlign: 'center',
    },
    arrow: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: 10,
        marginHorizontal: 55,
        backgroundColor: 'black',
        borderRadius: 60,
        width: 25,
        height: 25,
    }
});
  

export default NavOptions