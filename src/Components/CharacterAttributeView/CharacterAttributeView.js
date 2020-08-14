import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CharAttr from '../CharAttr/CharAttr'
import WritualContext from '../../WritualContext'
import TextEditor from '../TextEditor/TextEditor'


export default class CharAttrView extends Component {
    constructor(props){
        super(props)
        this.state = {
            windowHeight: this.props.windowHeight,
            windowWidth: this.props.windowWidth,
            details: ['Bio', 'Want', 'Need']
        }
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.windowHeight !== this.props.windowHeight || prevProps.windowWidth !== this.props.windowWidth) {
            this.setState({
                windowHeight: this.props.windowHeight,
                windowWidth: this.props.windowWidth,
                
            })
        }
    }

    

    render(){
        const styles = StyleSheet.create({
            container: {
                flex: 4,
                minWidth: 270,
                height: '100%',
            },

            charAttrContainer: {
                height: 95,
                width: '100%',
                flexDirection: 'row'
            },
            
            bio: {
                flex: 1,
                backgroundColor: 'white',
                height: hp('80%'),
                
            },
            
        })
        return(
            <WritualContext.Consumer>
                {(context) => (
                   context.currentProj !== undefined
                    ?  <View style={styles.container}> 
                            {
                                <View style={styles.charAttrContainer}>
                                    {
                                        
                                        this.state.details.map(detail => 
                                            
                                                <CharAttr key={detail} title={detail}/>
                                                
                                        )
                                    }
                                </View>

                                
                            }
                            {
                                context.currentAttribute !== undefined
                                    ? <TextEditor   currentProj={context.currentProj}
                                                    currentChar={context.currentChar}
                                                    getAuthToken={context.getAuthToken} 
                                                    currentAttribute={context.currentAttribute}
                                                    getEditorState={context.getEditorState} 
                                                    editorState={context.editorState}
                                                    updateCharacterDetail={context.updateCharacterDetail}
                                                    project_id={context.current_project_id}
                                                    projects={context.projects}
                                                    uid={context.uid}
                                                    />
                                    
                                    : null
                            }
    
                        </View>
                    : null
                   
                        
                )}
            </WritualContext.Consumer>
        )
    }
}