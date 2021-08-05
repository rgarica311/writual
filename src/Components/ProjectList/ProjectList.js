import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import WritualContext from '../../WritualContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp, faAngleDown, faEye } from '@fortawesome/free-solid-svg-icons';
import ProjectTab from '../ProjectTab/ProjectTab'
import WritualHeader from '../WritualHeader/WritualHeader'
import './ProjectList.css'
import colorSwatches from '../../colorSwatches'
import ChatIcon from '../ChatIcon/ChatIcon'

const { darkGunMetal, yankeesBlue, princetonOrange, oldLace, projectHeader, headerText, headerIcon } = colorSwatches


export default class ProjectList extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            episodeNum: 0,
            windowHeight: this.props.windowHeight,
            windowWidth: this.props.windowWidth,
            test: this.props.test,
            renderChat: this.props.renderChat
        }
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.windowHeight !== this.props.windowHeight || prevProps.windowWidth !== this.props.windowWidth) {
            this.setState({
                windowHeight: this.props.windowHeight,
                windowWidth: this.props.windowWidth,
            })
        } else if (prevProps.renderChat !== this.props.renderChat) {
            this.setState({
                renderChat: this.props.renderChat
            })
        }
    }


    render(){
        //console.log('proj list rendering test:', this.props.test)
        const styles = StyleSheet.create({  
            addminus: {
                flexDirection: 'row', 
                width: Platform.OS === 'web' ? wp('20%') : wp('100'),
                height: Platform.OS === 'web' ? hp('10%') : 55,
                justifyContent: 'space-evenly',
                alignItems: 'center',
            },

            projectHeader: {
                alignItems: 'center',
                backgroundColor: projectHeader,
                height: 65,
                borderBottomColor: '#293E4F',
                borderBottomWidth: 1,
                padding: 15,
                flexDirection: 'row',
            },

            projListContainer: {
                height: this.state.windowHeight,
                //minHeight: 689,
                width: 265,
                //minWidth: 200,
                backgroundColor: darkGunMetal,
               
            },

            projects: {
                maxHeight: "40%",
                minHeight: 0,
                overflowY: 'scroll',
                overflowX: 'hidden'
            },

            sharedProjects: {
                overflowY: 'scroll',
                overflowX: 'hidden',
                height: 475,
                minHeight: 0
            },

            signedInAsText: {
                color: 'white'
            },

            iconContainer: {
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: 120,
                marginLeft: 'auto',

            },

            item: {
                elevation: 2,
                backgroundColor: darkGunMetal,
                borderBottomColor: '#293E4F',
                borderBottomWidth: 1,
                cursor: 'pointer', 
                height: hp('10%'),
                justifyContent: 'space-evenly'
            },
          
        })

        return(
            <WritualContext.Consumer>
                {(context) => ( 
                    context.projects !== undefined
                        ?   <View style={styles.projListContainer}>
                            
                                <WritualHeader/>
                                
                                <View style={styles.projectHeader}>
                                    
                                    <Text style={{marginLeft: 15, fontWeight: 'bold', color: headerText}}>PROJECTS</Text>
                                    
                                    <View style={styles.iconContainer}>
                                        {
                                            <FontAwesomeIcon    onClick={context.addProj} color={headerIcon} className='fa-sm iconHover' icon={faPlus}/>
                                        }
                                        {
                                            <FontAwesomeIcon    icon={ faEye }  style={{marginLeft: 'auto'}}  
                                                                color={
                                                                    context.projects !== undefined
                                                                        ? context.projects.find(proj => proj.visible === false) 
                                                                            ? context.projects.find(proj => proj.show_hidden === true ) ? oldLace : princetonOrange
                                                                            : headerIcon
                                                                        : headerIcon
                                                                }
                                                                onClick={e => context.showHiddenProjects(e)}
                                                                className='fa-sm iconHover' />

                                        }
                                        {
                                            context.renderUpArrow === true
                                                ? <FontAwesomeIcon  style={{marginLeft: 'auto'}} color={headerIcon} className='fa-sm iconHover' icon={ faAngleUp } onClick={ context.collapseProjectList }/>
                                                : <FontAwesomeIcon  style={{marginLeft: 'auto'}} color={headerIcon} className='fa-sm iconHover' icon={ faAngleDown } onClick = { context.expandProjectList }/>

                                        }

                                    </View>
                                    
                                
                                </View>

                                {
                                    this.state.renderChat
                                        ?   <View>
                                                {
                                                    context.photoUrls.find(obj => obj.project_id === context.current_project_id || obj.project_id === context.current_project_id) !== undefined //episode fix this here for epsioes shared also fix new projects having shared set on creation
                                                        ? context.photoUrls.find(obj => obj.project_id === context.current_project_id || obj.project_id === context.current_project_id).photoUrls.map(url => <ChatIcon email={url.email} 
                                                                                                unReadNum={ context.currentProj !== undefined 
                                                                                                                ? context.unreadMessagesStatus.find(msg => msg.title === context.currentProj) !== undefined 
                                                                                                                    ? context.unreadMessagesStatus.find(msg => msg.title === context.currentProj).unreadMsgs === true
                                                                                                                        ? context.unreadMessagesStatus.find(msg => msg.title === context.currentProj).numUnreadMsgs
                                                                                                                        : null
                                                                                                                    : null
                                                                                                                : context.episodeTitle !== undefined 
                                                                                                                    ? context.unreadMessagesStatus.find(msg => msg.title === context.currentProj) !== undefined
                                                                                                                        ? context.unreadMessagesStatus.find(msg => msg.title === context.currentProj).unreadMsgs === true
                                                                                                                            ? context.unreadMessagesStatus.find(msg => msg.title === context.episodeTitle).numUnreadMsgs
                                                                                                                            : null
                                                                                                                        : null
                                                                                                                    : null
                                                                                                            }  
                                                                                                sender_uid={ context.currentProj !== undefined
                                                                                                                ? context.unreadMessagesStatus.find(msg => msg.title === context.currentProj) !== undefined 
                                                                                                                    ? context.unreadMessagesStatus.find(msg => msg.title === context.currentProj).unreadMsgs === true
                                                                                                                        ? context.unreadMessagesStatus.find(msg => msg.title === context.currentProj).sender_uid
                                                                                                                        : null
                                                                                                                    : null
                                                                                                                : context.episodeTitle !== undefined 
                                                                                                                    ? context.unreadMessagesStatus.find(msg => msg.title === context.currentProj) !== undefined 
                                                                                                                        ? context.unreadMessagesStatus.find(msg => msg.title === context.currentProj).unreadMsgs === true
                                                                                                                            ? context.unreadMessagesStatus.find(msg => msg.title === context.episodeTitle).sender_uid
                                                                                                                            : null
                                                                                                                        : null
                                                                                                                    : null

                                                                                                            }
                                                                                                recipient_uid={url.uid} 
                                                                                                openUserChat={context.openUserChat} 
                                                                                                key={url.id} 
                                                                                                photoUrl={url.photo_url} 
                                                                                                user_name={url.user_name}
                                                                                                proj={context.currentProj !== undefined ? context.currentProj : context.episodeTitle} 
                                                                                                uid={context.uid}
                                                                                                episode_id={context.episode_id}
                                                                                                sharedProj={this.state.sharedProj} 
                                                                                                uni_id={context.current_project_id}
                                                                                                project_id={context.current_project_id}/>)
                                                        : null
                                                }

                                            </View>
                                        :   <View style={{ maxHeight: "calc(100% - 135px)"}}>
                                                <View style={styles.projects}> 
                           
                                                    {
                                                        context.projects !== undefined  
                                                            ? context.renderUpArrow === true 
                                                                ? context.projects.map(obj => 
                                                                        
                                                                        obj.visible === true || obj.visible === false && obj.show_hidden === true
                                                                            ? obj.projformat === 'Television'
                                                                                ?   <View key={obj.id}>
                                                                                        <ProjectTab shared={obj.shared} 
                                                                                                    episode={false} 
                                                                                                    projformat={obj.projformat} 
                                                                                                    visible={obj.visible} 
                                                                                                    sharedProj={false} 
                                                                                                    project_id={obj.id} 
                                                                                                    key={obj.title} 
                                                                                                    proj={obj.title} 
                                                                                                    framework={obj.framework}
                                                                                                    table={context.tableName}
                                                                                                    getChatIconUrls={context.getChatIconUrls} 
                                                                                                    getAuthToken={context.getAuthToken}/>
                                                                                        {
                                                                                            context.episodes !== undefined
                                                                                                ? context.renderUpTvArrow === true
                                                                                                    ? context.episodes.map(episode => 
                                                                                                        episode.visible === true || episode.visible === false && episode.show_hidden === true
                                                                                                            ? episode.project_id === obj.id
                                                                                                                    ? <ProjectTab episode={true} 
                                                                                                                                episodeNum={this.state.episodeNum += 1}
                                                                                                                                visible={episode.visible} 
                                                                                                                                sharedProj={false} 
                                                                                                                                shared={episode.shared}
                                                                                                                                projformat={episode.projformat}
                                                                                                                                project_id={episode.project_id}
                                                                                                                                episode_id={episode.uni_id} 
                                                                                                                                table={context.tableName}
                                                                                                                                
                                                                                                                                isEpisode={true}
                                                                                                                                key={episode.uni_id} 
                                                                                                                                episode_title={episode.episode_title} 
                                                                                                                                show_title={episode.show_title}
                                                                                                                                proj={episode.show_title}
                                                                                                                                framework={episode.framework}
                                                                                                                                getChatIconUrls={context.getChatIconUrls} 
                                                                                                                                getAuthToken={context.getAuthToken}/>
                                                                                                                    : null
                                                                                                            : null
                                                                                                    )
                                                                                                    : null
                                                                                                : null
                                                                                            
                                                                                        }
                                                                                    </View>
                                                                                : <ProjectTab   getAuthToken={context.getAuthToken} 
                                                                                                getChatIconUrls={context.getChatIconUrls} 
                                                                                                episode={false} 
                                                                                                project_id={obj.id} 
                                                                                                projformat={obj.projformat} 
                                                                                                visible={obj.visible} 
                                                                                                table={context.tableName}
                                                                                                shared={obj.shared} 
                                                                                                uid={obj.uid} 
                                                                                                sharedProj={false} 
                                                                                                project_id={obj.id} 
                                                                                                key={obj.title} 
                                                                                                proj={obj.title} 
                                                                                                framework={obj.framework}/>
                                                                                    
                                                                    
                                                                            : null
                                                                    )
                                                                : null
                                                            : null

                                                    }

                                                </View>

                                                <View style={styles.projectHeader}>
                                                    <Text style={{marginLeft: 15, fontWeight: 'bold', color: headerText}}>SHARED WITH ME</Text>
                                                    
                                                    <FontAwesomeIcon    icon={ faEye } style={{marginLeft: 'auto'}} 
                                                                        color={context.sharedProjects !== undefined
                                                                                        ? context.sharedProjects.find(proj => proj.visible === false) 
                                                                                            ? context.sharedProjects.find(proj => proj.show_hidden === true ) ? oldLace : princetonOrange
                                                                                            : headerIcon
                                                                                        : headerIcon}
                                                                        onClick={e => context.showHiddenSharedProjects(e)}
                                                                        className='fa-sm iconHover' />
                                                    
                                                    {
                                                        context.renderSharedUpArrow === true
                                                            ? <FontAwesomeIcon  style={{marginLeft: 'auto'}} color={headerIcon} className='fa-sm iconHover' 
                                                                                icon={ faAngleUp } 
                                                                                onClick={ context.collapseSharedProjectList }/>
                                                            : <FontAwesomeIcon  style={{marginLeft: 'auto'}} color={headerIcon} className='fa-sm iconHover' 
                                                                                icon={ faAngleDown } 
                                                                                onClick = { context.expandSharedProjectList }/>

                                                    }
                                                </View>
                                                <View style={styles.sharedProjects}>
                                                    {
                                                        context.sharedProjects !== undefined
                                                            ? context.renderSharedUpArrow === true 
                                                                ? context.sharedProjects.map(obj => 
                                                                    obj.visible === true || obj.visible === false && obj.show_hidden === true
                                                                        ? obj.projformat === 'Television'
                                                                            ?   <View key={obj.id}>
                                                                                        <ProjectTab getAuthToken={context.getAuthToken} 
                                                                                                    getChatIconUrls={context.getChatIconUrls} 
                                                                                                    episode={false} 
                                                                                                    projformat={obj.projformat} 
                                                                                                    visible={obj.visible} 
                                                                                                    table={context.tableName}
                                                                                                    shared={true} 
                                                                                                    sharedProj={true} 
                                                                                                    project_id={obj.id}  
                                                                                                    key={obj.title} 
                                                                                                    proj={obj.title} 
                                                                                                    framework={obj.framework}/>
                                                                                        {
                                                                                            context.sharedEpisodes !== undefined
                                                                                                ? context.renderUpTvArrowShared === true
                                                                                                    ? context.sharedEpisodes.map(episode => 
                                                                                                        episode.visible === true || episode.visible === false && episode.show_hidden === true
                                                                                                            ?   <ProjectTab episode={true} 
                                                                                                                            episodeNum={this.state.episodeNum += 1}
                                                                                                                            visible={episode.visible} 
                                                                                                                            sharedProj={true} 
                                                                                                                            shared={true}
                                                                                                                            table={context.tableName}
                                                                                                                            projformat={episode.projformat}
                                                                                                                            project_id={episode.project_id}
                                                                                                                            uni_id={episode.id}
                                                                                                                            key={episode.id} 
                                                                                                                            episode_id={episode.id} 
                                                                                                                            episode_title={episode.episode_title} 
                                                                                                                            show_title={episode.show_title}
                                                                                                                            proj={episode.show_title}
                                                                                                                            framework={episode.framework}
                                                                                                                            getChatIconUrls={context.getChatIconUrls} 
                                                                                                                            getAuthToken={context.getAuthToken}/>
                                                                                                            : null
                                                                                                        )
                                                                                                            
                                                                                                    : null
                                                                                                : null
                                                                                            
                                                                                        }
                                                                                </View>
                                                                            : <ProjectTab   getAuthToken={context.getAuthToken} 
                                                                                            getChatIconUrls={context.getChatIconUrls} 
                                                                                            episode={false} 
                                                                                            visible={obj.visible} 
                                                                                            shared={true} 
                                                                                            table={context.tableName}
                                                                                            sharedProj={true} 
                                                                                            project_id={obj.id}  
                                                                                            key={obj.title} 
                                                                                            proj={obj.title} 
                                                                                            framework={obj.framework}/>
                                                                            
                                                                        : null

                                                                        
                                                                )
                                                                :null
                                                            : null
                                                    }
                                                </View>
                                            </View>
                                }

                            

                            

                            
                            </View>
                                    
                        : this.state.test !== undefined 
                            ? this.state.test.map(title => <ProjectTab key={title} proj={title}/>)
                            :  null

                )}
            </WritualContext.Consumer>
            
        )
    }
}