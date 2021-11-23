import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Scene from "../Scene/Scene";
import WritualContext from "../../WritualContext";
import ActInstructions from '../ActInstructions/ActInstructions'
import { config } from '../../URLS'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import ColorPicker from '../ColorPicker/HsvColorPicker';
import colorSwatches from '../../colorSwatches'

const { princetonOrange, oldLace, yaleBlue } = colorSwatches

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
            windowWidth: this.props.windowWidth,
            currentPlot: '',
            getCurrentColor: this.props.getCurrentColor
        }
    }

    componentDidMount() {
        //console.log('actcontainer component did mount')
        this.getSteps()
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        let sameProps = true
        let sameState = true 

        Object.keys(nextProps).map((key) => {
            if(this.props[key] != nextProps[key]) {
                sameProps = false 
            }
        })

        
        Object.keys(nextState).map((key) => {
            if(this.state[key] != nextState[key]) {
                sameState = false
            }
        })

        if(!sameProps || !sameState) {
            return true
        } else {
            return false
        }
            

        
    }

    componentDidUpdate(prevProps, prevState) {
        const actContainerUpdate = {
            prevProps: prevProps.projScenes[0],
            thisProps: this.props.projScenes[0],
            prevPropsLength: prevProps.projScenes.length,
            thisPropsLength: this.props.projScenes.length
        }
        console.log(`debug ActContainer did update actContainerUpdate`, actContainerUpdate)
        if(this.props.projScenes) {

            if(this.props.projScenes.length > 0 && this.state.projScenes.length > 0 ) {
                if(this.props.projScenes[0].project_id !== this.state.projScenes[0].project_id){
                //console.log(`ActContainer did update: ${prevProps.projScenes[0].project_id} !== ${this.props.projScenes[0].project_id }`)
                    this.setState({
                        projScenes: this.props.projScenes
                    })
                } 
            }

            if (this.props.projScenes.length != this.state.projScenes.length) {
                this.setState({
                    projScenes: this.props.projScenes
                })
            }


            for(let i=0; i<this.props.projScenes.length; i++) {

                let prevScene = prevProps.projScenes[i].scene_number
                let currentScene = this.props.projScenes[i].scene_number

                

                console.log(`prevScene ${prevScene} currentScene ${currentScene}`)

                if(currentScene !== prevScene) {
                    this.setState({
                        projScenes: this.props.projScenes
                    })
                }

                if(this.props.projScenes[i].versions) {
                    let prevSceneV = this.props.projScenes[i].versions.length
                    let currentSceneV = this.state.projScenes[i].versions.length

                    if(prevSceneV !== currentSceneV) {
                        this.setState({
                            projScenes: this.props.projScenes
                        })
                    }
                }

                


            }
        
  
            if (this.props.proj !== this.state.proj) {
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

    setCurrentPlot = (plot) => {
        console.log('set current plot: ', plot)
        this.setState({
            currentPlot: plot
        }, () => {
            console.log('set current plot state ran')
        })
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

    openSceneSettings = () => {
        this.setState({
            showSceneConfig: true
        })
    }

    closeSceneSettings = () => {
        this.setState({
            showSceneConfig: false
        })
    }

    touchBox = (res) => {
        console.log('touch box res: ', res)
        this.setState({
            boxHex: res
        })

    }

    handleHuePickerPress = (res) => {
        console.log('huePickerPress res: ', res)
    }

    handleHueDragStart = (res) => {
        console.log('hue drag start: ', res)
    }

    handleSatDragMove = (res) => {
        console.log('sat drag move res: ', res)
        this.setState({
            saturation: res.saturation,
            satValue: res.value
        }, () => {})
        
    }

    handleDragEnd = (res) => {
        this.setState({
            boxHex: this.state.getCurrentColor(this.state.hue, this.state.saturation, this.state.satValue)
        }, () => {
            this.setSelectedPlotColor()
        })
    }

    handleHueDragMove = (res) => {
        console.log('hue drag move res: ', res.hue)
        this.setState({
            hue: res.hue
        }, () => {
            this.setSelectedPlotColor()
        })
    }
    
    setSelectedPlotColor = () => {
        let plot = this.state.currentPlot
        this.setState({
            [this.state.currentPlot]: this.state.boxHex
        }, async () => {
            if(this.state.boxHex) {
                console.log('box hex color: ', this.state.boxHex)

                let response = await fetch(`${url}/scenes/update/color/${this.state.project_id}/${this.state.act}/${this.state.currentPlot}/${this.state.boxHex.replace('#', '%23')}`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': this.state.idToken
                    }
                }).then().catch(error => console.error('Error updating plot color: ', error))
            }
            
            
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
                                                    prevAct={this.state.prevAct !== undefined ? this.state.prevAct : null}>
                                                    <FontAwesomeIcon    onClick={e => this.openSceneSettings()} 
                                                                            style={{padding: 5, alignSelf:'flex-end', zIndex: 1, position:'absolute'}} 
                                                                            icon={faCog} className='fa-2x iconHover' color='#15273D'/>
                                                    </ActInstructions>
                                : null
                        }
                        {
                            this.state.showSceneConfig
                                ?  <View style={{zIndex: 2, alignSelf: 'flex-end', position: 'absolute', display: 'flex', backgroundColor: oldLace, width: '25%' }}>
                                        <FontAwesomeIcon    onClick={e => this.closeSceneSettings()} 
                                                            style={{padding: 5, alignSelf:'flex-end', zIndex: 1, position:'absolute'}} 
                                                            icon={faTimesCircle} className='fa-2x iconHover' color='#15273D'/>
                                        
                                        <ColorPicker    onHuePickerPress={this.handleHuePickerPress}
                                                        onHuePickerDragMove={this.handleHueDragMove} 
                                                        onHuePickerDragStart={this.handleHueDragStart} 
                                                        onHuePickerDragEnd={this.handleDragEnd}
                                                        onTouchBox={this.touchBox} 
                                                        satValPickerHue={this.state.hue}
                                                        satValPickerValue={this.state.satValue} 
                                                        satValPickerSaturation={this.state.saturation}
                                                        onSatValPickerDragMove={this.handleSatDragMove} 
                                                        onSatValPickerDragEnd={this.handleDragEnd}
                                                        huePickerHue={this.state.hue} 
                                                        colorFieldSet={['#1255a3']}
                                                        hex={this.state.boxHex ? this.state.boxHex : null}/>

                                        
                                        <TouchableHighlight style={{ borderColor: yaleBlue, borderWidth: 1, borderRadius: 5, alignItems: 'center', width: 150, height: 45, padding: 5, backgroundColor: this.state.aPlot ? this.state.aPlot : princetonOrange}} onPress={e => this.setCurrentPlot('aPlot')}><Text>A Plot</Text></TouchableHighlight>
                                        <TouchableHighlight style={{ borderColor: yaleBlue, borderWidth: 1, borderRadius: 5, alignItems: 'center', width: 150, height: 45, padding: 5, backgroundColor: this.state.bPlot ? this.state.bPlot : princetonOrange}} onPress={e => this.setCurrentPlot('bPlot')}><Text>B Plot</Text></TouchableHighlight>
                                        <TouchableHighlight style={{ borderColor: yaleBlue, borderWidth: 1, borderRadius: 5, alignItems: 'center', width: 150, height: 45, padding: 5, backgroundColor: this.state.cPlot ? this.state.cPlot : princetonOrange}} onPress={e => this.setCurrentPlot('cPlot')}><Text>C Plot</Text></TouchableHighlight>
                                    </View>
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
                                                            plot={obj.plot}
                                                            details={obj.details}
                                                            //labelColor={obj.color}
                                                            versions={obj.versions}
                                                            version={obj.version}
                                                            scene_number={obj.scene_number}
                                                            shared={obj.shared.length > 0 ? true : false}
                                                            getProjectScenes={context.getProjectScenes}
                                                            getAuthToken={context.getAuthToken}
                                                            scene_id={obj.id}
                                                            uid={obj.uid}
                                                            deleteScenes={context.deleteScenes}
                                                            key={obj.id}
                                                            heading={obj.scene_heading}
                                                            thesis={obj.thesis}
                                                            antithesis={obj.antithesis}
                                                            synthesis={obj.synthesis}
                                                            project_id={this.state.project_id}
                                                            episode_id={obj.episode_id !== undefined ? obj.epsiode_id : null}
                                                            current_project_id={context.current_project_id}
                                                            act={this.state.act}
                                                            currentProj={context.currentProj}
                                                            currentStep={this.state.currentStep}
                                                            sharedProjClicked={context.sharedProjClicked}
                                                            currentAct={this.state.currentAct}
                                                            socket={context.socket}
                                                            handleUpdateSceneSubmit={context.handleUpdateSceneSubmit}
                                                            handleUpdateDetails={context.handleUpdateDetails}
                                                            closeAddScene={context.closeAddScene}
                                                            getScenes={context.getProjectScenes}
                                                            photoURLS={context.photoUrls}
                                                            photo_url={context.photoUrl}
                                                        />
                                                        : null
                                                    : null
                                        )
                                        : null
                                    : null
                                
                                        
                            }
                            {
                                context.addScene === true && context.currentAct === this.state.currentAct
                                    ? <Scene    deleteScenes={context.deleteScenes} 
                                                scenes={this.state.projScenes.filter(scene => scene.current_step === this.state.currentStep)}
                                                currentAct={this.state.currentAct} 
                                                currentStep={this.state.currentStep} 
                                                getAuthToken={context.getAuthToken} 
                                                closeAddScene={context.closeAddScene} 
                                                handleAddSceneSubmit={context.handleAddSceneSubmit}
                                                newScene={true} />
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