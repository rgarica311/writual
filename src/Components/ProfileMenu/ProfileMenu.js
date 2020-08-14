import React, { useContext } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import WritualContext from '../../WritualContext'

const styles = StyleSheet.create({

            photoLg: {
                height: 50,
                width: 50,
                borderRadius: "50%",
            },

            profileMenu: {
                backgroundColor: "white",
                width: wp("15%"),
                height: hp("40%"),
                borderRadius: 10,
                position: 'absolute',
                marginTop: 60,
                marginRight: 20,
                right: 0, 
                elevation: 2,
                filter: "drop-shadow(0 0 .25rem grey)",
                alignItems: 'center',
                padding: 10,
                zIndex: 1, 
                justifyContent: 'space-evenly'

            },

            signOut: {
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderColor: 'lightgrey',
                flexDirection: 'row',
            }
})




export default function ProfileMenu(props) {
    const { photoUrl, displayName, email } = useContext(WritualContext)
    return(
        <View style={{ padding: 10, height: hp("40%"), justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{height: hp('30%'), width: wp('15%'), justifyContent: 'space-evenly', alignItems: 'center'}}>
                <Image style={styles.photoLg} source={photoUrl}/>
                <Text>{email}</Text>
                <Text>Signed In As: {displayName}</Text>
            </View>
            {props.children}
        </View>
    )
}