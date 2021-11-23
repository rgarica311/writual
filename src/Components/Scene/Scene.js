import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, TextInput, Picker, Image, Animated } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import WritualContext from '../../WritualContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faMinus, faPlus, faAngleRight, faAngleLeft, faBookmark } from '@fortawesome/free-solid-svg-icons';
import colorSwatches from '../../colorSwatches'
import { config } from '../../URLS'
import debounce from 'lodash/debounce'
import './Scene.css'

const url = config.API_URL

const { princetonOrange, yankeesBlue } = colorSwatches

const styles = StyleSheet.create({
    container: {
        minWidth: 340,
        width: '30%',
        height: 250,
        boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
        elevation: 2,
        //padding: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        //justifyContent: 'space-evenly',
        marginBottom: 10,
        //alignItems: 'center',
        //marginLeft: '.5%',
        //marginRight: '.5%'
    },

    text: {
        minWidth: 270, 
        maxWidth: 350,
    },

    textInput: {
        width: 300, 
        paddingLeft: 5, 
        borderBottomColor: 'black', 
        fontSize: 12,
        //borderBottomWidth: 1
    },

    textInputDetails: {
        width: '100%', 
        height: '100%',
        overflowY: 'scroll',
        borderBottomColor: 'black', 
        fontSize: 12,
        //borderBottomWidth: 1
    },

    textInputSceneHeading: {
        width: 300, 
        paddingLeft: 5, 
        fontSize: 8.5,
        fontWeight: "bold",
        overflow: "hidden",
        paddingTop: 2
    },

    textInputSceneNum: {
        width: 20, 
        borderBottomColor: 'black', 
        fontSize: 12,
        textAlign: 'center'
        //borderBottomWidth: 1
    },

    bold: {
        fontWeight: 'bold',
        fontSize: 11,
        display: 'flex',
        flexDirection: 'row',
        paddingRight: 3,
        width: 95,
        //alignItems: 'center'
    },

    sceneInfo: {
        fontWeight: 'bold',
        fontSize: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },

    btnsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignSelf: 'center'
    },

    button: {
        width: '45%',
        backgroundColor: yankeesBlue,
        borderColor: princetonOrange,
        borderWidth: 1,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },

    tasContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5
    },

    tasContainerInfo: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginBottom: 25

        //backgroundColor: props.currentPlot = 'aPlot' ? props.aPlot : props.currentPlot = 'bPlot' ? props.bPlot : props.currentPlot = 'cPlot' ? props.cPlot : 'white'
    },

    tasContainerInfoBack: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5

        //backgroundColor: props.currentPlot = 'aPlot' ? props.aPlot : props.currentPlot = 'bPlot' ? props.bPlot : props.currentPlot = 'cPlot' ? props.cPlot : 'white'
    },

    

    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },

    errorText: {
        fontFamily: "Varela Round", 
        fontSize: 12,
        color: princetonOrange
    },

    picker: {
        backgroundColor: 'rgba(255, 255, 255, 0.0)',
        opacity: 50,
        height: 18,
        width: 35,
        fontSize: ".8em",
        alignSelf: 'center',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        borderWidth: 0,
        cursor: "pointer"
    },

    newScene: {
        fontFamily: 'Roboto Slab',
        fontSize: 5,
        fontWeight: 'bold'
    },

    photo: {
        height: 20,
        width: 20,
        borderRadius: "50%",
    },

    flipCardBack: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%'
    },

    flipCard: {
        backfaceVisibility: 'hidden'
    },

    flipIcon: {
        width: '102%',
        display: 'flex',
        alignItems: 'flex-end',
        position: 'absolute',
        top: '125px',
        cursor: 'pointer'
    },

    corner: {
        width: 25,
        height: 25,
        position: 'absolute',
        bottom: 0,
        right: 0
    },

    fold: {
        backgroundColor: 'lightgrey',
        width: '100%',
        height: '100%',
        display: 'block',
        zIndex: 0,
        borderTopLeftRadius: 10,
        cursor: 'pointer',
        boxShadow: '-2px -2px 2px rgba(0, 0, 0, 0.25)'
    },

    hiddenCorner: {
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'flex-end',
        position: 'absolute',
        top: 0,
        left: 0,
        clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)',
        backgroundColor: '#F7F7F7',
        zIndex: 1,
        width: '100%',
        height: '100%',
        opacity: '100%'
    }
})

export default class Scene extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            debounceSetSceneNum: debounce( (num) => {
                this.handleSetSceneNum(num)
            }, 200),
            renderPicker: '',
            sceneHeading: props.heading,
            hue: '',
            saturation: '',
            satValue: '',
            labelColor: props.lableColor ? props.labelColor : 'white',
            sceneNum: props.scene_number ? props.scene_number : 1,
            plot: props.plot ? props.plot : 'aPlot',
            thesis: props.thesis,
            antithesis: props.antithesis,
            synthesis: props.synthesis,
            uid: props.uid,
            charLengthError_SH: false,
            charLengthError_T: false,
            charLengthError_AT: false,
            charLengthError_S: false,
            episode_id: props.episode_id,
            project_id: props.project_id,
            current_project_id: props.current_project_id,
            getAuthToken: props.getAuthToken,
            scene_id: props.scene_id,
            shared: props.sharedProjClicked,
            currentAct: props.currentAct,
            currentProj: props.currentProj,
            currenStep: props.currentStep,
            socket: props.socket,
            handleAddSceneSubmit: props.handleAddSceneSubmit,
            handleUpdateDetails: props.handleUpdateDetails,
            handleUpdateSceneSubmit: props.handleUpdateSceneSubmit,
            deleteScenes: props.deleteScenes,
            closeAddScene: props.closeAddScene,
            newScene: props.newScene ? props.newScene : false,
            getScenes: props.getScenes,
            version: props.version,
            versions: props.versions != null ? props.versions : [],
            scenes: props.scenes ? props.scenes : [],
            photoURLS: this.props.photoURLS,
            author: undefined,
            photo_url: props.photo_url,
            addingVersion: false,
            sceneDetails: props.details
            
        }

        this.saveNewScene = debounce((updatedScene, shared, version) => {
            this.state.handleUpdateSceneSubmit(updatedScene, shared, version).then(() => {
                console.log('debug then block of handleUpdateSceneSubmit call')
                this.setState({
                    addingVersion: false
                })
            })
            
        }, 2000)

        this.updateDetails = debounce((details) => {
            this.setState({
                details: details
            }, () => {
                this.state.handleUpdateDetails(details, this.state.sharedProjClicked, this.state.scene_id)
            })
            
        }, 2000)
    }

    componentDidMount = () => {

        console.log('debug Component Did Mount versions: ', this.props.versions)

        this.animatedValue = new Animated.Value(0);
        this.value = 0;

        this.animatedValue.addListener(({value}) => {
            this.value = value
        })

        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        })

        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })

        let urls = this.state.photoURLS
        const projectUrls = urls.find(obj => obj.project_id === this.state.current_project_id).photoUrls
        this.setState({
            author: projectUrls.find(obj => obj.uid === this.state.uid) ? projectUrls.find(obj => obj.uid === this.state.uid).photo_url : this.state.photo_url
        })
        
        this.getPlotLabelColor(this.state.plot)
        if (this.state.version > 1) {
            this.showSelectedVersion()
        }

        console.log('debug component did mount versions: ', typeof this.state.versions)

        if(typeof this.state.versions == 'object') {
            
            this.setState({
                versions: this.getSortedVersions()
            })
        }

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

    componentDidUpdate = (prevProps) => {

        console.log('debug scene update prevprops: ', prevProps)
        console.log('debug scene update this.props: ', this.props)


        const updatingScene = {
            scene_id: this.props.scene_id,
            scene_num: this.props.scene_number,
            version: this.props.version,
            versions: this.props.versions
        }

        console.log('debug updatingScene', updatingScene)
     
        if(this.props.version > this.state.version) {
            this.setState({
                version: this.props.version
            })
        }
        
        if(this.props.versions.length != this.state.versions.length) {
            console.log('debug versions update check')
            this.setState({
                versions: this.getSortedVersions(),
            })
        }
        
    }

     updateVersion = async (version) => {
        let response;
        
        try {
            response = await fetch(`${url}/scenes/update/version/${this.state.scene_id}/${version}`, {
                method: 'PUT', 
                headers: {
                    'content-type': 'application/json',
                    'Authorization': await  this.state.getAuthToken()
                }
            })
        } catch (e) {
            console.error('Error changing version: ', e)
        }

        if(response) {
            console.log('response: ', response)
            
        }
    }

    handleVersionChange = async (val) => {
        console.log('version changer: ', val)
        this.setState({
            version: val
        }, () => {
            this.showSelectedVersion()
        })
        this.updateVersion(val)
        
        
    }

    getSortedVersions = (versions = null) => {
        console.log('debug reverse list')
        /*let sortedVersions =  this.state.versions
        console.log('debug versions to be sorted: ', this.state.versions)
        sortedVersions.sort((firstEl, secondEl) => {
            if( parseInt(firstEl.version) < parseInt(secondEl.version) ) return -1
            if( parseInt(firstEl.version) > parseInt(secondEl.version) ) return 1
        })
        return sortedVersions*/
        let reverse = this.state.versions.reverse()
        console.log('debug reverse: ', reverse)
        return reverse
        
        
    }

    showSelectedVersion = () => {
        this.setState({
            sceneHeading: this.getElementFromVersion('scene_heading'),
            thesis: this.getElementFromVersion('thesis'),
            antithesis: this.getElementFromVersion('antithesis'),
            synthesis: this.getElementFromVersion('synthesis')

        })
    }

    getElementFromVersion = (element) => {
        console.log(`debug version: ${this.state.version} element ${element} `)
        if(this.state.version != '1') {
            console.log('debug this.state.versions: ', this.state.versions)
            console.log('debug this.state.version: ', typeof this.state.version, this.state.version)
            return this.state.versions.find(obj => obj.version === this.state.version.toString())[element]
            
        } else {
            return this.props[element]
        }
    }

    flipCard = () => {
        if (this.value > 90) {
            Animated.spring(this.animatedValue, {
                toValue: 0, 
                duration: 800,
                friction: 8,
                tension: 10
            }).start();
        } else {
            Animated.spring(this.animatedValue, {
                toValue: 180,
                duration: 800,
                friction: 8,
                tension: 10
            }).start();
        }
    }

   

    handleReset = () => {
        this.setState({
            sceneHeading: '',
            thesis: '',
            antithesis: '',
            synthesis: ''
        })
    }

    deleteScene = async (scene_id) => {
        try {
            fetch(`${url}/scenes/${scene_id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': await this.state.getAuthToken()
                }
            }).then(() => {
                this.getProjectScenes(this.state.current_project_id, false, this.state.episode_id)
            })
        } catch(error) {
            console.error('error', error)
        }

    }
    
    addVersion = async () => {
        console.log('debug addVersion: versions.length ', this.state.versions.length)
        let length = this.state.versions.length
        let version =  length + 2
        console.log('debug new version: ', version)
        this.setState({
            addingVersion: true,
            version: version.toString()
            
        })
    }

    cancelAddVersion = () => {
        this.setState({
            addingVersion: false,
        })
    }
    
    

    getPlotLabelColor = async (val) => {
        try {
            let response = await fetch(`${url}/scenes/plot/${val}/${this.state.currentAct}/${this.state.project_id}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': await  this.state.getAuthToken()
                }
            })

            if(!response.ok) {
                throw new Error(response.status)
            } else {
                let res = await response.json()
                console.log('get color res: ', res.plot_color)
                this.setState({
                    labelColor: res.plot_color
                })
            }
        } catch (e) { 
            console.error('Error getting color: ', e)
        }
         
    }

    updatePlot = async (plot) => {

        try {
            let response = fetch(`${url}/scenes/update/plot/${this.state.scene_id}/${plot}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': await  this.state.getAuthToken()
                }
            })

        } catch (e) {
            console.error('Error updating plot: ', e)
        }
    }

    handlePlotChange = async (val) => {
        console.log("handlePlotChange ran")
        this.updatePlot(val)
        this.getPlotLabelColor(val)
        this.setState({
            plot: val
        })
    }

    handleSetSceneNum = async (num) => {
        console.log(`num type ${typeof num}`)
        
        this.setState({
            sceneNum: num
        }, async () => {
            if(this.state.version = 1) {
                try {
                    let response = await fetch(`${url}/scenes/update/scenenum/${this.state.scene_id}/${num}`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'Authorization': await  this.state.getAuthToken()
                        }
                    })

                    if(response.ok) {
                        console.log('resonse good')
                        //this.state.socket.emit('scene-updated', this.state.project_id, this.state.shared, this.state.episode_id)
                        setTimeout(() =>{
                            this.state.getScenes(this.state.project_id, this.state.shared, this.state.episode_id)
                        },3000)
                        

                    }
                } catch(e) {
                    console.error(`Error setting scene number: `, e)
                }
            } else {
                const newVersion = {
                    project_name: this.state.currentProj,
                    act: this.state.currentAct,
                    step_name: this.state.currentStep,
                    scene_heading: this.state.sceneHeading,
                    thesis: this.state.thesis, 
                    antithesis: this.state.antithesis,
                    synthesis: this.state.synthesis, 
                    uid: this.state.uid, 
                    project_id: this.state.current_project_id,
                    episode_id: this.state.episode_id,
                    shared: this.state.shared, 
                    scene_num: this.state.sceneNum,
                    version: this.state.version
                }

                try {
                    fetch(`${url}/scenes/addversion/`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'applicatons/json',
                            'Authorizaton': await this.state.getAuthToken()
                        },
                        body: newVersion
                    })
                } catch (e) {
                    console.error( `Error adding scene version: ${e}`)
                }
            }
            
        })  
   
    }

    handleSetSceneHeading = (text) => {
        this.setState({
            sceneHeading: text
        }, () => {
            if(text.length > 150) {
                this.setState({
                    charLengthError_SH: true
                })
            } else {
                this.setState({
                    charLengthError_SH: false
                })
                this.runSubmit()
            }
        })
        
    }

    handleSetThesis = (text) => {
         this.setState({
                thesis: text
            }, () => {
                if(text.length > 150) {
                    this.setState({
                        charLengthError_T: true
                    })
                } else {
                    this.setState({
                        charLengthError_T: false
                    })
                    this.runSubmit()
                }
            })
    }

    handleSetAntithesis = (text) => {
        this.setState({
            antithesis: text
        }, () => {
            if(text.length > 150) {
                this.setState({
                    setCharLengthError_AT: true
                })
            } else {
                this.setState({
                    setCharLengthError_AT: false
                })
                this.runSubmit()
            }
        })
        
    }

    handleSetSynthesis = (text) => {
        this.setState({
            synthesis: text
        }, () => {
            if(text.length > 150) {
                this.setState({
                    charLengthError_S: true
                })
                } else {
                    this.setState({
                        charLengthError_S: false
                    })
                    this.runSubmit()
                }
            })
    }

   

    runSubmit = () => {
        if(this.state.version > this.state.versions.length) {
            this.updateVersion(this.state.version)
        }
        if(!this.state.charLengthError_S && !this.state.charLengthError_AT && !this.state.charLengthError_T && !this.state.charLengthError_SH) {
           if(this.state.newScene) {
                let sceneNumber = this.state.scenes.length > 0 ? this.state.scenes.length + 1 : 1
                this.state.handleAddSceneSubmit(this.state.currentProj, this.state.currentAct, this.state.currentStep, this.state.sharedProjClicked, sceneNumber, this.state.plot, this.stathis.state.sceneHeading, this.state.thesis, this.state.antithesis, this.state.synthesis, this.state.sceneNum)
           } else {
                console.log('run update scene to create new version')
                this.saveNewScene(
                    {
                        id: this.state.scene_id, 
                        scene_num: this.state.scene_number,
                        scene_heading: this.state.sceneHeading, 
                        thesis: this.state.thesis, 
                        antithesis: this.state.antithesis, 
                        synthesis: this.state.synthesis,
                        details: this.state.details,
                        version: this.state.version
                    }, this.state.shared, this.state.version)
           }
        }
    }

    //console.log(`debug currentStep Scene component props.currentStep ${props.currentStep}`)

    render(){
        const frontAnimatedStyle = {
            transform: [
                {
                    rotateY: this.frontInterpolate
                }
            ]
        }

        const backAnimatedStyle = {
            transform: [
                {
                    rotateY: this.backInterpolate
                }
            ]
        }
        return(
            <WritualContext.Consumer>
                {(context) => (
                    <View style={styles.container}>
                        <View>
                        
                            <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                                <View style={[styles.tasContainerInfo, {backgroundColor: this.state.labelColor}]}>

                                    <Picker style={styles.picker} selectedValue={this.state.plot} onValueChange={e => this.handlePlotChange(e)}>
                                        <Picker.Item label='A Plot' value='aPlot'/>
                                        <Picker.Item label='B Plot' value='bPlot'/>
                                        <Picker.Item label='C Plot' value='cPlot'/>
                                    </Picker>

                                    <TextInput  placeholder='Scene Heading' 
                                                style={styles.textInputSceneHeading} 
                                                value={this.state.sceneHeading} 
                                                onChange={e => this.handleSetSceneHeading(e.target.value)} />

                                    <View style={{display: "flex", flexDirection: "row"}}>
                                        <Text style={styles.sceneInfo}> Scene: </Text>
                                        <TextInput  placeholder='Scene Number' 
                                                    style={styles.textInputSceneNum} 
                                                    value={this.state.sceneNum} 
                                                    onChange={e => this.handleSetSceneNum(e.target.value)} />
                                    </View>

                                    <View style={{display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly", width: '30%'}}>
                            
                                        <Text style={styles.sceneInfo}>Version: </Text>
                                        {
                                            !this.state.addingVersion
                                                ? <Picker style={styles.picker} selectedValue={this.state.version} onValueChange={e => this.handleVersionChange(e)}>
                                                        <Picker.Item label='1' value='1'/>
                                                        {
                                                            this.state.versions.length > 0 
                                                                ? this.state.versions.map(obj => 
                                                                            <Picker.Item key={obj.version} label={obj.version} value={obj.version}/>
                                                                        )
                                                                
                                                                : null
                                                        }
                                                    </Picker>  
                                                : <Text>{this.state.version}</Text>
                                            
                                        }

                                        {
                                            !this.state.addingVersion
                                                ?<FontAwesomeIcon onClick={e => this.addVersion()} className='fa-xs iconHover' color='#15273D' icon={faPlus}/>

                                                :<FontAwesomeIcon onClick={e => this.cancelAddVersion()} className='fa-xs iconHover' color='#15273D' icon={faTimesCircle}/>

                                        }
                                        

                                    </View>

                                </View>
                            
                                {
                                    this.state.newScene
                                        ? <FontAwesomeIcon onClick={e => this.state.closeAddScene()} style={{right: -10, top: -10, position:'absolute'}} icon={faTimesCircle} className='fa-lg iconHover' color='#15273D'/>

                                        : this.state.deleteScenes === true
                                            ? <FontAwesomeIcon onClick={e => this.deleteScene(this.state.scene_id)} style={{right: 5, top: 0, position:'absolute'}} icon={faMinus} className='fa-lg iconHover' color='#15273D'/>
                                            : null
                                }

                                <View style={{padding: 5}}>
                        
                                    <View style={styles.tasContainer}>
                                        <Text style={styles.bold}>Thesis:</Text> 
                                        <TextInput multiline={true} numberOfLines={3}  placeholder='Thesis: The goal of the main character in the scene' 
                                                        style={styles.textInput} 
                                                        value={this.state.thesis} 
                                                        onChange={e => this.handleSetThesis(e.target.value)} />
                                    </View>
                                    
                                    
                                    <View style={styles.tasContainer}>
                                        <Text style={styles.bold}>Antithesis:</Text> 
                                        <TextInput multiline={true} numberOfLines={3}   placeholder='Antithesis: The obstacle(s) to completing that goal' 
                                                    style={styles.textInput} 
                                                    value={this.state.antithesis} onChange={e => this.handleSetAntithesis(e.target.value)} /> 
                                    </View>
                                    
                                    
                                    <View style={styles.tasContainer}>
                                        <Text style={styles.bold}>Synthesis:</Text>
                                        <TextInput multiline={true} numberOfLines={3}  placeholder='Synthesis: How the scene resolves' 
                                                    style={styles.textInput} 
                                                    value={this.state.synthesis} onChange={e => this.handleSetSynthesis(e.target.value)} />
                                    </View>
                                    
                                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>
                                    
                                        <Image style={styles.photo} source={this.state.author}/>
                                        
                                    </View>

                                    
                                </View>

                                {
                                    this.state.charLengthError_SH === true 
                                        ? <Text style={styles.errorText}>Scene Heading length exceeded. Maximum input 150 characters.</Text>
                                        : null

                                }
                                {
                                    this.state.charLengthError_T === true 
                                        ? <Text style={styles.errorText}>Thesis length exceeded. Maximum input 150 characters.</Text>
                                        : null

                                }
                                {
                                    this.state.charLengthError_AT === true 
                                        ? <Text style={styles.errorText}>Antithesis length exceeded. Maximum input 150 characters.</Text>
                                        : null

                                }
                                {
                                    this.state.charLengthError_S === true 
                                        ? <Text style={styles.errorText}>Synthesis length exceeded. Maximum input 150 characters.</Text>
                                        : null

                                }

                            </Animated.View>

                            <Animated.View style={[styles.flipCard, backAnimatedStyle, styles.flipCardBack]}>

                                <View style={[styles.tasContainerInfoBack, {backgroundColor: this.state.labelColor}]}>

                                    <Picker style={styles.picker} selectedValue={this.state.plot} onValueChange={e => this.handlePlotChange(e)}>
                                        <Picker.Item label='A Plot' value='aPlot'/>
                                        <Picker.Item label='B Plot' value='bPlot'/>
                                        <Picker.Item label='C Plot' value='cPlot'/>
                                    </Picker>

                                    <TextInput  placeholder='Scene Heading' 
                                                style={styles.textInputSceneHeading} 
                                                value={this.state.sceneHeading} 
                                                onChange={e => this.handleSetSceneHeading(e.target.value)} />

                                    <View style={{display: "flex", flexDirection: "row"}}>
                                        <Text style={styles.sceneInfo}> Scene: </Text>
                                        <TextInput  placeholder='Scene Number' 
                                                    style={styles.textInputSceneNum} 
                                                    value={this.state.sceneNum} 
                                                    onChange={e => this.handleSetSceneNum(e.target.value)} />
                                    </View>

                                    <View style={{display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly", width: '30%'}}>
                                        
                                        <Text style={styles.sceneInfo}>Version: </Text>
                                        {
                                            !this.state.addingVersion
                                                ? <Picker style={styles.picker} selectedValue={this.state.version} onValueChange={e => this.handleVersionChange(e)}>
                                                        <Picker.Item label='1' value='1'/>
                                                        {
                                                            this.state.versions.length > 0 
                                                                ? this.state.versions.map(obj => 
                                                                            <Picker.Item key={obj.version} label={obj.version} value={obj.version}/>
                                                                        )
                                                                
                                                                : null
                                                        }
                                                    </Picker>  
                                                : <Text>{this.state.version}</Text>
                                            
                                        }
                                        {
                                            !this.state.addingVersion
                                                ?<FontAwesomeIcon onClick={e => this.addVersion()} className='fa-xs iconHover' color='#15273D' icon={faPlus}/>

                                                :<FontAwesomeIcon onClick={e => this.cancelAddVersion()} className='fa-xs iconHover' color='#15273D' icon={faTimesCircle}/>

                                        }
                                        

                                    </View>

                                    

                                </View>

                                <View style={{padding: 5, height: 'calc(100% - 28px)', width: '100%'}}>

                                    <TextInput  placeholder='Enter Scene Details' 
                                                style={styles.textInputDetails} 
                                                value={this.state.sceneDetails} 
                                                onChange={e => this.updateDetails(e.target.value)}/>

                                </View>

                                
                            </Animated.View>

                        </View>

                        
                        <View style={styles.corner}>
                            <View onClick={e => this.flipCard()} className='fold' style={styles.fold}></View>
                            <View style={styles.hiddenCorner}></View>
                        </View>
                    
                    </View>
                    

                
                )}
            </WritualContext.Consumer>
        )
        
    }
}