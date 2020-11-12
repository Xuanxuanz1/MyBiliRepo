import React, { Component } from 'react';
import { View,Text,Dimensions,Image,TextInput} from 'react-native';
import {createAppContainer} from 'react-navigation'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {RecommendToVideo} from './Recommend';
import {Living} from './Living';
import {Hot} from './Hot';
import {Fans} from './Fans';
import {themeColor} from './data'

var tabBarLabelArr=["直播","推荐","热门","追番"];
var windowWidth=Dimensions.get("window").width;
//窗口尺寸

export class FirstActivity extends Component{
    render(){
        return(
           
            <View style={{flex:1}}>
                <Image source={require('./image/head.jpg')}
                   style={{
                       width:50,
                       height:50,
                       borderRadius:100,
                       left:10,
                       top:20

                   }}
                   resizeMode="stretch">

                </Image>
                
                
                <View style={{
                backgroundColor:"#E0E0E0",
                width:200,
                height:35,
                bottom:20,
                borderRadius:30,
                left:70,
                justifyContent:"flex-start",
                flexDirection:"row",
                }}>

                <Image source={require('./image/icon_a/chy.png')}
                    style={{
                        width:23,
                        height:23,
                        top:6,
                        left:10
                    }}/>
                
                <View>
                <TextInput style={{
                    flex:1,
                    // backgroundColor:themeColor,
                    fontSize:13,
                    top:4,
                    width:140,
                    
                    // bottom:10,
                    left:20,
                    color:"#000"
                }}>
                </TextInput>
                </View>

                <Image source={require('./image/icon_a/game.png')}
                    style={{width:38,
                            height:38,
                            left:45
                            }}/>
                
                <Image source={require('./image/icon_a/message.png')}
                    style={{width:35,
                        height:35,
                        left:50,
                        top:2
                        }}></Image>
                </View>
                <First/>
            </View>

        )
    }
            

    
}

const First = createAppContainer(
    createMaterialTopTabNavigator(
    {
        Living:{
            screen:Living,
            navigationOptions:{
                tabBarLabel:({focused})=>renderTabBarLabel(0,focused)
            }
        },

        Recommend:{
            screen:RecommendToVideo,
            navigationOptions:{
                tabBarLabel:({focused})=>renderTabBarLabel(1,focused)
            }
        },

        Hot:{
            screen:Hot,
            navigationOptions:{
                tabBarLabel:({focused})=>renderTabBarLabel(2,focused)
            }
        },

        Fans:{
            screen:Fans,
            navigationOptions:{
                tabBarLabel:({focused})=>renderTabBarLabel(3,focused)
            },
        },

    },
    {
        initialRouteName:"Recommend",
        tabBarOptions:{
            scrollEnabled:true,
            style:{
                backgroundColor:"transparent",
                height:40,
            },
            tabStyle:{
                width:windowWidth/4,
            },
            indicatorStyle:{
                backgroundColor:themeColor
            },
        },
    },
    )
)


function renderTabBarLabel(index,focused){
    return(
        <Text style={{
            fontWeight:focused?"bold":"normal",
            color:focused?themeColor:"#444",
            fontSize:16,
            marginBottom:10
        }}>
        {tabBarLabelArr[index]}
        </Text>
    )
}


