import React, { Component } from 'react';
import { Text,View } from 'react-native';

export class Video extends Component{
    render(){
        return(
            <View>
                <Text>{this.props.navigation.state.params.position}</Text>
            </View>
        )
    }
}