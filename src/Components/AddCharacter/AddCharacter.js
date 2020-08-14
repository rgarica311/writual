import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import WritualContext from '../../WritualContext';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignature, faTimesCircle, faInfinity, faIdCard, faKeyboard } from '@fortawesome/free-solid-svg-icons';
import colorSwatches from '../../colorSwatches'

const { yaleBlue, yankeesBlue, princetonOrange} = colorSwatches

export default class AddCharacter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: this.props.history,
      windowWidth: this.props.windowWidth,
      windowHeight: this.props.windowHeight
    };
  }

  render() {
    const styles = StyleSheet.create({
      formContainer: {
        width: '30%',
        left: 0,
        right: 0,
        marginLeft: 'auto', 
        marginRight: 'auto',
        //top: 20,
        backgroundColor: 'white',
        justifyContent: 'center'
        
      },

      blocker: {
        alignItems: 'center', 
        justifyContent: 'center', 
        right: 0, 
        position: 'absolute',
        width: this.state.windowWidth, 
        height: this.state.windowHeight, 
        backgroundColor: 'rgba(0,0,0,0.75)'
      },

      outlineGen: {
        padding: 5,
        width: '100%',
        height: 115,
        backgroundColor:  yankeesBlue,
        fontFamily: 'Raleway', 
        fontSize: 22, 
        fontWeight: 'bold',
        borderTopLeftRadius: 5, 
        borderTopRightRadius: 5, 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
      }, 

      newCharHeader: {
        fontFamily: 'Raleway', 
        fontSize: 22, 
        fontWeight: 'bold',
        color: princetonOrange,  
        alignSelf: 'center'
      },

      storyForm: {
        width: '100%',
        height: 'max-content',
        backgroundColor: 'white',
        
        borderBottomLeftRadius: 5, 
        borderBottomRightRadius: 5, 
        justifyContent: 'center',
        alignItems: 'center'

      },

      formSection: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
       
      },

      button: {
        width: '45%',
        height: 80,
        backgroundColor: yankeesBlue,
        borderWidth: 1, 
        borderColor: princetonOrange,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
      },

      textInput: {
        backgroundColor: '#EDEDED',
        height: 110,
        width: '90%',
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
          width: '100%',
          justifyContent: 'space-between',
      }
    })
    return (
      <WritualContext.Consumer>
        {(context) => (
          <View style={styles.blocker}>
            <View style={styles.formContainer}>
              <View style={styles.outlineGen}>
                <FontAwesomeIcon onClick={context.closeAddChar} style={{alignSelf: 'flex-end', bottom: 80, position: 'absolute'}} color='white' className='fa-lg iconHover' icon={faTimesCircle}/> 
                <Text style={styles.newCharHeader}>Add Character</Text>
              </View>
              <View style={{padding: 15}}>
                <View style={styles.storyForm}>
                  <View style={styles.formSection}>
                    <FontAwesomeIcon color='#454545' size='lg' icon={faSignature}/>
                    <TextInput placeholder='Character Name' 
                                style={styles.textInput} 
                                required 
                                value={context.charName.value}
                                onChange={e => context.handleUpdateCharName(e)}></TextInput>
                  
                  </View>

                  <View style={styles.formSection}>
                    <FontAwesomeIcon color='#454545' size='lg' icon={faIdCard}/>
                    <TextInput placeholder='Age' style={styles.textInput} required value={context.charAge.value} onChange={e => context.handleUpdateCharAge(e)}></TextInput>
                  </View>

                  <View style={styles.formSection}>
                    <FontAwesomeIcon color='#454545' size='lg' icon={faInfinity}/>
                    <TextInput placeholder='Gender' style={styles.textInput} required 
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
          </View>
    
        )}
      </WritualContext.Consumer>
    )
      
  
}
}