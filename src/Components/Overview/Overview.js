import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import WritualContext from '../../WritualContext'
//import TextEditor from '../TextEditor/TextEditor'
import colorSwatches from '../../colorSwatches.js'
import Feedback from '../Feedback/Feedback'

const { darkGunMetal, whiteSmoke } = colorSwatches


export default class Overview extends Component {
    constructor(props){
        super(props)
        this.state = {
            windowHeight: this.props.windowHeight,
            windowWidth: this.props.windowWidth
        };

    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.windowHeight !== this.props.windowHeight || prevProps.windowWidth !== this.props.windowWidth) {
            this.setState({
                windowHeight: this.props.windowHeight,
                windowWidth: this.props.windowWidth,
            })
        }
    }

    render(){
        //console.log('render overview')
        const styles = StyleSheet.create({
            overviewElContainer: {
                width: '100%',
                minWidth: 275,
                height: '95%',
                justifyContent: 'space-evenly',
                //alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 8,
                overFlowY: 'auto',
                filter: 'drop-shadow(0 0 .25rem grey)',
                //alignSelf: 'flex-start',
                overflowY: 'auto',
                flexDirection: "row",
                padding: 10,
                marginTop: 25

            },

            editor: {
                border: '1px solid gray',
                width: Platform.OS === 'web' ? wp('65%') : wp('100%'),
                height: Platform.OS === 'web' ? hp('70%') : hp('100%'),
                backgroundColor: 'white'
            },

            overviewElement: {
                flexDirection: 'row',
            },

            logLine: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            
            },

            label: {
                
                fontWeight: 'bold',
                fontSize: 20,
                alignItems: 'center',
                display: 'flex',
                height: 55,
                minWidth: 170,
                color: 'black'
                

            },

            text: {
                //width: 500,
                fontSize: 20,
                alignItems: 'center',
                paddingLeft: 10,
                display: 'flex',
                flex: 1, 
                fontFamily: 'Courier',
                borderBottomWidth: 1,
                borderBottomColor: 'lightgray',
                padding: 5,
                width: "100%"
            },

            textLogline: {
                //width: 800,
                width: "100%",
                fontSize: 20,
                alignItems: 'center',
                paddingLeft: 10,
                display: 'flex',
                flex: 1, 
                padding: 5,
                fontFamily: 'Courier',
                borderBottomWidth: 1,
                borderBottomColor: 'lightgray'

            },
            
            titleLog: {
                width: "100%",
                height: 110,
                marginBottom: 50
            },

            elTwenty: {
                flexDirection: 'row',
                width: '100%',
                height: 'max-content'
              
            },

            elTwentyLog: {
                flexDirection: 'row',
                width: '100%',
            }, 

            details: {
                width: "100%",
                height: 850,
                flexDirection: "column",
                justifyContent: "space-evenly",
                //justifyContent: "space-between"
            },

             overviewHeader: {
                fontSize: 40,
                fontWeight: 'bold',
                fontFamily: 'Roboto Slab',
                color: "#15273D",
                marginBottom: 15,
                marginTop: 15,
            },
        })
        return(
            <WritualContext.Consumer>
            {(context) => (
                context.currentProj !== undefined
                ?   <View style={styles.overviewElContainer}>
                        <View style={{width: "45%", height: "100%"}}>
                            <View style={{ minWidth: 180, flexDirection: "row", alignSelf: "center" }}>
                                <Text style={styles.overviewHeader}>
                                    {context.currentProj} 
                                </Text>
                            </View>
                            <View style={styles.details}>
                                <View style={styles.elTwentyLog}>
                                    <Text style={styles.label}>Title: </Text>
                                    <Text style={styles.text}>{context.currentProj}</Text>
                                </View>

                                <View style={styles.elTwentyLog}>
                                    <Text style={styles.label}>Logline: </Text>
                                    {
                                        context.sharedProjClicked === true
                                            ? context.isEpisode === true 
                                                ? <Text style={styles.textLogline}>{context.sharedEpisodes.find(obj => obj.episode_title === context.currentProj).logline}</Text>

                                                : <Text style={styles.textLogline}>{context.sharedProjects.find(obj => obj.title === context.currentProj).logline}</Text>

                                            : <Text style={styles.textLogline}>{context.currentProjFormat === 'Episode' 
                                                        ? context.episodes.find(obj => obj.episode_title === context.currentProj).logline  
                                                        : context.projects.find(obj => obj.title === context.currentProj).logline }</Text>
                                    }
                                    
                                </View>

                                <View style={styles.elTwenty}>
                                    <Text style={styles.label}>Written By: </Text>
                                    {
                                        context.sharedProjClicked === true
                                            ? context.isEpisode === true
                                                ? <Text style={styles.text}>{context.sharedEpisodes.find(obj => obj.episode_title === context.currentProj).author}</Text>

                                                : <Text style={styles.text}>{context.sharedProjects.find(obj => obj.title === context.currentProj).author}</Text>

                                            : <Text style={styles.text}>{context.currentProjFormat === 'Episode' 
                                                                ? context.episodes.find(obj => obj.episode_title === context.currentProj).author 
                                                                : context.projects.find(obj => obj.title === context.currentProj).author}</Text>
                                    }  
                                </View>

                                <View style={styles.elTwenty}>
                                    <Text style={styles.label}>Genre: </Text>
                                    {
                                    context.sharedProjClicked === true
                                            ? context.isEpisode === true
                                                ? <Text style={styles.text}>{context.sharedEpisodes.find(obj => obj.episode_title === context.currentProj).genre}</Text>

                                                : <Text style={styles.text}>{context.sharedProjects.find(obj => obj.title === context.currentProj).genre}</Text>

                                            :   <Text style={styles.text}>{context.currentProjFormat === 'Episode' 
                                                                ? context.episodes.find(obj => obj.episode_title === context.currentProj).genre 
                                                                : context.projects.find(obj => obj.title === context.currentProj).genre}</Text>
                                    } 
                                </View>

                                <View style={styles.elTwenty}>
                                    <Text style={styles.label}>Format: </Text>
                                    {
                                    context.sharedProjClicked === true
                                            ? context.isEpisode === true 
                                                ? <Text style={styles.text}>{context.sharedEpisodes.find(obj => obj.episode_title === context.currentProj).projformat}</Text>

                                                : <Text style={styles.text}>{context.sharedProjects.find(obj => obj.title === context.currentProj).projformat}</Text>

                                            : <Text style={styles.text}>{ context.currentProjFormat === 'Episode' 
                                                                ? context.episodes.find(obj => obj.episode_title === context.currentProj).projformat
                                                                : context.projects.find(obj => obj.title === context.currentProj).projformat}</Text>
                                    }
                                </View>

                                <View style={styles.elTwenty}>
                                    <Text style={styles.label}>Budget: </Text>
                                    {
                                    context.sharedProjClicked === true
                                            ? context.isEpisode === true 
                                                ? <Text style={styles.text}>{context.sharedEpisodes.find(obj => obj.episode_title === context.currentProj).budget}</Text>

                                                : <Text style={styles.text}>{context.sharedProjects.find(obj => obj.title === context.currentProj).budget}</Text>

                                            : <Text style={styles.text}>{context.currentProjFormat === 'Episode' 
                                                                ? context.episodes.find(obj => obj.episode_title === context.currentProj).budget
                                                                : context.projects.find(obj => obj.title === context.currentProj).budget}</Text>
                                    }
                                </View>

                                <View style={styles.elTwenty}>
                                    <Text style={styles.label}>Time Period: </Text>
                                    {
                                    context.sharedProjClicked === true
                                            ? context.isEpisode === true
                                                ? <Text style={styles.text}>{context.sharedEpisodes.find(obj => obj.episode_title === context.currentProj).timeperiod}</Text>
                                                : <Text style={styles.text}>{context.sharedProjects.find(obj => obj.title === context.currentProj).timeperiod}</Text>

                                            : <Text style={styles.text}>{context.currentProjFormat === 'Episode' 
                                                                ? context.episodes.find(obj => obj.episode_title === context.currentProj).timeperiod
                                                                : context.projects.find(obj => obj.title === context.currentProj).timeperiod}</Text>
                                    }
                                </View>

                                <View style={styles.elTwenty}>
                                    <Text style={styles.label}>Similar Projects: </Text>
                                    {
                                    context.sharedProjClicked === true
                                            ? context.isEpisode === true
                                                ? <Text style={styles.text}>{context.sharedEpisodes.find(obj => obj.episode_title === context.currentProj).similarepisodes}</Text>

                                                : <Text style={styles.text}>{context.sharedProjects.find(obj => obj.title === context.currentProj).similarprojects}</Text>

                                            : <Text style={styles.text}>{context.currentProjFormat === 'Episode' 
                                                                ? context.episodes.find(obj => obj.episode_title === context.currentProj).similarepisodes
                                                                : context.projects.find(obj => obj.title === context.currentProj).similarprojects}</Text>
                                    }
                                </View>
                            </View>
                           
                                
                            
                        </View>

                        <Feedback   currentProj={context.currentProj}
                                    project_id={context.currentProj !== undefined 
                                                ? context.sharedProjClicked 
                                                    ? context.sharedProjects.find(proj => proj.title === context.currentProj) !== undefined 
                                                        ? context.sharedProjects.find(proj => proj.title === context.currentProj).id
                                                        : context.sharedEpisodes.find(proj => proj.episode_title === context.currentProj).project_id 
                                                    : context.projects.find(proj => proj.title === context.currentProj) !== undefined 
                                                        ? context.projects.find(proj => proj.title === context.currentProj).id
                                                        : context.episodes.find(proj => proj.episode_title === context.currentProj).project_id
                                                : null}
                                    episode_id={context.currentProj !== undefined && context.currentProjFormat === 'episode'
                                                ? context.sharedEpisodes !== undefined
                                                    ? console.log('context.sharedEpisodes: ', context.sharedEpisodes)
                                                        ? context.sharedEpisodes.find(proj => proj.episode_title === context.currentProj).id 
                                                        : null
                                                    : context.episodes.find(proj => proj.episode_title === context.currentProj) !== undefined 
                                                        ? context.episodes.find(proj => proj.episode_title === context.currentProj).uni_id
                                                        : null
                                                : null}
                                    getAuthToken={context.getAuthToken} 
                                    
                                    getEditorState={context.getEditorState} 
                                    editorState={context.editorState}
                                    updateFeedback={context.updateFeedback}
                                    projects={context.projects}
                                    sharedProjects={context.sharedProjects}
                                    reviewer={context.displayName}
                                    sharedProjClicked={context.sharedProjClicked} />

                        

                    </View>

                   
                : <View style={styles.overviewElContainer}><Text><Text style={{fontSize: 22, fontFamily:'Coustard', alignSelf: 'center'}}>No project selected. Select a project to view Overview.</Text></Text></View>
            )}
            </WritualContext.Consumer>
        )
    }
}
            