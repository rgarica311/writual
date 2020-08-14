import React from 'react'
import { Text } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default function StepInstructions(props) {
    return (
        <Text style={{  fontFamily:'Varela Round', 
                        fontSize: '1.3vw', 
                        lineHeight:'1.2em',
                        minHeight: 115,
                        padding: 10,
                        display: 'block',
                        overflowY: 'auto',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        
                        {props.instructions}
        </Text>
        
    )
}