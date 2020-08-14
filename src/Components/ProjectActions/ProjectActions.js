import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableHighlight, Image} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import WritualContext from '../../WritualContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';
import { faEllipsisV, faShareAlt, faPlus, faUserPlus, faMinus, faTrash, faEyeSlash, faEye, faAngleUp, faAngleDown, } from '@fortawesome/free-solid-svg-icons';



export default class ProjectActions extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    render(){
        return(
            <View>
                <Menu>
                    <MenuTrigger><FontAwesomeIcon color='white' icon={faEllipsisV}/></MenuTrigger>
                    <MenuOptions>
                        {
                            this.state.projformat === "Television"
                                ? this.state.something.map(obj => 
                                    <MenuOption><FontAwesomeIcon icon={obj.icon} onClick={obj.onClick} /></MenuOption>
                                )
                                :
                        }
                      <MenuOption><FontAwesomeIcon icon={faTrash}/></MenuOption>
                    
                    </MenuOptions>
                </Menu>
            </View>

        )
    }

}