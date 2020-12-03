import { View,Text,Image,ScrollView,TouchableOpacity,DeviceEventEmitter,ToastAndroid, } from 'react-native';
import React, { Component } from 'react';
import {themeColor,dataVideo} from './data'

import moment from "moment"
import {getVideoDetilUrl} from "./utils"

var brieUrl=""
var BrieTag = [];



export class BriefIntroduction extends Component{
    constructor(props){
        super(props)
        this.state={
            isLook:false,
            // 简介

            isAttention:false,
            // 关注

            isGood:false,
            // 点赞

            isUngood:false,
            // 不喜欢

            isCoin:false,
            // 投币

            isLike:false,
            // 收藏

            isShare:false,
            // 分享

            zk1:true,
            zk2:true,
            tagLess:true,

            
            brie_part0:[],
            // 0:up name，1：up head，2：fans ,3：title,4:评论数,5:详情
            brie_part1:[],
            // 0：播放量，1：弹幕数，2：时间，3：BV号，4：copyright
            brie_part2:[],
            // 0:点赞数，1：投币数，2：收藏数，3：分享数
            tag:[],

          

            
        }
    }
    componentDidMount(){
       
        this.init();
    }


    async getBrie(){
        let response = await fetch(brieUrl)
        let responseJson = await response.json()
        let BriefIntroduction = responseJson.data;
        return BriefIntroduction;
    }

    async init(){
        let BriefIntroduction = await this.getBrie()
        
        var brie_part0 = [
            BriefIntroduction.owner.name,
            BriefIntroduction.owner.face,
            BriefIntroduction.owner_ext.fans,
            BriefIntroduction.title,
            BriefIntroduction.duration,
            BriefIntroduction.desc
        ]
        // 0:up name，1：up head，2：fans ,3：title,4:评论数,5:详情
        
        var brie_part1 = [
            BriefIntroduction.stat.view,
            BriefIntroduction.stat.danmaku,
            BriefIntroduction.pubdate,
            BriefIntroduction.bvid

        ]
        // 0：播放量，1：弹幕数，2：时间，3：BV号，4：copyright
        
        var brie_part2 = [
            BriefIntroduction.stat.like,
            BriefIntroduction.stat.coin,
            BriefIntroduction.stat.favorite,
            BriefIntroduction.stat.share,
        ]
        // 0:点赞数，1：投币数，2：收藏数，3：分享数
        var tag = BriefIntroduction.tag
        
        this.setState({
            brie_part0:brie_part0,
            brie_part1:brie_part1,
            brie_part2:brie_part2,
            tag:tag
        });
        BrieTag[0]=tag
    }

    
   
    render(){
        brieUrl=getVideoDetilUrl(dataVideo[0])
        console.log("看我看我"+brieUrl)
        console.log("名字"+this.state.brie_part0[5])
        var sanlian = [{icon:require("./image/icon_a/good_video.png")},
            {icon:require("./image/icon_a/ungood_video.png"),text:"不喜欢"},
            {icon:require("./image/icon_a/coin_video.png")},
            {icon:require("./image/icon_a/like_video.png")},
            {icon:require("./image/icon_a/share_video.png")}
        ]

        return(
            <View style={{flex:1}}>
                <View style={{
                    width:100,
                    height:100
                }}>
                    <Image source={{uri:this.state.brie_part0[1]}}
                        style={{
                            width:40,
                            height:40,
                            borderRadius:100,
                            top:5,
                            left:10
                        }}
                        resizeMode="stretch">
                        </Image>
                    {/* up主头像 */}

                    <Text style={{
                        fontSize:13,
                        left:65,
                        bottom:30,
                        fontWeight:"bold"
                    }}>
                        {this.state.brie_part0[0]}
                    </Text>
                    {/* up主名称 */}

                    <Text style={{
                        fontSize:10,
                        left:65,
                        bottom:28,
                        color:"#848484"
                    }}>
                   {dealNum(this.state.brie_part0[2])+"粉丝"}
                    </Text>
                    {/* 粉丝数量 */}

                    <TouchableOpacity onPress={()=>{
                        if(this.state.isAttention==false){
                            this.setState({isAttention:true})
                        }
                        else{
                            this.setState({isAttention:false})
                        }
                    }}
                    style={{
                        // backgroundColor:"#000",
                        width:62,
                        height:27,
                       
                        left:270,
                        bottom:58,
                        position:"absolute"
                    }}>
                    <View style={{
                        flex:1,
                        width:70,
                        height:70,
                       
                        // left:270,
                        // bottom:58
                    }}>
                        <Image style={{
                            width:62,
                            height:27,
                            // top:5,
                            left:13,
                            position:"absolute"
                        }}
                        source={this.state.isAttention==false?require("./image/icon_a/attention_video.png"):require("./image/icon_a/attention_videoclick.png")}>
                           
                        </Image>
                        {/* 关注 */}
                        
                    </View>
                    </TouchableOpacity>

                    </View>

                <View style={{flex:1}}>
                    <Text style={{
                        fontSize:16,
                        bottom:40,
                        left:10,
                        width:300
                    }}
                    numberOfLines={this.state.isLook==false?1:9}>
                      {this.state.brie_part0[3]}
                    </Text>
                    {/* 视频标题 */}

                    <TouchableOpacity onPress={()=>{
                        if(this.state.isLook==true){
                            this.setState({isLook:false})
                        }
                        else{
                            this.setState({isLook:true})
                        }
                        // console.log("A")
                    }}
                    style={{
                        // backgroundColor:"#000",
                        bottom:60,
                        width:20,
                        height:20,
                        left:325,
                    }}>
                    <Image source={this.state.isLook==false?require("./image/icon_a/bottom_menu.png"):require("./image/icon_a/down_video.png")}
                        style={{
                            width:20,
                            height:20,
                            
                            // top:10,
                            position:"absolute"
                        }}
                        >

                    </Image>
                    </TouchableOpacity>
                </View>

                <View style={{flex:1}}>
                
                    <Image source={require("./image/icon_a/play_video.png")}
                        style={{
                            width:15,
                            height:15,
                            bottom:50,
                            left:11,
                        }}
                        >
                    </Image>

                    <Text style={{
                        fontSize:10,
                        bottom:64,
                        left:30,
                        color:"#6E6E6E"
                    }}>
                        {dealNum(this.state.brie_part1[0])}
                    </Text>

                    
                    <Image source={require("./image/icon_a/test_video.png")}
                        style={{
                            width:15,
                            height:15,
                            bottom:78,
                            left:80,
                        }}>
                    </Image>
                    

                    <Text style={{
                        fontSize:10,
                        bottom:92,
                        left:98,
                        color:"#6E6E6E"
                    }}>
                        {dealNum(this.state.brie_part1[1])}
                    </Text>

                    <Text style={{
                        fontSize:11,
                        bottom:106,
                        left:140,
                        color:"#6E6E6E"
                    }}>
                        {dealTime(this.state.brie_part1[2])}
                    </Text>

                    <Text style={{
                        fontSize:11,
                        bottom:120,
                        left:190,
                        color:"#6E6E6E"
                    }}>
                        {this.state.brie_part1[3]}
                    </Text>
                    <View style={{
                        display:this.state.isLook==false?"none":"flex",
                        
                    }}>
                        <Text style={{
                            fontSize:10,
                            left:10,
                            bottom:115,
                            color:"#6E6E6E"
                        }}>
                            {this.state.brie_part0[5]}
                        </Text>

                    </View>
                    

                </View>

                <View style={{
                    flex:1,
                    
                    }}>
                    <TouchableOpacity onPress={()=>{
                        if(this.state.isGood==false){
                            this.setState({isGood:true})
                        }
                        else{
                            this.setState({isGood:false})
                        }
                    }}
                    style={{
                        // backgroundColor:"#000",
                        width:25,
                        height:25,
                        position:"absolute",
                        bottom:241,
                        left:30,
                    }}>
                    <Image style={{
                        width:25,
                        height:25,
                        
                    }}
                    source={this.state.isGood==false?require("./image/icon_a/good_video.png"):require("./image/icon_a/good_videoclick.png")}>
                    </Image>
                    </TouchableOpacity>
                    {/* 喜欢图标 */}


                    <TouchableOpacity onPress={()=>{
                        if(this.state.isUngood==false){
                            this.setState({isUngood:true})
                            
                        }
                        else{
                            this.setState({isUngood:false})
                        }
                    }}
                    style={{
                        width:25,
                        height:25,
                        bottom:98,
                        left:100,
                        // backgroundColor:"#000"
                    }}>
                    <Image style={{
                        width:25,
                        height:25,
                       
                        }}
                    source={this.state.isUngood==false?require("./image/icon_a/ungood_video.png"):require("./image/icon_a/ungood_videoclick.png")}>
                    </Image>
                    </TouchableOpacity>
                    {/* 不喜欢图标 */}


                    <TouchableOpacity onPress={()=>{
                        if(this.state.isCoin==false){
                            this.setState({isCoin:true})
                        }
                        else{
                            this.setState({isCoin:false})
                        }
                    }}
                     style={{
                        width:25,
                        height:25,
                        bottom:123,
                        left:170,
                        // backgroundColor:"#000"
                     }}>
                        <Image style={{
                            width:25,
                            height:25,
                            
                            }}
                        source={this.state.isCoin==false?require("./image/icon_a/coin_video.png"):require("./image/icon_a/coin_videoclick.png")}>
                        </Image>
                    </TouchableOpacity>
                    {/* 硬币图标 */}


                    <TouchableOpacity onPress={()=>{
                        if(this.state.isLike==false){
                            this.setState({isLike:true})
                        }
                        else{
                            this.setState({isLike:false})
                        }
                     }}
                     style={{
                        width:25,
                        height:25,
                        bottom:149,
                        left:240,
                        // backgroundColor:"#000"
                        }}>
                        <Image style={{
                            width:25,
                            height:25,
                            
                        }}
                        source={this.state.isLike==false?require("./image/icon_a/like_video.png"):require("./image/icon_a/like_videoclick.png")}>
                        </Image>
                    </TouchableOpacity>
                    {/* 收藏图标 */}


                    <TouchableOpacity onPress={()=>{
                        if(this.state.isShare==false){
                            this.setState({isShare:true})
                        }
                        else{
                            this.setState({isShare:false})
                        }
                    }}
                    style={{
                        width:30,
                        height:30,
                        bottom:177,
                        left:305,
                        // backgroundColor:"#000"
                    }}
                    >
                        <Image style={{
                            width:30,
                            height:30,
                           
                        }}
                        source={this.state.isShare==false?require("./image/icon_a/share_video.png"):require("./image/icon_a/share_videoclick.png")}>
                        </Image>
                    </TouchableOpacity>
                    {/* 分享图标 */}


                    <Text style={{
                        fontSize:9,
                        left:30,
                        bottom:170,
                        color:"#6E6E6E"
                    }}>
                        {dealNum(this.state.brie_part2[0])}
                    </Text>


                    <Text style={{
                        fontSize:9,
                        marginLeft:98,
                        bottom:182,
                        color:"#6E6E6E"
                        
                    }}>
                        不喜欢
                    </Text>


                    <Text style={{
                        fontSize:9,
                        marginLeft:174,
                        bottom:192,
                        color:"#6E6E6E"
                    }}>
                        {dealNum(this.state.brie_part2[1])}
                    </Text>


                    <Text style={{
                        fontSize:9,
                        marginLeft:242,
                        bottom:205,
                        color:"#6E6E6E"
                    }}>
                        {dealNum(this.state.brie_part2[2])}
                    </Text>


                    <Text style={{
                        fontSize:9,
                        marginLeft:311,
                        bottom:215,
                        color:"#6E6E6E"
                    }}>
                        {dealNum(this.state.brie_part2[3])}
                    </Text>




                </View>

                <View style={{flex:1,
                    width:"100%",
                    height:1,
                    backgroundColor:"#BDBDBD",
                    bottom:200,
                    }}>
                   
                </View>
            </View>
        )
    }
}

dealNum=(num)=>{
    var numWan=(num/10000).toFixed(1)
    var arr = numWan.toString().split(".")
    var wan = arr[1]==0?parseInt(num/10000):(num/10000).toFixed(1)
    return (num/10000>=1?wan+"万":num)
}

dealTime=(time)=>{
    console.log(time)
    var diff_m = moment().diff(moment(time*1000),"minutes")
    var diff_h = moment().diff(moment(time*1000),"hours")
    var diff_d = moment().diff(moment(time*1000),"days")
    var yestoday = moment().startOf("day")-1000*60*60*24
    console.log(diff_d)
    var t = ""
    if(diff_m <60){
        t=diff_m+"分钟前"
    }
    else if(diff_h <24){
        t=diff_h+"小时前"
    }
    else if(time*1000 >= yestoday){
        t="昨天"
    }
    else{
        t=moment(time*1000).format("MM-DD")
    }
    return t


}