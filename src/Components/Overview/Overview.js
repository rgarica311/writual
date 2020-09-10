import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TextInput, TouchableHighlight } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import WritualContext from '../../WritualContext'
//import TextEditor from '../TextEditor/TextEditor'
import colorSwatches from '../../colorSwatches.js'
import Feedback from '../Feedback/Feedback'
import { config } from '../../URLS'

const url = config.API_URL
console.log(`url: ${url}`)
const { darkGunMetal, whiteSmoke, princetonOrange } = colorSwatches


export default class Overview extends Component {
    constructor(props){
        super(props)
        this.state = {
            windowHeight: this.props.windowHeight,
            windowWidth: this.props.windowWidth,
            editOverview: false,
            getAuthToken: this.props.getAuthToken,
            getAllUserProjects: this.props.getAllUserProjects,
            currentProjId: this.props.currentProjId,
            currentProj: this.props.currentProj,
            loglineEpShared: this.props.loglineEpShared,
            loglineProjShared: this.props.logineProjShared,
            loglineEp: this.props.loglineEp, 
            loglineProj: this.props.loglineProj,
            authorEpShared: this.props.authorEpShared,
            authorProjShared: this.props.authorProjShared,
            authorEp: this.props.authorEp,
            authorProj: this.props.authorProj,
            genreEpShared: this.props.genreEpShared,
            genreProjShared: this.props.genreProjShared,
            genreEp: this.props.genreEp,
            genreProj: this.props.genreProj,
            projformatEpShared: this.props.projformatEpShared,
            projformatProjShared: this.props.projformatProjShared,
            projformatEp: this.props.rojformatEp,
            projformatProj: this.props.projformatProj,
            budgetEpShared: this.props.budgetEpShared,
            budgetProjShared: this.props.budgetProjShared,
            budgetEp: this.props.budgetEp,
            budgetProj: this.props.budgetProj,
            timeperiodEpShared: this.props.timeperiodEpShared,
            timeperiodProjShared: this.props.timeperiodProjShared,
            timeperiodProj: this.props.timeperiodProj,
            similarEpShared: this.props.similarEpShared,
            similarProjShared: this.props.similarProjShared,
            similarEp: this.props.similarEp,
            similarProj: this.props.similarProj,
            sharedProjClicked: this.props.sharedProjClicked
        };

    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.windowHeight !== this.props.windowHeight || prevProps.windowWidth !== this.props.windowWidth) {
            this.setState({
                windowHeight: this.props.windowHeight,
                windowWidth: this.props.windowWidth,
            })
        }

        if(prevProps.sharedProjClicked !== this.props.sharedProjClicked) {
            this.setState({
                sharedProjClicked: this.state.sharedProjClicked
            })
        }

        if(prevProps.currentProjId !== this.props.currentProjId) {
            this.setState({
                currentProjId: this.props.currentProjId,
                currentProj: this.props.currentProj,
            })
        }

        if(prevProps.loglineEpShared !== this.props.loglineEpShared) {
            this.setState({
                loglineEpShared: this.props.loglineEpShared,
                
            })
        }

        if(prevProps.loglineProjShared !== this.props.loglineProjShared) {
            this.setState({
                loglineProjShared: this.props.loglineProjShared,
                
            })
        }

        if(prevProps.projformat !== this.props.projformat) {
            this.setState({
                projformat: this.props.projformat
            })
        }
    }

    editOverview = () => {
        if(this.state.editOverview) {
            this.submitOverview()
        }
        this.setState({
            editOverview: !this.state.editOverview
        })
    }

    handleUpdateTitle = (e) => {
        this.setState({
            currentProj: e.target.value
        })
    }

     handleUpdateEpTitle = (e) => {
        this.setState({
            episode_title: e.target.value
        })
    }

    handleUpdateLogline = (e) => {
        this.setState({
            loglineProj: e.target.value
        })
    }

    handleUpdateAuthor = (e) => {
        this.setState({
            authorEpShared: e.target.value,
            authorProjShared: e.target.value,
            authorEp: e.target.value,
            authorProj: e.target.value
        })
    }

    handleUpdateGenre = (e) => {
        this.setState({
            genreEpShared: e.target.value,
            genreProjShared: e.target.value,
            genreEp: e.target.value,
            genreProj: e.target.value,
        })
    }

    handleUpdateFormat = (e) => {
        this.setState({
            projformatEpShared: e.target.value,
            projformatProjShared: e.target.value,
            projformatEp: e.target.value,
            projformatProj: e.target.value,
        })
    }

    handleUpdateBudget = (e) => {
        this.setState({
            budgetEpShared: e.target.value,
            budgetProjShared: e.target.value,
            budgetEp: e.target.value,
            budgetProj: e.target.value,

        })
    }

    handleUpdateTime = (e) => {
        this.setState({
            timeperiodEpShared: e.target.value,
            timeperiodProjShared: e.target.value,
            timeperiodEp: e.target.value,
            timeperiodProj: e.target.value,
        })
    }

    handleUpdateSimilarProj = (e) => {
        this.setState({
            similarprojectsEpShared: e.target.value,
            similarprojectsProjShared: e.target.value,
            similarprojectsEp: e.target.value,
            similarprojectsProj: e.target.value,
        })
    }

    handleUpdateSimilarEp = (e) => {
        this.setState({
            similarepisodesEpShared: e.target.value,
            similarepisodesProjShared: e.target.value,
            similarepisodesEp: e.target.value,
            similarepisodesProj: e.target.value,
        })
    }

    submitOverview = async () => {
        //post new stuff to server

        if(this.state.projformat === 'Episode') {
            const updatedProj = {
                episode_title: this.state.sharedProjClicked ? this.state.titleEpShared : this.state.titleEp,
                author: this.state.sharedProjClicked ? this.state.authorEpShared : this.state.authorEp,
                logline: this.state.sharedProjClicked ? this.state.loglineEpShared : this.state.loglineEp,
                genre: this.state.sharedProjClicked ? this.state.genreEpShared : this.state.genreEp,
                projformat: this.state.sharedProjClicked ? this.state.projformatEpShared : this.state.projformatEp,
                budget: this.state.sharedProjClicked ? this.state.budgetEpShared : this.state.budgetEp,
                timeperiod: this.state.sharedProjClicked ? this.state.timeperiodEpShared : this.state.timeperiodEp,
                similarepisodes: this.state.sharedProjClicked ? this.state.similarprojectsEpShared : this.state.similarprojectsEp,
                uni_id: this.state.currentProjId

            }
            try {
                let response = await fetch(`${url}/episodes`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': await this.state.getAuthToken()
                    },
                    body: JSON.stringify(updatedProj)
                }).then(() => {this.state.getAllUserProjects()})
            } catch(error) {
                console.error('error updating episode:', error)
            }
            
            
        } else {
            const updatedProj = {
                title: this.state.currentProj,
                author: this.state.sharedProjClicked ? this.state.authorProjShared : this.state.authorProj,
                logline: this.state.sharedProjClicked ? this.state.loglineProjShared : this.state.loglineProj,
                genre: this.state.sharedProjClicked ? this.state.genreProjShared : this.state.genreProj,
                projformat: this.state.sharedProjClicked ? this.state.projformatProjShared: this.state.projformatProj,
                budget: this.state.sharedProjClicked ? this.state.budgetProjShared : this.state.budgetProj,
                timeperiod: this.state.sharedProjClicked ? this.state.timeperiodProjShared : this.state.timeperiodProj,
                similarprojects: this.state.sharedProjClicked ? this.state.similarprojectsProjShared : this.state.similarprojectsProj,
                id: this.state.currentProjId
            }
            
            try {
                let response = await fetch(`${url}/projects`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': await this.state.getAuthToken()
                    },
                    body: JSON.stringify(updatedProj)
                }).then(() => {this.state.getAllUserProjects()})
            } catch(error) {
                console.error(`error updating project: ${error}`)
            }
            
           
        }

        
        
    }

    render(){
        //console.log('render overview')
        const styles = StyleSheet.create({
            overviewElContainer: {
                width: '90%',
                minWidth: 275,
                height: '90%',
                //justifyContent: 'space-between',
                //alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 8,
                overFlowY: 'auto',
                filter: 'drop-shadow(0 0 .25rem grey)',
                alignSelf: 'flex-start',
                overflowY: 'auto',
                flexDirection: "column",
                padding: 10

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
                justifyContent: 'center',
                display: 'flex',
                height: 55,
                minWidth: 170,
                backgroundColor: darkGunMetal,
                color: 'white'
                

            },

            text: {
                height: 55,
                fontSize: 20,
                alignItems: 'center',
                paddingLeft: 10,
                display: 'flex',
                flex: 1, 
                backgroundColor: whiteSmoke, 
                fontFamily: 'Courier'
                
            },

            textInput: {
                height: 55,
                fontSize: 20,
                alignItems: 'center',
                paddingLeft: 10,
                display: 'flex',
                flex: 1, 
                backgroundColor: "white", 
             
                fontFamily: 'Courier'
                
            },

            textLogline: {
                fontSize: 20,
                alignItems: 'center',
                paddingLeft: 10,
                display: 'flex',
                height: 55,
                flex: 1, 
                backgroundColor: whiteSmoke, 
                fontFamily: 'Courier'

            },

            textLoglineInput: {
                fontSize: 20,
                alignItems: 'center',
                paddingLeft: 10,
                display: 'flex',
                height: 55,
                flex: 1, 
                backgroundColor: "white", 
               
                fontFamily: 'Courier'

            },
            
            titleLog: {
                width: "100%",
                height: 110,
                marginBottom: 50
            },

            elTwenty: {
                flexDirection: 'row',
                width: '50%',
                height: 'max-content'
              
            },

            elTwentyLog: {
                flexDirection: 'row',
                width: '100%',
            }, 

            otherDetails: {
                width: "100%",
                flexDirection: "row",
                flexWrap: "wrap",
                height: 165
                //justifyContent: "space-between"
            },

            editOverview: {
                justifyContent: "center",
                alignItems: "center",
                height: 70,
                backgroundColor: princetonOrange, 
            }
        })
        return(
            <WritualContext.Consumer>
            {(context) => (
                context.currentProj !== undefined
                ?   <View style={styles.overviewElContainer}>
                        <View style={styles.titleLog}>
                            <View style={styles.elTwentyLog}>
                                <Text style={styles.label}>Title: </Text>
                                {
                                    this.state.editOverview
                                        ? <TextInput    style={styles.textInput} 
                                                        value={this.state.currentProj} 
                                                        onChange={e => this.handleUpdateTitle(e)}/>
                                        : <Text style={styles.text}>{context.projects.find(proj => proj.id === context.current_project_id) !== undefined 
                                                                        ? context.projects.find(proj => proj.id === context.current_project_id).title
                                                                        : context.episodes.find(ep => ep.uni_id === context.current_project_id).episode_title}</Text>
                                }
                                
                            </View>

                            <View style={styles.elTwentyLog}>
                                <Text style={styles.label}>Logline: </Text>
                                {
                                    context.sharedProjClicked === true
                                        ? context.isEpisode === true 
                                            ? this.state.editOverview && context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id).permission === "Can Edit"
                                                ? <TextInput    onChange={e => this.handleUpdateLogline(e)} 
                                                                style={styles.textLoglineInput} 
                                                                value={this.state.loglineEpShared}/>
                                                : <Text style={styles.textLogline}>{context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id).logline : null}</Text>

                                            : this.state.editOverview && context.sharedProjects.find(obj => obj.uni_id === context.current_project_id).permission === "Can Edit"
                                                ? <TextInput    onChange={e => this.handleUpdateLogline(e)} 
                                                                style={styles.textLoglineInput} 
                                                                value={this.state.loglineProjShared}/>
                                                : <Text style={styles.textLogline}>{context.sharedProjects.find(obj => obj.id === context.current_project_id) !== undefined ? context.sharedProjects.find(obj => obj.id === context.current_project_id).logline : null}</Text>

                                        : this.state.editOverview
                                            ? <TextInput onChange={e => this.handleUpdateLogline(e)} style={styles.textLoglineInput} value={context.currentProjFormat === 'Episode' 
                                                    ? this.state.loglineEp
                                                    : this.state.loglineProj}/>
                                            : <Text style={styles.textLogline}>{context.currentProjFormat === 'Episode' 
                                                    ? context.episodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.episodes.find(obj => obj.uni_id === context.current_project_id).logline : null  
                                                    : context.projects.find(obj => obj.id === context.current_project_id) !== undefined ? context.projects.find(obj => obj.id === context.current_project_id).logline : null }</Text> //make all look like this
                                }
                                
                            </View>
                        </View>
                        <View style={styles.otherDetails}>

                            <View style={styles.elTwenty}>
                                <Text style={styles.label}>Written By: </Text>
                                {
                                    context.sharedProjClicked === true
                                        ? context.isEpisode === true
                                            ? this.state.editOverview && context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id).permission === "Can Edit"
                                                ? <TextInput    onChange={e => this.handleUpdateAuthor(e)} 
                                                                style={styles.textInput} 
                                                                value={this.state.authorEpSared}/>
                                                : <Text style={styles.text}>{context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id).author : null}</Text>

                                            : this.state.editOverview && context.sharedProjects.find(obj => obj.uni_id === context.current_project_id).permission === "Can Edit"
                                                ? <TextInput    onChange={e => this.handleUpdateAuthor(e)} 
                                                                style={styles.textInput} 
                                                                value={this.state.authorProjShared}/>
                                                :<Text style={styles.text}>{context.sharedProjects.find(obj => obj.id === context.current_project_id) !== undefined ? context.sharedProjects.find(obj => obj.id === context.current_project_id).author : null}</Text>

                                        : this.state.editOverview
                                                ? <TextInput onChange={e => this.handleUpdateAuthor(e)} style={styles.textInput} value={context.currentProjFormat === 'Episode' 
                                                            ? this.state.authorEp
                                                            : this.state.authorProj}/>
                                                : <Text style={styles.text}>{context.currentProjFormat === 'Episode' 
                                                            ? context.episodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.episodes.find(obj => obj.uni_id === context.current_project_id).author : null 
                                                            : context.projects.find(obj => obj.id === context.current_project_id) !== undefined ? context.projects.find(obj => obj.id === context.current_project_id).author : null}</Text>
                                }  
                            </View>

                            <View style={styles.elTwenty}>
                                <Text style={styles.label}>Genre: </Text>
                                {
                                context.sharedProjClicked === true
                                        ? context.isEpisode === true
                                            ? this.state.editOverview && context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id).permission === "Can Edit"
                                                ? <TextInput    onChange={e => this.handleUpdateGenre(e)} 
                                                                style={styles.textInput} 
                                                                value={this.state.genreEpShared}/>
                                                : <Text style={styles.text}>{context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id).genre : null}</Text>

                                            : this.state.editOverview && context.sharedProjects.find(obj => obj.uni_id === context.current_project_id).permission === "Can Edit"
                                                ? <TextInput    onChange={e => this.handleUpdateGenre(e)} 
                                                                style={styles.textInput} 
                                                                value={this.state.genreProjShared}/>
                                                : <Text style={styles.text}>{context.sharedProjects.find(obj => obj.id === context.current_project_id) !== undefined ? context.sharedProjects.find(obj => obj.id === context.current_project_id).genre : null}</Text>

                                        : this.state.editOverview
                                                ?  <TextInput onChange={e => this.handleUpdateGenre(e)} style={styles.textInput} value={context.currentProjFormat === 'Episode' 
                                                            ? this.state.genreEp
                                                            : this.state.genreProj}/>
                                                :   <Text style={styles.text}>{context.currentProjFormat === 'Episode' 
                                                            ? context.episodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.episodes.find(obj => obj.uni_id === context.current_project_id).genre : null
                                                            : context.projects.find(obj => obj.id === context.current_project_id) !== undefined ? context.projects.find(obj => obj.id === context.current_project_id).genre : null}</Text>
                                } 
                            </View>

                            <View style={styles.elTwenty}>
                                <Text style={styles.label}>Format: </Text>
                                {
                                context.sharedProjClicked === true
                                        ? context.isEpisode === true 
                                            ? this.state.editOverview && context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id).permission === "Can Edit"
                                                ? <TextInput    onChange={e => this.handleUpdateFormat(e)} 
                                                                style={styles.textInput} 
                                                                value={this.state.projformatEpShared}/>
                                                : <Text style={styles.text}>{context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id).projformat : null}</Text>

                                            : this.state.editOverview && context.sharedProjects.find(obj => obj.uni_id === context.current_project_id).permission === "Can Edit"
                                                ? <TextInput    onChange={e => this.handleUpdateFormat(e)} 
                                                                style={styles.textInput} 
                                                                value={this.state.projformatProjShared}/>
                                                : <Text style={styles.text}>{context.sharedProjects.find(obj => obj.id === context.current_project_id) !== undefined ? context.sharedProjects.find(obj => obj.id === context.current_project_id).projformat : null}</Text>

                                        : this.state.editOverview
                                                ? <TextInput onChange={e => this.handleUpdateFormat(e)} style={styles.textInput} value={ context.currentProjFormat === 'Episode' 
                                                            ? this.state.projformatEp
                                                            : this.state.projformatProj}/>
                                                : <Text style={styles.text}>{ context.currentProjFormat === 'Episode' 
                                                            ? context.episodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.episodes.find(obj => obj.uni_id === context.current_project_id).projformat : null
                                                            : context.projects.find(obj => obj.id === context.current_project_id) !== undefined ? context.projects.find(obj => obj.id === context.current_project_id).projformat : null}</Text>
                                }
                            </View>

                            <View style={styles.elTwenty}>
                                <Text style={styles.label}>Budget: </Text>
                                {
                                context.sharedProjClicked === true
                                        ? context.isEpisode === true 
                                            ? this.state.editOverview && context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id).permission === "Can Edit"
                                                ? <TextInput    onChange={e => this.handleUpdateBudget(e)} 
                                                                style={styles.textInput} 
                                                                value={this.state.budgetEpShared}/>
                                                : <Text style={styles.text}>{context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id).budget : null}</Text>

                                            : this.state.editOverview && context.sharedProjects.find(obj => obj.uni_id === context.current_project_id).permission === "Can Edit"
                                                ? <TextInput    onChange={e => this.handleUpdateBudget(e)} 
                                                                style={styles.textInput} 
                                                                value={this.state.budgetProjShared}/>
                                                : <Text style={styles.text}>{context.sharedProjects.find(obj => obj.id === context.current_project_id) !== undefined ? context.sharedProjects.find(obj => obj.id === context.current_project_id).budget : null}</Text>

                                        : this.state.editOverview
                                                ? <TextInput onChange={e => this.handleUpdateBudget(e)} style={styles.textInput} value={context.currentProjFormat === 'Episode' 
                                                            ? this.state.budgetEp
                                                            : this.state.budgetProj}/>
                                                : <Text style={styles.text}>{context.currentProjFormat === 'Episode' 
                                                            ? context.episodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.episodes.find(obj => obj.uni_id === context.current_project_id).budget : null
                                                            : context.projects.find(obj => obj.id === context.current_project_id) !== undefined ? context.projects.find(obj => obj.id === context.current_project_id).budget : null}</Text>
                                }
                            </View>

                            <View style={styles.elTwenty}>
                                <Text style={styles.label}>Time Period: </Text>
                                {
                                context.sharedProjClicked === true
                                        ? context.isEpisode === true
                                            ? this.state.editOverview && context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id).permission === "Can Edit"
                                                ? <TextInput    onChange={e => this.handleUpdateTime(e)} 
                                                                style={styles.textInput} 
                                                                value={this.state.timeperiodEpShared}/>
                                                : <Text style={styles.text}>{context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id).timeperiod : null}</Text>
                                            : this.state.editOverview && context.sharedProjects.find(obj => obj.uni_id === context.current_project_id).permission === "Can Edit"
                                                ? <TextInput    onChange={e => this.handleUpdateTime(e)} 
                                                                style={styles.textInput} 
                                                                value={this.state.timeperiodProjShared}/>
                                                : <Text style={styles.text}>{context.sharedProjects.find(obj => obj.id === context.current_project_id) !== undefined ? context.sharedProjects.find(obj => obj.id === context.current_project_id).timeperiod : null}</Text>

                                        : this.state.editOverview 
                                                ? <TextInput    onChange={e => this.handleUpdateTime(e)} 
                                                                style={styles.textInput} value={context.currentProjFormat === 'Episode' 
                                                            ? this.state.timeperiodEp
                                                            : this.state.timeperiodProj}/>
                                                : <Text style={styles.text}>{context.currentProjFormat === 'Episode' 
                                                            ? context.episodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.episodes.find(obj => obj.uni_id === context.current_project_id).timeperiod : null
                                                            : context.projects.find(obj => obj.id === context.current_project_id) !== undefined ? context.projects.find(obj => obj.id === context.current_project_id).timeperiod : null}</Text>
                                }
                            </View>

                            <View style={styles.elTwenty}>
                                <Text style={styles.label}>Similar Projects: </Text>
                                {
                                context.sharedProjClicked === true
                                        ? context.isEpisode === true
                                            ? this.state.editOverview && context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id).permission === "Can Edit"
                                                ? <TextInput    onChange={e => this.handleUpdateSimilarEp(e)} 
                                                                style={styles.textInput} 
                                                                value={this.state.similarepisodesEpShared}/>
                                                : <Text style={styles.text}>{context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id).similarepisodes : null}</Text>

                                            : this.state.editOverview && context.sharedProjects.find(obj => obj.id === context.current_project_id).permission === "Can Edit"
                                                ? <TextInput    onChange={e => this.handleUpdateSimilarProj(e)} 
                                                                style={styles.textInput} 
                                                                value={this.state.similarprojectsProjShared}/>
                                                : <Text style={styles.text}>{context.sharedProjects.find(obj => obj.id === context.current_project_id) !== undefined ? context.sharedProjects.find(obj => obj.id === context.current_project_id).similarprojects : null}</Text>

                                        : this.state.editOverview
                                                ? <TextInput onChange={context.currentProjFormat === 'Episode' ? e => this.handleUpdateSimilarEp(e) : e => this.handleUpdateSimilarProj(e)} style={styles.textInput} 
                                                value={context.currentProjFormat === 'Episode' 
                                                            ? this.state.similarepisodesEp
                                                            : this.state.similarprojectsProj}/>
                                                : <Text style={styles.text}>{context.currentProjFormat === 'Episode' 
                                                            ? context.episodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.episodes.find(obj => obj.uni_id === context.current_project_id).similarepisodes : null
                                                            : context.projects.find(obj => obj.id === context.current_project_id) !== undefined ? context.projects.find(obj => obj.id === context.current_project_id).similarprojects : null}</Text>
                                }
                            </View>
                        </View>

                        <TouchableHighlight style={styles.editOverview} onPress={this.editOverview}>
                            {
                                this.state.editOverview
                                    ? <Text style={{color: "white", fontSize: "2em", fontFamily: "Varela Round"}}>Submit</Text>
                                    : <Text style={{color: "white", fontSize: "2em", fontFamily: "Varela Round"}}>Edit Overview</Text>
                            }
                            
                        </TouchableHighlight>

                        <Feedback   currentProj={context.currentProj}
                                    project_id={context.currentProj !== undefined 
                                                ? context.sharedProjClicked 
                                                    ? context.sharedProjects.find(proj => proj.id === context.current_project_id) !== undefined 
                                                        ? context.sharedProjects.find(proj => proj.id === context.current_project_id) !== undefined ? context.sharedProjects.find(proj => proj.id === context.current_project_id).id : null
                                                        : context.sharedEpisodes.find(proj => proj.uni_id === context.current_project_id) !== undefined ? context.sharedEpisodes.find(proj => proj.uni_id === context.current_project_id).project_id : null
                                                    : context.projects.find(proj => proj.id === context.current_project_id) !== undefined 
                                                        ? context.projects.find(proj => proj.id === context.current_project_id) !== undefined ? context.projects.find(proj => proj.id === context.current_project_id).id : null
                                                        : context.episodes.find(proj => proj.uni_id === context.current_project_id) !== undefined ? context.episodes.find(proj => proj.uni_id === context.current_project_id).project_id : null
                                                : null}
                                    episode_id={context.currentProj !== undefined
                                                ? context.sharedProjClicked
                                                    ? context.sharedEpisodes.find(proj => proj.uni_id === context.current_project_id) !== undefined 
                                                        ? context.sharedEpisodes.find(proj => proj.uni_id === context.current_project_id) !== undefined ? context.sharedEpisodes.find(proj => proj.uni_id === context.current_project_id).id : null
                                                        : null
                                                    : context.episodes.find(proj => proj.uni_id === context.current_project_id) !== undefined 
                                                        ? context.episodes.find(proj => proj.uni_id === context.current_project_id) !== undefined ? context.episodes.find(proj => proj.uni_id === context.current_project_id).uni_id : null
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
            