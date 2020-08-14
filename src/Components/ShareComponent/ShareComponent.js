import React, { Component } from 'react'
import { View, TextInput, Text, Button, Picker, StyleSheet, TouchableHighlight } from 'react-native'
import Dropdown from '../Dropdown/Dropdown'
import WritualContext from '../../WritualContext'
import colorSwatches from '../../colorSwatches'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const { babyPowder, darkGunMetal, lightGray, charcoal, yankeesBlue, yaleBlue, princetonOrange, oldLace } = colorSwatches

const styles = StyleSheet.create({
    sharedContainer: {
        backgroundColor: babyPowder,
        width: wp('45%'),
        height: hp('40%'),
        justifyContent: 'space-evenly',
        alignContent: 'center',
        padding: 15,
        borderRadius: 5,
        filter: "drop-shadow(0 0 .26rem grey)",
    }, 

    text: {
        color: 'black',
        fontFamily: 'Montserrat',
        fontWeight: 800,
    },

    subText: {
        color: charcoal,
        fontFamily: 'Montserrat',
        fontWeight: 600,
    },

    episodesText: {
        color: 'black',
        fontFamily: 'Montserrat',
        fontWeight: 600,
        marginRight: 10
    },

    episodesMenuText: {
        color: princetonOrange,
        fontFamily: 'Montserrat',
        fontWeight: 600,
        width: 'max-content'
    },


    textInput: {
        borderWidth: 1,
        borderColor: lightGray,
        height: '30px',
        padding: 5,
        color: charcoal,
        fontFamily: 'Montserrat',
        fontWeight: 500,
        flex: 1,
        zIndex: -1
    },

    messageText: {
        borderWidth: 1,
        borderColor: lightGray,
        height: '30px',
        padding: 5,
        color: charcoal,
        fontFamily: 'Montserrat',
        fontWeight: 500,
        zIndex: -1

    },

    button: {
        width: wp('15%'),
        
    },

    menu: {
        backgroundColor: lightGray,
        height: hp('10%'),
        width: wp('8%'),
        position: 'absolute',
        marginTop: '30px',
        right: '1px',
        padding: 5,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },

     episodesMenu: {
        backgroundColor: 'white',
        filter: "drop-shadow(0 0 .26rem grey)",
        height: 150,
        width: 300,
        overflowY: 'auto',
        zIndex: 1,
        position: 'absolute',
        marginTop: '30px',
        left: '1px',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    }
})

export default class ShareComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            message: undefined,
            checked: false,
            shareProject: props.shareProject,
            projectToShare: props.projectToShare,
            episodes: [],
            permission: 'Can View',
            currentProj: this.props.currentProj
        }
    }

    setEmail = (email) => {
        this.setState({
            email
        })
    }

    setMessage = (message) => {
        this.setState({
            message
        })
    }

    handleUpdatePermission = (permission) => {
        this.setState({
            permission
        })
    }
    

    handleEpSelect = (e, episodeTitle) => {
        //console.log('sharing episodes: handleSelect Triggered')
        e.stopPropagation()
        let episode
        if( this.state.episodes.find(obj => obj.title === episodeTitle) ) {
            //console.log('sharing episodes: same option clicked')
            this.setState( prevState => ({
                episodeTitle: episodeTitle,
                episodes: prevState.episodes.map(ep => 
                    ep.title === episodeTitle 
                        ? {...ep, checked: !prevState.episodes.find(ep => ep.title === episodeTitle ).checked} 
                        : ep)
            }))

        } else {
            episode = {
                title: episodeTitle,
                checked: true
            }

            let episodes = [...this.state.episodes]
            episodes.push(episode)
            this.setState({
                episodes: episodes,
                episodeTitle: episodeTitle,
            })
        }
        
        
        //console.log('episode share: e, episodeTitle', e, episodeTitle)
    }
    
    
    render() {
        //console.log('sharing episodes: render running')
        return (
        <WritualContext.Consumer>
            {(context) => (
                <View style={{alignItems: 'center', justifyContent: 'center', right: 0, position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.75)'}}>
                    <View style={styles.sharedContainer}>
                        <FontAwesomeIcon    onClick={context.closeShareComponent} 
                                            style={{top: 5, right: 5, position: 'absolute'}} 
                                            color='black' 
                                            className='fa-lg iconHover' 
                                            icon={faTimesCircle}/> 

                        <Text style={styles.text}>Share Project: {this.state.currentProj}</Text>
                        {
                            context.currentProjFormat === "Television"
                                ?   <View style={{flexDirection: 'row'}}> 
                                        <Text style={styles.episodesText}>Optional: Share Specific Episodes</Text>
                                        <Dropdown projFormat={context.currentProjFormat}>
                                            <View style={styles.episodesMenu}>
                                                <View style={{ marginBottom: 'auto', width: '100%', height: '20%', backgroundColor: yankeesBlue, justifyContent: 'center', alignItems: 'center'}}>
                                                    <Text style={styles.episodesMenuText}>Episodes</Text>
                                                </View>
                                                <View style={{height:250, width: '100%', justifyContent: 'space-evenly'}}>
                                                    {
                                                        context.episodes.map(episode =>
                                                            <TouchableHighlight key={episode.uni_id} onPress={e => this.handleEpSelect(e, episode.episode_title)} style={{padding: 5, borderBottomWidth: 1, borderColor: 'black', flexDirection: 'row'}}>
                                                                <View style={{flexDirection: 'row'}}>
                                                                    <View key={episode.uni_id} style={{padding: 2, borderWidth: 1, borderColor: 'black'}}>
                                                                        <FontAwesomeIcon color={this.state.episodes.length > 0 
                                                                                                    ? this.state.episodes.find(ep => ep.title === episode.episode_title) !== undefined
                                                                                                        ? this.state.episodes.find(ep => ep.title === episode.episode_title).checked ? 'black' : 'white'
                                                                                                        : 'white'
                                                                                                    :  'white' } icon={faCheck} className='fa-sm iconHover'/>
                                                                    </View>

                                                                    <Text style={{color: 'black', marginLeft: 8}}>{episode.episode_title}</Text>
                                                                </View>
                                                            </TouchableHighlight>
                                                        )
                                                    }
                                                </View>
                                            </View>
                                        </Dropdown>
                                    </View>
                                : null
                        }
                        <Text style={styles.subText}>Email:</Text>
                        <View style={{flexDirection: 'row', zIndex: -1}}>
                            <TextInput style={styles.textInput} value={this.state.email} onChangeText={(text) => this.setEmail(text)} placeholderTextColor='grey' placeholder='Enter email addresses'/>
                            
                            <Picker selectedValue={this.state.permission} onValueChange={this.handleUpdatePermission}>
                                <Picker.Item label='Can Edit' value='Can Edit'/>
                                <Picker.Item label='Can View' value='Can View'/>
                            </Picker>
                        
                        </View>
                        <Text style={styles.subText}>Message:</Text>
                        <TextInput style={styles.messageText} value={this.state.message} onChangeText={(text) => this.setMessage(text)} placeholder='Send optional custom message' placeholderTextColor='grey'/>
                        <View style={styles.button}>
                            <Button color={darkGunMetal} title='Share Project' onPress={e => this.state.shareProject(e, this.state.email, this.state.message, this.state.episodes, this.state.permission, )}/>
                        </View>
                    </View>
                </View>
            )}
        </WritualContext.Consumer>
    )

    }
    
}