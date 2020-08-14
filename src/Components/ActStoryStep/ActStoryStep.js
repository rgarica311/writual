import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import colorSwatches from '../../colorSwatches'

const { princetonOrange, yankeesBlue, oldLace} = colorSwatches

const styles = StyleSheet.create({
    container: {
        backgroundColor: oldLace,
        borderBottomColor: '#393E41',
        borderBottomWidth: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        minHeight: 80,
        cursor: 'pointer', 
    },

    text: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'Montserrat',
        fontWeight: '800',
    },

    activeStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        maxHeight: 80,
        backgroundColor: oldLace,
        borderBottomColor: princetonOrange,
        borderBottomWidth: 5,
        cursor: 'pointer', 
    }
})

export default class ActStoryStep extends Component {
    constructor(props){
        super(props)
        this.state = {
            handleStepClick: props.handleStepClick,
            step_name: props.stepName,
            act: props.act,
            currentStep: props.currentStep,
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.currentStep !== this.props.currentStep) {
            this.setState({
                currentStep: this.props.currentStep
            })
        }
    }

    render() {
        //console.log(`this.state.currentStep ${this.state.currentStep} step_name ${this.state.step_name}`)
        return (
             <View  onClick={e => this.state.handleStepClick(this.state.step_name, this.state.act)} 
                    style={this.state.currentStep === this.state.step_name ? styles.activeStyle : styles.container}>
                <Text style={styles.text}>{this.state.step_name}</Text>
            </View>
        )
    }
}