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
import Welcome from '../Welcome/Welcome'

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
                  <Overview windowWidth={this.state.windowWidth} windowHeight={this.state.windowHeight} />
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
