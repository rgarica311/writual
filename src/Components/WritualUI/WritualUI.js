import React, { Component } from 'react'
import { View, StyleSheet, Platform, } from 'react-native'
import { WindowSize } from 'react-fns'
import ProjectList from '../ProjectList/ProjectList'
import DetailView from '../DetailView/DetailView'
import ChatWindow from '../ChatWindow/ChatWindow'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import WritualContext from '../../WritualContext'
import SignOut from '../SignOut/SignOut'


export default class WritualUI extends Component {
    constructor(props){
        super(props)
        this.state = {
            history: this.props.history,
            
        }
        
    }

    
    
    render(){
        //console.log('render ui')
        const styles = StyleSheet.create({
            uiContainer: {
                flexDirection: 'row',
                width: wp('100%'),
                height: Platform.OS === 'web' ? hp('85%')  : hp('100%'),
            }

        })
        return(
            
            
                <WritualContext.Consumer>
                    {(context) => (
                        
                        <View>
                            <WindowSize render={({width, height}) => (
                                 <View style={styles.uiContainer}>
                                    {  
                                       <View style={styles.uiContainer}>
                                             
                                            <ProjectList renderChat={ context.currentTab === 'Chat' ? true : false} windowWidth={width} windowHeight={height}/>
                                            <DetailView windowWidth={width} windowHeight={height} history={this.state.history}/>
                                    
                                        </View>
                                    }
                                    {
                                        context.renderProfileMenu === true
                                            ? <SignOut history={this.state.history}/>
                                            : null
                                    }

                                </View>
                            )}/>
                        </View>
                    )}
                </WritualContext.Consumer>
            
            
            
        )
    }
}