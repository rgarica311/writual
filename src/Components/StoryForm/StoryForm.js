import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, Picker, Image } from 'react-native';
import WritualContext from '../../WritualContext';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faICursor } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faPenFancy } from '@fortawesome/free-solid-svg-icons';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { faTheaterMasks } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import colorSwatches from '../../colorSwatches'

const { princetonOrange, yankeesBlue } = colorSwatches


export default class StoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: props.history
    };
  }

  render() {
    const styles = StyleSheet.create({
      formContainer: {
        width: "40%",
        left: 0,
        right: 0,
        marginLeft: 'auto', 
        marginRight: 'auto',
        position: 'absolute',
        zIndex: 1
        
      },

      outlineGen: {
        padding: 5,
        width: wp('40%'),
        height: hp('10%'),
        backgroundColor: '#15273D', 
        borderTopLeftRadius: 5, 
        borderTopRightRadius: 5, 
        display: 'flex',
        flexDirection: 'column',
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
        justifyContent: 'space-between'

      },

      formSection: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15,
        width: wp('18%'),
        justifyContent: 'space-between',
        alignItems: 'center'
      },

      buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('40%')
      },

      button: {
        width: wp('18%'),
        height: hp('8%'),
        backgroundColor: yankeesBlue,
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

      newProjHeader: {
        fontFamily: 'Raleway', 
        fontSize: 22, 
        fontWeight: 'bold',
        color: 'white',  
        alignSelf: 'center'   
      },

      errorStyle: {
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5,
        backgroundColor: 'white',
        
        justifyContent: 'center',
        alignItems: 'center'
      },

      errorText: {
        color: princetonOrange,
        fontFamily: 'Coustard',
        fontSize: 18,
        marginLeft: 5
      }


    })
    return (
      <WritualContext.Consumer>
        {(context) => (
          <View style={{ alignItems: 'center', justifyContent: 'center', right: 0, position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.75)'}}>
          
            <View style={styles.formContainer}>
              {
                  context.projectFormError === true 
                      ? <View style={styles.errorStyle}>
                          <Text style={styles.errorText}>
                            { 
                              context.projectFormErrorField !== undefined
                                ? context.projectFormErrorField.map(field => 
                                    field === 'timeperiod' 
                                      ? 'Time Period, '
                                      : field === 'similarprojects'
                                          ? 'Similar Projects, '
                                          : field === 'projformat' 
                                              ? 'Project Format, '
                                              : field.charAt(0).toUpperCase() + field.slice(1) + ', '
                                  )
                                : null
                              
                            }
                            {
                              context.projectFormErrorField !== undefined
                                ? 'is/are required'
                                : `${context.projectFormErrorMsg}`
                            }
                          </Text>
                        </View>
                      : null
              }
            
              <View style={styles.outlineGen}>
                <FontAwesomeIcon onClick={context.addEpisode === true ? context.closeAddEp : context.closeAddProj} style={{alignSelf: 'flex-end'}} color='white' className='fa-lg iconHover' icon={faTimesCircle}/> 
                {
                  context.addEpisode === true
                    ? <Text style={styles.newProjHeader}>New Episode</Text>

                    : <Text style={styles.newProjHeader}>New Project</Text>

                }
              </View>

              <View style={styles.storyForm}>

                <View style={styles.formSection}>
                  <FontAwesomeIcon color='#454545' size='lg' icon={faICursor}/>
                  <TextInput placeholder='Title' style={styles.textInput} required value={context.addEpisode === true ? context.episode_title.value : context.title.value}
                    onChange={ e => context.handleUpdateTitle(e) }
                    type='text' name='title'></TextInput>
                  
                </View>

                <View style={styles.formSection}>
                  <FontAwesomeIcon color='#454545' size='lg' icon={faKeyboard}/>

                  <TextInput placeholder='Logline' style={styles.textInput}  required 
                    onChange={e => context.handleUpdateLogline(e)}
                    type='text' name='logline'></TextInput>
                   
                </View>

                <View style={styles.formSection}>
                  <FontAwesomeIcon color='#454545' size='lg' icon={faDollarSign}/>
                  <TextInput placeholder='Budget' style={styles.textInput} required 
                    onChange={e => context.handleUpdateBudget(e)}
                    type='text' name='logline'></TextInput>
                    
                </View>

                <View style={styles.formSection}>
                  <FontAwesomeIcon color='#454545' size='lg' icon={faCalendarAlt}/>

                  <TextInput placeholder='Time Period' style={styles.textInput} required 
                    onChange={e => context.handleUpdateTimePeriod(e)}
                    type='text' name='logline'></TextInput>
                    
                </View>

                <View style={styles.formSection}>
                  <Image style={{width: '1.125em', height: '1em'}} source={require('../../Assets/tilde.svg')}/>
                  <TextInput placeholder='Similar Projects' style={styles.textInput} required 
                    onChange={e => context.handleUpdateSimilarProjects(e)}
                    ></TextInput>
                    
                </View>

                <View style={styles.formSection}>
                  <FontAwesomeIcon color='#454545' size='lg' icon={faPenFancy}/>
                  <TextInput placeholder='Author' style={styles.textInput}  required value={context.author.value}
                    onChange={e => context.handleUpdateAuthor(e)}
                    type='text' name='author'></TextInput>
                    
                </View>

                {
                  context.addEpisode === true 
                    ? <View style={styles.formSection}>
                        <FontAwesomeIcon color='#454545' size='lg' icon={faFilm}/>
                        <Picker style={styles.textInput} selectedValue={context.bottle_episode.value} onValueChange={context.handleUpdateBottle}>
                          <Picker.Item label='Bottle Episode No' value='Bottle Episode No'/>
                          <Picker.Item label='Bottle Episode Yes' value='Bottle Episode Yes'/>
                        </Picker>
                      </View>
                    : null
                }

                

                <View style={styles.formSection}>
                  <FontAwesomeIcon color='#454545' size='lg' icon={faFilm}/>
                  <Picker style={styles.textInput} selectedValue={context.addEpisode === true ? 'Episode' : context.projformat.value} onValueChange={context.handleUpdateFormat}>
                    <Picker.Item enabled='false' label={context.addEpisode === true ? 'Episode' : 'Select Format'}/>
                    <Picker.Item enabled={context.addEpisode === true ? false : true} label='Feature' value='Feature'/>
                    <Picker.Item enabled={context.addEpisode === true ? false : true} label='Television' value='Television'/>
                    <Picker.Item enabled={context.addEpisode === true ? false : true} label='Short' value='Short'/>
                  </Picker>
                  
                </View>

                <View style={styles.formSection}>
                  <FontAwesomeIcon color='#454545' size='lg' icon={faTheaterMasks}/>
                  <Picker style={styles.textInput} selectedValue={context.genre.value} onValueChange={context.handleUpdateGenre}>
                    <Picker.Item label='Select Genre'/>
                    <Picker.Item label='Action' value='Action'/>
                    <Picker.Item label='Comedy' value='Comedy'/>
                    <Picker.Item label='Drama' value='Drama'/>
                    <Picker.Item label='Horror' value='Horror'/>
                    <Picker.Item label='Documentary' value='Documentary'/>
                    <Picker.Item label='Sciene Fiction' value='Science Fiction'/>
                  </Picker>
                  
                </View>

                <View style={styles.formSection}>
                  <FontAwesomeIcon color='#454545' size='lg' icon={faBook}/>
                  <Picker style={styles.textInput} selectedValue={context.framework.value} onValueChange={context.handleUpdateFramework}>
                    <Picker.Item label='Select Framework'/>
                    <Picker.Item label="The Hero's Journey - Christopher Vogler" value="The Hero's Journey"/>
                    <Picker.Item label='The Anatomy of Story - John Truby' value='The Anatomy of Story'/>
                    <Picker.Item label='Save The Cat - Blake Snyder ' value='Save The Cat'/>
                  </Picker>
                  
                </View>

                 <View style={{flexDirection: 'row', justifyContent: 'space-between', width: "100%"}}>
                    <TouchableHighlight style={styles.button} onPress={context.addEpisode === false ? e => context.handleFormSubmit(e, this.state.history) : e => context.handleEpFormSubmit(e, this.state.history) }>
                      <View>
                        <Text style={styles.buttonText}>SUBMIT</Text>
                      </View>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.button} onPress={e => context.handleFormReset(e)}>
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