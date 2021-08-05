import React, { Component } from 'react';
import WritualContext from '../../WritualContext.js';
import { View, Text, TextInput, StyleSheet, PanResponder,
    Animated,
    Dimensions, ScrollView } from 'react-native'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as io from 'socket.io-client'
import Message from '../Message/Message'
import ChatIcon from '../ChatIcon/ChatIcon'
import { config } from '../../URLS'

const url = config.API_URL

let socket

export default class ChatWindow extends Component {
    constructor(props){
        super(props)
        this.scrollView = React.createRef()
        this.textInput = React.createRef()

        this.state = {
            showWindow: true,
            message: '',
            receivedMessages: undefined,
            recipient_uid: this.props.recipient_uid,
            getAuthToken: props.getAuthToken,
            title: props.title,
            email: props.email,
            initialTop: 50,
            initialLeft: 50,
            top: 50,
            left: 50,
            currentChat: [],
            user_name: props.userName,
            socket: io.connect(`${url}`),
            clientUid: props.clientUid,
            checkUnread: props.checkUnread,
            initHeight: 140,
            project_id: this.props.project_id,
            episode_id: this.props.episode_id,
            shared: this.props.shared,
            createUnreadArgs: this.props.createUnreadArgs,
            getUnread: this.props.getUnread
        }
    }

    getMessages = () => {
        this.state.socket.emit('get-initial-messages', this.state.title, this.state.project_id, this.state.episode_id, this.state.clientUid, this.state.recipient_uid)

    }
 
    componentDidMount = () => {
        //console.log(`debug chat: component mounted`)
        //fix socket availability for porjects and episodes
        console.log('chat window mounted')
        setTimeout(() => {
            this.scrollView.current.scrollToEnd()
        }, 250)
        
        this.state.socket.emit('uid', this.state.clientUid, this.state.title, this.state.episode_id, this.state.email, this.state.recipient_uid)

        this.getMessages()

        this.state.socket.on('get-initial-messages', (messages) => {
            //console.log(`debug chat: get initial messages ran, messages: ${messages}`)
            //const msgs = this.state.receivedMessages
            //msgs.push(messages)
            this.setState({
                receivedMessages: messages
            })
        
        })

        this.state.socket.on(`${this.state.title}`, (message) => {
            const messages = this.state.receivedMessages
            messages.push(message)
            this.setState({
                receivedMessages: messages
            }, () => {
                this.scrollView.current.scrollToEnd()
                this.state.createUnreadArgs(this.state.title)
            })
        })

        this.state.socket.on(`to-sender-${this.state.title}`, (message) => {
            //console.log(`to sender message: ${message}`)
            const messages = this.state.receivedMessages
            messages.push(message)
            this.setState({
                receivedMessages: messages
            }, () => {
                this.scrollView.current.scrollToEnd()
            })
        })

        this.state.socket.on('send-old-messages', (messages) => {
            //console.log('debug chat messages send old', JSON.stringify(messages))
            const currentMessages = messages.reverse()
          
            this.setState({
                receivedMessages: currentMessages
            })
            //console.log(`debug chat load on scroll this.state.receivedMessages ${JSON.stringify(this.state.receivedMessages)}`)
        })

        

    }

    componentWillUnmount = () => {
        this.state.socket.emit('close-chat-window', this.state.clientUid, this.state.title, this.state.episode_id, this.state.email)
    }

    componentDidUpdate = (prevProps, prevState) => {
        //console.log(`handleScroll ChatWindow Component did update title: ${this.state.title} prevState: ${JSON.stringify(this.prevState)}`)
        console.log('ChatWindow Component did update')
        if(prevProps.userName !== this.props.userName) {
            this.setState({
                user_name: this.props.userName,
                email: this.props.email,
                recipient_uid: this.props.recipient_uid
            }, () => {
                this.getMessages()
            })
        } else {
            console.log('new props check failed')
        }

        if(prevState.receivedMessages !== undefined) {
            if(prevState.receivedMessages.length < this.state.receivedMessages.length) {
                
                this.scrollView.current.scrollToEnd()
               
            }
        }

    }

    handleScroll = (event) => {
        let posY = event.nativeEvent.contentOffset.y
        this.setState({
            posY
        })
        //console.log(`handleScroll state x y height width ${this.state.x, this.state.y, this.state.width, this.state.height}`)
        if(posY === 0) {
            this.state.socket.emit('load-on-scroll', this.state.episode_id, this.state.project_id, this.state.clientUid, this.state.recipient_uid)
            
        }
        
        //console.log('handleScroll debug scroll scroll position Y', posY)
    }


    



    handleMessageSubmit = async (e) => {
       setTimeout(() => {
            this.textInput.current.focus()

       }, 150)
        
        //console.log(`debug chat: handleMessage submit, socket: ${socket}`)
        //console.log(`debug chat: handleMessage submit, this.state.getAuthToken: ${await this.state.getAuthToken()}`)
     
        this.state.socket.emit(`new-private-msg`, this.state.title, this.state.project_id, this.state.episode_id, this.state.message, this.state.email, this.state.recipient_uid, this.state.clientUid,  )
    
        this.setState({
            message: ''
        }, () => {
            this.state.createUnreadArgs(this.state.shared)
            setTimeout(() => {
                this.state.getUnread()
            }, 500)
        })
    }

    handleUpdateText = (text) => {
        this.setState({
            message: text
        })
    }

    

    render(){
        //console.log('chat window render ran')
        const styles = StyleSheet.create({
            chatContainer: {
                height: 'calc(100vh - 70px)',
                width: '100%',
                position: 'relative',
                zIndex: 1,
            },

            chatWindow: {
                height: 235,
                width: 400,
                position: 'absolute',
                zIndex: 1,
            },

            textInput: {
                height: 40,
                width: '95%',
                backgroundColor: 'rgba(45, 45, 45, 0.75)',
                borderRadius: 5,
                padding: 5,
                color: 'white'
            },

            messagesContainer: {
                flex: 1,
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5,
                
            }
        })
        return(
            <WritualContext.Consumer>
            {(context) => (
                    <View style={styles.chatContainer}>
                        <View style={styles.messagesContainer}>
                            <View style={{height: 65, padding: 5, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'lightgrey'}}>
                                <ChatIcon header={true} photoUrl={context.photoUrls.find(obj => obj.project_id === this.state.project_id).photoUrls.find(obj => obj.email === this.state.email).photo_url} />
                                <View>
                                    <Text style={{fontFamily: 'Arial', fontWeight: 'bold', color: 'black'}}>{this.state.user_name}</Text>
                                    <Text style={{fontFamily: 'Arial', color: 'black'}}>{this.state.title}</Text>
                                </View>

                            </View>
                            <ScrollView ref={this.scrollView} onScroll={e => this.handleScroll(e)} style={{marginTop: 'auto', height: 150, padding: 10}}>
                                {
                                    
                                    this.state.receivedMessages !== undefined
                                        ?   this.state.receivedMessages.map(msg => 
                                                <Message uid={context.uid} 
                                                        getAuthToken={this.state.getAuthToken} 
                                                        msg={msg.message} 
                                                        sender_uid={msg.sender_uid}
                                                        key={msg.id}/>
                                                
                                            )
                                        : <Text style={{color: "white"}}>Awaiting messages...</Text>
                                        
                                    
                                }
                                
                                
                                <View ref={this.messagesEndRef}/>
                            </ScrollView>
                        </View>

                        <View style={{height: 50, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    
                            <TextInput  autoFocus={true} ref={this.textInput} placeholder='Type a message...' placeholderTextColor='white' value={this.state.message} 
                                        onSubmitEditing={e => this.handleMessageSubmit(e)} 
                                        onChangeText={(text) => this.handleUpdateText(text)} 
                                        style={styles.textInput}/>
                        </View>
                    </View>
                    
            )}
            </WritualContext.Consumer>

        )
    }
}