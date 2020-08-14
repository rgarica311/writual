/*import React, { Component } from 'react';
import { View, Text, TextInput, Platform, StyleSheet, TouchableHighlight } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextEditor from '../TextEditor/TextEditor'

export default class CharacterDetails extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    

    render(){
        const styles = StyleSheet.create({
            container: {
                backgroundColor: '#EDEDED',
                width: Platform.OS === 'web' ? wp('70%') : wp('100%'),
                height: Platform.OS === 'web' ? hp('95%') : 55,
                padding: 15,
            },

            bio: {
                flex: 1,
                backgroundColor: 'white',
                height: hp('80%')
            }
            
        })
        return(
            <View style={styles.container}>
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Name:</Text>
                        <TextInput></TextInput>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text>Age:</Text>
                        <TextInput></TextInput>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Bio:</Text>
                        <TextEditor/>
                    </View>
                    
                   
                </View>
            </View>
        )
    }
}