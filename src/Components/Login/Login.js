import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import GoogleButton from 'react-google-button/dist/react-google-button'
import WritualContext from '../../WritualContext'
import colorSwaches from '../../colorSwatches'
import { faQuestion, faCog, faFileAlt, faICursor, faTheaterMasks, faFilm, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  isMobile
} from "react-device-detect";


const { whiteSmoke } = colorSwaches

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            history: this.props.history,
            
        
        }
    }

    componentDidMount() {
        if(localStorage.getItem('logged_in')){
            this.state.history.push('/writual')
        }
    }
    render(){
            console.log(`platform detected: ${Platform.OS}`)
            const styles = StyleSheet.create({
                loginContainer: {
                    height: "80%",
                    width: isMobile ? "100%" : "auto",
                    display: "flex",
                    justifyContent: 'space-evenly',
                    padding: isMobile ? 5 : 0,
                },

                writual: {
                    fontFamily: 'Courier',
                    fontWeight: 'bold',
                    fontSize: 20,
                    textAlign: "center",
                },

                logo: {
                    width: 55,
                    height: 55,
                    marginTop: 10,
                    marginLeft: 10,
                    alignSelf: "flex-start"

                },

                typewriterAbove: {
                    height: 654,
                    //width: "80%",
                    display: isMobile ? "none" : "block",
                    
                },

                laptopContainer: {
                    width: "100%",
                    height: 719,
                    display: isMobile ? "none" : "block",
                    justifyContent: "center",
                    backgroundColor: isMobile ? "white" : whiteSmoke,
                    
                },

                authContainerLogin: {
                    
                    height: isMobile ? hp('100%') : "100%",
                    width: isMobile ? wp('100%') : "100%",
                    //justifyContent: "center",
                    alignItems: "center",
                                    
                },

                authContainerSignOut: {
                    backgroundColor: "white",
                    width: "15%",
                    height: "40%",
                    borderRadius: 10,
                    position: 'absolute',
                    left: 0,
                    right: 0, 
                    top: 0,
                    bottom: 0,
                    elevation: 2,
                    filter: "drop-shadow(0 0 .25rem grey)",
                    padding: 10,
                    zIndex: 1, 
                    justifyContent: 'space-evenly'
                },

                mainContent: {
                    display: "flex",
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: "center",
                    height: "90%",
                    
                   
                },

                contentDemo: {
                    //position: "absolute",
                    //top: "70%",
                    height: "40%",
                    width: "100%"
                },

                featureItems: {
                    diplay: "flex",
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',

                },

                featureItemContainer: {
                    height: "50%",
                    width: "100%",
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignSelf: 'center',
                    backgroundImage: "linear-gradient(45deg, rgba(52,139,246,1) 0%, rgba(254,121,31,1) 100%)",

            
                },

                featureText: {
                    marginLeft: 10,
                    fontFamily: "Varela Round",
                    fontSize: 18,
                    color: "white"
                },

                writualIs: {
                    fontFamily: "Varela Round",
                    fontWeight: "bold",
                    fontSize: isMobile ? "1em" : "3em"
                },

                writualCan: {
                    fontFamily: "Varela Round",
                    fontWeight: "bold",
                    fontSize: "1.2em"
                },

                demo: {
                    width: "100%",
                    height: 1600,
                    justifyContent: "space-evenly",
                    top: "50%",
                    
                },

                feature: {
                    flexDirection: "row",
                    width: "100%",
                    height: "20%",
                },

                vid: {
                    width: "50%",
                    height: "100%"
                },

                text: {
                    width: "50%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                },

                featureText: {
                    fontSize: 32,
                    fontWeight: "bold",
                    fontFamily: "Varela Round",
                    textAlign: "center"
                },

                gif: {
                    height: "100%"
                },


            


            })
        return(
            <WritualContext.Consumer>
            {(context) => (
                <View style={styles.authContainerLogin}>
                    
                    
                    <View style={styles.laptopContainer} >
                        <Image style={styles.logo} source={require('../../Assets/logo_t.png')}/>
                        <Image style={styles.typewriterAbove} resizeMode='cover' source={require('../../Assets/laptop.png')}/>
                    </View>
                    <View style={styles.contentDemo}>
                        <View style={styles.mainContent}>
                            
                            <View style={styles.loginContainer}>
                                <Text style={styles.writualIs}>Writual is story development made easy</Text>
                                <Text style={styles.writualCan}>Create characters, scenes, treatments, collaborate and get feedback all in one place...</Text>
                            
                                {
                                    isMobile
                                        ? <Text style={styles.writual}>For now, Writual is best experienced on a laptop or desktop. Native iOS and Android apps are on the way!</Text>
                                        : <GoogleButton onClick={e => context.handleGoogleLogin(this.state.history)}/>
                                }
                                
                            </View>


                        </View>
                        <View style={styles.demo}>
                            
                            <View style={styles.feature}>
                                <View style={styles.vid}>
                                    <Image style={styles.gif} source={require('../../Assets/projects.gif')}/>
                                </View>
                                <View style={styles.text}>
                                    <Text style={styles.featureText}>Create Feature, Television, and Short projects</Text>
                                </View>
                            </View>
                            <View style={styles.feature}>
                                <View style={styles.text}>
                                    <Text style={styles.featureText}>Share projects with collaborators and gain meaningful feedback</Text>
                                </View>

                                <View style={styles.vid}>
                                    <Image style={styles.gif} source={require('../../Assets/share.gif')}/>
                                </View>
                                
                            </View>
                            <View style={styles.feature}>
                                <View style={styles.vid}>
                                    <Image style={styles.gif} source={require('../../Assets/scenes.gif')}/>
                                </View>

                                <View style={styles.text}>
                                    <Text style={styles.featureText}>Create scenes with the help of well known story development guidelines</Text>
                                </View>
                                
                            </View>
                            <View style={styles.feature}>
                                 <View style={styles.text}>
                                    <Text style={styles.featureText}>Create treatments in a simple rich text editor</Text>
                                </View>
                                <View style={styles.vid}>
                                    <Image style={styles.gif} source={require('../../Assets/treatments.gif')}/>
                                </View>
                               
                            </View>
                            <View style={styles.feature}>
                                 <View style={styles.vid}>
                                    <Image style={styles.gif} source={require('../../Assets/screenplay.gif')}/>
                                </View>
                                <View style={styles.text}>
                                    <Text style={styles.featureText}>Coming soon: Auto formatting screenplay editor</Text>
                                </View>
                               
                            </View>

                            <View style={{marginTop: 100, marginBottom: 100, height: 150, justifyContent: "space-evenly", alignItems:"center"}}>
                                <GoogleButton onClick={e => context.handleGoogleLogin(this.state.history)}/>
                                <Text style={{fontFamily:"Varela Round", fontSize: 22}}>Give Writual a Try!</Text>
                            </View>
                            
                        </View>
                    </View>
                </View>  
            )}
            </WritualContext.Consumer>
            
        )
    }
}