  
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
        //console.log(`details edtiorState Text ${editorState.getCurrentContent().getText()}`)
        //console.log(`details raw ${JSON.stringify(raw)}`)
        //const contentState = ContentState.createFromBlockArray(convertFromRaw(raw))
        //console.log(`details contentState has text ${contentState.hasText()}`)

        const currentContentState = this.state.editorState.getCurrentContent()
        const newContentState = editorState.getCurrentContent()
        if(currentContentState !== newContentState) {

           if(this.state.updateCharacterDetail !== undefined) {
              //console.log(`details editorFull ${this.state.editorFull} `)
              this.setState({
                editorFull: this.state.editorState.getCurrentContent().hasText()
              }, () => {
                  this.saveState(raw) 
              })
              //this.state.updateCharacterDetail(raw, editorFull)
          }
        }
        
        //console.log(`details editorState currentContent keys ${this.state.editorState.getCurrentContent().hasText()}`)
        //console.log(`details editorState currentContent ${ Object.keys(this.state.editorState.getCurrentContent().blockMap).map(key => this.state.getEditorState.getCurrentContent().blockMap[key]) }`)
    };

    this.saveState = debounce((raw) => {
      //console.log(`details saveState ran editorFull: ${editorFull}`)
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
    //console.log(`text editor props did update prevProps.currentChar ${prevProps.currentChar} props.currentChar ${this.props.currentChar}`)
    if(this.props.content !== prevProps.content && this.props.content !== undefined) {
      //console.log(`details updating editorState`)
      this.setState({
        editorState: EditorState.createWithContent(ContentState.createFromText(this.props.content)),
        editorEmpty: false
      })
    
      //console.log(`editorState: ${JSON.stringify(this.state.editorState)}`)
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
        //console.log(`this should run: prevProps.currentChar ${prevProps.currentChar} props.currentChar ${this.props.currentChar}`)

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
      //console.log(`TextEditor this.state.project_id ${this.state.project_id} project_id ${project_id}`)
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
    //console.log(`details saveState ran and tiggered updateCharacterDetail`)
    //console.log(`details path: updateCharaterDetails onChange raw: ${JSON.stringify(raw)}`)
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
    //console.log(`details: newDetail in updateCharacterDetail ${JSON.stringify(newDetail)}`)
    //console.log( `details path eidtorFull true rendering `)
    try {
      fetch(`${url}/details/existing/${this.state.currentAttribute.toLowerCase()}/${this.state.currentChar}/${this.state.project_id}`, {
        method: 'POST',
        headers: {
          //'Accept': 'application/json',
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
    //console.log(`details getEditorState running`)
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
      //console.log(`details response: ${JSON.stringify(await response.json())}`)
      if(!response.ok) {
        throw new Error(response.status)
        //console.log(`detail no repsonse`)
      } else {
        //console.log(`details response: ${await response.json()}`)
        let rawEditorData = await response.json()
        //console.log(`rawEditorData: ${JSON.stringify(rawEditorData[this.state.currentAttribute.toLowerCase()])}`)
        this.setState({
          //editorState: EditorState.createWithContent(convertFromRaw(await response.json()))
          rawEditorData: rawEditorData[this.state.currentAttribute.toLowerCase()]
        }, () => {
            //console.log(`details this.state.rawEditorData[0][this.state.currentAttribute] ${this.state.rawEditorData[0][this.state.currentAttribute]}`)
            if(this.state.rawEditorData !== undefined && this.state.rawEditorData !== null) {
              //console.log(`details getEditorState running if ran: this.state.rawEditorData ${JSON.stringify(this.state.rawEditorData)}`)
              const contentState = convertFromRaw(this.state.rawEditorData)
              //console.log(`contentState ${convertToRaw(contentState)}`)
              this.setState({
                editorState: EditorState.createWithContent(contentState),
                editorEmpty: false
              })
            } else {
              //console.log(`details getEditorState running else ran`)
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
    //return await response.json()
  }

  render() {
    //console.log('content in text editor state', this.props.content)
    //console.log('this.state.editorstate', this.state.editorState)

    const styles = StyleSheet.create({
        characterEditor: {
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            width: '100%',
            height: `calc(100% - 95px)`,
            minWidth: 270,
            backgroundColor: 'white',
            padding: 5, 
            
            //justifyContent: 'center',
            borderBottomRightRadius: 8,
            //marginBottom: 'auto'

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