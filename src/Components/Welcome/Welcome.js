import React from 'react';
import { View, StyleSheet, Text, Image} from 'react-native'
import colorSwatches from '../../colorSwatches'
import { faQuestion, faCog, faFileAlt, faICursor, faTheaterMasks, faFilm } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Welcome.css'

const { yaleBlue, yankeesBlue, princetonOrange } = colorSwatches

const styles = StyleSheet.create({
    container: {
        width: '90%',
        minWidth: 760,
        height: "calc(100% - 80px)",
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        aligItems: 'space-between',
        paddingTop: 30,
        paddingLeft: 50,
        paddingRight: 50
    },

    innerContainer: {
        padding: 20,
        height: '100%',
        overflowY: 'auto',
        display: 'block',

    },

    header: {
        marginBottom: 5,
        height: '32%',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        display: 'flex',
        padding: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center'

        
    },

    text: {
        fontWeight: '300',
        fontSize: 25,
        color: "white",
        fontFamily: 'Montserrat',
        display: "flex",
        alignItems: 'center',
        width: 'max-content'

    },

    welcome: {
        fontFamily: 'Courier',
        fontSize: 25,
        color: princetonOrange
    },

    centerText: {
        width: '100%',
        height: '5%',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        fontFamily: "Courier",
        color: princetonOrange,
        fontSize: "1.5em"

    },

    instructions: {
        padding: 20,
        justifyContent:'center',
    },

    bullet: {
       marginBottom: 15,
       fontWeight: 'bold',
       fontSize: 16,
       color: 'white',
       textAlign: 'center',
       paddingBottom: 15,
       fontFamily: "Varela Round",

    }, 

    bulletBorder: {
       marginBottom: 15,
       fontWeight: 'bold',
       fontSize: 16,
       color: 'white',
       textAlign: 'center',
       borderBottomWidth: 1,
       borderBottomColor: "white",
       paddingBottom: 15,
       fontFamily: 'Varela Round',

    }, 


    detail: {
        backgroundImage: "linear-gradient(45deg, rgba(250,121,33,1) 0%, rgba(114,98,249,1) 100%)",
        borderRadius: 5,
        borderColor: princetonOrange,
        borderWidth: 1,
        filter: "drop-shadow(0 0 .26rem grey)",
        width: 350,
        height: 465,
    }, 

    howToUse: {
        backgroundImage: "linear-gradient(357deg, rgba(250,121,33,1) 0%, rgba(255,146,126,1) 53%)",
        borderRadius: 5,
        filter: "drop-shadow(0 0 .26rem grey)",
        width: 350,
        height: 465,
    },

    detailBlueOrange: {
        backgroundImage: "linear-gradient(45deg, rgba(52,139,246,1) 0%, rgba(254,121,31,1) 100%)",
        borderRadius: 5,
        filter: "drop-shadow(0 0 .26rem grey)",
        width: 350,
        height: 465,
    },

    whyWritual: {
        backgroundImage: "linear-gradient(353deg, rgba(16,49,74,1) 0%, rgba(61,90,128,1) 100%)",
        borderRadius: 5,
        filter: "drop-shadow(0 0 .26rem grey)",
        width: 350,
        height: 465,
    },
    
    projectList: {
        backgroundImage: "linear-gradient(353deg, rgba(16,49,74,1) 0%, rgba(61,90,128,1) 100%);",
        borderRadius: 5,
        filter: "drop-shadow(0 0 .26rem grey)",
        width: 350,
        height: 465,
    },

    scenes: {
        backgroundImage: "linear-gradient(353deg, rgba(16,49,74,1) 0%, rgba(61,90,128,1) 100%);",
        borderRadius: 5,
        filter: "drop-shadow(0 0 .26rem grey)",
        width: 350,
        height: 465,
    },

    treatment: {
        backgroundImage: "linear-gradient(357deg, rgba(250,121,33,1) 0%, rgba(255,146,126,1) 53%)",
        borderRadius: 5,
        filter: "drop-shadow(0 0 .26rem grey)",
        width: 350,
        height: 465,
    },

    characters: {
        backgroundImage: "linear-gradient(357deg, rgba(250,121,33,1) 0%, rgba(255,146,126,1) 53%)",
        borderRadius: 5,
        filter: "drop-shadow(0 0 .26rem grey)",
        width: 350,
        height: 465,
    },


    
    image: {
        width: '10%',
    }

    


})

export default function Welcome(prop) {
    return (            
            <View style={styles.container}>
                
                <View style={styles.whyWritual}>
                    <View style={styles.header}>
                        <View style={{width: "10%", justifyContent:'center', alignItems: "center"}}>
                            <FontAwesomeIcon icon={faQuestion} className='fa-3x' color="white"/>
                        </View>
                        <Text style={styles.text}>Why Writual</Text>
                    </View>
                    <View style={styles.instructions}>
                        <Text style={styles.bulletBorder}>Nail the structure of your story</Text>
                        <Text style={styles.bulletBorder}>Organize your development process</Text>
                        <Text style={styles.bulletBorder}>Keep track of story premises</Text>
                        <Text style={styles.bullet}>Collaborate and get feedback</Text>
                    </View>
                </View>
                <View style={styles.howToUse}>
                <View style={styles.header}>
                    <View style={{width: "10%", justifyContent:'center', alignItems: "center"}}>
                        <FontAwesomeIcon icon={faCog} className='fa-3x' color="white"/>
                    </View>
                    <Text style={styles.text}>How To Use</Text>
                    
                </View>
                    <View style={styles.instructions}>
                        <Text style={styles.bulletBorder}>Create a Film or Telvision project</Text>
                        <Text style={styles.bulletBorder}>Choose a stucture to use as a guide</Text>
                        <Text style={styles.bulletBorder}>Add Characters, Scenes</Text>
                        <Text style={styles.bulletBorder}>Write a Treatment</Text>
                        <Text style={styles.bulletBorder}>Share your project to get feedback</Text>
                        <Text style={styles.bullet}>Chat with collaborators</Text>
                    </View>
                </View>
                <View style={styles.projectList}>
                <View style={styles.header}>
                    <View style={{width: "10%", justifyContent:'center', alignItems: "center"}}>
                        <FontAwesomeIcon icon={faFileAlt} className='fa-3x' color="white"/>
                    </View>
                    <Text style={styles.text}>Project List</Text>
                    
                    </View>
                    <View style={styles.instructions}>
                        <Text style={styles.bulletBorder}>Click the plus sign to add a project</Text>
                        <Text style={styles.bulletBorder}>Collapse and expand projects</Text>
                        <Text style={styles.bulletBorder}>Click eye to reveal hidden projects</Text>
                        <Text style={styles.bullet}>Click menu Icon to reveal actions</Text>
                    </View>
                </View>
                <View style={styles.characters}>
                     <View style={styles.header}>
                     <View style={{width: "10%", justifyContent:'center', alignItems: "center"}}>
                    <FontAwesomeIcon icon={faTheaterMasks} className='fa-3x' color="white"/>
                    </View>
                    <Text style={styles.text}>Characters</Text>
                    
                    </View>
                    <View style={styles.instructions}>
                        <Text style={styles.bulletBorder}>Click the plus sign to add a character</Text>
                        <Text style={styles.bulletBorder}>Click the trash can to delete characters</Text>
                        <Text style={styles.bulletBorder}>Write a character biography</Text>
                        <Text style={styles.bulletBorder}>Develop the characters wants</Text>
                        <Text style={styles.bullet}>Develop the characters needs</Text>
                    </View>
                </View>
                <View style={styles.scenes}>
                <View style={styles.header}>
                    <View style={{width: "10%", justifyContent:'center', alignItems: "center"}}>
                        <FontAwesomeIcon icon={faFilm} className='fa-3x' color="white"/>
                    </View>
                    <Text style={styles.text}>Scenes</Text>
                    
                    </View>
                    <View style={styles.instructions}>
                        <Text style={styles.bulletBorder}>Click on a step to reveal its guidelines</Text>
                        <Text style={styles.bulletBorder}>Click Add Scene to add a new scene card</Text>
                        <Text style={styles.bulletBorder}>Click the trash can to delete scenes</Text>
                        <Text style={styles.bullet}>Use the search bar to find scenes</Text>
                    </View>
                </View>
                <View style={styles.treatment}>
                <View style={styles.header}>
                    <View style={{width: "10%", justifyContent:'center', alignItems: "center"}}>
                        <FontAwesomeIcon style={{alignSelf: 'center'}} icon={faICursor} className='fa-3x' color="white"/>
                    </View>
                    <Text style={styles.text}>Treatment</Text>
                    
                    </View>
                    <View style={styles.instructions}>
                        <Text style={styles.bulletBorder}>Write a summary of your story here</Text>
                        <Text style={styles.bullet}>Basic text editor features available</Text>
                    </View>
                </View>
            </View>
           
        
    )
}