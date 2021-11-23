import React from 'react';
import LinearGradient from 'react-native-web-linear-gradient';

const LinearGradientCommon = props => {
  return (
    <LinearGradient
      colors={props.colors}
      style={props.style}
      start={props.start}
      end={props.end}>
      {props.children}
    </LinearGradient>
  );
};

export default LinearGradientCommon;
