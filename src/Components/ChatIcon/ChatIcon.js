import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colorSwatches from '../../colorSwatches'
import { config } from '../../URLS'
import * as io from 'socket.io-client'

const { princetonOrange, featureBlue } = colorSwatches

const header = StyleSheet.create({
    container: {
        elevation: 2,
        cursor: 'pointer', 
        padding: 10,
    },
})

const styles = StyleSheet.create({
    chatContainer: {
        width: wp('15%'),
        height: hp('10%'),
    },

     photo: {
        height: 20,
        width: 20,
        borderRadius: "50%",
    },

    photoUnread: {
        height: 25,
        width: 25,
        borderRadius: "50%",
        borderWidth: 1,
        borderColor: princetonOrange
    }, 

    container: {
        elevation: 2,
        cursor: 'pointer', 
        justifyContent: 'space-evenly',
        borderBottomColor: '#293E4F', 
        borderBottomWidth: 1,
        padding: 10,
        height: 80,
    },

    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    }
    
})

const url = config.API_URL


export default class ChatIcon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            unReadNum: this.props.unReadNum !== undefined ? this.props.unReadNum : null,
            photoUrl: this.props.photoUrl !== undefined ? this.props.photoUrl : null,
            openUserChat: this.props.openUserChat !== undefined ? this.props.openUserChat : null,
            //getMessageIcon: this.props.getMessageIcon !== undefined ? this.props.getMessageIcon : null,
            sender_uid: this.props.sender_uid !== undefined ? this.props.sender_uid : null,
            proj: this.props.proj !== undefined ? this.props.proj : null, 
            recipient_uid: this.props.recipient_uid !== undefined ? this.props.recipient_uid : null, 
            email: this.props.email !== undefined ? this.props.email : null,
            sharedProj: this.props.sharedProj,
            uni_id: this.props.uni_id, //remember to inject project_id into messages database
            project_id: this.props.project_id,
            episode_id: this.props.episode_id,
            user_name: this.props.user_name,
            header: this.props.header,
            lastMessage: "",
            socket: io.connect(`${url}`),
            uid: this.props.uid
            
        }

    }

    static getDerivedStateFromProps(props, state) {
        //console.log(`debug chaticon getderivedstate from props`)
        const {unReadNum} = props
        if(unReadNum !== state.unReadNum) {
            return {unReadNum: props.unReadNum}
        }
        return null
    }
    
    componentDidMount = () => {
        //console.log(`debug chaticon compdidmount this.state.proj: ${this.state.proj} this.state.unReadNum ${this.state.unReadNum}`)
        if (!this.state.header) {
            console.log('header: ', this.state.header)
            this.getLastMessage()
        }

        this.state.socket.on('got-last-message', (message) => {
            console.log(`got last message: `, message)
            //const msgs = this.state.receivedMessages
            //msgs.push(messages)
            this.setState({
                lastMessage: message
            })
        
        })
       
    }

    componentDidUpdate = (prevProps) => {
        //console.log(`debug chaticon comp did update proj: ${prevProps.proj} prevProps unread: ${prevProps.unReadNum} this.propsUnread ${this.props.unReadNum}`)
        if(this.props.photoUrl !== prevProps.photoUrl  ) {
            //console.log(`debug chaticon photoUrl update`)
            this.setState({
                photoUrl: this.props.photoUrl
            })
        } else if (this.props.sender_uid !== prevProps.sender_uid ){
            //console.log(`debug chaticon sender uid update`)
            this.setState({
                sender_uid: this.props.sender_uid
            })
        } else if (this.props.unReadNum !== prevProps.unReadNum) {
            //console.log(`debug chaticon compDidUpdate: prevProps unread: ${prevProps.unReadNum} this.propsUnread ${this.props.unReadNum}}`)
            this.setState({
                unReadNum: this.props.unReadNum
            })
        }

    }

    getLastMessage = () => {
        console.log('get last message args: ', this.state.proj, this.state.project_id, this.state.episode_id, this.state.uid, this.state.recipient_uid)
        this.state.socket.emit('get-last-message',  this.state.proj, this.state.project_id, this.state.episode_id, this.state.uid, this.state.recipient_uid)
    }

    render() {
        return (
            <View onClick={this.state.openUserChat !== null ? e => this.state.openUserChat(e, this.state.proj, this.state.recipient_uid, this.state.email, this.state.sharedProj, this.state.uni_id, this.state.project_id) : null} style={this.state.header ? header.container : styles.container}>
                {
                    this.state.unReadNum !== null && this.state.sender_uid === this.state.recipient_uid
                        ? <Text style={{fontFamily: 'Catamaran', fontWeight: 900, position:'absolute', zIndex: 1, right: 20, color: princetonOrange, fontSize: 22, bottom: 5}}>{this.state.unReadNum}</Text>
                        : null
                }
                <View style={styles.flexRow}>
                    <View style={{  backgroundImage: `url(${this.state.photoUrl})`, 
                                    backgroundSize: 'contain',
                                    height: 40,
                                    width: 40,
                                    borderRadius: "50%",
                                    marginRight: 15
                                    }}
                                    >

                    </View>
                    <View style={{display: 'flex'}}>
                        <Text style={{fontFamily: 'Arial', fontWeight: 'bold', color: 'white'}}>{this.state.user_name}</Text>
                        <Text style={{fontFamily: 'Arial', color: 'white'}}>{this.state.lastMessage}</Text>
                    </View>
                </View>
            </View>
        )
    }
    
}