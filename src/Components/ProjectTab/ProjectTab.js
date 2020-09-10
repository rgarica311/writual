import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableHighlight } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';
import * as io from 'socket.io-client'
import WritualContext from '../../WritualContext'
import ChatIcon from '../ChatIcon/ChatIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPlus, faUserPlus, faTrash, faEyeSlash, faEye, faAngleUp, faAngleDown, } from '@fortawesome/free-solid-svg-icons';
import colorSwatches from '../../colorSwatches'
import { config } from '../../URLS'

const url = config.API_URL

const { darkGunMetal, princetonOrange, yaleBlue, yankeesBlue, oldLace, featureBlue, episode, tvItem} = colorSwatches


export default class ProjectTab extends Component {
    constructor(props){
        super(props)
        this.state = {
            labelColor: this.props.labelColor,
            proj: this.props.proj !== undefined ? this.props.proj : undefined,
            project_id: this.props.project_id,
            uni_id: this.props.uni_id,
            episode_id: this.props.episode_id,
            framework: this.props.framework,
            sharedProj: this.props.sharedProj,
            shared: this.props.shared,
            uid: this.props.uid,
            visible: this.props.visible,
            projformat: this.props.projformat,
            episode: this.props.episode !== undefined ? this.props.episode : null,
            episode_title: this.props.episode_title !== undefined ? this.props.episode_title : undefined,
            show_title: this.props.show_title !== undefined ? this.props.show_title : null,
            episodeNum: this.props.episodeNum !== undefined ? this.props.episodeNum : undefined,
            getChatIconUrls: this.props.getChatIconUrls,
            numUnreadMsgs: null,
            getAuthToken: this.props.getAuthToken,
            socket: io.connect(`${url}`),
            isEpisode: this.props.isEpisode,
            
        }
    }

    componentDidMount() {
        //console.log(`tab component mounted: ${this.state.proj} project_id: ${this.state.project_id}`)
        if(this.state.shared) {
            if(this.state.episode) {
                this.state.getChatIconUrls(this.state.episode_id, this.state.sharedProj, this.state.episode) 
            } else {
                this.state.getChatIconUrls(this.state.project_id, this.state.sharedProj, this.state.episode) 

            }
        }
    }

    componentDidUpdate(prevProps) {
        //console.log(`getChatIcons  tab component updated project_id ${this.state.project_id} prevProps.shared: ${prevProps.shared} this.props.shared: ${this.props.shared} `)
        //this.state.getChatIconUrls(this.state.project_id, this.state.sharedProj) 

        if(prevProps.visible !== this.props.visible) {
            this.setState({
                visible: this.props.visible
            })
        } else if (prevProps.projformat !== this.props.projformat){
            this.setState({
                projformat: this.props.projformat
            })
            this.state.getChatIconUrls(this.state.project_id, this.state.sharedProj) 
        } else if (prevProps.proj !== this.props.proj) {
            this.setState({
                proj: this.props.proj
            })
            this.state.getChatIconUrls(this.state.project_id, this.state.sharedProj) 
             
        } else if (prevProps.shared !== this.props.shared) {
            this.setState({
                shared: this.props.shared
            })
            if(this.state.episode) {
                this.state.getChatIconUrls(this.state.episode_id, this.state.sharedProj, this.state.episode) 
            } else {
                this.state.getChatIconUrls(this.state.project_id, this.state.sharedProj, this.state.episode) 
            }
        } else if (prevProps.framework !== this.props.framework) {
            this.setState({
                framework: this.props.framework
            })
        } else if( prevProps.table !== this.props.table) {
            this.setState({
                table: this.props.table
            })
        } else if (prevProps.sharedProj !== this.props.sharedProj) {
            this.setState({
                sharedProj: this.props.sharedProj
            })
        }

    }


    render(){
        //console.log('project tab rendering')
        const styles = StyleSheet.create({
            item: {
                elevation: 2,
                backgroundColor: featureBlue,
                borderBottomColor: '#293E4F',
                borderBottomWidth: 1,
                cursor: 'pointer', 
                justifyContent: 'space-evenly',
                padding: 10,
                height: 80,
            },

            tvItem: {
                elevation: 2,
                backgroundColor: tvItem,
                borderBottomColor: '#293E4F',
                borderBottomWidth: 1,
                cursor: 'pointer', 
                justifyContent: 'space-evenly',
                padding: 10,
                maxHeight: 75.
            },

            episodeItem: {
                elevation: 2,
                backgroundColor: episode,
                borderBottomColor: '#293E4F',
                borderBottomWidth: 1,
                cursor: 'pointer', 
                flexDirection: 'row',
                maxHeight: 70.
            },

            text: {
                color: '#F7F7F7',
                marginBottom: 5,
                fontSize: 18,
                fontFamily: 'Roboto Slab',
                width: wp('15%'),
            },

            activeText: {
                color: princetonOrange,
                marginBottom: 5,
                fontSize: 18,
                fontFamily: 'Roboto Slab',
                width: wp('15%'),
            },

            episodeText: {
                color: '#F7F7F7',
                fontSize: 14,
                fontFamily: 'Roboto Slab',
                width: 'max-content',
                display: 'flex',
                flexDirection: 'column'
            },

            activeEpisodeText: {
                color: princetonOrange,
                fontSize: 14,
                fontFamily: 'Roboto Slab',
                width: 'max-content',
                display: 'flex',
                flexDirection: 'column'
            },

            formatGenre: {
                color: 'white',
                textTransform: 'uppercase',
                fontFamily: 'Montserrat',
                fontWeight: '300',
                fontSize: 11,
            },

             activeFormatGenre: {
                color: princetonOrange,
                textTransform: 'uppercase',
                fontFamily: 'Montserrat',
                fontWeight: '300',
                fontSize: 11,
            },

            flexRow: {
                flexDirection: 'row',
                
            }, 

            iconContainer: {
                width: '100%',
                alignSelf: 'flex-end',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 3,
                marginBottom: 3,
            },

            episodeIconContainer: {
                flexDirection: 'row',
                alignSelf: 'flex-end',
                marginRight: 15,
                width: '100%'
            },

            tvIconContainer: {
                alignSelf: 'flex-end',
                justifyContent: 'space-evenly',
                width: '100%'
            },

            episodeIndent: {
                borderBottomColor: '#293E4F',
                borderBottomWidth: 1,
                width: '20%',
                maxHeight: 85,
                backgroundColor: darkGunMetal,
                marginRight: 10
            },

            menuOption: {
                flexDirection: 'row',
                width: 'max-content'
            },

            iconBox: {
                width: 20, 
                height: 20, 
                justifyContent: 'center', 
                alignItems: 'center',
                marginRight: 10
            },

            chatIconContainer: {
                backgroundColor: 'red',
                height: 10,
                width: 10
            },

            menuOptionsContainer: {
                
            }
        })

        const optionsStyles = {
            optionsContainer: {
                left: 500,
                position: 'absolute',
                backgroundColor: 'green'
            }
        }

        return(
            <WritualContext.Consumer>
                {(context) => (
                    //console.log(`wtf: this.state.proj: ${this.state.proj} this.state.episode_title: ${this.state.episode_title} `),
                    //console.log(`wtf: context.unreadMessagesStatus.find(msg => msg.title === this.state.proj).numUnreadMsgs !== undefined: ${context.unreadMessagesStatus.find(msg => msg.title === this.state.proj)} `),
                    //console.log(`wtf: context.unreadMessagesStatus: ${Object.keys(context.unreadMessagesStatus[0])} `),

                    Platform.OS  === 'web'
                        ? this.state.episode === false
                            ?  <View pointerEvents='auto' onClick={e => context.onProjectClick(e, this.state.proj, this.state.projformat, this.state.framework, this.state.sharedProj, this.state.shared, this.state.episode_id, this.state.project_id, this.state.episode, this.state.show_title)} style={this.state.projformat === "Television" ? styles.tvItem : styles.item}>
                                        <View style={{ marginLeft: 15, justifyContent: 'center'}}>
                                            <Text style={context.current_project_id === this.state.project_id ? styles.activeText : styles.text}>{this.state.proj}</Text>
                                            <View style={styles.flexRow}> 
                                                <Text style={context.current_project_id === this.state.project_id ? styles.activeFormatGenre : styles.formatGenre}>
                                                    {
                                                        this.state.sharedProj === false
                                                            ? context.projects.find(obj => obj.title === this.state.proj).projformat + " "
                                                            : context.sharedProjects.find(obj => obj.title === this.state.proj).projformat + " "
                                                    }
                                                </Text>
                                                <Text style={context.current_project_id === this.state.project_id ? styles.activeFormatGenre  : styles.formatGenre}>
                                                    {
                                                        this.state.sharedProj === false
                                                            ? context.projects.find(obj => obj.title === this.state.proj).genre
                                                            : context.sharedProjects.find(obj => obj.title === this.state.proj).genre
                                                    }
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={this.state.projformat === 'Television' ? styles.tvIconContainer : styles.iconContainer}>
                                            {   //put some logic in here to use episode_id if availbble for photourl obj search
                                                this.state.shared === true && context.photoUrls.length > 0 && this.state.sharedProj === false && this.state.projformat !== 'Television'
                                                    ? context.photoUrls.find(obj => obj.project_id === this.state.project_id) !== undefined 
                                                        ?   context.photoUrls.find(obj => obj.project_id === this.state.project_id).photoUrls.map(url => <ChatIcon email={url.email} 
                                                                                                    unReadNum={ this.state.proj !== undefined 
                                                                                                                    ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj) !== undefined
                                                                                                                        ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj).unreadMsgs === true
                                                                                                                            ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj).numUnreadMsgs
                                                                                                                            : null
                                                                                                                        : null
                                                                                                                    : this.state.episode_title !== undefined 
                                                                                                                        ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj) !== undefined 
                                                                                                                            ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj).unreadMsgs === true
                                                                                                                                ? context.unreadMessagesStatus.find(msg => msg.title === this.state.episode_title).numUnreadMsgs
                                                                                                                                : null
                                                                                                                            : null
                                                                                                                        : null} 
                                                                                                    unReadMessages={this.state.unreadMsgs} 
                                                                                                    recipient_uid={url.uid} 
                                                                                                    openUserChat={context.openUserChat} 
                                                                                                    key={url.id} 
                                                                                                    photoUrl={url.photo_url}
                                                                                                    proj={this.state.proj !== undefined ? this.state.proj : this.state.episode_title} 
                                                                                                    sender_uid={this.state.proj !== undefined && context.unreadMessagesStatus.find(msg => msg.title === this.state.proj) !== undefined 
                                                                                                                    ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj).unreadMsgs === true
                                                                                                                        ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj).sender_uid
                                                                                                                        : this.state.episode_title !== undefined && context.unreadMessagesStatus.find(msg => msg.title === this.state.proj) !== undefined 
                                                                                                                            ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj).unreadMsgs === true
                                                                                                                                ? context.unreadMessagesStatus.find(msg => msg.title === this.state.episode_title).sender_uid
                                                                                                                                : null
                                                                                                                            : null
                                                                                                                    : null} 
                                                                                                                        
                                                                                                    sharedProj={this.state.sharedProj}
                                                                                                    uni_id={this.state.episode_id}
                                                                                                    project_id={this.state.project_id}
                                                        
                                                                                                    />)
                                                        : null
                                                    : null
                                                
                                            }
                                            { // Icons for users own projects
                                                this.state.sharedProj === false

                                                    ? <Menu>
                                                            <MenuTrigger> 
                                                                <FontAwesomeIcon icon={faEllipsisV} style={{marginLeft: 'auto'}} onClick={(function(e) { e.stopPropagation()})} className='fa-lg iconHover'  color='white' />
                                                            </MenuTrigger>
                                                            <MenuOptions>
                                                            
                                                                <MenuOption onSelect={e => context.deleteProj(e, this.state.project_id)}  style={styles.menuOption}>
                                                                    <View style={styles.iconBox}>
                                                                        <FontAwesomeIcon icon={faTrash} className='fa-sm iconHover' color={yankeesBlue}/>
                                                                    </View>
                                                                    <Text style={styles.actionItemText}>Delete Project</Text>
                                                                </MenuOption> 

                                                                <MenuOption  onSelect={this.state.visible === true ? e => context.hideProj(e, this.state.proj, this.state.sharedProj) : e => context.unHideProj(e, this.state.proj, this.state.sharedProj)} style={styles.menuOption}>
                                                                    <View style={styles.iconBox}>
                                                                        <FontAwesomeIcon icon={faEyeSlash} className='fa-sm iconHover' color={
                                                                                                                                                context.current_project_id === this.state.project_id 
                                                                                                                                                    ? princetonOrange 
                                                                                                                                                    : this.state.visible === false
                                                                                                                                                        ? princetonOrange
                                                                                                                                                        : yankeesBlue
                                                                                                                                            }/>
                                                                    </View>
                                                                    <Text style={styles.actionItemText}>Hide Project</Text>
                                                                </MenuOption>

                                                                <MenuOption onSelect={e => context.showShareProject(this.state.proj, this.state.project_id, this.state.projformat, this.state.framework, this.state.sharedProj)} style={styles.menuOption}>
                                                                    <View style={styles.iconBox}>
                                                                        <FontAwesomeIcon   icon={faUserPlus} className={`fa-sm iconHover ${this.state.proj}`} color={ yankeesBlue}/>
                                                                    </View>
                                                                    <Text style={styles.actionItemText}>Share Project</Text>
                                                                </MenuOption>
                                                                {
                                                                    this.state.projformat === 'Television'
                                                                        ? <MenuOption style={styles.menuOption}>
                                                                                <View style={styles.iconBox}>
                                                                                    <FontAwesomeIcon  color={yankeesBlue} className='fa-sm iconHover' icon={ faPlus } onClick={ e => context.addEp(e, this.state.proj, this.state.project_id, this.state.sharedProj, this.state.shared)}/>
                                                                                </View>
                                                                                <Text>New Episode</Text>
                                                                            </MenuOption>
                                                                        : null

                                                                }
                                                                {
                                                                    this.state.projformat === 'Television'
                                                                        ?   <MenuOption onSelect={e => context.showHiddenEpisodes(e)} style={styles.menuOption}>
                                                                                <View style={styles.iconBox}>
                                                                                    <FontAwesomeIcon    icon={ faEye } className='fa-sm iconHover' 
                                                                                                        color={
                                                                                                            context.projects !== undefined
                                                                                                                ? context.projects.find(proj => proj.visible === false) 
                                                                                                                    ? context.projects.find(proj => proj.show_hidden === true ) ? oldLace : princetonOrange
                                                                                                                    : yankeesBlue
                                                                                                                : yankeesBlue
                                                                                                        }/>
                                                                                </View>
                                                                                <Text>Show Hidden Episodes</Text>
                                                                            </MenuOption>
                                                                                            
                                                                        : null

                                                                }
                                                                {
                                                                    this.state.projformat === 'Television'
                                                                        ? context.renderUpTvArrow === false
                                                                            ?       <MenuOption onSelect={ e => context.expandTvShowList(e, this.state.proj)  } style={styles.menuOption}>
                                                                                        <View style={styles.iconBox}>
                                                                                            <FontAwesomeIcon  color='black' className='fa-sm iconHover' icon={ faAngleDown } />
                                                                                        </View>
                                                                                        <Text>Expand Project</Text>
                                                                                    </MenuOption>
                                                                            :   <MenuOption onSelect={ e => context.collapseTvShowList(e, this.state.proj)} style={styles.menuOption}>
                                                                                    <View style={styles.iconBox}>
                                                                                        <FontAwesomeIcon  color='black' className='fa-sm iconHover' icon={ faAngleUp } />
                                                                                    </View>
                                                                                    <Text>Collapse Project</Text>
                                                                                </MenuOption>
                                                                        : null 
                                                                } 
                                                            </MenuOptions>
                                                        </Menu>
                                                        
                                                    
                                                    : this.state.projformat === 'Television'
                                                        ?   <View>
                                                                <Menu>
                                                                    <MenuTrigger> 
                                                                        <FontAwesomeIcon style={{marginLeft: 'auto'}} onClick={(function(e) {
                                                                            e.stopPropagation()
                                                                            })} className='fa-lg iconHover' color='white' icon={faEllipsisV}/>
                                                                    </MenuTrigger>
                                                                    <MenuOptions style={{padding: 10, width: wp('30%')}}>
                                                                        <MenuOption  onSelect={this.state.visible === true 
                                                                                                        ? e => context.hideProj(e, this.state.proj, this.state.sharedProj)
                                                                                                        : e => context.unHideProj(e, this.state.proj, this.state.sharedProj)
                                                                                                    } style={styles.menuOption}>
                                                                            <View style={styles.iconBox}>
                                                                                <FontAwesomeIcon icon={faEyeSlash} className='fa-sm iconHover' color={
                                                                                                                                                        context.current_project_id === this.state.project_id 
                                                                                                                                                            ? princetonOrange 
                                                                                                                                                            : this.state.visible === false
                                                                                                                                                                ? princetonOrange
                                                                                                                                                                : yankeesBlue
                                                                                                                                                    }/>
                                                                            </View>
                                                                            <Text style={styles.actionItemText}>Hide Project</Text>
                                                                        </MenuOption>
                                            
                                                                        {
                                                                            this.state.projformat === 'Television'
                                                                                ?   <MenuOption onSelect={e => context.showHiddenSharedEpisodes(e)} style={styles.menuOption}>
                                                                                        <View style={styles.iconBox}>
                                                                                            <FontAwesomeIcon    icon={ faEye } className='fa-sm iconHover' color={
                                                                                                                                                                    context.projects !== undefined
                                                                                                                                                                        ? context.projects.find(proj => proj.visible === false) 
                                                                                                                                                                            ? context.projects.find(proj => proj.show_hidden === true ) ? oldLace : princetonOrange
                                                                                                                                                                            : yankeesBlue
                                                                                                                                                                        : yankeesBlue
                                                                                                                                                                }/>
                                                                                        </View>
                                                                                        <Text>Show Hidden Episodes</Text>
                                                                                    </MenuOption>
                                                                                                    
                                                                                : null

                                                                        }
                                                                        {
                                                                            this.state.projformat === 'Television'
                                                                                ? context.renderUpTvArrowShared === false 
                                                                                    ?       <MenuOption onSelect={ e => context.expandSharedTvList(e, this.state.proj)  } style={styles.menuOption}>
                                                                                                <View style={styles.iconBox}>
                                                                                                    <FontAwesomeIcon  color='black' className='fa-sm iconHover' icon={ faAngleDown } />
                                                                                                </View>
                                                                                                <Text>Expand Show</Text>
                                                                                            </MenuOption>
                                                                                    :   <MenuOption onSelect={ e => context.collapseSharedTvList(e, this.state.proj)} style={styles.menuOption}>
                                                                                            <View style={styles.iconBox}>
                                                                                                <FontAwesomeIcon  color='black' className='fa-sm iconHover' icon={ faAngleUp } />
                                                                                            </View>
                                                                                            <Text>Collapse Show</Text>
                                                                                        </MenuOption>   
                                                                                : null 
                                                                        } 
                                                                    </MenuOptions>
                                                                </Menu>
                                                                
                                                            </View>
                                                        :   <View style={styles.iconContainer}> 
                                                                {
                                                                    this.state.sharedProj === true && context.photoUrls.length > 0 && this.state.projformat !== 'Television'
                                                                        ? context.photoUrls.find(obj => obj.project_id === this.state.project_id || obj.project_id === this.state.episode_id) !== undefined //episode fix this here for epsioes shared also fix new projects having shared set on creation
                                                                            ? context.photoUrls.find(obj => obj.project_id === this.state.project_id || obj.project_id === this.state.episode_id).photoUrls.map(url => <ChatIcon email={url.email} 
                                                                                                                    unReadNum={ this.state.proj !== undefined 
                                                                                                                                    ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj) !== undefined 
                                                                                                                                        ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj).unreadMsgs === true
                                                                                                                                            ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj).numUnreadMsgs
                                                                                                                                            : null
                                                                                                                                        : null
                                                                                                                                    : this.state.episode_title !== undefined 
                                                                                                                                        ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj) !== undefined
                                                                                                                                            ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj).unreadMsgs === true
                                                                                                                                                ? context.unreadMessagesStatus.find(msg => msg.title === this.state.episode_title).numUnreadMsgs
                                                                                                                                                : null
                                                                                                                                            : null
                                                                                                                                        : null
                                                                                                                                }  
                                                                                                                    sender_uid={ this.state.proj !== undefined
                                                                                                                                    ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj) !== undefined 
                                                                                                                                        ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj).unreadMsgs === true
                                                                                                                                            ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj).sender_uid
                                                                                                                                            : null
                                                                                                                                        : null
                                                                                                                                    : this.state.episode_title !== undefined 
                                                                                                                                        ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj) !== undefined 
                                                                                                                                            ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj).unreadMsgs === true
                                                                                                                                                ? context.unreadMessagesStatus.find(msg => msg.title === this.state.episode_title).sender_uid
                                                                                                                                                : null
                                                                                                                                            : null
                                                                                                                                        : null

                                                                                                                                }
                                                                                                                    unReadMessages={this.state.unreadMsgs} 
                                                                                                                    recipient_uid={url.uid} 
                                                                                                                    openUserChat={context.openUserChat} 
                                                                                                                    key={url.id} 
                                                                                                                    photoUrl={url.photo_url} 
                                                                                                                    proj={this.state.proj !== undefined ? this.state.proj : this.state.episode_title} 
                                                                                                                    /*sender_uid={this.state.proj !== undefined && context.unreadMessagesStatus.length > 0
                                                                                                                    ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj).sender_uid
                                                                                                                    : this.state.episode_title !== undefined && context.unreadMessagesStatus.length > 0
                                                                                                                        ? context.unreadMessagesStatus.find(msg => msg.title === this.state.episode_title).sender_uid
                                                                                                                        : 'test'} */
                                                                                                                    sharedProj={this.state.sharedProj} 
                                                                                                                    uni_id={this.state.episode_id}
                                                                                                                    project_id={this.state.project_id}/>)
                                                                            : null
                                                                        : null
                                                                }
                                                                <FontAwesomeIcon style={{alignSelf: 'center'}} icon={faEyeSlash} className='fa-sm iconHover' 
                                                                            onClick={this.state.visible === true 
                                                                                            ? this.state.projformat === 'Episode' ? e => context.hideEpisode(e, this.state.proj, this.state.sharedProj)  : e => context.hideProj(e, this.state.proj, this.state.sharedProj)
                                                                                            : this.state.projformat === 'Episode' ? e => context.unHideEpisode(e, this.state.proj, this.state.sharedProj) : e => context.unHideProj(e, this.state.proj, this.state.sharedProj)}
                                                                            color={context.current_project_id === this.state.project_id 
                                                                                            ? princetonOrange 
                                                                                            : this.state.visible === false
                                                                                                ? princetonOrange
                                                                                                : 'white'}/>
                                                            </View>
                                                        
                                            }
                                        
                                    </View>
                                </View>          
                            :   <View style={styles.episodeItem} onClick={e => context.onProjectClick(e, this.state.episode_title, this.state.projformat, this.state.framework, this.state.sharedProj, this.state.shared, this.state.episode_id, this.state.project_id, this.state.episode, this.state.show_title)}>
                                    <View style={styles.episodeIndent}></View>
                                    <View style={{padding: 10, flex: 1, justifyContent: 'space-evenly'}}>
                                        <View >
                                           
                                            <Text style={context.current_project_id === this.state.project_id ? styles.activeEpisodeText : styles.episodeText}>{this.state.episode_title}</Text>
                                            <View style={styles.flexRow}>
                                                <Text  style={context.current_project_id === this.state.project_id ? styles.activeFormatGenre : styles.formatGenre}>
                                                    {
                                                        this.state.sharedProj 
                                                            ? context.sharedEpisodes.find(ep => ep.episode_title === this.state.episode_title).projformat + ' '
                                                            : context.episodes.find(ep => ep.episode_title === this.state.episode_title).projformat + ' '
                                                    }
                                                </Text>
                                                <Text  style={context.current_project_id === this.state.project_id ? styles.activeFormatGenre : styles.formatGenre}>
                                                    {
                                                        this.state.sharedProj 
                                                            ? context.sharedEpisodes.find(ep => ep.episode_title === this.state.episode_title).genre
                                                            : context.episodes.find(ep => ep.episode_title === this.state.episode_title).genre
                                                    }
                                                </Text>
                                            </View>
                                                            
                                        </View>
                                        <View style={styles.iconContainer}>
                                            {
                                                context.photoUrls.length > 0 && this.state.shared === true //make sure project get set shared when shared
                                                    ? context.photoUrls.find(obj => obj.project_id === this.state.episode_id) !== undefined 
                                                        ? context.photoUrls.find(obj => obj.project_id === this.state.episode_id).photoUrls.map(url => <ChatIcon email={url.email} 
                                                                                                unReadNum={ this.state.proj !== undefined && this.state.episode_title === undefined 
                                                                                                                                ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj) !== undefined 
                                                                                                                                    ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj).unreadMsgs === true && context.unreadMessagesStatus.find(msg => msg.title === this.state.proj) !== undefined
                                                                                                                                        ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj).numUnreadMsgs
                                                                                                                                        : null
                                                                                                                                    : null
                                                                                                                                : this.state.episode_title !== undefined 
                                                                                                                                    ? context.unreadMessagesStatus.find(msg => msg.title === this.state.episode_title) !== undefined 
                                                                                                                                        ? context.unreadMessagesStatus.find(msg => msg.title === this.state.episode_title).unreadMsgs === true && context.unreadMessagesStatus.find(msg => msg.title === this.state.episode_title) !== undefined
                                                                                                                                            ? context.unreadMessagesStatus.find(msg => msg.title === this.state.episode_title).numUnreadMsgs
                                                                                                                                            : null
                                                                                                                                        : null
                                                                                                                                    : null
                                                                                                           }   
                                                                                                sender_uid={ this.state.proj !== undefined && this.state.episode_title === undefined 
                                                                                                                ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj) !== undefined 
                                                                                                                    ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj).unreadMsgs === true && context.unreadMessagesStatus.find(msg => msg.title === this.state.proj) !== undefined
                                                                                                                        ? context.unreadMessagesStatus.find(msg => msg.title === this.state.proj).sender_uid
                                                                                                                        : null
                                                                                                                    : null
                                                                                                                : this.state.episode_title !== undefined 
                                                                                                                    ? context.unreadMessagesStatus.find(msg => msg.title === this.state.episode_title) !== undefined 
                                                                                                                        ? context.unreadMessagesStatus.find(msg => msg.title === this.state.episode_title).unreadMsgs === true && context.unreadMessagesStatus.find(msg => msg.title === this.state.episode_title) !== undefined
                                                                                                                            ? context.unreadMessagesStatus.find(msg => msg.title === this.state.episode_title).sender_uid
                                                                                                                            : null
                                                                                                                        : null
                                                                                                                    : null

                                                                                                            }  
                                                                                                unReadMessages={this.state.unreadMsgs} 
                                                                                                recipient_uid={url.uid} 
                                                                                                openUserChat={context.openUserChat} 
                                                                                                key={url.id} 
                                                                                                photoUrl={url.photo_url} 
                                                                                                proj={this.state.episode_title} 
                                                                                                
                                                                                                sharedProj={this.state.sharedProj} 
                                                                                                uni_id={this.state.episode_id}
                                                                                                project_id={this.state.project_id}/>)
                                                        : null
                                                    : null
                                            }
                                           <FontAwesomeIcon className='fa-sm iconHover' style={{marginLeft: this.state.shared === true ? 0 : 'auto'}} icon={ faEyeSlash } color={
                                                                                        context.episodes !== undefined
                                                                                            ? context.episodes.find(proj => proj.visible === false) 
                                                                                                ? context.episodes.find(proj => proj.show_hidden === true ) ? oldLace : princetonOrange
                                                                                                : 'white'
                                                                                            : 'white'
                                                                                    } onClick={this.state.visible === true 
                                                                                            ? e => context.hideEpisode(e, this.state.show_title, this.state.episode_title, this.state.sharedProj)
                                                                                            : e => context.unHideEpisode(e, this.state.show_title, this.state.episode_title, this.state.sharedProj)
                                                                                        }/>
                                            <FontAwesomeIcon style={{marginLeft: 8}} icon={faTrash} className='fa-sm iconHover' color={'white'} onClick={e => context.deleteProj(e, this.state.episode_id, this.state.episode)}/>
                                            
                                        </View>
                                    </View>
                                </View>
                        
                        : null
                                

                    )}
            </WritualContext.Consumer>
        )
    }
}

ProjectTab.defaultProps = {
    
}