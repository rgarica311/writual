import React, { Component } from 'react';
import WritualContext from '../../WritualContext';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import WebIcons from '../WebIcons/WebIcons'



export default class LandingPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      history: props.history
    }
  }
  render(){
    const styles = StyleSheet.create({
      container: {
        width: Platform.OS === 'web' ? wp('60%') : wp('100%'),
        height: Platform.OS === 'web' ? '400px' : hp('50%'),
        flexDirection: 'row',
        postion: 'absolute',
        left: 0,
        right: 0,
        top: 80,
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center'
      },

      leftTextContainer: {
        width: Platform.OS === 'web' ? '400px' : wp('100%'),
        height: Platform.OS === 'web' ? '400px' : hp('100%'),
        position: 'absolute',
        zIndex: 1,
        marginLeft: 30,
        padding: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#454545'
       
      },

      leftText: {
        lineHeight: Platform.OS === 'web' ? '3em' : 40,
        color: 'white', 

      },

      rightSignUp: {
        backgroundColor: '#808080', 
        width: wp('60%'), 
        height: Platform.OS === 'web' ? '300px' : hp('50%'),
        flexDirection: 'row',
        justifyContent: 'flex-end'
        
      },

      form: {
        marginRight: 10,
        height: Platform.OS === 'web' ? '300px' : hp('50%'),
        width: Platform.OS === 'web' ? '50%' : wp('50%'),
        padding: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center'
      },

      input: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        width: wp('20%')
      },

      orange: {
        color: 'orange'
      }, 

      button: {
        
        backgroundColor: 'lightgrey',
        borderRaidus: 5,
        height: hp('8%'),
        width: wp('20%'),
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        ':hover': {
            npmcursor: 'pointer'
        }
      },

      buttonText: {
        color: 'white',
        fontSize: 20
      }


    })
    return (
      <WritualContext.Consumer>
        {(context) => (
          <View style={styles.container}>
            <View style={styles.leftTextContainer}>
              <Text style={{color: 'white', }}>Join the Writual Beta</Text>
              <Text style={styles.leftText}>
                We are bulding a platform to help screenwriters take control of organzing the story development process. 
                <Text style={styles.orange}> Sign up to gain early access.</Text>
              </Text>
              <View style={{algnSelf: 'flex-end'}}>
                <WebIcons />
              </View>
            </View>
            <View style={styles.rightSignUp}>
              <View style={styles.form}>
                <Text style={{color: 'white'}}>Beta Coming Soon!</Text>
                <TextInput placeholderTextColor='lightgrey' placeholder='First Name' style={styles.input}/>
                <TextInput placeholderTextColor='lightgrey' placeholder='Last Name' style={styles.input}/>
                <TextInput placeholderTextColor='lightgrey' placeholder='Email' style={styles.input}/>
                <View accessibilityRole='button' style={styles.button}>
                  <Text style={styles.buttonText}>Submit</Text>
                </View>
              </View>
             
            </View>

          </View>
        )}
    </WritualContext.Consumer>
    )
  }

}
