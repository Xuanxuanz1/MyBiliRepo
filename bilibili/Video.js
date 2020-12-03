import React, { Component } from 'react';
import { 
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Image,
    DeviceEventEmitter
} from 'react-native';
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';

import {getVideoDetilUrl} from "./utils"

import Video from 'react-native-video';

import {BriefIntroduction} from './BriefIntroduction'
import {Comments} from './Comments'

import {themeColor,dataVideo} from './data'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';


var tabBarLabelArr=["简介","评论"];
var windowWidth=Dimensions.get("window").width;
var brieUrl=""
var BrieTag = [];
export class VideoClass extends Component{

    constructor(props){
        super(props)
        this.state={
            isBullet:true,

            showBrie:true,
            showComment:false,

            // brie_part0:[],
            // // 0:up name，1：up head，2：fans ,3：title,4:评论数
            // brie_part1:[],
            // // 0：播放量，1：弹幕数，2：时间，3：BV号，4：copyright
            // brie_part2:[],
            // // 0:点赞数，1：投币数，2：收藏数，3：分享数
            // tag:[],
        }
    }

    // async getBrie(){
    //     let response = await fetch(brieUrl)
    //     let responseJson = await response.json()
    //     let BriefIntroduction = responseJson.data;
    //     return BriefIntroduction;
    // }

    // async init(){
        
    //     let BriefIntroduction = await this.getBrie()
    //     var brie_part0 = [BriefIntroduction.owner.name,BriefIntroduction.owner.face,BriefIntroduction.owner_ext.fans,]
    //     var brie_part1 = [BriefIntroduction.stat.view,BriefIntroduction.stat.danmaku,BriefIntroduction.pubdate,]
    //     var brie_part2 = [BriefIntroduction.stat.like,BriefIntroduction.stat.coin,BriefIntroduction.stat.favorite,]
    //     var tag = BriefIntroduction.tag
    //     this.setState({
    //         brie_part0:brie_part0,
    //         brie_part1:brie_part1,
    //         brie_part2:brie_part2,
    //         tag:tag
    //     });
    //     BrieTag[0]=tag
    // }

    // componentDidMount() {
    //     this.init()
    // }

    render(){

        const param = this.props.navigation.state.params.param
        dataVideo[0]=param
        // 获取上个页面传递过来的参数，并打印查看
        brieUrl=getVideoDetilUrl(param)
        console.log(getVideoDetilUrl(param))
        DeviceEventEmitter.emit('searchHide',true);
        // 发送消息给首页
        
        

        return(
            <ScrollView>
                <View style={{flex:1}}>
                    <Video 
                        style={{
                       
                        width:"100%",
                        height:200,
                        
                        }}
                        source={require("./allvideo/video_v1.mp4")}
                    
                        rate={1.0}
                        // 控制暂停播放
                        paused={false}
                        volume={3}
                        // 声音放大的倍数,0代表没有声音
                        muted={false}
                        // true代表禁音
                        resizeMode="stretch"
                        // 视频的自适应伸缩播放
                        repeat={true}
                        >
                    </Video>
                    
                </View>

                <View style={{flex:1}}>

                    <Video_to/>

                    <View style={{
                        backgroundColor:"#E0E0E0",
                        width:90,
                        height:35,
                        // bottom:20,
                        top:5,
                        borderTopLeftRadius:30,
                        borderBottomLeftRadius:30,
                        left:210,
                        justifyContent:"flex-start",
                        flexDirection:"row",
                        position:"absolute"}}>
                        <TextInput
                        placeholder = '点我发弹幕'
                         style={{
                            flex:1,
                            fontSize:13,
                            top:2,
                            width:80,
                            left:10,
                            
                            color:"#000"
                             }}>

                        </TextInput>
                    </View>
                    <View style={{
                        width:45,
                        height:35,
                        position:"absolute",
                        left:300,
                        // bottom:20,
                        top:5,
                        backgroundColor:"#fff",
                        borderWidth:1,
                        borderColor:"#C0C0C0",
                        borderBottomRightRadius:30,
                        borderTopRightRadius:30
                    }}>
                        <TouchableOpacity style={{
                            // backgroundColor:"#000"
                            
                        }}
                        onPress={()=>{
                            if(this.state.isBullet==true){
                                this.setState({isBullet:false})
                            }
                            else{
                                this.setState({isBullet:true})
                            }
                        }}>
                        <Image source={this.state.isBullet==true?require("./image/icon_a/c7x.png"):require("./image/icon_a/c7u.png")}
                            style={{
                                width:40,
                                height:40,
                                bottom:3}}>
                            
                        </Image>
                        </TouchableOpacity>
                    </View>
                    {/* <BriefIntroduction data={[this.state.brie_part0,this.state.brie_part1,this.state.brie_part2,this.state.tag]}/> */}

                   
                </View>

                

                
                
            </ScrollView>
        )
    }
}


const Video_to = createAppContainer(
    createMaterialTopTabNavigator(
    {
        BriefIntroduction:{
            screen:BriefIntroduction,
            navigationOptions:{
                tabBarLabel:({focused})=>renderTabBarLabel(0,focused)
            }
        },

        Comments:{
            screen:Comments,
            navigationOptions:{
                tabBarLabel:({focused})=>renderTabBarLabel(1,focused),
            }
        },

        
    },
    {
        
        initialRouteName:"BriefIntroduction",
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
            
            navigationOptions:{header:null}
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


