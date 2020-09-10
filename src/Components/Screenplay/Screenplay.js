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
import * as io from 'socket.io-client'
import { config } from '../../URLS'

const url = config.API_URL
const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];

export default class ScreenplayEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState:  this.props.content === undefined 
                      ? EditorState.createEmpty() 
                      : EditorState.createWithContent(ContentState.createFromText(this.props.content)),
      getAuthToken: this.props.getAuthToken !== undefined ? this.props.getAuthToken : undefined,
      editorEmpty: true,
      getEditorState: this.props.getEditorState,
      updateProjectScreenplay: this.props.updateProjectScreenplay,
      currentProj: this.props.currentProj !== undefined ? this.props.currentProj : undefined,
      project_id: this.props.project_id,
      socket: io.connect(`${url}`),
      projects: props.projects, 
      sharedProjects: props.sharedProjects,
      episode_id: this.props.episode_id !== undefined ? this.props.episode_id : null,
      windowHeight: this.props.windowHeight,
      windowWidth: this.props.windowWidth,
      screenplayContainerHeight: this.props.windowHeight - 100,
      screenplayEditorHeight: this.props.windowHeight - 80

      
    };

  this.onChange = (editorState) => {
      let raw = convertToRaw(editorState.getCurrentContent())
      
      this.setState({editorState});
      
      const currentContentState = this.state.editorState.getCurrentContent()
      const newContentState = editorState.getCurrentContent()
      if(currentContentState !== newContentState) {
          if (this.state.updateProjectScreenplay !== undefined) {
              this.setState({
                  editorFull: this.state.editorState.getCurrentContent().hasText()
              }, () => {
                  this.saveScreenplayState(raw)
              })
          }
      }
      
  };

  this.saveScreenplayState = debounce((raw) => {
    this.updateProjectScreenplay(raw)
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

      this.state.socket.on('update-screenplay', project_id => {
        if(this.state.projects.find(proj => proj.project_id === project_id) !== undefined || this.state.sharedProjects.find(proj => project_id === project_id) !== undefined) {
          if(this.state.project_id === project_id) {
            this.getEditorState()
          }
        }
      })
  }

  test = () => {
    //console.log('test ran')
    this.state.socket.emit('update-screenplay', this.state.project_id)
  }

  getAuthorization = async () => {
   this.setState({
     idToken: await this.state.getAuthToken()
   })
  }

  updateProjectScreenplay = (raw) => {
    let updatedScreenplay = {
      proj_name: this.state.currentProj,
      project_id: this.state.project_id,
      episode_id: this.state.episode_id,
      screenplay: raw,
    }

    try {
      fetch(`${url}/screenplays`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.state.idToken
        },
        body: JSON.stringify(updatedScreenplay)
      })
      
      
    } catch(error) {
      console.error(`error: ${error}`)
    }
    this.test()
    

  }

  getEditorState = async () => {

      try {
          let response = await fetch(`${url}/screenplays/${this.state.project_id}/${this.state.episode_id}`, {
              headers: {
                  'content-type': 'application/json',
                  'Authorization': await this.state.getAuthToken()
              },
          })
          if(!response.ok) {
              throw new Error(response.status)
          } else {
              let rawEditorData = await response.json()

              if(rawEditorData.length > 0) {
                this.setState({
                  rawEditorData: rawEditorData[0].screenplay
                }, () => {
                    const contentState = convertFromRaw(this.state.rawEditorData)
                    this.setState({
                        editorState: EditorState.createWithContent(contentState),
                        editorEmpty: false
                    })
                })
                    
                    
              } else {
                this.setState({
                  editorState: EditorState.createEmpty(),
                  editorEmpty: true
                })
              } 

          }  
              
          
      } catch (err) {
          console.error(`err: ${err}`)
      }


  //return await response.json()
  }

  render() {
    const styles = StyleSheet.create({
        screenplayEditor: {
          width: '100%',
          height: this.state.screenplayEditorHeight,
          padding: 5,
        },

        screenplayViewContainer: {
            width: 768,
            height: 1056,
            backgroundColor: 'white',
            filter: "drop-shadow(0 0 .25rem grey)",
            alignSelf: 'center',
            padding: 96,
           
        },

    })

    return (
        <WritualContext.Consumer>
            {(context) => (
              context.currentProj !== undefined
                ?  <View style={styles.screenplayEditor}>
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
                            
                    <View style={{marginTop: 20, padding:20, width: '100%', height: 980, overflow: 'auto'}}>
                        <View style={styles.screenplayViewContainer}>
                            <Editor style={{width: '100%', height: 980}} readOnly={  context.sharedProjClicked === true 
                                                                                ? context.sharedProjects.find(proj => proj.title === context.currentProj) !== undefined 
                                                                                    ? context.sharedProjects.find(proj => proj.title === context.currentProj).permission === 'Can Edit' 
                                                                                        ? false 
                                                                                        : true 
                                                                                    : context.sharedEpisodes.find(proj => proj.episode_title === context.currentProj) !== undefined
                                                                                        ? context.sharedEpisodes.find(proj => proj.episode_title === context.currentProj).permission === 'Can Edit' 
                                                                                            ? false
                                                                                            : true
                                                                                        : null
                                                                                : false  } plugins={plugins} ref={this.setEditor} editorState={this.state.editorState} onChange={this.onChange} />
                        </View>
                    </View>
                    
                  </View>
                : <View style={styles.screenplayEditor}><Text style={{fontSize: 22, fontFamily:'Coustard', alignSelf: 'center'}}>No project selected. Select a project to begin writing a screenplay.</Text></View>
             
              )}
        </WritualContext.Consumer>
    );

  }

}