import React, { Component } from "react";
import { View, Text, StyleSheet } from 'react-native'
import WritualContext from "../../WritualContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import StepInstructions from '../StepInstructions/StepInstructions'
import SceneSearch from '../SceneSearch/SceneSearch'
import AddSceneButton from '../AddSceneButton/AddSceneButton'
import Step from '../Step/Step'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import colorSwatches from '../../colorSwatches'

const { yaleBlue, whiteSmoke, blackOlive } = colorSwatches

const styles = StyleSheet.create({
    actInstructionsContainer: {
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        backgroundColor: whiteSmoke,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        alignSelf: 'flex-start',
        height: '35%',
        minHeight: 115,
        width: '100%',
        //justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    text: {
        color: yaleBlue,
        fontSize: '1.5em',
        lineHeight: '1.4em',
        textTransform: 'uppercase',
        fontFamily: 'Courier',
        fontWeight: 'bold',
        textAlign: 'center',
        //flex: 1,
        height: 'max-content',
        marginTop: 5,
    },

    innerContainer: {
        justifyContent: 'center',
    }, 

    tools: {
        flexDirection: 'row', 
        justifyContent:'space-evenly',
        alignItems: 'center',
        backgroundColor: blackOlive, 
        width: '100%',
        height: 65,
        padding: 10,
    },

    stepsContainer: {
        flexDirection: 'row', 
        width: '100%',
        zIndex: 1,
        alignSelf: 'center',
        flex: 1,
    }

})

export default class ActInstructions extends Component {
    constructor(props){
        super(props)
        this.state = {
            act: this.props.act,
            table: this.props.table,
            steps: this.props.steps,
            getSteps: this.props.getSteps,
            handleActOneStepClick: this.props.handleActOneStepClick,
            handleActTwoStepClick: this.props.handleActTwoStepClick,
            handleActThreeStepClick: this.props.handleActThreeStepClick,
            currentActOneStep: this.props.currentActOneStep,
            currentActTwoStep: this.props.currentActTwoStep,
            currentActThreeStep: this.props.currentActThreeStep, 
            currentStep: this.props.currentStep, 
            currentAct: this.props.currentAct,
            prevAct: this.props.prevAct,
            currentStepAct: this.props.currentStepAct,
            chidlren: this.props.children,
            stepsCleared: false
        }
    }

    componentDidUpdate(prevProps) {
        //console.log('debug instructions: ActInstructions component did update')
        //console.log(`debug instructions: ActInstructions update: prevProps.act ${prevProps.act} this.props.act ${this.props.act}`)
        if(prevProps.act !== this.props.act) {
            this.setState({
                prevAct: prevProps.act
            })
        } else if (prevProps.currentActOneStep !== this.props.currentActOneStep){
            this.setState({
                currentActOneStep: this.props.currentActOneStep,
                currentStep: this.props.currentActOneStep,
                currentAct: this.props.currentAct,
                stepsCleared: false
            })
        } else if (prevProps.currentActTwoStep !== this.props.currentActTwoStep) {
            this.setState({
                currentActTwoStep: this.props.currentActTwoStep,
                currentStep: this.props.currentActTwoStep,
                currentAct: this.props.currentAct,
                stepsCleared: false
            })
        } else if (prevProps.currentActThreeStep !== this.props.currentActThreeStep) {
            this.setState({
                currentActThreeStep: this.props.currentActThreeStep,
                currentStep: this.props.currentActThreeStep,
                currentAct: this.props.currentAct,
                stepsCleared: false
            })
        } else if (prevProps.steps !== this.props.steps) {
            this.setState({
                steps: this.props.steps,
                //stepsCleared: true
            })
        }
        
    }

    render(){
        //console.log(`render ActInstructions`)
        return (
            <WritualContext.Consumer>
            {(context) => (
                <View style={styles.actInstructionsContainer}>
                    <Text style={styles.text}> {context.sharedProjClicked === false 
                                                    ? context.currentProjFormat === 'Episode' 
                                                        ? context.episodes.find(obj => obj.episode_title === context.currentProj).framework 
                                                        : context.projects.find(obj => obj.title === context.currentProj).framework 
                                                    : context.currentProjFormat === 'Episode' 
                                                        ? context.sharedEpisodes.find(obj => obj.episode_title === context.currentProj).framework
                                                        : context.sharedProjects.find(obj => obj.title === context.currentProj).framework } Act {this.state.act} </Text>

                    {
                        this.state.currentActOneStep !== null && this.state.currentAct === '1'
                            ? this.state.steps.find(step => step.step_name === this.state.currentActOneStep) !== undefined 
                                ? <StepInstructions instructions={this.state.steps.find(step => step.step_name === this.state.currentActOneStep).step_desc} />
                                : null

                            : this.state.currentActTwoStep !== null && this.state.currentAct === '2'
                                ? this.state.steps.find(step => step.step_name === this.state.currentActTwoStep) !== undefined 
                                    ? <StepInstructions instructions={this.state.steps.find(step => step.step_name === this.state.currentActTwoStep).step_desc} />
                                    : null
                                : this.state.currentActThreeStep !== null && this.state.currentAct === '3'
                                    ? this.state.steps.find(step => step.step_name === this.state.currentActThreeStep) !== undefined 
                                        ? <StepInstructions instructions={this.state.steps.find(step => step.step_name === this.state.currentActThreeStep).step_desc} />
                                        : null
                                    : this.state.prevAct !== null
                                        ? <StepInstructions instructions={this.state.steps.find(step => step.step_name === this.state.currentActThreeStep).step_desc} />
                                        : <StepInstructions center='center' instructions="Click a step below to reveal its explanation and add scenes. Use the explanation as guideline to develop scenes."/>

                       
                    }

                    {
                        this.state.stepsCleared === true
                            ? <StepInstructions center='center' instructions="Click a step below to reveal its explanation and add scenes. Use the explanation as guideline to develop scenes."/>
                            : null
                    }
                    

                      
                    <View style={{height: 'max-content', marginTop: 'auto', width: '100%'}}>
                        {<View style={styles.tools}>
                            <SceneSearch handleSearchUpdate={context.handleSearchUpdate} currentProj={context.currentProj} currentAct={this.state.currentAct} currentStep={this.state.currentStep}/>
                            
                            {
                                context.sharedProjClicked === true 
                                    ? context.isEpisode === true
                                        ?  context.sharedEpisodes.find(proj => proj.episode_title === context.currentProj).permission === 'Can Edit'
                                                ?   <View style={{flexDirection: 'row'}}>
                                                        <AddSceneButton currentAct={this.state.currentAct}/>
                                                        <FontAwesomeIcon onClick={context.deleteSceneMode} style={{alignSelf: 'center', marginLeft: 20}} icon={faTrash} className='fa-lg iconHover' color='white'/>     
                                                    </View>
                                                : null
                                        :  context.sharedProjects.find(proj => proj.title === context.currentProj).permission === 'Can Edit'
                                                ?   <View style={{flexDirection: 'row'}}>
                                                        <AddSceneButton currentAct={this.state.currentAct}/>
                                                        <FontAwesomeIcon onClick={context.deleteSceneMode} style={{alignSelf: 'center', marginLeft: 20}} icon={faTrash} className='fa-lg iconHover' color='white'/>     
                                                    </View>
                                                : null
                                    :   <View style={{flexDirection: 'row'}}>
                                            <AddSceneButton currentAct={this.state.currentAct}/>
                                            <FontAwesomeIcon onClick={context.deleteSceneMode} style={{alignSelf: 'center', marginLeft: 20}} icon={faTrash} className='fa-lg iconHover' color='white'/>     
                                        </View>
                                
    
                            }
                        </View>}

                        <View style={styles.stepsContainer}>
                            {
                                this.state.steps !== undefined
                                    ? this.state.steps.map(step => 
                                        <Step key={step.step_name} stepName={step.step_name} act={this.state.act} currentStep={this.state.currentStep} handleStepClick={step.act === '1' ? this.state.handleActOneStepClick : step.act === '2' ? this.state.handleActTwoStepClick : step.act === '3' ? this.state.handleActThreeStepClick : null}/>
                                    )
                                    : null
                            }
                        </View>
                    </View>

                        
                    

                </View>
            
            )}
            
            </WritualContext.Consumer>
        )
    }

}