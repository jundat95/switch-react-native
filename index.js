import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Animated, Easing,
  TouchableOpacity,
  View, Text,
} from 'react-native';

export default class Switch extends Component {

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    time: PropTypes.number,
    value: PropTypes.bool,
    onValueChange: PropTypes.func,
    activeText: PropTypes.string,
    inActiveText: PropTypes.string,
    activeTextStyle: PropTypes.object,
    inActiveTextStyle: PropTypes.object,
    activeStyle: PropTypes.object,
    backgroundStyle: PropTypes.object,
  };

  static defaultProps = {
    width: 150,
    height: 50,
    time: 500,
    value: true,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      value: this.props.value,
      marginLeftAnim: new Animated.Value(0),
      offsetWidth: this.props.width / 2,
      offsetHeight: this.props.height,
      activeText: this.props.activeText,
      inActiveText: this.props.inActiveText,
    };
  }

  _animateSwitch = (value) => {
    Animated.timing(
      this.state.marginLeftAnim,
      {
        toValue: value ? 0 : this.state.offsetWidth,
        duration: this.props.time,
        easing: Easing.bezier(0.68, -0.55, 0.265, 1.55),
      }
    ).start();
    this.setState({ value: value });
    console.log(this.state.value);
  };

  render() {
    const { marginLeftAnim } = this.state;
    const { textStyle, activeStyle, backgroundStyle, activeTextStyle, inActiveTextStyle } = this.props;

    return (
      <View
        style={[
          styles.container,
          {
            width: this.props.width,
            height: this.props.height,
          },
          backgroundStyle,
        ]}>
        <TouchableOpacity
          onPressIn={this._pressButtonLeft}
          style={[styles.button, {
            width: this.state.offsetWidth,
            height: this.state.offsetHeight,
          }]}>
          {
            this.state.value ?
              <Text style={[styles.textActive, activeTextStyle]}>{this.state.activeText}</Text>
              :
              <Text style={[styles.textInActive, inActiveTextStyle]}>{this.state.activeText}</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity
          onPressIn={this._pressButtonRight}
          style={[styles.button, {
            width: this.state.offsetWidth,
            height: this.state.offsetHeight,
          }]}>
          {
            this.state.value ?
              <Text style={[styles.textInActive, inActiveTextStyle]}>{this.state.inActiveText}</Text>
              :
              <Text style={[styles.textActive, activeTextStyle]}>{this.state.inActiveText}</Text>
          }
        </TouchableOpacity>
        <Animated.View
          style={[
            {
              marginLeft: marginLeftAnim,
              width: this.state.offsetWidth,
              height: this.state.offsetHeight,

            },
            styles.active,
            activeStyle,
          ]}
        />
      </View>
    );

  }

  _pressButtonLeft = () => {
    this._animateSwitch(true);
    this.props.onValueChange(true);
  };

  _pressButtonRight = () => {
    this._animateSwitch(false);
    this.props.onValueChange(false);
  };

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 5,
    position: 'relative',
    zIndex: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  textActive: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#215e79',
  },
  textInActive: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#215e79',
  },
  active: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dae6e8',
  },
});
