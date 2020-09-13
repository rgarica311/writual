import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Characters from "../CharacterList/CharacterList";
import CharacterAttributeView from "../CharacterAttributeView/CharacterAttributeView";
import StoryForm from "../StoryForm/StoryForm";
import AddCharacter from "../AddCharacter/AddCharacter";
import Overview from "../Overview/Overview";
import ProjectDetails from "../ProjectDetails/ProjectDetails";
import WritualContext from "../../WritualContext";
import Login from '../Login/Login'
import ActContainer from '../ActContainer/ActContainer'
import ShareComponent from '../ShareComponent/ShareComponent'
import TreatmentEditor from '../TreatmentEditor/TreatmentEditor'
import ScreenplayEditor from '../Screenplay/Screenplay'
import Welcome from '../Welcome/Welcome'
import FeedbackForm from '../FeedbackForm/FeedbackForm'

import colorSwatches from '../../colorSwatches'

const { oldLace, darkGunMetal, detailContainer } = colorSwatches

export default class DetailView extends Component {
  constructor(props) {
    super(props);
    this.actScroll = React.createRef();
    this.state = {
      currentActNum: 1,
      history: this.props.history,
      acts: ['1', '2', '3'],
      windowHeight: this.props.windowHeight,
      windowWidth: this.props.windowWidth
    };
  }

  handleScroll = (event) => {
    let posX = event.nativeEvent.contentOffset.x
    if(posX > wp("60%") && posX < wp("60%") * 2){
      this.setState({
        currentActNum: 2
      })
    } else if (posX > wp("60%") * 2){
      this.setState({
        currentActNum: 3
      })
    } else {
      this.setState({
        currentActNum: 1
      })
    }
    //console.log('wp("60%") * 2', wp("60%") * 2)
    //console.log('posX', event.nativeEvent.contentOffset.x)
    //console.log(`${posX} > ${wp("60%")} is ${posX > wp("60%")}`)
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.windowHeight !== this.props.windowHeight || prevProps.windowWidth !== this.props.windowWidth) {
        this.setState({
            windowHeight: this.props.windowHeight,
            windowWidth: this.props.windowWidth,
        })
    }
  }

  render() {
    //console.log(`detail view rendering`)
    const styles = StyleSheet.create({
      container: {
        backgroundColor: detailContainer,
        width: this.state.windowWidth - 265,
        height: this.state.windowHeight,
        elevation: 2,
        alignItems: 'center',
        paddingBottom: 20
      },

      sceneContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        padding: 30
      },

      projTitle: {
        alignSelf: "flex-start",
        height: hp("5%"),
        color: "#15273D",
        fontSize: 20
      },

      overviewHeader: {
        fontSize: 20,
        fontFamily: 'Roboto Slab',
        color: "#15273D",
        marginBottom: 15,
        marginTop: 15,
      },

      scrollOverview: {
        overflowY: "auto",
        width: wp("80%"),
        alignItems: "center",
        padding: 30
      },

      characterViewContainer: {
        width: '92%',
        minWidth: 275,
        height: '92%',
        backgroundColor: "white",
        borderRadius: 8,
        overFlowY: "auto",
        filter: "drop-shadow(0 0 .25rem grey)",
        flexDirection: "row",
        alignSelf: 'flex-start',
      },

      treatmentViewContainer: {
        width: '90%',
        height: 900,
        backgroundColor: 'white',
        borderRadius: 8,
        overFlowY: "auto",
        filter: "drop-shadow(0 0 .25rem grey)",
        flexDirection: "row",
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center'
      },

      screenplayViewContainer: {
        width: 768,
        height: 1056,
        backgroundColor: 'white',
        borderRadius: 8,
        overFlowY: "auto",
        filter: "drop-shadow(0 0 .25rem grey)",
        flexDirection: "row",
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center'
      },

      scrollXContainer: {
        height: hp("85%"),
        width: wp("80%"),
        paddingLeft: 30
      },

      actContainerHidden: {
        width: wp("15%"),
        height: 900,
        
      }


    });
    //console.log('detail view rendering')
    return (
      <WritualContext.Consumer>
        {(context)  => (
          <View style={styles.container}>
            <ProjectDetails windowWidth={this.state.windowWidth} windowHeight={this.state.windowHeight} />
            
            
            
            {context.currentTab === "Overview"
              ? <View style={{height: this.state.windowHeight - 80, width: this.state.windowWidth - 310, paddingLeft: 50}}>
                  <View style={{ minWidth: 180, flexDirection: "row", alignSelf: "flex-start" }}>
                    <Text style={styles.overviewHeader}>
                      {context.currentProj} -{" "}
                    </Text>
                    <Text style={styles.overviewHeader}>Overview</Text>
                  </View>
                  <Overview currentProjId={context.current_project_id} 
                            getAuthToken={context.getAuthToken} 
                            getAllUserProjects={context.getAllUserProjects}
                            projformat={context.currentProjFormat} 
                            windowWidth={this.state.windowWidth} 
                            windowHeight={this.state.windowHeight}
                            currentProj={context.currentProj}
                            sharedProjClicked={context.sharedProjClicked}
                            loglineEpShared={context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id).logline : null}
                            loglineProjShared={context.sharedProjects.find(obj => obj.id === context.current_project_id) !== undefined ? context.sharedProjects.find(obj => obj.id === context.current_project_id).logline : null} 
                            loglineEp={context.episodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.episodes.find(obj => obj.uni_id === context.current_project_id).logline : null}
                            loglineProj={context.projects.find(obj => obj.id === context.current_project_id) !== undefined ? context.projects.find(obj => obj.id === context.current_project_id).logline : null}
                            authorEpShared={context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id).author : null}
                            authorProjShared={context.sharedProjects.find(obj => obj.id === context.current_project_id) !== undefined ? context.sharedProjects.find(obj => obj.id === context.current_project_id).author : null}
                            authorEp={context.episodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.episodes.find(obj => obj.uni_id === context.current_project_id).author : null}
                            authorProj={context.projects.find(obj => obj.id === context.current_project_id) !== undefined ? context.projects.find(obj => obj.id === context.current_project_id).author : null}
                            genreEpShared={context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id).genre : null}
                            genreProjShared={context.sharedProjects.find(obj => obj.id === context.current_project_id) !== undefined ? context.sharedProjects.find(obj => obj.id === context.current_project_id).genre : null} 
                            genreEp={context.episodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.episodes.find(obj => obj.uni_id === context.current_project_id).genre : null}
                            genreProj={context.projects.find(obj => obj.id === context.current_project_id) !== undefined ? context.projects.find(obj => obj.id === context.current_project_id).genre : null} 
                            projformatEpShared={context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id).projformat : null} 
                            projformatProjShared={context.sharedProjects.find(obj => obj.id === context.current_project_id) !== undefined ? context.sharedProjects.find(obj => obj.id === context.current_project_id).projformat : null}    
                            projformatEp={context.episodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.episodes.find(obj => obj.uni_id === context.current_project_id).projformat : null}
                            projformatProj={context.projects.find(obj => obj.id === context.current_project_id) !== undefined ? context.projects.find(obj => obj.id === context.current_project_id).projformat : null} 
                            budgetEpShared={context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id).budget : null}  
                            budgetProjShared={context.sharedProjects.find(obj => obj.id === context.current_project_id) !== undefined ? context.sharedProjects.find(obj => obj.id === context.current_project_id).budget : null} 
                            budgetEp={context.episodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.episodes.find(obj => obj.uni_id === context.current_project_id).budget : null}
                            budgetProj={context.projects.find(obj => obj.id === context.current_project_id) !== undefined ? context.projects.find(obj => obj.id === context.current_project_id).budget : null} 
                            timeperiodEpShared={context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id).timeperiod : null}  
                            timeperiodProjShared={context.sharedProjects.find(obj => obj.id === context.current_project_id) !== undefined ? context.sharedProjects.find(obj => obj.id === context.current_project_id).timeperiod : null}
                            timeperiodEp={context.episodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.episodes.find(obj => obj.uni_id === context.current_project_id).timeperiod : null}
                            timeperiodProj={context.projects.find(obj => obj.id === context.current_project_id) !== undefined ? context.projects.find(obj => obj.id === context.current_project_id).timeperiod : null} 
                            similarEpShared={context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.sharedEpisodes.find(obj => obj.uni_id === context.current_project_id).similarepisodes : null} 
                            similarProjShared={context.sharedProjects.find(obj => obj.id === context.current_project_id) !== undefined ? context.sharedProjects.find(obj => obj.id === context.current_project_id).similarprojects : null}
                            similarEp={context.episodes.find(obj => obj.uni_id === context.current_project_id) !== undefined ? context.episodes.find(obj => obj.uni_id === context.current_project_id).similarepisodes : null}
                            similarProj={context.projects.find(obj => obj.id === context.current_project_id) !== undefined ? context.projects.find(obj => obj.id === context.current_project_id).similarprojects : null}                  
                            />
                </View>
              : context.currentTab === "Characters"
                ? <View style={{height: this.state.windowHeight - 80, width: this.state.windowWidth - 310, paddingLeft: 50}}>

                    <View style={{ minWidth: 180, flexDirection: "row", alignSelf: "flex-start" }}>
                      <Text style={styles.overviewHeader}>
                        {context.currentProj} -{" "}
                      </Text>
                      <Text style={styles.overviewHeader}>Characters</Text>
                    </View>

                    <View style={styles.characterViewContainer}>
                      <Characters windowWidth={this.state.windowWidth} windowHeight={this.state.windowHeight} />
                      <CharacterAttributeView windowWidth={this.state.windowWidth} windowHeight={this.state.windowHeight} />
                    </View>

                  </View>
                : context.currentTab === "Scenes"
                  ? <View style={{ height: this.state.windowHeight - 80, width: this.state.windowWidth - 310, paddingLeft: 50}}>

                      <View style={{ minWidth: 180, flexDirection: "row", alignSelf: "flex-start"}}>
                        <Text style={styles.overviewHeader}>
                          {context.currentProj} - Act {this.state.currentActNum}
                        </Text>
                      </View>
                     

                      <ScrollView contentContainerStyle={{ height: this.state.windowHeight, width: this.state.windowWidth - 310, padding: 10}} scrollEventThrottle={16} horizontal={true} onScroll={e => this.handleScroll(e)}>
                          {
                            context.currentProj !== undefined 
                              ? this.state.acts.map(act => 
                                  <ActContainer getProjectScenes={context.getProjectScenes} proj={context.currentProj} project_id={context.current_project_id} projScenes={context.projScenes} key={act} idToken={context.idToken} table={context.tableName} act={act} shared={context.sharedProjClicked} windowWidth={this.state.windowWidth} windowHeight={this.state.windowHeight}/>
                                )
                              : <ActContainer />
                          }

                          <View>
                            <View style={styles.actContainerHidden}>
                          </View>
                          </View>
                      </ScrollView>

                    </View>
                  : context.currentTab === "Treatment"
                      ? <View style={{ height: this.state.windowHeight - 80, width: this.state.windowWidth - 310, paddingLeft: 50}}>

                          <View style={{minWidth: 180, flexDirection: "row", alignSelf: "flex-start"}}>
                            <Text style={styles.overviewHeader}>
                              {context.currentProj} - Treatment
                            </Text>
                          </View>

                           <View style={styles.treatmentViewContainer}>
                            <TreatmentEditor  currentProj={context.currentProj}
                                              project_id={context.currentProj !== undefined 
                                                            ? context.sharedProjClicked 
                                                                ? context.sharedProjects.find(proj => proj.title === context.currentProj) !== undefined 
                                                                    ? context.sharedProjects.find(proj => proj.title === context.currentProj).id
                                                                    : context.sharedEpisodes.find(proj => proj.episode_title === context.currentProj).project_id 
                                                                : context.projects.find(proj => proj.title === context.currentProj) !== undefined 
                                                                    ? context.projects.find(proj => proj.title === context.currentProj).id
                                                                    : context.episodes.find(proj => proj.episode_title === context.currentProj).project_id
                                                            : null}
                                              episode_id={context.currentProj !== undefined
                                                            ? context.sharedProjClicked
                                                                ? context.sharedEpisodes.find(proj => proj.episode_title === context.currentProj) !== undefined 
                                                                    ? context.sharedEpisodes.find(proj => proj.episode_title === context.currentProj).id 
                                                                    : null
                                                                : context.episodes.find(proj => proj.episode_title === context.currentProj) !== undefined 
                                                                  ? context.episodes.find(proj => proj.episode_title === context.currentProj).uni_id
                                                                  : null
                                                            : null}
                                              getAuthToken={context.getAuthToken} 
                                              
                                              getEditorState={context.getEditorState} 
                                              editorState={context.editorState}
                                              updateProjectTreatment={context.updateProjectTreatment}
                                              projects={context.projects}
                                              sharedProjects={context.sharedProjects} />
                          </View>

                        </View>

                      : context.currentTab === "Screenplay" 
                          
                        ? <ScreenplayEditor  currentProj={context.currentProj}
                                                project_id={context.currentProj !== undefined 
                                                              ? context.sharedProjClicked 
                                                                  ? context.sharedProjects.find(proj => proj.title === context.currentProj) !== undefined 
                                                                      ? context.sharedProjects.find(proj => proj.title === context.currentProj).id
                                                                      : context.sharedEpisodes.find(proj => proj.episode_title === context.currentProj).project_id 
                                                                  : context.projects.find(proj => proj.title === context.currentProj) !== undefined 
                                                                      ? context.projects.find(proj => proj.title === context.currentProj).id
                                                                      : context.episodes.find(proj => proj.episode_title === context.currentProj).project_id
                                                              : null}
                                                episode_id={context.currentProj !== undefined
                                                              ? context.sharedProjClicked
                                                                  ? context.sharedEpisodes.find(proj => proj.episode_title === context.currentProj) !== undefined 
                                                                      ? context.sharedEpisodes.find(proj => proj.episode_title === context.currentProj).id 
                                                                      : null
                                                                  : context.episodes.find(proj => proj.episode_title === context.currentProj) !== undefined 
                                                                    ? context.episodes.find(proj => proj.episode_title === context.currentProj).uni_id
                                                                    : null
                                                              : null}
                                                getAuthToken={context.getAuthToken} 
                                                
                                                getEditorState={context.getEditorState} 
                                                editorState={context.editorState}
                                                updateProjectScreenplay={context.updateProjectScreenplay}
                                                projects={context.projects}
                                                sharedProjects={context.sharedProjects}
                                                windowHeight={this.state.windowHeight}
                                                windowWidth={this.state.windowWidth} />
                          
                        : context.currentTab === "Submit Beta Feedback" 
                            ? <FeedbackForm getAuthToken={context.getAuthToken} />
                            : <Welcome/>
            }
            {
                context.renderShareComponent === true
                    ? <ShareComponent shareProject={context.shareProject} 
                                      projectToShare={context.projectToShare} 
                                      projectName={context.currentProj} 
                                      windowWidth={this.state.windowWidth} 
                                      windowHeight={this.state.windowHeight}
                                      currentProj={context.currentProj}/>
                    : null
            }
            {context.addProject === true ? <StoryForm windowWidth={this.state.windowWidth} windowHeight={this.state.windowHeight} /> : context.addEpisode === true ? <StoryForm windowWidth={this.state.windowWidth} windowHeight={this.state.windowHeight}/> : null}
            {context.addCharacter === true ? <AddCharacter windowWidth={this.state.windowWidth} windowHeight={this.state.windowHeight} /> : null}
          </View>
          )}
      </WritualContext.Consumer>
    );
  }
}
