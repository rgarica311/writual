import React, { Component } from "react";
import {
  Animated,
  View,
  TouchableWithoutFeedback,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import chroma from "chroma-js";
import normalizeValue from "./utils";
import LinearGradientCommon from "./LinearGradient";

export default class HuePicker extends Component {
  constructor(props) {
    super(props);
    this.hueColors = [
      "#ff0000",
      "#ffff00",
      "#00ff00",
      "#00ffff",
      "#0000ff",
      "#ff00ff",
      "#ff0000",
    ];
    this.firePressEvent = this.firePressEvent.bind(this);
    this.sliderY = new Animated.Value((props.barWidth * props.hue) / 360);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        const { hue } = this.props;
        this.dragStartValue = hue;
        this.fireDragEvent("onDragStart", gestureState);
      },
      onPanResponderMove: (evt, gestureState) => {
        this.fireDragEvent("onDragMove", gestureState);
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.fireDragEvent("onDragEnd", gestureState);
      },
      onPanResponderTerminate: (evt, gestureState) => {
        this.fireDragEvent("onDragTerminate", gestureState);
      },
      onShouldBlockNativeResponder: () => true,
    });
  }

  componentDidUpdate(prevProps) {
    const { hue, barWidth } = this.props;
    if (prevProps.hue !== hue || prevProps.barWidth !== barWidth) {
      console.log('hue updated')
      this.sliderY.setValue((barWidth * hue) / 360);
    }
  }

  getContainerStyle() {
    const { sliderSize, barWidth, containerStyle } = this.props;
    const paddingTop = sliderSize / 2;
    const paddingLeft =
      sliderSize - barWidth > 0 ? (sliderSize - barWidth) / 2 : 0;
    return [
      styles.container,
      containerStyle,
      {
        paddingTop,
        paddingBottom: paddingTop,
        paddingLeft,
        paddingRight: paddingLeft,
      },
    ];
  }

  getCurrentColor() {
    const { hue } = this.props;
    return chroma.hsl(hue, 1, 0.5).hex();
  }

  computeHueValueDrag(gestureState) {
    const { dx } = gestureState;
    const { barWidth } = this.props;
    const { dragStartValue } = this;
    const diff = dx / barWidth;
    const updatedHue = normalizeValue(dragStartValue / 360 + diff) * 360;
    return updatedHue;
  }

  computeHueValuePress(event) {
    const { nativeEvent } = event;
    const { locationX } = nativeEvent;
    const { barWidth } = this.props;
    const updatedHue = normalizeValue(locationX / barWidth) * 360;
    return updatedHue;
  }

  fireDragEvent(eventName, gestureState) {
    const { [eventName]: event } = this.props;
    if (event) {
      event({
        hue: this.computeHueValueDrag(gestureState),
        gestureState,
      });
    }
  }

  firePressEvent(event) {
    const { onPress } = this.props;
    if (onPress) {
      onPress({
        hue: this.computeHueValuePress(event),
        nativeEvent: event.nativeEvent,
      });
    }
  }

  render() {
    const { hueColors } = this;
    const {
      sliderSize,
      barWidth,
      barHeight,
      borderRadius,
      hex,
      colorFieldSet,
    } = this.props;

    // const colorFieldSet = [
    //   '#1255a3',
    //   '#fdda16',
    //   '#ff6c00',
    //   '#9800cc',
    //   '#4da872',
    //   '#18918c',
    //   '#b51f34',
    //   '#5296ba',
    //   '#4a90e2',
    //   '#eee846',
    //   '#ff9e38',
    //   '#be99cc',
    //   '#8acfa6',
    //   '#7dc3c0',
    //   '#de6879',
    //   '#aeccdc',
    // ];
    return (
      <>
        <View style={[styles.sliderWrapper, styles.sliderWrapperMg]}>
          <View style={styles.sliderBarWrapper}>
            <View style={this.getContainerStyle()}>
              <TouchableWithoutFeedback onPress={this.firePressEvent}>
                <LinearGradientCommon
                  colors={hueColors}
                  style={{
                    borderRadius,
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <View
                    style={{
                      width: barWidth,
                      height: barHeight,
                    }}
                  />
                </LinearGradientCommon>
              </TouchableWithoutFeedback>
              <Animated.View
                {...this.panResponder.panHandlers}
                style={[
                  styles.slider,
                  {
                    width: sliderSize,
                    height: sliderSize,
                    borderRadius: sliderSize / 2,
                    borderWidth: sliderSize / 10,
                    backgroundColor: this.getCurrentColor(),
                    transform: [
                      {
                        translateX: this.sliderY,
                      },
                    ],
                    left: -12,
                    top: 15,
                  },
                ]}
              />
            </View>
          </View>
          <View style={styles.sliderColorWrapper}>
            <View style={[{ backgroundColor: hex }, styles.selectedBox]} />
          </View>
        </View>
        <View style={styles.colorBoxRowSet}>
          <View style={[styles.colors, styles.flexboxFix]}>
            {colorFieldSet.map((res) => (
              <View key={res} style={styles.swatchWrapMain}>
                <TouchableOpacity onPress={() => this.props.onTouchBox(res)}>
                  <View style={[styles.swatchWrap, { backgroundColor: res }]} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  slider: {
    top: 0,
    position: "absolute",
    borderColor: "#fff",
  },
  colors: {
    flexWrap: "wrap",
    position: "relative",
    paddingTop: 10,
    width: "100%",
  },
  swatchWrap: {
    width: 24,
    height: 24,
    marginBottom: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#eeeeee",
  },
  swatchWrapMain: {
    marginRight: 5,
    marginLeft: 5,
  },
  noPresets: {
    display: "none",
  },
  flexboxFix: {
    flexDirection: "row",
  },
  colorBoxRowSet: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 272,
  },
  sliderWrapper: {
    flexDirection: "row",
    maxWidth: 262,
    alignItems: "center",
  },
  sliderBarWrapper: {
    flex: 1,
    zIndex: 99,
  },
  sliderColorWrapper: {
    maxWidth: 45,
    flexBasis: 45,
    paddingLeft: 15,
    zIndex: 9,
  },
  selectedBox: {
    width: 30,
    height: 30,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#eeeeee",
  },
  sliderWrapperMg: {
    marginTop: -10,
    marginBottom: -5,
  },
});

HuePicker.propTypes = {
  containerStyle: PropTypes.object,
  borderRadius: PropTypes.number,
  hue: PropTypes.number,
  barWidth: PropTypes.number,
  barHeight: PropTypes.number,
  sliderSize: PropTypes.number,
  onDragStart: PropTypes.func,
  onDragMove: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragTerminate: PropTypes.func,
  onPress: PropTypes.func,
};

HuePicker.defaultProps = {
  containerStyle: {},
  borderRadius: 5,
  hue: 0,
  onDragStart: null,
  onDragMove: null,
  onDragEnd: null,
  onDragTerminate: null,
  onPress: null,
  barWidth: 217,
  barHeight: 30,
  sliderSize: 28,
};
