  
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'
import { EditorState, ContentState,
  convertToRaw,
  convertFromRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import WritualContext from '../../WritualContext'
import debounce from 'lodash/debounce'
import 'draft-js-static-toolbar-plugin/lib/plugin.css'
import * as io from 'socket.io-client'
import { config } from '../../URLS'

const url = config.API_URL
const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];

export default class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content,
      editorState:  this.props.content === undefined 
                      ? EditorState.createEmpty() 
                      : EditorState.createWithContent(ContentState.createFromText(this.props.content)),
      currentAttribute: this.props.currentAttribute,
      getAuthToken: this.props.getAuthToken !== undefined ? this.props.getAuthToken : undefined,
      character: this.props.character !== undefined ? this.props.character : undefined,
      proj: this.props.proj !== undefined ? this.props.proj : undefined,
      editorEmpty: true,
      getEditorState: this.props.getEditorState,
      updateCharacterDetail: this.props.updateCharacterDetail,
      currentChar: this.props.currentChar !== undefined ? this.props.currentChar : undefined,
      currentProj: this.props.currentProj !== undefined ? this.props.currentProj : undefined,
      project_id: this.props.project_id,
      socket: io.connect(`${url}`),
      projects: this.props.projects,
      uid: this.props.uid
    };

  
    this.onChange = (editorState) => {
        let raw = convertToRaw(editorState.getCurrentContent())
        this.setState({editorState});
        
        const currentContentState = this.state.editorState.getCurrentContent()
        const newContentState = editorState.getCurrentContent()
        if(currentContentState !== newContentState) {

           if(this.state.updateCharacterDetail !== undefined) {
              this.setState({
                editorFull: this.state.editorState.getCurrentContent().hasText()
              }, () => {
                  this.saveState(raw) 
              })
          }
        }
        
       
    };

    this.saveState = debounce((raw) => {
      this.updateCharacterDetail(raw)
      
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
    if(this.props.content !== prevProps.content && this.props.content !== undefined) {
      this.setState({
        editorState: EditorState.createWithContent(ContentState.createFromText(this.props.content)),
        editorEmpty: false
      })
    
    } else if (prevProps.currentAttribute !== this.props.currentAttribute) {
        this.setState({
          currentAttribute: this.props.currentAttribute,
          rawEditorData: undefined
        }, () => this.state.getAuthToken !== undefined ? this.getEditorState() : null)
    } else if (prevProps.currentProj !== this.props.currentProj) {
        this.setState({
          currentProj: this.props.currentProj,
          rawEditorData: undefined
        }, () => this.state.getAuthToken !== undefined ? this.getEditorState() : null)
    } else if (prevProps.currentChar !== this.props.currentChar) {

        this.setState({
          currentChar: this.props.currentChar,
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
    this.state.socket.on('update-detail', project_id => {
      if(project_id === this.state.project_id) {
        this.getEditorState()
      }
    })
  }

  getAuthorization = async () => {
    if(this.state.getAuthToken !== undefined) {
      this.setState({
        idToken: await this.state.getAuthToken()
      })
    }
   
  }

  updateCharacterDetail = async (raw) => {
     const shared = []
      if(this.state.sharedProjClicked === true ) {
        shared.push(this.state.uid)
        
      }
    let newDetail = {
      proj_name: this.state.currentProj,
      character_name: this.state.currentChar, 
      bio: this.state.currentAttribute === 'Bio' ? raw : null,
      want: this.state.currentAttribute === 'Want' ? raw : null,
      need: this.state.currentAttribute === 'Need' ? raw : null,
      project_id: this.state.project_id
    }
    try {
      fetch(`${url}/details/existing/${this.state.currentAttribute.toLowerCase()}/${this.state.currentChar}/${this.state.project_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.state.idToken
        },
        body: JSON.stringify(newDetail)
      })
      
    } catch (error) {
      console.error('error: ', error)
    }
    this.state.socket.emit('update-detail', this.state.project_id)
  
  }

  getEditorState = async () => {
    this.setState({
      editorState: EditorState.createEmpty()
    })
    let response
    try {
      response = await fetch(`${url}/details/${this.state.currentAttribute}/${this.state.currentChar}/${this.state.project_id}`, {
        headers: {
          'content-type': 'application/json',
          'Authorization': await this.state.getAuthToken()
        },
      })
      if(!response.ok) {
        throw new Error(response.status)
      } else {
        let rawEditorData = await response.json()
        this.setState({
          rawEditorData: rawEditorData[this.state.currentAttribute.toLowerCase()]
        }, () => {
            if(this.state.rawEditorData !== undefined && this.state.rawEditorData !== null) {
              const contentState = convertFromRaw(this.state.rawEditorData)
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
            

        })
      }
    } catch(err) {
      console.error(`error: ${err}`)
    }
  }

  render() {
    const styles = StyleSheet.create({
        characterEditor: {
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            width: '100%',
            height: `calc(100% - 95px)`,
            minWidth: 270,
            backgroundColor: 'white',
            padding: 5, 
            borderBottomRightRadius: 8,

        },

        treatmentEditor: {
          width: '100%',
          padding: 5
        },

        

        header: {
          fontWeight: 'bold',
          fontSize: 22
        }
    })

      return (
      <WritualContext.Consumer>
            {(context) => (
              <View style={this.state.currentAttribute === undefined ? styles.editor : styles.editorBlank}>

                {
                  this.state.currentAttribute !== undefined 
                    ? <Toolbar  />
                    : null
                }
                
                <View style={{marginTop: 10, padding: 10}}>
                  <Editor readOnly={  context.sharedProjClicked === true 
                                        ? context.isEpisode === true
                                            ? context.sharedEpisodes.find(proj => proj.episode_title === context.currentProj).permission === 'Can Edit' 
                                                ? false 
                                                : true 
                                            : context.sharedProjects.find(proj => proj.title === context.currentProj).permission === 'Can Edit' 
                                              ? false 
                                              : true 
                                        : false } plugins={plugins} ref={this.setEditor} editorState={this.state.editorState} onChange={this.onChange} />
                  </View>
              </View>
              )}
      </WritualContext.Consumer>
    );

  }

}