import React, { Component } from 'react';
import { View, Text } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ChatIcon from '../ChatIcon/ChatIcon'
import { config } from '../../URLS'
import colorSwatches from '../../colorSwatches'

const { princetonOrange } = colorSwatches

const url = config.API_URL


export default class Message extends Component {
    constructor(props){
        super(props)
        this.state = {
            message: this.props.msg,
            sender_uid: this.props.sender_uid,
            getAuthToken: this.props.getAuthToken,
            uid: this.props.uid,
            
            
        }
    }

    componentDidMount() {
       this.getMessageIcon(this.state.sender_uid)
    }

    componentDidUpdate(prevProps) {
         //console.log(`debug chat scroll: message component did update prevProps.message: ${prevProps.msg} this.props.message ${this.props.msg}`)
         if(prevProps.msg !== this.props.msg) {
            //console.log(`debug chat scroll: ${prevProps.msg} !== ${this.props.msg}`)
            this.setState({
                message: this.props.msg,
                //sender_uid: this.props.sender_uid, 
            })
        } else if (prevProps.sender_uid !== this.props.sender_uid){
            this.setState({
                sender_uid: this.props.sender_uid
            })
            //console.log(`debug chat scroll component did update else: ${prevProps.msg} === ${this.props.msg}`)
        }
    }

    getMessageIcon = async (sender_uid) => {
        //console.log('getMessageIcon running sender_uid:', sender_uid)
        try {
                let response = await fetch(`${url}/message/iconurl/${sender_uid}`, {
                    method: 'GET',
                    headers: {
                    'content-type': 'application/json',
                    'Authorization': await this.state.getAuthToken()
                    }
                })
                if(!response.ok) {
                    throw new Error(response.status)
                } else {
                    let photoUrl = await response.json()
                    //console.log(`photoUrl awaited response.json(): ${JSON.stringify(photoUrl)}`)
                    this.setState({
                        photoUrl: photoUrl[0].photo_url
                    })
                }
        } 
        catch (error) {
            console.error(`error: ${error}`)
        }

    }

    render(){
        //console.log(`debug chat scroll message component: this.state.message: ${this.state.message}`)
        return (
            <View key={this.state.key} style={{maxWidth: '75%', alignSelf: this.state.sender_uid === this.state.uid ? 'flex-end' : 'flex-start'}}>
                {
                    this.state.sender_uid !== this.state.uid
                        ? <ChatIcon photoUrl={this.state.photoUrl}/>
                        : null
                }
                <Text style={{  marginBottom: 5, 
                                borderRadius: 10, 
                                padding: 7, 
                                color: 'white', 
                                backgroundColor: this.state.sender_uid === this.state.uid ? princetonOrange : 'rgba(240, 240, 238, 0.45)'
                                
                            }}>{this.state.message}</Text>
            </View>
    )
    }
}