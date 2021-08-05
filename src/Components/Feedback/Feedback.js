import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { EditorState, ContentState,
  convertToRaw,
  convertFromRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import WritualContext from '../../WritualContext'
import debounce from 'lodash/debounce'
import 'draft-js-static-toolbar-plugin/lib/plugin.css'
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';
import './editorStyles.css'
import * as io from 'socket.io-client'
import { config } from '../../URLS'
import colorSwatches from '../../colorSwatches.js'

const { darkGunMetal, whiteSmoke } = colorSwatches

const url = config.API_URL
const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];

export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState:  this.props.content === undefined 
                      ? EditorState.createEmpty() 
                      : EditorState.createWithContent(ContentState.createFromText(this.props.content)),
      getAuthToken: this.props.getAuthToken !== undefined ? this.props.getAuthToken : undefined,
      editorEmpty: true,
      getEditorState: this.props.getEditorState,
      updateFeedback: this.props.updateFeedback,
      currentProj: this.props.currentProj !== undefined ? this.props.currentProj : undefined,
      project_id: this.props.project_id,
      socket: io.connect(`${url}`),
      projects: props.projects, 
      sharedProjects: props.sharedProjects,
      episode_id: this.props.episode_id !== undefined ? this.props.episode_id : null,
      reviewer: this.props.reviewer,
      feedback: [],
      sharedProjClicked: this.props.sharedProjClicked,
      text: []


      
    };

  this.onChange = (editorState) => {
      let raw = convertToRaw(editorState.getCurrentContent())
      this.setState({editorState});
      const currentContentState = this.state.editorState.getCurrentContent()
      const newContentState = editorState.getCurrentContent()
      if(currentContentState !== newContentState) {
          if (this.state.updateFeedback !== undefined) {
              this.setState({
                  editorFull: this.state.editorState.getCurrentContent().hasText()
              }, () => {
                  this.saveFeedbackState(raw)
              })
          }
      }
      
  };

  this.saveFeedbackState = debounce((raw) => {
    this.updateFeedback(raw)
  }, 500)

  this.setEditor = (editor) => {
    this.editor = editor;
  };

  this.focusEditor = () => {
    if (this.editor) {
      this.editor.focus();
    }
  };

}

  componentDidUpdate = async (prevProps) => {
    //console.log('text editor props did update')
    if (prevProps.currentProj !== this.props.currentProj) {
        this.setState({
          currentProj: this.props.currentProj,
          project_id: this.props.project_id,
          episode_id: this.props.episode_id,
          rawEditorData: undefined
        }, () => this.state.getAuthToken !== undefined ? this.getEditorState() : null)
    } 

  }

componentDidMount = () => {
    this.focusEditor();
    this.getAuthorization()
    if(this.state.getAuthToken !== undefined) {
        this.getEditorState()
    }
    this.setState({
        editorFull: this.state.editorState.getCurrentContent().hasText()
    })

    this.state.socket.on('update-feedback', project_id => {
        if(this.state.projects.find(proj => proj.project_id === project_id) !== undefined || this.state.sharedProjects.find(proj => project_id === project_id) !== undefined) {
            if(this.state.project_id === project_id) {
                this.getEditorState()
            }
        }
    })
    setTimeout(() => {
        if(this.state.sharedProjClicked === true) {
            if(this.state.feedback.length > 0) {
                let contentState = convertFromRaw(this.state.feedback[0].feedback)
                this.setState({
                    editorState: EditorState.createWithContent(contentState),
                    editorEmpty: false
                })
                
            } else {
                this.setState({
                    editorState: EditorState.createEmpty(),
                    editorEmpty: true
                })
                
            }
        } else {
            if(this.state.feedback.length > 0) {
                let text = this.state.text
                let structuredFeedback = [] 
                /*structuredFeedback = [
                    textEle: {
                        reviewer: "rory",
                        values: ['text2', 'text2', 'text3']
                    },

                     textEle: {
                        reviewer: "rory garcia",
                        value: ["text 1"]
                    },
                ]*/
                this.state.feedback.map(feedback => {
                    if(feedback.feedback !== undefined && feedback.feedback !== null) {
                        let contentState = convertFromRaw(feedback.feedback)
                        let blockMap = contentState.getBlockMap()
                        let textStrings = []
                        blockMap.map(contentBlock => {
                            textStrings.push(contentBlock.getText()) 
                        })
                        const textObj = {
                            reviewer: feedback.reviewer,
                            values: textStrings
                        }
                        structuredFeedback.push(textObj)

                       
                        this.setState({
                            structuredFeedback: structuredFeedback,
                        })

                        

                    } 
                     
                    
                    
                })
            }
        }
    }, 1500);
    
}

  emitUpdateFeedback = () => {
    this.state.socket.emit('update-feedback', this.state.project_id)
  }

  getAuthorization = async () => {
   this.setState({
     idToken: await this.state.getAuthToken()
   })
  }

  updateFeedback = (raw) => {
    let updatedFeedback = {
      reviewer: this.state.reviewer, 
      proj_name: this.state.currentProj,
      project_id: this.state.project_id,
      episode_id: this.state.episode_id,
      feedback: raw,
    }

    try {
      fetch(`${url}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.state.idToken
        },
        body: JSON.stringify(updatedFeedback)
      })
      
      
    } catch(error) {
      console.error(`error: ${error}`)
    }
    this.emitUpdateFeedback()
    

  }

  getEditorState = async () => {
      //console.log(`details getEditorState running`)

      try {
          let response = await fetch(`${url}/feedback/${this.state.project_id}/${this.state.episode_id}/${this.state.reviewer}/${this.state.sharedProjClicked}`, {
              headers: {
                  'content-type': 'application/json',
                  'Authorization': await this.state.getAuthToken()
              },
          })
          if(!response.ok) {
              throw new Error(response.status)
          } else {
              this.setState({
                  feedback: await response.json()
              })
          }
      } catch (err) {
          console.error(`err: ${err}`)
      }


  //return await response.json()
  }

  render() {

    let reviewerFeedback = []
   
    
    const styles = StyleSheet.create({
        feedbackEditor: {
          width: '45%',
          height: '100%',
          alignSelf: 'flex-start',
        },
        
        feedbackHeader: {
            width: "100%",
            backgroundColor: darkGunMetal,
            color: "white",
            fontWeight: 'bold',
            fontSize: 20,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            height: 70,
            marginTop: 25,
            marginBottom: 10,
        },

        feedbackText: {
            fontFamily: 'Varela Round',
            fontSize: 20,
        },

        feedbackTextContainer: {
            backgroundColor: whiteSmoke,
            width: "100%",
            height: 350,
            overflowY: 'auto',
            padding: 10,
           
        }
    })

    return (
        <WritualContext.Consumer>
            {(context) => (
              context.sharedProjClicked === false && this.state.feedback.length > 0
                ?   <View style={styles.feedbackEditor}> 
                        {   
                            this.state.structuredFeedback !== undefined 
                                ? this.state.structuredFeedback.map(ele => {
                                    /*structuredFeedback = [
                                        textEle: {
                                            reviewer: "rory",
                                            values: ['text2', 'text2', 'text3']
                                        },

                                        textEle: {
                                            reviewer: "rory garcia",
                                            value: ["text 1"]
                                        },
                                    ]*/
                                    return (
                                        <View key={this.state.structuredFeedback.indexOf(ele)} style={{width: "100%"}}>
                                            <Text style={styles.feedbackHeader}>Feedback by {ele.reviewer} </Text>
                                            <View style={styles.feedbackTextContainer}>
                                                {
                                                    ele.values !== undefined 
                                                        ? ele.values.map(text => {
                                                            return (
                                                                <Text key={ele.values.indexOf(text)} style={styles.feedbackText}>{text}</Text>
                                                            )
                                                        })
                                                        : null
                                                }
                                            </View>
                                        </View>
                                    )
                                })
                                : null
                        }
                    </View>
                :   context.sharedProjClicked === true 
                        ?   <View style={{width: "100%", height: "100%"}}> 
                                         
                                <Text style={styles.feedbackHeader}>Feedback for {context.currentProj}</Text>
                                <Toolbar>
                                    {
                                        (externalProps) => (
                                            <>
                                            <BoldButton {...externalProps} />
                                            <ItalicButton {...externalProps} />
                                            <UnderlineButton {...externalProps} />
                                            <Separator {...externalProps} />
                                            <HeadlineOneButton {...externalProps} />
                                            <HeadlineTwoButton {...externalProps} />
                                            <HeadlineThreeButton {...externalProps} />
                                            <UnorderedListButton {...externalProps} />
                                            <OrderedListButton {...externalProps} />
                                            <BlockquoteButton {...externalProps} />
                                            <CodeBlockButton {...externalProps} />
                                            </>
                                        )
                                    }
                                </Toolbar>
                                        
                                
                                <View style={{marginTop: 4, padding: 10}}>
                                    <Editor style={{marginTop: 'auto'}} 
                                            
                                            plugins={plugins} 
                                            ref={this.setEditor} 
                                            editorState={this.state.editorState} 
                                            onChange={this.onChange} />
                                </View>
                                        
                                        
                             </View>
                        :   <View style={styles.feedbackEditor}>
                                <Text style={styles.feedbackHeader}>Feedback for {context.currentProj}</Text>
                                <Text style={{fontSize: 22, fontFamily:'Coustard', alignSelf: 'center'}}>
                                    {
                                        context.currentUserProjectShared === true 
                                            ? 'No feedback yet.'
                                            : 'Share this project to get feedback on your progress'
                                    } 
                                </Text>
                            </View>
                    
             
              )}
        </WritualContext.Consumer>
    );

  }

}