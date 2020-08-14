import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableHighlight } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Blocker(){

    return (
        <View style={{position: 'absolute', width: wp('100%'), height: hp('100%'), backgroundColor: 'rgba(0,0,0,0.75)'}}></View>
    )
}