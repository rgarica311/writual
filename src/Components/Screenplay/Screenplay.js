import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { EditorState, ContentState,
  convertToRaw,
  convertFromRaw, RichUtils, Modifier, SelectionState, getDefaultKeyBinding,
  KeyBindingUtil } from 'draft-js';
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
import './Screenplay.css'

const url = config.API_URL
const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];

const elements = {
    scene_headings: [
       
        'ext.',
        'int.'
        
    ]
}

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
    console.log('blockmap debug2: onchanged fired')
    let raw = convertToRaw(editorState.getCurrentContent())
    const oldContentState = this.state.editorState.getCurrentContent()
    let currentContentState = editorState.getCurrentContent()
    
    let newEditorState = EditorState.moveFocusToEnd(editorState)
    if(oldContentState !== currentContentState) {
        this.setState({
            editorState: newEditorState
        }, () => {
            console.log('blockmap debug2: text in onchange callback', this.state.editorState.getCurrentContent().getLastBlock().getText())
            let text = editorState.getCurrentContent().getLastBlock().getText()
            const firstBlock = currentContentState.getBlockMap().first()
            const lastBlock = currentContentState.getBlockMap().last()
            const firstBlockKey = firstBlock.getKey()
            const lastBlockKey = lastBlock.getKey()
            const lengthOfLastBlock = lastBlock.getLength()

            

            //console.log(`debug editor: newSelectionState before style application ${newSelectionState}`)

            if(text.includes('ext.') || text.includes('int.')) {
                console.log('blockmap debug2: scene heading')
                const inlineStyle = editorState.getCurrentInlineStyle();
                const isCapital = inlineStyle.has("CAPITALIZE")
                
                const nextOffSet = editorState.getSelection().getFocusOffset() + text.length

                let newState = new SelectionState({
                    anchorKey: firstBlockKey,
                    anchorOffset: 0,
                    focusKey: lastBlockKey,
                    focusOffset: lengthOfLastBlock
                })
            
                const stateWithContent = EditorState.createWithContent(currentContentState)

                let newSelectionState = new SelectionState({
                    anchorKey: firstBlockKey,
                    anchorOffset: nextOffSet,
                    focusKey: lastBlockKey,
                    focusOffset: nextOffSet
                })

                currentContentState = Modifier.applyInlineStyle(currentContentState, newState, 'CAPITALIZE')
                console.log(`currentContentState after inlineStyle: ${currentContentState}`)

                const stateWithContentAndSelection = EditorState.push(stateWithContent, currentContentState, 'change-inline-style')
                //const stateWithContentAndSelection = EditorState.forceSelection(stateWithContent, newSelectionSTate)
                const stateWithContentAtEnd = EditorState.moveSelectionToEnd(stateWithContentAndSelection)
                console.log(`stateWithContentAndSelection: ${JSON.stringify(stateWithContentAndSelection)}`)
                if(!isCapital) {
                    this.setState({
                        editorState: stateWithContentAtEnd
                    }, () => {
                        console.log(`currentSelection: ${this.state.editorState.getSelection()}`)
                    })
                }
                
                //let newEditorState = EditorState.push(editorState, currentContentState, 'change-inline-style')
                //console.log(`newEditorState: ${JSON.stringify(newEditorState)}`)
                //return newEditorState
                //console.log(`debug editor: newEditorState after style application ${JSON.stringify(newEditorState)}`)
                /*if(!isCapital) {
                    //let newState = RichUtils.toggleInlineStyle(this.state.editorState, 'CAPITALIZE')
                    console.log(`isCaptial is ${isCapital}`)
                    this.setState({
                        editorState: newEditorState
                    })
                }*/
                
            } else {
                //console.log(`key command: ${command}`)
                const currentContentState = this.state.editorState.getCurrentContent()
                const stateWithContent = EditorState.createWithContent(currentContentState)
                const inlineStyle = editorState.getCurrentInlineStyle();
                const isCapital = inlineStyle.has("CAPITALIZE")
                
                //console.log(`blockmap debug: command captured: ${command}, isCapital:  ${isCapital}`)
                
                if(isCapital) {
                  console.log(`text: ${text} isCapital: ${isCapital}`)
                  const firstBlock = currentContentState.getBlockMap().first()
                  const lastBlock = currentContentState.getBlockMap().last()
                  const firstBlockKey = firstBlock.getKey()
                  const lastBlockKey = lastBlock.getKey()
                  const lengthOfLastBlock = lastBlock.getLength()
                  console.log(`blockmap debug: lastBlockKey: ${lastBlockKey} firstBlockKey: ${firstBlockKey}`)
                  console.log(`blockmap debug: lastBlock: ${lastBlock} firstBlock: ${firstBlock}`)
                  console.log(`blockmap debug: blockMap: ${this.state.editorState.getCurrentContent().getBlockMap()}`)
                  let newState = new SelectionState({
                      anchorKey: lastBlockKey,
                      anchorOffset: 0,
                      focusKey: lastBlockKey,
                      focusOffset: lengthOfLastBlock
                  })
                  let newContentState = Modifier.removeInlineStyle(currentContentState, newState, 'CAPITALIZE')
                  //let newContentState = Modifier.applyInlineStyle(prevContentState, newState, 'ACTION')
                
                  console.log(`blockmap debug2: after removal: ${newContentState}`)
                  let newContentWithRemovalSelection = EditorState.push(stateWithContent, newContentState, 'change-inline-stlye')
                  console.log(`blockmap debug2: newContentWithRemovalSelection: ${JSON.stringify(newContentWithRemovalSelection)}`)
                  const finalState = EditorState.moveSelectionToEnd(newContentWithRemovalSelection)
                  this.setState({
                    editorState: finalState
                  }, () => {
                    console.log(`editoState has capital after removal: ${this.state.editorState.getCurrentInlineStyle().has("CAPITALIZE")}`)
                  })
                }
                
                  

                
            }

            
        });

        if (this.state.updateProjectScreenplay !== undefined) {
            this.setState({
                editorFull: this.state.editorState.getCurrentContent().hasText(),
            }, () => {
                this.saveScreenplayState(raw)
            })
        }
    }

  };

  this.elementCheck = debounce((text) => {
        console.log('text', text)
  
        let newState

        if(text.includes('ext.') || text.incldues('int.')) {
            console.log('scene heading')
            newState = RichUtils.toggleInlineStyle(this.state.editorState, 'CAPITALIZE')
            this.setState({
                editorState: newState
            })

        } else if (!text.includes('EXT')) {
            console.log('text.includes(EXT)', text.includes('EXT'))
            console.log('elements.scene_headings.includes(text)', elements.scene_headings.includes(text))
            console.log(`elements.scene_headings[0] ${elements.scene_headings[0]}`)
            newState = RichUtils.toggleInlineStyle(this.state.editorState, 'CENTER')
            this.setState({
                editorState: newState
            })
        }
          
        
  }, 3000)

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

myKeyBindingFn = (e) => {
  const { hasCommandModifier } = KeyBindingUtil

  if(e.keyCode === 13) {
    //return 'enter'
  }
  return getDefaultKeyBinding(e)
}

/*handleKeyCommand = debounce((command, editorState) => {
  console.log(`key command: ${command}`)
  const currentContentState = this.state.editorState.getCurrentContent()
  const stateWithContent = EditorState.createWithContent(currentContentState)
  const inlineStyle = editorState.getCurrentInlineStyle();
  const isCapital = inlineStyle.has("CAPITALIZE")
  if(command === 'split-block') {
    console.log(`blockmap debug: command captured: ${command}, isCapital:  ${isCapital}`)
    if(isCapital) {

      const firstBlock = currentContentState.getBlockMap().first()
      const lastBlock = currentContentState.getBlockMap().last()
      const firstBlockKey = firstBlock.getKey()
      const lastBlockKey = lastBlock.getKey()
      const lengthOfLastBlock = lastBlock.getLength()
      console.log(`blockmap debug: lastBlockKey: ${lastBlockKey} firstBlockKey: ${firstBlockKey}`)
      console.log(`blockmap debug: lastBlock: ${lastBlock} firstBlock: ${firstBlock}`)
      console.log(`blockmap debug: blockMap: ${this.state.editorState.getCurrentContent().getBlockMap()}`)
      let newState = new SelectionState({
          anchorKey: lastBlockKey,
          anchorOffset: 0,
          focusKey: lastBlockKey,
          focusOffset: lengthOfLastBlock
      })
      let newContentState = Modifier.removeInlineStyle(currentContentState, newState, 'CAPITALIZE')
      //let newContentState = Modifier.applyInlineStyle(prevContentState, newState, 'ACTION')
    
      console.log(`blockmap debug2: after removal: ${newContentState}`)
      let newContentWithRemovalSelection = EditorState.push(stateWithContent, newContentState, 'change-inline-stlye')
      console.log(`blockmap debug2: newContentWithRemovalSelection: ${JSON.stringify(newContentWithRemovalSelection)}`)
      const finalState = EditorState.moveSelectionToEnd(newContentWithRemovalSelection)
      this.setState({
        editorState: finalState
      }, () => {
        console.log(`editoState has capital after removal: ${this.state.editorState.getCurrentInlineStyle().has("CAPITALIZE")}`)
      })
    }

  }
}, 1000)*/

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
            width: 816,
            height: 1056,
            backgroundColor: 'white',
            filter: "drop-shadow(0 0 .25rem grey)",
            alignSelf: 'center',
            padding: 96,
           
        },

    })

    const styleMap = {
        
        CENTER: {
            margin: "0 auto"
        },

        CAPITALIZE: {
            textTransform: 'uppercase'
        },

        ACTION: {
          textTransform: 'capitalize'
        }

      
    }

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
                                                                                : false  } 
                                                                                plugins={plugins} 
                                                                                ref={this.setEditor} 
                                                                                editorState={this.state.editorState} 
                                                                                onChange={this.onChange}
                                                                                //handleKeyCommand={this.handleKeyCommand}
                                                                                //keyBindingFn={this.myKeyBindingFn}
                                                                                customStyleMap={styleMap} />
                        </View>
                    </View>
                    
                  </View>
                : <View style={styles.screenplayEditor}><Text style={{fontSize: 22, fontFamily:'Coustard', alignSelf: 'center'}}>No project selected. Select a project to begin writing a screenplay.</Text></View>
             
              )}
        </WritualContext.Consumer>
    );

  }

}