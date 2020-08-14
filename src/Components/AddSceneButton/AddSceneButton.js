import React from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import WritualContext from '../../WritualContext'


import colorSwatches from '../../colorSwatches'

const { princetonOrange, oldLace } = colorSwatches

const styles = StyleSheet.create({

    newScene: {
        width: 150,
        height: 45,
        padding: 5,
        backgroundColor: princetonOrange,
        borderColor: oldLace,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginLeft: 10,
        flexDirection: 'row'
    },
})

export default function AddSceneButton(props) {
    return (
        <WritualContext.Consumer>
        {(context) => (
            <TouchableHighlight onPress={e => context._addScene(e, props.currentAct)} style={styles.newScene}>
                <Text style={{fontSize: 14, fontWeight: '600', fontFamily: 'Montserrat', color:'white'}}>Add Scene</Text>
            </TouchableHighlight>
            )}
      </WritualContext.Consumer>
    )
}

