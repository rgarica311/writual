import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colorSwatches from '../../colorSwatches'
import ChatWindow from '../ChatWindow/ChatWindow'
import WritualContext from '../../WritualContext'

const styles = StyleSheet.create({
    
    
})

export default class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return(
            <WritualContext.Consumer>
                {(context) => (
                    context.openChats !== undefined 
                        ? context.openChats.length > 0
                            ? context.openChats.map(chat => <ChatWindow clientUid={context.uid} 
                                                                        windowWidth={context.windowWidth} 
                                                                        windowHeight={context.windowHeight} 
                                                                        getUnread={context.getUnread} 
                                                                        createUnreadArgs={context.createUnreadArgs} 
                                                                        key={chat.title} 
                                                                        shared={chat.shared} 
                                                                        email={chat.email} 
                                                                        userName={context.photoUrls.find(obj => obj.project_id === chat.project_id).photoUrls.find(obj => obj.email === chat.email).user_name}
                                                                        title={chat.title} 
                                                                        project_id={chat.project_id} 
                                                                        episode_id={chat.epsidoe_id ? chat.episoe_id : null}
                                                                        uni_id={chat.uni_id} 
                                                                        getAuthToken={context.getAuthToken} 
                                                                        recipient_uid={chat.recipient_uid}/>)
                            : null
                        : null
                )}
            </WritualContext.Consumer>
        )
    }
}