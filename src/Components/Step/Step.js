import React from 'react'
import ActStoryStep from '../ActStoryStep/ActStoryStep'
import { View } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";


export default function Step(props) {
    //console.log(`ActStoryStep Render`)
    return (
        <ActStoryStep act={props.act} 
                      stepName={props.stepName} 
                      currentStep={props.currentStep} 
                      handleStepClick={props.handleStepClick} />
    )
}