import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'
import { Link } from 'react-router-dom';
import './WritualHeader.css';
import colorSwatches from '../../colorSwatches'
import WritualContext from "../../WritualContext";

const { darkGunMetal, yankeesBlue, princetonOrange, oldLace } = colorSwatches

const styles =  StyleSheet.create({
  writualHeader: {
    backgroundColor: darkGunMetal,
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#293E4F',
    borderBottomWidth: 1,
    cursor: "pointer"
  },

  image: {
    width: 35,
    height: 35,
    backgroundSie: 'contain',
    marginRight: 20,
    marginLeft: 15,
  },

  text: {
    fontFamily: 'Courier',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    color: 'white'
  },

})

export default class WritualHeader extends Component {
  
  render(){
    return (
       <WritualContext.Consumer>
          {(context) => (
              <View style={styles.writualHeader} onClick={context.goHome}>
                <Image style={styles.image} source={require('../../Assets/logo_t.png')}/>
                <Text style={styles.text}>Writual</Text>
              </View>
          )}
      </WritualContext.Consumer>
  );
    
  }
  
}
