import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Scene from "../Scene/Scene";
import WritualContext from "../../WritualContext";
import ActInstructions from '../ActInstructions/ActInstructions'
import { config } from '../../URLS'

const url = config.API_URL



export default class ActContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            act: props.act,
            table: props.table,
            idToken: props.idToken,
            projScenes: props.projScenes,
            prevAct: undefined,
            currentActOneStep: undefined,
            currentActTwoStep: undefined,
            currentActThreeStep: undefined,
            currentStep: undefined,
            currentAct: undefined,
            sharedProjectClicked: props.shared, 
            proj: props.proj,
            getProjectScenes: props.getProjectScenes,
            project_id: this.props.project_id,
            windowHeight: this.props.windowHeight,
            windowWidth: this.props.windowWidth
        }
    }

    componentDidMount() {
        //console.log('actcontainer component did mount')
        this.getSteps()
    }

    componentDidUpdate(prevProps, prevState) {
        //console.log(`ActContainer did update prevProps: ${JSON.stringify(prevProps.projScenes[0].project_id)}`)
        if(prevProps.projScenes !== undefined) {
            if(prevProps.projScenes.length > 0 && this.props.projScenes.length > 0 ) {
                if(prevProps.projScenes[0].project_id !== this.props.projScenes[0].project_id){
                //console.log(`ActContainer did update: ${prevProps.projScenes[0].project_id} !== ${this.props.projScenes[0].project_id }`)
                    this.setState({
                        projScenes: this.props.projScenes
                    })
                } 
            }
            if (prevProps.projScenes.length !== this.props.projScenes.length) {
            this.setState({
                projScenes: this.props.projScenes
            })
        }
        
  
            if (prevProps.proj !== this.props.proj) {
                //console.log(`update this.props.projScenes ${JSON.stringify(this.props.projScenes)}`)
                this.setState({
                    proj: this.props.proj,
                    project_id: this.props.project_id,
                    table: this.props.table
                }, () => {
                    this.getSteps()
                    this.state.getProjectScenes(this.state.project_id, this.state.sharedProjectClicked)
                })
            }
        }

        if(prevProps.table !== this.props.table) {
            this.setState({
                table: this.props.table
            })
        }

        if(prevState.currentActOneStep !== this.state.currentActOneStep || prevState.currentActTwoStep !== this.state.currentActTwoStep || prevState.currentActThreeStep !== this.state.currentActThreeStep) {
            this.setState({
                projScenes: this.props.projScenes
            })
        }
        

        
    }

    getSteps = async () => {
       //console.log(`get steps running: {this.state.table} {this.state.act} : ${this.state.table} ${this.state.act}`)
            try {
                
                let response = await fetch(`${url}/${this.state.table}/${this.state.act}`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': this.state.idToken
                    },
                    }).then(async response =>  {
                    if(!response.ok){
                        throw new Error(response.status)
                    } else {
                        this.setState({
                            steps: await response.json()
                        })
                    }

                    }).catch(error => console.error('Error:', error));
                    
        
            } catch(error) {
                console.error('error', error)
            }
        //console.log(`idToken ${this.state.idToken}`)
    }

    handleActOneStepClick = (step, act) => {
        //console.log('act', act)
        this.setState({
            currentActOneStep: step,
            currentStep: step, 
            currentAct: act
        }, () => {
            //console.log(`debug instructions: after act one step click setState this.state.currentAct ${this.state.currentAct}`)
        })

    }

    handleActTwoStepClick = (step, act) => {
        //console.log('act 2 step click', step)
        this.setState({
            currentActTwoStep: step,
            currentStep: step,
            currentAct: act
        })
    }

    handleActThreeStepClick = (step, act) => {
        //console.log('act 3 step click', step)
        this.setState({
            currentActThreeStep: step,
            currentStep: step,
            currentAct: act
        })
    }

    render(){
        //console.log('Act Container render')
        const styles = StyleSheet.create({
            actContainer: {
                backgroundColor: "white",
                borderRadius: 8,
                filter: "drop-shadow(0 0 .26rem grey)",
                width: '90%',
                minWidth: 760,
                height: '85%',
                minHeight: this.state.windowHeight < 936 ? 790 : 825,
                //flexDirection: "row",
                //flexWrap: "wrap",
                marginRight: 30,
                //justifyContent: 'center'
            },

            text: {
                color: 'black',
                fontSize: 30,
                textTransform: 'uppercase',
                fontFamily: 'Courier',
                fontWeight: 'bold',
                textAlign: 'center',
                
                position: 'relative',
            },

            stepsContainer: {
                flexDirection: 'row', 
                width: wp('65%'), 
                //marginTop: 300,
                //position: 'absolute',
                zIndex: 1,
                alignSelf: 'center',
            },

            addScenesContainer: {
                alignSelf: 'center',
                width: 'auto',
                height: 'max-content',
                position: 'absolute',
                marginLeft: 'auto',
                marginRight: 'auto',
                right: 0,
                left: 0
                
            }


        });
        //console.log('act container render')
        return (
            <WritualContext.Consumer>
            {(context) => (
                context.currentProj !== undefined
                    ? <View style={styles.actContainer}>
                        {
                            this.state.steps !== undefined
                                ? <ActInstructions  handleActOneStepClick={this.handleActOneStepClick} 
                                                    handleActTwoStepClick={this.handleActTwoStepClick} 
                                                    handleActThreeStepClick={this.handleActThreeStepClick} 
                                                    steps={this.state.steps} 
                                                    currentStep={this.state.currentStep}
                                                    table={this.state.tableName} 
                                                    act={this.state.act}
                                                    currentActOneStep={this.state.currentActOneStep !== undefined ? this.state.currentActOneStep : null}
                                                    currentActTwoStep={this.state.currentActTwoStep !== undefined ? this.state.currentActTwoStep : null}
                                                    currentActThreeStep={this.state.currentActThreeStep !== undefined ? this.state.currentActThreeStep : null} 
                                                    currentAct={this.state.currentAct}
                                                    prevAct={this.state.prevAct !== undefined ? this.state.prevAct : null}/>
                                : null
                        }

                        {<View style={{height:'65%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'flex-start', flex: 1, padding: 15, overflowY: 'scroll'}}>
                            <View style={styles.addScenesContainer}>
                                {
                                    this.state.projScenes !== undefined 
                                        ? this.state.projScenes.length > 0
                                            ? this.state.projScenes.find(scene => scene.step_name === this.state.currentStep)
                                                ? null
                                                : <Text style={styles.text}> Scenes for Act {this.state.act} will appear here! </Text>
                                            : <Text style={styles.text}> Scenes for Act {this.state.act} will appear here! </Text>
                                        : null
                                }
                            </View>
                            {
                                this.state.projScenes !== undefined
                                    ? this.state.projScenes.length > 0
                                        ? this.state.projScenes.map(
                                            obj =>
                                                obj.act === `Act ${this.state.currentAct}`
                                                    ? obj.step_name === this.state.currentStep
                                                        ? <Scene
                                                            getProjectScenes={context.getProjectScenes}
                                                            getAuthToken={context.getAuthToken}
                                                            scene_id={obj.id}
                                                            deleteScenes={context.deleteScenes}
                                                            key={obj.id}
                                                            heading={obj.scene_heading}
                                                            thesis={obj.thesis}
                                                            antithesis={obj.antithesis}
                                                            synthesis={obj.synthesis}
                                                            scene_num={obj.scene_num}
                                                        />
                                                        : null
                                                    : null
                                        )
                                        : null
                                    : null
                                
                                        
                            }
                            {
                                context.addScene === true && context.currentAct === this.state.currentAct
                                    ? <Scene eleteScenes={context.deleteScenes} currentAct={this.state.currentAct} currentStep={this.state.currentStep} getAuthToken={context.getAuthToken} closeAddScene={context.closeAddScene} newScene={true} />
                                    : null
                            }
                        </View>}
                        
                            
                    </View>
                    : <View style={styles.actContainer}><Text style={{fontSize: 22, fontFamily:'Coustard', alignSelf: 'center'}}>No project selected. Select a project to create scenes.</Text></View>
                
                    
            )}
            </WritualContext.Consumer>
            
        )
    }
}