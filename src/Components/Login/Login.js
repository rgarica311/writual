import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import GoogleButton from 'react-google-button/dist/react-google-button'
import WritualContext from '../../WritualContext'
import colorSwaches from '../../colorSwatches'

const { oldLace } = colorSwaches

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
            const styles = StyleSheet.create({
                loginContainer: {
                    backgroundColor: 'white',
                    height: 460,
                    width: 800,
                    borderRadius: 5,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    marginLeft: 'auto', 
                    marginRight: 'auto'

                },

                writual: {
                    fontFamily: 'Courier',
                    fontWeight: 'bold',
                    fontSize: 20,
                    textAlign: "center",
                },

                image: {
                    width: 100,
                    height: 100,
                    backgroundSize: 'cover',
                },

                authContainerLogin: {
                    backgroundColor: "white",
                    height: 460,
                    width: 800,
                    borderRadius: 5,
                    minHeight: 285, 
                    //position: 'absolute',
                    left: 0,
                    right: 0,
                    alignSelf: 'center',
                    margin: 'auto',
                    top: 0,
                    bottom: 0,
                    zIndex: 1, 
                    elevetion: 2,
                    filter: "drop-shadow(0 0 .25rem grey)",
                    

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

                


    
            })
        return(
            <WritualContext.Consumer>
            {(context) => (
                <View style={styles.authContainerLogin}>
                    <View style={{ height: "100%", padding: 5, justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <Text style={styles.writual}>Writual Login</Text>
                        <Image style={styles.image} source={require('../../Assets/logo.png')}/>
                        {
                            Platform.OS !== 'web'
                                ? <Text style={styles.writual}>For now, Writual is best experienced on a laptop or desktop. Native iOS and Android apps are on the way!</Text>
                                : <GoogleButton onClick={e => context.handleGoogleLogin(this.state.history)}/>
                        }
                        
                    </View>
                </View>  
            )}
            </WritualContext.Consumer>
            
        )
    }
}