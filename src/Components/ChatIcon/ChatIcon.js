import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colorSwatches from '../../colorSwatches'

const { princetonOrange } = colorSwatches


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
      height: 20,
      width: 20, 
      justifyContent: 'center', 
      alignItems: 'center',
      marginRight: 10
    }
    
})

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
            project_id: this.props.project_id
            
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

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.unReadNum !== null && this.state.sender_uid === this.state.recipient_uid
                        ? <Text style={{fontFamily: 'Catamaran', fontWeight: 900, position:'absolute', zIndex: 1, right: 20, color: princetonOrange, fontSize: 22, bottom: 5}}>{this.state.unReadNum}</Text>
                        : null
                }
                <View style={{  backgroundImage: `url(${this.state.photoUrl})`, 
                                backgroundSize: 'contain',
                                height: 20,
                                width: 20,
                                borderRadius: "50%",
                                }}
                                onClick={this.state.openUserChat !== null ? e => this.state.openUserChat(e, this.state.proj, this.state.recipient_uid, this.state.email, this.state.sharedProj, this.state.uni_id, this.state.project_id) : null}>

                </View>
            </View>
        )
    }
    
}