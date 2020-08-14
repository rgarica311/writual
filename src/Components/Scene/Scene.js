import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, TextInput } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import WritualContext from '../../WritualContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faMinus } from '@fortawesome/free-solid-svg-icons';
import colorSwatches from '../../colorSwatches'
import { config } from '../../URLS'

const url = config.API_URL

const { princetonOrange, yankeesBlue } = colorSwatches

const styles = StyleSheet.create({
    container: {
        minWidth: 340,
        width: '30%',
        height: 185,
        boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
        elevation: 2,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: 'space-evenly',
        marginBottom: 10
        //alignItems: 'center',
        //marginLeft: '.5%',
        //marginRight: '.5%'
    },

    text: {
        minWidth: 270, 
        maxWidth: 350,
    },

    bold: {
        fontWeight: 'bold',
    },

    btnsContainer: {
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignSelf: 'center'
    },

    button: {
        width: '45%',
        backgroundColor: yankeesBlue,
        borderColor: princetonOrange,
        borderWidth: 1,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },

    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },

    errorText: {
        fontFamily: "Varela Round", 
        fontSize: 12,
        color: princetonOrange
    }
})
export default function Scene(props) {
    const [sceneHeading, setSceneHeading] = useState('')
    const [charLengthError_SH, setCharLengthError_SH] = useState(false)
    const [thesis, setThesis] = useState('')
    const [charLengthError_T, setCharLengthError_T] = useState(false)
    const [antithesis, setAntithesis] = useState('')
    const [charLengthError_AT, setCharLengthError_AT] = useState(false)
    const [synthesis, setSynthesis] = useState('')
    const [charLengthError_S, setCharLengthError_S] = useState(false)
    const context = useContext(WritualContext)

    const handleReset = () => {
        setSceneHeading('')
        setThesis('')
        setAntithesis('')
        setSynthesis('')
    }

    const deleteScene = async (scene_id) => {
        try {
            fetch(`${url}/scenes/${scene_id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': await props.getAuthToken()
                }
            }).then(() => {
                props.getProjectScenes(context.current_project_id, false, context.episode_id)
            })
        } catch(error) {
            console.error('error', error)
        }
    }
     const handleSetSceneHeading = (text) => {
        setSceneHeading(text)
        if(text.length > 150) {
            setCharLengthError_SH(true)
        } else {
            setCharLengthError_SH(false)
        }
    }
     const handleSetThesis = (text) => {
        setThesis(text)
        if(text.length > 150) {
            setCharLengthError_T(true)
        } else {
            setCharLengthError_T(false)
        }
    }

     const handleSetAntithesis = (text) => {
        setAntithesis(text)
        if(text.length > 150) {
            setCharLengthError_AT(true)
        } else {
            setCharLengthError_AT(false)
        }
    }

    const handleSetSynthesis = (text) => {
        setSynthesis(text)
        if(text.length > 150) {
            setCharLengthError_S(true)
        } else {
            setCharLengthError_S(false)
        }
    }

    //console.log(`debug currentStep Scene component props.currentStep ${props.currentStep}`)

    return(

        <View style={styles.container}>
            {
                props.newScene !== undefined
                    ? <FontAwesomeIcon onClick={e => props.closeAddScene()} style={{right: -10, top: -10, position:'absolute'}} icon={faTimesCircle} className='fa-lg iconHover' color='#15273D'/>

                    : props.deleteScenes === true
                        ? <FontAwesomeIcon onClick={e => deleteScene(props.scene_id)} style={{right: 5, top: 0, position:'absolute'}} icon={faMinus} className='fa-lg iconHover' color='#15273D'/>
                        : null
            }
            
           
            {
                props.newScene !== undefined 
                    ? <TextInput placeholder='Scene Heading' style={{ alignSelf: 'center', width: '100%', backgroundColor:'lightgrey', padding: 5, borderRadius: 2}} value={sceneHeading} onChange={e => handleSetSceneHeading(e.target.value)} />
                    : <Text style={styles.text}><Text style={styles.bold}>Scene Heading: </Text>{props.heading}</Text>
            }
            {
                props.newScene !== undefined 
                    ? <TextInput placeholder='Thesis: The goal of the main character in the scene' style={{alignSelf: 'center', width: '100%', backgroundColor:'lightgrey', padding: 5, borderRadius: 2}} value={thesis} onChange={e => handleSetThesis(e.target.value)} />
                    : <Text style={styles.text}><Text style={styles.bold}>Thesis: </Text> {props.thesis}</Text>
            }
            {
                props.newScene !== undefined 
                    ? <TextInput placeholder='Antithesis: The obstacle(s) to completing that goal' style={{alignSelf: 'center', width: '100%', backgroundColor:'lightgrey', padding: 5, borderRadius: 2}} value={antithesis} onChange={e => handleSetAntithesis(e.target.value)} />
                    : <Text style={styles.text}><Text style={styles.bold}>Antithesis: </Text> {props.antithesis}</Text>
            }
            {
                props.newScene !== undefined 
                    ? <TextInput placeholder='Synthesis: How the scene resolves' style={{alignSelf: 'center', width: '100%', backgroundColor:'lightgrey', padding: 5, borderRadius: 2}} value={synthesis} onChange={e => handleSetSynthesis(e.target.value)} />
                    : <Text style={styles.text}><Text style={styles.bold}>Synthesis: </Text> {props.synthesis}</Text>
            }
            {
                props.newScene !== undefined
                    ?   <View style={styles.btnsContainer}>
                            <TouchableHighlight disabled={charLengthError_SH === true
                                                            ? true
                                                            : charLengthError_T === true
                                                                ? true
                                                                : charLengthError_AT === true 
                                                                    ? true
                                                                    : charLengthError_S === true
                                                                        ? true
                                                                        : false } style={styles.button} onPress={e => context.handleAddSceneSubmit(context.currentProj, props.currentAct, props.currentStep, context.sharedProjClicked, sceneHeading, thesis, antithesis, synthesis)}>
                                <Text style={styles.buttonText}>SUBMIT</Text>
                            </TouchableHighlight>

                            <TouchableHighlight style={styles.button} onPress={handleReset}>
                                <Text style={styles.buttonText}>RESET</Text>
                            </TouchableHighlight>
                        </View>
                    :   null
                 
            }
            {
                charLengthError_SH === true 
                    ? <Text style={styles.errorText}>Scene Heading length exceeded. Maximum input 150 characters.</Text>
                    : null

            }
            {
                charLengthError_T === true 
                    ? <Text style={styles.errorText}>Thesis length exceeded. Maximum input 150 characters.</Text>
                    : null

            }
            {
                charLengthError_AT === true 
                    ? <Text style={styles.errorText}>Antithesis length exceeded. Maximum input 150 characters.</Text>
                    : null

            }
            {
                charLengthError_S === true 
                    ? <Text style={styles.errorText}>Synthesis length exceeded. Maximum input 150 characters.</Text>
                    : null

            }
        
           
        </View>
        

    )
}