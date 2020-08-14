import React, { Component } from 'react'
import { View, StyleSheet, Platform, Text, TouchableHighlight} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import WritualContext from '../../WritualContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus} from '@fortawesome/free-solid-svg-icons';
import colorSwatches from '../../colorSwatches'

const { princetonOrange, yankeesBlue, projectHeader, oldLace} = colorSwatches

export default class CharAttr extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: this.props.title,
            deleteMode: this.props.deleteMode
        }
    }

    render(){

        const styles = StyleSheet.create({
            attr: {
                //height: '10%',
                flex: 1,
                elevation: 2,
                backgroundColor: oldLace,
                alignItems: 'center',
                borderBottomColor: '#393E41',
                borderBottomWidth: 1,
                padding: 5,
                flexDirection: 'row',
                justifyContent: 'space-evenly'
               
            },

            textEditorContainer: {
                width: wp('55%')
            }
        })

        return (
            <WritualContext.Consumer>
            {(context) => (
                
                <View style={styles.attr}>
                    {
                        this.state.deleteMode === true 
                            ? <FontAwesomeIcon icon={faMinus} className='fa-sm' color='#15273D'/>

                            : null
                    }
                    <TouchableHighlight onClick={e => context.onAttributeClick(this.state.title)}>
                            <Text style={{fontSize: 14, alignSelf: 'center', fontFamily:'Montserrat', fontWeight:'800', color: context.activeDetail === true && context.currentAttribute === this.state.title ? princetonOrange : yankeesBlue}}>{this.state.title}</Text>
                    </TouchableHighlight>
                </View>
                    
                    
                
            )}
            </WritualContext.Consumer>
        )
    }
}