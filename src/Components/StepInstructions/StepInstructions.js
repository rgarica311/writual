import React from 'react'
import { Text } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default function StepInstructions(props) {
    return (
        <Text style={{  fontFamily:'Varela Round', 
                        fontSize: '.9vw', 
                        lineHeight:'1.2em',
                        minHeight: 115,
                        padding: 10,
                        display: 'flex',
                        overflowY: 'auto',
                        justifyContent: 'center',
                        textAlign: 'center',
                        alignItems: 'center'}}>
                        
                        {props.instructions}
        </Text>
        
    )
}