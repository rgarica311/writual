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
import Scene from "../Scene/Scene";
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
const scene_headings = ['int.', 'ext.', 'int./ext.', 'ext./int.', 'INT.', 'EXT.', 'INT./EXT.', 'EXT./INT.']
const shots = ['close on', 'closer on', 'closeup', 'cu', 'wide', 'wider', 'pov', 'insert', 'angle on', 'dolly', 'push', 'long', 'medium']
const transitions = [
  'fade in:', 
  'fade out:', 
  'fade to:', 
  'over black:', 
  'wipe to:', 
  'flash cut to:',
  'freeze frame:',
  'iris in:',
  'iris out:',
  'cut to:',
  'jumpt cut to:',
  'match cut to:',
  'match dissolve to:',
  'smash cut to:',
  'stock shot:',
  'time cut:',
]

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

    const raw = convertToRaw(editorState.getCurrentContent())
    const oldContentState = this.state.editorState.getCurrentContent()
    const currentContentState = editorState.getCurrentContent()
    const stateWithContent = EditorState.createWithContent(currentContentState)
    const newEditorState = EditorState.moveFocusToEnd(editorState)
    let text = editorState.getCurrentContent().getLastBlock().getText()

    const nextOffSet = editorState.getSelection().getFocusOffset() + text.length

    if(oldContentState !== currentContentState) {
        this.setState({
            editorState: newEditorState
        }, () => {

            console.log('element is: current text:', text)
            const firstBlock = currentContentState.getBlockMap().first()
            const lastBlock = currentContentState.getBlockMap().last()
           
            const initialSelectionState = new SelectionState({
              anchorKey: lastBlock.getKey(),
              anchorOffset: 0,
              focusKey: lastBlock.getKey(),
              focusOffset: lastBlock.getLength()
            })

            const newSelectionState = new SelectionState({
              anchorKey: firstBlock.getKey(),
              anchorOffset: nextOffSet,
              focusKey: lastBlock.getKey(),
              focusOffset: nextOffSet
            })
                  
            const inlineStyle = editorState.getCurrentInlineStyle();
            const isCapital = inlineStyle.has("CAPITALIZE")
            const isDialogue = inlineStyle.has("DIALOGUE")
            const isCharacter = inlineStyle.has('CHARACTER')

            let formatSceneHeading = false

            scene_headings.map(heading => {
              if(text.includes(heading)) {
                formatSceneHeading = true
              }
            })
            
            if(formatSceneHeading) {

                console.log(`element is: scene heading`)
                this.formatSceneHeading(initialSelectionState, currentContentState, stateWithContent)

            } else if(!text.includes('int.') && !text.includes('ext.') && !text.includes(' ') && text.length > 1) {
                console.log(`element is: not scene heading and has no space`)

                const chars = text.split('')
                let allUpper = true
                chars.map(char => {
                  if(char !== char.toUpperCase()) {
                    allUpper = false
                  }
                })

                if(allUpper) {
                  if(!shots.includes(text) && !transitions.includes(text)) {

                    console.log(`element is: character`)
                    this.formatCharacterName(initialSelectionState, currentContentState, stateWithContent, isDialogue)
                    
                  }  else {
                      console.log('element is: shot')
                      if(shots.includes(text)) {

                        console.log(`element is: shot`)
                        this.formatShot(initialSelectionState, currentContentState, stateWithContent, isDialogue)
        
                      } else {

                          console.log(`element is: transition`)
                          this.formatTransition(initialSelectionState, currentContentState, stateWithContent, isDialogue)

                      }
                      
                  }
                  
                } else if(!shots.includes(text) && !transitions.includes(text)) {
                    console.log('element is: not shot or transition or scene heading')
                           
                    if (isCharacter) {
                        console.log(`element is: dialogue`)
                        this.formatDialogue(initialSelectionState, currentContentState, stateWithContent)
                    } else {
                        this.formatAction(initialSelectionState, currentContentState, stateWithContent, '')
                    }
                } else {
                    if(shots.includes(text)) {
                      console.log('element is: shot and lowercase')
                      this.formatShot(initialSelectionState, currentContentState, stateWithContent, isDialogue)

                    } 
                    
                }
                
            } else {
                console.log('element has space')
                if(shots.includes(text)) {
                  console.log('element is: shot and lowercase')
                  this.formatShot(initialSelectionState, currentContentState, stateWithContent, isDialogue)

                } else if (transitions.includes(text)) {
                    this.formatTransition(initialSelectionState, currentContentState, stateWithContent, isDialogue)

                } else {
                    this.formatAction(initialSelectionState, currentContentState, stateWithContent)
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

formatSceneHeading = (initialSelectionState, currentContentState, stateWithContent, isCapital) => {
  const updatedContentState = Modifier.applyInlineStyle(currentContentState, initialSelectionState, 'CAPITALIZE')
  console.log(`currentContentState after inlineStyle: ${currentContentState}`)

  const stateWithContentAndSelection = EditorState.push(stateWithContent, updatedContentState, 'change-inline-style')
  const stateWithContentAtEnd = EditorState.moveSelectionToEnd(stateWithContentAndSelection)
  console.log(`stateWithContentAndSelection: ${JSON.stringify(stateWithContentAndSelection)}`)
  if(!isCapital) {
      this.setState({
          editorState: stateWithContentAtEnd
      }, () => {
          console.log(`currentSelection: ${this.state.editorState.getSelection()}`)
      })
  }
}

formatCharacterName = (initialSelectionState, currentContentState, stateWithContent, isDialogue) => {
  
  let newContentState
  //check if previous element is dialogue
  if(isDialogue) {
    console.log(`isDialogue: ${isDialogue}`)
    const removedDialogueContentState = Modifier.removeInlineStyle(currentContentState, initialSelectionState, 'DIALOGUE')
    newContentState = Modifier.applyInlineStyle(removedDialogueContentState, initialSelectionState, 'CHARACTER')
  } else {
      newContentState = Modifier.applyInlineStyle(currentContentState, initialSelectionState, 'CHARACTER')
  }
  
  const newEditorStateWithSelection = EditorState.push(stateWithContent, newContentState, 'change-inline-stlye')
  const finalState = EditorState.moveSelectionToEnd(newEditorStateWithSelection)
  this.setState({
    editorState: finalState
  }, () => {
    console.log(`editoState has capital after removal: ${this.state.editorState.getCurrentInlineStyle().has("CAPITALIZE")}`)
  })
}

formatDialogue = (initialSelectionState, currentContentState, stateWithContent) => {

  const newContentState = Modifier.removeInlineStyle(currentContentState, initialSelectionState, 'CHARACTER')
  const DialogueContentState = Modifier.applyInlineStyle(newContentState, initialSelectionState, 'DIALOGUE')

  const DialogueEditorState = EditorState.push(stateWithContent, DialogueContentState, 'change-inline-stlye')
  const finalState = EditorState.moveSelectionToEnd(DialogueEditorState)

  this.setState({
    editorState: finalState
  }, () => {
    console.log(`editoState has capital after removal: ${this.state.editorState.getCurrentInlineStyle().has("CAPITALIZE")}`)
  })

}

formatShot = (initialSelectionState, currentContentState, stateWithContent, isDialogue) => {

  let newContentState
  //check if previous element is dialogue
  if(isDialogue) {
    console.log(`isDialogue: ${isDialogue}`)
    const removedDialogueContentState = Modifier.removeInlineStyle(currentContentState, initialSelectionState, 'DIALOGUE')
    newContentState = Modifier.applyInlineStyle(removedDialogueContentState, initialSelectionState, 'SHOT')
  } else {
      newContentState = Modifier.applyInlineStyle(currentContentState, initialSelectionState, 'SHOT')
  }
  
  const newEditorStateWithSelection = EditorState.push(stateWithContent, newContentState, 'change-inline-stlye')
  const finalState = EditorState.moveSelectionToEnd(newEditorStateWithSelection)
  this.setState({
    editorState: finalState
  }, () => {
    console.log(`editoState has capital after removal: ${this.state.editorState.getCurrentInlineStyle().has("CAPITALIZE")}`)
  })
}

formatTransition = (initialSelectionState, currentContentState, stateWithContent, isDialogue) => {
  let newContentState
  //check if previous element is dialogue
  if(isDialogue) {
    console.log(`isDialogue: ${isDialogue}`)
    const removedDialogueContentState = Modifier.removeInlineStyle(currentContentState, initialSelectionState, 'DIALOGUE')
    newContentState = Modifier.applyInlineStyle(removedDialogueContentState, initialSelectionState, 'TRANSITION')
  } else {
      newContentState = Modifier.applyInlineStyle(currentContentState, initialSelectionState, 'TRANSITION')
  }
  
  const newEditorStateWithSelection = EditorState.push(stateWithContent, newContentState, 'change-inline-stlye')
  const finalState = EditorState.moveSelectionToEnd(newEditorStateWithSelection)
  this.setState({
    editorState: finalState
  }, () => {
    console.log(`editoState has capital after removal: ${this.state.editorState.getCurrentInlineStyle().has("CAPITALIZE")}`)
  })
}

formatSceneHeading = (initialSelectionState, currentContentState, stateWithContent) => {
  const inlineStyle = this.state.editorState.getCurrentInlineStyle()
  console.log(`currentInlineStyle: ${inlineStyle}`)
  let styleToRemove = null
  let newContentWithRemovalSelection 
  const styles = ['SHOT', 'TRANSITION', 'DIALOGUE']
  styles.map(style => {
    if(inlineStyle.has(style)) {
      styleToRemove = style
    }
  })
  if(styleToRemove !== null) {
    const newContentState = Modifier.removeInlineStyle(currentContentState, initialSelectionState, styleToRemove)
    const sceneHeadingContentState = Modifier.applyInlineStyle(newContentState, initialSelectionState, 'CAPITALIZE')
   newContentWithRemovalSelection = EditorState.push(stateWithContent, sceneHeadingContentState, 'change-inline-stlye')
  } else {
      const sceneHeadingContentState = Modifier.applyInlineStyle(currentContentState, initialSelectionState, 'CAPITALIZE')
      newContentWithRemovalSelection = EditorState.push(stateWithContent, sceneHeadingContentState, 'change-inline-stlye')
  }

  const finalState = EditorState.moveSelectionToEnd(newContentWithRemovalSelection)

  this.setState({
    editorState: finalState
  }, () => {
    console.log(`editoState has capital after removal: ${this.state.editorState.getCurrentInlineStyle().has("CAPITALIZE")}`)
  })
}

formatAction = (initialSelectionState, currentContentState, stateWithContent) => {
  console.log('element is: action... format action running')
  console.log(`element is: action... initialSelectionState: ${initialSelectionState}`)
  console.log(`element is: action... currentContentState: ${currentContentState}`)

  const inlineStyle = this.state.editorState.getCurrentInlineStyle()
  console.log(`currentInlineStyle: ${inlineStyle}`)
  let styleToRemove
  const styles = ['CAPITALIZE', 'SHOT', 'DIALOUGE']
  styles.map(style => {
    if(inlineStyle.has(style)) {
      styleToRemove = style
    }
  })
  
  const newContentState = Modifier.removeInlineStyle(currentContentState, initialSelectionState, styleToRemove)
  const newContentWithRemovalSelection = EditorState.push(stateWithContent, newContentState, 'change-inline-stlye')
  const finalState = EditorState.moveSelectionToEnd(newContentWithRemovalSelection)

  this.setState({
    editorState: finalState
  }, () => {
    console.log(`editoState has capital after removal: ${this.state.editorState.getCurrentInlineStyle().has("CAPITALIZE")}`)
  })

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
      let initialSelectionState = new SelectionState({
          anchorKey: lastBlockKey,
          anchorOffset: 0,
          focusKey: lastBlockKey,
          focusOffset: lengthOfLastBlock
      })
      let newContentState = Modifier.removeInlineStyle(currentContentState, initialSelectionState, 'CAPITALIZE')
      //let newContentState = Modifier.applyInlineStyle(prevContentState, initialSelectionState, 'ACTION')
    
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


  }

  render() {
    const styles = StyleSheet.create({
        screenplayEditor: {
          width: '100%',
          height: this.state.screenplayEditorHeight,
          padding: 5,
        },

        screenplayViewContainer: {
            width: 820,
            height: 1060,
            backgroundColor: 'white',
            filter: "drop-shadow(0 0 .25rem grey)",
            padding: 96,
            paddingLeft: 147,
           
        },

        scenes: {
          marginRight: 100
        }

    })

    const styleMap = {
        
        DIALOGUE: {
            margin: "0 auto",
            maxWidth: 330
        },

        CAPITALIZE: {
            textTransform: 'uppercase'
        },

        CHARACTER: {
          textTransform: 'uppercase',
          marginLeft: 190,
        },

        SHOT: {
          textTransform: 'uppercase',
          
        },

        TRANSITION: {
          textTransform: 'uppercase',
          marginLeft: 'auto'

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
                            
                    <View style={{marginTop: 20, padding:20, width: '100%', height: 980, overflow: 'auto', flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={styles.scenes}>
                          {
                            context.projScenes.map(obj => 
                              <Scene
                                  getProjectScenes={context.getProjectScenes}
                                  getAuthToken={context.getAuthToken}
                                  scene_id={obj.id}
                                  deleteScenes={context.deleteScenes}
                                  key={obj.id}
                                  heading={obj.scene_heading}
                                  thesis={obj.thesis}
                                  antithesis={obj.antithesis}
                                  synthesis={obj.synthesis}
                              />
                            )
                          }
                        </View>
                        
                        <View style={styles.screenplayViewContainer}>
                            <Editor style={{width: '100%'}} readOnly={  context.sharedProjClicked === true 
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
                                                                                handleKeyCommand={this.handleKeyCommand}
                                                                                keyBindingFn={this.myKeyBindingFn}
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