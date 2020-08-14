import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import WritualContext from '../../WritualContext';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class AddScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: props.history
    };
  }

  render() {
    const styles = StyleSheet.create({
      formContainer: {
        width: wp('45%'),
        left: 0,
        right: 0,
        marginLeft: 'auto', 
        marginRight: 'auto',
        top: 20,
        
      },

      outlineGen: {
        padding: 5,
        width: wp('40%'),
        height: hp('10%'),
        backgroundColor: 'black',
        fontFamily: 'Raleway', 
        fontSize: 22, 
        fontWeight: 'bold',
        color: 'white',      
        borderTopLeftRadius: 5, 
        borderTopRightRadius: 5, 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',


      }, 

      storyForm: {
        width: wp('40%'),
        height: 'max-content',
        padding: 10,
        backgroundColor: 'white',
        border: 5,
        borderBottomLeftRadius: 5, 
        borderBottomRightRadius: 5, 
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',

      },

      formSection: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15,
        justifyContent: 'space-evenly',
        alignItems: 'center'
      },

      buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: wp('40%')
      },

      button: {
        width: wp('18%'),
        height: hp('8%'),
        backgroundColor: '#EDEDED',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
      },

      textInput: {
        backgroundColor: '#EDEDED',
        height: hp('8%'),
        width: wp('15%'),
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        padding: 5,
      },
      
      picker: {
        borderRadius: 'none',
      },

      text: {
        color: 'white'
      },

      buttonText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
      },

      btnsContainer: {
          flexDirection: 'row',
          width: wp('40%'),
          justifyContent: 'space-evenly'
      }
    })
    return (
      <WritualContext.Consumer>
        {(context) => (
          
        <View style={styles.formContainer}>
          
            <Text style={styles.outlineGen}>Add Scene</Text>

            <View style={styles.storyForm}>

                <View style={{flexDirection: 'row', width: wp('40%'), height: hp('40%'), flexWrap: 'wrap', backgroundColor: 'red'}}>

                    <View style={styles.formSection}>
                        {/*<FontAwesomeIcon color='#454545' size='lg' icon={faICursor}/>*/}
                        <Text>Scene Heading:</Text>
                        <TextInput placeholder='eg. EXT. House - Night' 
                                    style={styles.textInput} 
                                    required 
                                    value={context.charName.value}
                                    onChange={e => context.handleUpdateCharName(e)}></TextInput>
                    
                    </View>

                    <View style={styles.formSection}>
                        {/*<FontAwesomeIcon color='#454545' size='lg' icon={faKeyboard}/>*/}
                        <Text>Thesis:</Text>
                        <TextInput placeholder='Main objective of the scene' style={styles.textInput}  required value={context.charAge.value} onChange={e => context.handleUpdateCharAge(e)}></TextInput>
                    </View>

                    <View style={styles.formSection}>
                        {/*<FontAwesomeIcon color='#454545' size='lg' icon={faDollarSign}/>*/}
                        <Text>Antithesis:</Text>
                        <TextInput placeholder='Obstacles in the way' style={styles.textInput} required 
                        onChange={e => context.handleUpdateCharGender(e)}
                        type='text' name='logline'></TextInput>
                    </View>

                    <View style={styles.formSection}>
                        {/*<FontAwesomeIcon color='#454545' size='lg' icon={faDollarSign}/>*/}
                        <Text>Synthesis:</Text>
                        <TextInput placeholder='Resolution of the scene' style={styles.textInput} required 
                        onChange={e => context.handleUpdateCharGender(e)}
                        type='text' name='logline'></TextInput>
                    </View>

                </View>

                <View style={styles.btnsContainer}>

                    <TouchableHighlight style={styles.button} onPress={context.handleAddCharFormSubmit}>
                    <View>
                        <Text style={styles.buttonText}>SUBMIT</Text>
                    </View>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.button} onPress={context.handleAddCharFormReset}>
                    <View>
                        <Text style={styles.buttonText}>RESET</Text>
                    </View>
                    </TouchableHighlight>
                
                </View>
             

            </View>
        </View>
    
        )}
      </WritualContext.Consumer>
    )
      
  
}
}