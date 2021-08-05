import React, { Component } from 'react'
import { Text, StyleSheet, TouchableHighlight, Platform, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import WritualContext from '../../WritualContext'
import './DetailTab.css'
import colorSwatches from '../../colorSwatches'

const { darkGunMetal, princetonOrange } = colorSwatches

export default class DetailTab extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: this.props.title,
            borderColor: 'white',
            borderBottomWidth: '2',
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
            tab: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '15%',
                minWidth: 120,
                padding: 5,
                height: 70,
                cursor: 'pointer', 
              
            },

             activeStyle: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '20%',
                minWidth: 120,
                padding: 5,
                height: 80,
                cursor: 'pointer', 
                
            },

            tabText: {
                color: darkGunMetal,
                textTransform: 'uppercase',
                fontFamily: 'Montserrat',
                fontWeight: '800',
                fontSize: '.8rem',
                textAlign: 'center',
                height: hp('3%'),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                letterSpacing: '.1em'

            },

            activeText: {
                color: princetonOrange,
                textTransform: 'uppercase',
                fontFamily: 'Montserrat',
                fontWeight: '800',
                fontSize: '.8rem',
                textAlign: 'center',
                borderBottomWidth: 2, 
                borderBottomColor: princetonOrange,
                borderLeftWidth: 2, 
                borderRightWidth: 2,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                height: hp('3%'),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                letterSpacing: '.1em'

            },

           

        })
    
        return (
            <WritualContext.Consumer>
            {(context) => (

                Platform.OS === 'web' 
                    ? <View  //underlayColor="rgba(0, 0, 0, 0)" 
                                           //activeOpacity={1} 
                                           pointerEvents="auto"
                                           style={context.currentTab === this.state.title ? styles.activeStyle : styles.tab} 
                                           onClick={e => context.onTabClick(e, this.state.title)}>
                        <Text style={context.currentTab === this.state.title ? styles.activeText : styles.tabText}>{this.state.title}</Text>
                      </View>
                    : null
                
               
            )}
            
            </WritualContext.Consumer>
        )
    }
}