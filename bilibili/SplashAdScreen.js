import React, { Component } from 'react';
import { View,Image,Text,TouchableOpacity,ToastAndroid} from 'react-native';
import Video from 'react-native-video';
import {dataAD} from './data'




export class SplashAdScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            // adImg:null,
            // is_ad:false,
            // duration:0,
            // s:0,
            s:dataAD[2]
        }
    }

    render(){
        var is_video=(dataAD[3]!=null)
        return(
            <View style={{
                // display:this.props.hide?"none":"flex",
                flex:1
            }}>

                <Image source={{uri:dataAD[0]}}
                style={{
                    flex:1,
                    display:this.props.hide?"none":"flex",
                    marginBottom:60
                    }}>
                </Image>
                <Video 
                    style={{
                        display:is_video?"flex":"none",
                        flex:1,
                        bottom:60,
                    }}
                    source={is_video?{uri:dataAD[3]}:require("./allvideo/video_v1.mp4")}
                    rate={1.0}
                    // 控制暂停播放
                    paused={false}
                    volume={3}
                    // 声音放大的倍数,0代表没有声音
                    muted={true}
                    // true代表禁音
                    resizeMode="stretch"
                    // 视频的自适应伸缩播放
                    repeat={false}
                    >
                </Video>

                <Text style={{
                    position:"absolute",
                    top:25,
                    right:15,
                    fontSize:10,
                    color:"#fff",
                    borderRadius:2,
                    paddingHorizontal:6,
                    paddingVertical:1,
                    backgroundColor:"#888",

                    opacity:dataAD[1]?1:0
                }}>
                广告
                </Text>

                <Image source={require("./image/logo_write.png")}
                    style={{
                        width:80,
                        height:46,
                        position:"absolute",
                        bottom:8,
                        // left:"10%",
                    }}>
                </Image>
                
                <TouchableOpacity style={{
                    bottom:14,
                    right:10,
                    // backgroundColor:"#bfa",
                    position:"absolute"
                }}
                onPress={()=>{
                    this.props.navigation.navigate("MainScreen1")
                    // ToastAndroid.show("转跳成功",ToastAndroid.SHORT)
                    
                }}>
                <Text style={{
                    // position:"absolute",
                    // bottom:15,
                    // right:10,
                    color:"#fff",
                    fontSize:12,
                    borderRadius:18,
                    paddingHorizontal:15,
                    paddingTop:8,
                    paddingBottom:10,
                    backgroundColor:"rgba(85,85,85,0.6)",
                    // rgba(red,green,blue,透明度)
                }}>
                    {"跳过"+this.state.s}
                </Text>
                </TouchableOpacity>
            </View>
        )
    }

    

    // async init(){
        
    // }

    async componentDidMount(){
        // await this.init()
        // 初始化页面

        var s = dataAD[2]
        
        this.timer = setInterval(()=>{
            s--

            this.setState({
                s:s
            })
            
            if(s<1){
                this.timer&&clearInterval(this.timer);
                // 计时结束消除定时器
                this.props.navigation.navigate("MainScreen1")
                return
            }
        },1000)
    }
}