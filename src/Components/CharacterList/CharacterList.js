import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet, TouchableHighlight } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import WritualContext from '../../WritualContext'
import './CharacterList.css'
import colorSwatches from '../../colorSwatches'

const { darkGunMetal, princetonOrange } = colorSwatches

export default class Characters extends Component {
    constructor(props){
        super(props)
        this.state = {
            characters: this.props.characters,
            deleteMode: false,
            windowWidth: this.props.windowWidth
        }
    }

    deleteMode = () => {
        this.setState({
            deleteMode: !this.state.deleteMode
        })
    }

    render(){
        //console.log(`char window with ${this.state.windowWidth}`)
        const styles = StyleSheet.create({
            charListContainer: {
                //width: this.state.windowWidth <= 1280 ? '25%' : '20%',
                flex: 1,
                backgroundColor: darkGunMetal,
                height: '100%',
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
                overflowY: 'scroll',
                //justifyContent: 'center',
                //marginRight: 'auto'
            },

             charContainer: {
                flexDirection: 'row', 
                justifyContent: 'center', 
                borderBottomWidth: 1,
            },

            char: {
                backgroundColor: darkGunMetal,
                paddingTop: 15,
                paddingBottom: 15,
                flexDirection: 'row',
                alignItems: 'center', 
                borderBottomColor: 'black',
                flex: 1,
            },

            charText: {
                fontWeight: 'bold',
                borderBottomColor: 'white',
                color: 'white',
                fontFamily: 'Roboto Slab',
            },

             activeText: {
                fontWeight: 'bold',
                borderBottomColor: 'white',
                color: princetonOrange,
                fontFamily: 'Roboto Slab',

            },

            flexRow: {
                flexDirection: 'row',
            },

            newChar: {
                flexDirection: 'row', 
                height: Platform.OS === 'web' ? hp('10%') : 55,
                alignItems: 'center',
                padding: 15,
            },

        })
        return(
            <WritualContext.Consumer>
                {(context) => (
                    context.currentProj !== undefined
                    ?   <View style={styles.charListContainer}>
                            {
                               
                                    <View style={styles.newChar}>
                                            <Text style={{marginRight: 15, fontWeight: 'bold', color: 'white'}}>CHARACTERS</Text>
                                            {
                                                context.sharedProjClicked === true
                                                    ? context.sharedProjects.find(proj => proj.title === context.currentProj) !== undefined 
                                                        ? context.sharedProjects.find(proj => proj.title === context.currentProj).permission === 'Can Edit'
                                                            ?   <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                                                                    <FontAwesomeIcon color='white' style={{marginRight: 15}} onClick={e => context.addChar(e)} className='fa-sm' icon={faPlus}/>
                                                                    <FontAwesomeIcon onClick={e => this.deleteMode()} icon={faTrash} className='fa-lm' color='white'/>
                                                                </View>
                                                            : null
                                                        : null
                                                    : <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                                                        <FontAwesomeIcon color='white' style={{marginRight: 15}} onClick={e => context.addChar(e)} className='fa-sm' icon={faPlus}/>
                                                        <FontAwesomeIcon onClick={e => this.deleteMode()} icon={faTrash} className='fa-lm' color='white'/>
                                                    </View>
                                            }
                                            
                                    </View>
 
                                    
                            }

                            {
                                    context.projCharacters !== undefined
                                    ? context.projCharacters.map(obj =>
                                        <TouchableHighlight style={styles.charContainer} key={obj.name} onPress={e => context.onCharacterClick(obj.name)}>
                                            <View pointerEvents='auto' accessibilityRole='button' style={styles.char}>
                                                {
                                                    this.state.deleteMode === false
                                                        ?   null

                                                        :   <FontAwesomeIcon onClick={e => context.deleteChar(e, obj.id)} style={{marginLeft: 15, marginRight: 15}} icon={faMinus} className='fa-lg charIcon' color='white'/>

                                                }
                                                <View style={{flexDirection: 'column', marginLeft: 15}}>
                                                    <Text style={context.currentChar === obj.name ? styles.activeText : styles.charText}>{obj.name}</Text>
                                                    <View style={styles.flexRow}>
                                                        <Text style={context.currentChar === obj.name ? styles.activeText : styles.charText}>{obj.gender} </Text>
                                                        <Text style={context.currentChar === obj.name ? styles.activeText : styles.charText}>{obj.age}</Text>                                        
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableHighlight>
                                    )
                                    : <TouchableHighlight>
                                            <View pointerEvents='auto' accessibilityRole='button' style={styles.newChar}>
                                                <FontAwesomeIcon color='white' onClick={e => context.addChar(e)} className='fa-lg charIcon' icon={faPlus}/>
                                                <Text style={{marginLeft: 15, color: 'white'}}>Add Character</Text>
                                            </View>
                                    </TouchableHighlight>
                            }
                    
            
                        </View>
                : <Text style={{margin: 'auto', fontSize: 22, fontFamily:'Coustard'}}>No project selected, Select project to view characters.</Text>
                )}
            </WritualContext.Consumer>
           
        )
    }
}

