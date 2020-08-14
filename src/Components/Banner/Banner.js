import React from 'react'
import { View, StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import colorSwatches from '../../colorSwatches'

const { persianOrange } = colorSwatches

const styles = StyleSheet.create({
    container: {
        height: 55,
        width: '1152px',
        backgroundColor: persianOrange,
        borderBottomColor: '#393E41',
        borderBottomWidth: 5,
        position: 'absolute',
        top: 325, 
    }
})

//console.log(`colorswatches ${colorSwatches}`)

export default function Banner() {
    return (
        <View style={styles.container}></View>
    )
}