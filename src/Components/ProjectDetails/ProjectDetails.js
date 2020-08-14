import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableHighlight } from 'react-native'
import DetailTab from '../DetailTab/DetailTab'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import WritualContext from '../../WritualContext'


export default class ProjectDetails extends Component {
    constructor(props){
        super(props)
        this.state = {
            tabTitles: ['Overview', 'Characters', 'Scenes', 'Treatment'],
            tvTabTitles: ['Overview', 'Characters'],
            episodeTabTitles: ['Overview', 'Scenes', 'Treatment'],
            renderProfileMenu: false, 
            windowHeight: this.props.windowHeight,
            windowWidth: this.props.windowWidth
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
            tabContainer: {
                flexDirection: 'row',
                width: this.state.windowWidth - 310,
                //minWidth: 500
            },

             signedInHeader: {
                flexDirection: 'row',
                height: hp('7%'),
                alignItems: 'center',
                marginRight: 20,
                elevation: 2,
                marginLeft: 'auto',
            },

             photo: {
                height: 25,
                width: 25,
                borderRadius: "50%",
            },

        })

        return (
            <WritualContext.Consumer>
                {(context) => (
                    <View style={styles.tabContainer}>
                        {

                        context.currentProjFormat === 'Television'
                            ? this.state.tvTabTitles !== undefined 
                                ? this.state.tvTabTitles.map(title =>
                                        <DetailTab windowWidth={this.state.windowWidth} windowHeight={this.state.windowHeight} key={title} title={title}/>
                                    )
                                    
                                : null
                            
                            : context.currentProjFormat === 'Episode' 
                                ? this.state.episodeTabTitles.map(title => <DetailTab windowWidth={this.state.windowWidth} windowHeight={this.state.windowHeight} key={title} title={title}/>)
                                : this.state.tabTitles !== undefined 
                                    ? this.state.tabTitles.map(title =>
                                            <DetailTab windowWidth={this.state.windowWidth} windowHeight={this.state.windowHeight} key={title} title={title}/>
                                        )
                                        
                                    : null
                        }
                        {
                            localStorage.getItem('logged_in') 
                                ? <TouchableHighlight onClick={e => context.handleUserImgClick(e)} style={styles.signedInHeader}>
                                    <Image style={styles.photo} source={context.photoUrl}/>
                                </TouchableHighlight>
                                : null
                        }
                    </View>
                )}
            </WritualContext.Consumer>

        )
    }
}