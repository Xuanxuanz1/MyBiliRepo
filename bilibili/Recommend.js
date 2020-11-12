import React, { Component } from 'react'
import { Text,View,Image,Dimensions,FlatList,ScrollView,TouchableOpacity,ToastAndroid} from 'react-native';
import Swiper from 'react-native-swiper'
import {themeColor, data, data2, data1} from './data'
import {createStackNavigator} from 'react-navigation-stack'
import {Video} from './Video'
import {createAppContainer} from "react-navigation"


const screenWidth = Dimensions.get('window').width;

// 总样式
const styles = {
    swiper:{},
    img:{
        width:Dimensions.width,
        height:200
    },
    paginationStyles:{
        top:190,
        left:280
    },
    dotStyles:{
        backgroundColor:"#C0C0C0"
    },
    activeDotStyles:{
        backgroundColor:"#fff"
    },
    images:{
        width:165,
        height:110,
        // bottom:125,
        // left:5,
        // borderRadius:10,
        borderTopLeftRadius:5,
        borderTopRightRadius:5
        
    },
    imagetext:{
        width:160,
        top:10,
        fontSize:14,
        left:5
    },
    
    tagsgoodtext:{
        fontSize:11,
        color:"#fff",
        position:"absolute",
        fontSize:10,
        backgroundColor:"#FE9A2E",
        top:170,
        borderRadius:1.3,
        left:5,


    }

};

export class Recommend extends Component{
    constructor(props){
        super(props);
        this.state = {
            videoArr:[],
            // 视频
            carousel:[]
            // 轮播
        }
    }
    render(){
        
        return(
  
            <View style={{flex:1}}>
            
               <FlatList
                data={this.state.videoArr}
                numColumns={2}
                ListHeaderComponent={
                    // 轮播图
                    <Swiper style={styles.swiper}
                    height={200}
                    horizontal={true}
                    paginationStyle={styles.paginationStyles}
                    showsButtons={false}
                    autoplay={true}
                    autoplayTimeout={6}
                    dotStyle={styles.dotStyles}
                    activeDotStyle={styles.activeDotStyles}
                    >
                        {this.state.carousel.map((item,index)=>
                            <Image key={index} source={{uri:item.image}}
                            style={styles.img}/>
                            )}

                        

                    </Swiper>
                }
                renderItem={({item,index})=>
                {
                    if(item.ad_info!=null){
                        return(
                            <TouchableOpacity onPress={()=>{
                                this.props.navigation.navigate('Video',{
                                position:item.ad_info.creative_content.url
                                // 回调数据接口
                                })
                            ToastAndroid.show("xxx",ToastAndroid.SHORT)
                            // 测试跳转
                        }}
                        >
                            {/* 广告 */}
                            <TextList url={item.ad_info.creative_content.image_url}
                                name={item.ad_info.creative_content.title}
                                guanggaotext={item.ad_info.extra.card.ad_tag_style.text}
                                tagname={item.ad_info.extra.card.desc}></TextList>
                        </TouchableOpacity>
                        )
                    }
                    
                    // 测试回调数据
                    if(item.rcmd_reason_style==null){
                        ToastAndroid.show("null    "+index,ToastAndroid.SHORT)
                    }else{
                        ToastAndroid.show(item.rcmd_reason_style.text+"  "+index,ToastAndroid.SHORT)
                    }
                   
                    return(
                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.navigate('Video',{
                            position:item.uri
                            // 回调数据接口
                        })
                        ToastAndroid.show("xxx",ToastAndroid.SHORT)
                        // 测试转跳
                    }}
                    >
                     <TextList
                        name={item.title}
                        // 视频标题 
                        url={item.cover}
                        // 视频图片 
                        play={item.cover_left_text_1}
                        // 视频播放量 
                        test={item.cover_left_text_2} 
                        // 视频弹幕
                        time={item.cover_right_text} 
                        // 视频时间

                                                
                        rcmd_reason={item.rcmd_reason!=null?item.rcmd_reason_style.text:null}
                        // 点赞
                        
                        chuntagname={item.desc_button!=null&&item.rcmd_reason==null&&item.badge==null?item.desc_button.text:null}
                        //纯text

                        secondtagname={item.desc_button!=null&&item.rcmd_reason!=null&&item.badge==null?item.desc_button.text:null}
                        //有图标的text

                        thirdtagname={item.args.rname!=null&&item.desc_button==null&&item.rcmd_reason!=null&&item.badge==null?item.args.rname:null}
                        //点赞text

                        livingtext={item.rcmd_reason==null&&item.badge!=null?item.badge:null}
                        //直播

                        tagname={item.badge!=null&&item.desc_button!=null?item.desc_button.text:null}
                        //直播分区

                        sencondgoodtext={item.badge!=null&&item.rcmd_reason_style!=null&&item.desc_button==null?item.rcmd_reason_style.text:null}
                        //第二位的赞


                        // 下面是图标控制
                        icon_play={item.ad_info==null&&item.badge==null?require('./image/icon_a/play.png'):null}
                        icon_text={item.ad_info==null&&item.badge==null?require("./image/icon_a/test.png"):null}
                        icon_living={item.ad_info==null&&item.badge=="直播"?require("./image/icon_a/friend.png"):null}
                        icon_eyes={item.ad_info==null&&item.badge=="文章"?require("./image/icon_a/eyes.png"):null}
                        icon_messages={item.ad_info==null&&item.badge=="文章"?require("./image/icon_a/messages.png"):null}
                        icon_jlplay={item.ad_info==null&&item.badge=="纪录片"||item.badge=="电影"||item.badge=="国创"||item.badge=="番剧"?require("./image/icon_a/play.png"):null}
                        icon_love={item.ad_info==null&&item.badge=="纪录片"||item.badge=="电影"||item.badge=="国创"||item.badge=="番剧"?require("./image/icon_a/love.png"):null}
                        />
                    </TouchableOpacity>
                )
                
               }
            }
                keyExtractor={(index)=>index.toString()}
               />
               
               
               </View>
           
               
          
         

          
        )
    }

    // 获取推荐页数据
 async getRecommend(){
     let response = await fetch('https://app.bilibili.com/x/v2/feed/index?access_key=506121e539aa58f41186e45ea805a0a1&ad_extra=6BCCA2213B3B094292DFF9454EB0212887A19C8EE2FF44B1B05EEA4164F72165A98D04961D555EC82C416939419FF00DDA8FA77F1173CD7AD10D7EA1B3AA2127214095984D8A2CC09720435619542A8A98A61CE96DD4A5CB29501B13A45DEE831954250FBEEE417BF6ECD5529E975666168E1CA5E47280897BC2FBA3161AE1B37A8C5D2536BB8215A5456394563AE4915ADE5715311EE5CE1A9584AE33823F0FDE7182933F2B0A81C88C386A8BFF367226357B5F0FB715D98DACDF1DBE7260A7BF216DD70CF5E008A3F989BC2032F280DFA5633A0700B9754CBDEF7A8E87E5FEC86E556C6039151A5D227A3DFB31C6CADBB79871628BAD9E3F6CDA781E5E08E93D3BD3B9120A08DF806BB34874F817017FAEC2D7419A45E2B41A76AF817C4E5DD35BB0F0A93FB6485ED1DFF113BED2DFEC026982614BAF2D576E7434BA5CC2EEC2AEDD9166013C0693328B476F55CF1344BC958A3862B9B996126CB1B5C20B7C99178C7AB24B3E557AE0A3FCFE312E05001275455207EE6D4AF4E8691EFA0F203F6F4C5D283C2D96BCC641025D044F009654F185A3FCBCF0F25BE41B179CF05640B52FF688229211399EF1663A14FC8903843F84FD143444759E50155AE42C9B51F51806B38832D319E4C17139EF9A6A850E480C09D5C0F8ADFC1F9050CE5BF589DB1C66FA8A5E4B3DD84C03BD7B1ADF53A45FCB5CC5AF90C3322D50040B2EDAD45BFB07F8BC1ED59569C08CB3B69FC9&appkey=1d8b6e7d45233436&autoplay_card=2&build=6100500&c_locale=zh_CN&channel=bili&column=2&device_name=LIO-AN00&device_type=0&flush=0&fnval=16&fnver=0&force_host=0&fourk=0&guidance=0&https_url_req=0&idx=0&login_event=2&mobi_app=android&network=wifi&open_event=cold&platform=android&pull=true&qn=32&recsys_mode=0&s_locale=zh_CN&splash_id=&statistics=%7B%22appId%22%3A1%2C%22platform%22%3A3%2C%22version%22%3A%226.10.0%22%2C%22abtest%22%3A%22%22%7D&ts=1603944623&sign=3536f6b0a685e22bf5d437518a979e5d')
     let responseJson = await response.json()
     let recommend = responseJson.data.items;
     return recommend;
 }


 async init(){
     let recommend = await this.getRecommend()
     let carousel = recommend[0].banner_item
     recommend.splice(0,1)
     this.setState({
         videoArr:recommend,
         carousel:carousel
     });
 }

 componentDidMount(){
     this.init()
 }

}
class TextList extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            
            <View style={{
                borderRadius:5,
                backgroundColor:"#fff",
                width:165,
                height:190,
                marginLeft:10,
                marginTop:10,
                }}>

            <Image source={{uri:this.props.url}}
             style={styles.images}
             resizeMode="stretch"></Image>
             {/* 标准item图片 */}

             <Text style={styles.imagetext}
             numberOfLines={2}>
             {this.props.name}
             </Text>
             {/* 标准标题 */}

            <Image source={this.props.icon_play}
                style={{position:"absolute",
                    width:16,
                    height:16,
                    top:85,
                    left:5
                }}>
            </Image>
            {/* 播放图标 */}
            
            <Image source={this.props.icon_jlplay}
                style={{position:"absolute",
                    width:16,
                    height:16,
                    top:85,
                    left:5
                }}>
            </Image>
            {/* 纪录片类型播放图标 */}

            <Image source={this.props.icon_living}
                style={{position:"absolute",
                    width:16,
                    height:16,
                    top:85,
                    left:5
                }}>
            </Image>
            {/* 直播人数图标 */}

            <Image source={this.props.icon_eyes}
                style={{position:"absolute",
                    width:16,
                    height:16,
                    top:85,
                    left:5
                }}>
            </Image>
            {/* 文章浏览人数图标 */}

            <Text style={{
                color:"#fff",
                position:"absolute",
                fontSize:10,
                top:86,
                left:25
                }}>
             {this.props.play}
            </Text>
            {/* 视频播放数 */}

            <Image source={this.props.icon_text}
                style={{
                    width:14,
                    height:14,
                    position:"absolute",
                    top:86,
                    left:60
                }}>
            </Image>
            {/* 弹幕图标 */}
            
            <Image source={this.props.icon_messages}
                style={{
                    width:14,
                    height:14,
                    position:"absolute",
                    top:86,
                    left:60
                }}>
            </Image>
            {/* 文章评论图标 */}
            
            <Image source={this.props.icon_love}
                style={{
                    width:14,
                    height:14,
                    position:"absolute",
                    top:86,
                    left:60
                }}>
            </Image>
            {/* 喜爱图标 */}

            <Text style={{
                position:"absolute",
                fontSize:10,
                color:"#fff",
                top:86,
                left:76
                }}>
             {this.props.test}
            </Text>
            {/* 弹幕数 */}

            <Text style={{
                position:"absolute",
                fontSize:10,
                color:"#fff",
                top:86,
                left:125,
                width:40
                }}
                numberOfLines={1}>
             {this.props.time}
            </Text>
            {/* 视频时长 */}

             
            <Text style={styles.tagsgoodtext}>
             {this.props.rcmd_reason}
            </Text>
            {/* 第一个TextView */}

            <Text style={{
                        fontSize:11,
                        color:"#fff",
                        position:"absolute",
                        fontSize:10,
                        backgroundColor:"#FE9A2E",
                        top:170,
                        borderRadius:1.3,
                        left:40,
                        }}>
             {this.props.sencondgoodtext}
            </Text>
            {/* 第二个TextView */}
             
            <Text style={{
                 fontSize:11,
                 position:"absolute",
                 top:169,
                 color:"#A4A4A4",
                 left:35
                }}
             numberOfLines={1}>
                 {this.props.tagname}
            </Text>
             {/* 近TextView的Text */}

            <Image source={require("./image/icon_a/menu.png")}
                style={{
                    width:14,
                    height:14,
                    position:"absolute",
                    top:169,
                    left:148
                    }}>
            </Image>
            {/* 菜单图标 */}

            <Text style={{
                 fontSize:11,
                 position:"absolute",
                 top:169,
                 color:"#A4A4A4",
                 left:5,
                 width:140
                }}
             numberOfLines={1}>
                 {this.props.chuntagname}
            </Text>
             {/* 纯文字 */}

            <Text style={{
                 fontSize:11,
                 position:"absolute",
                 top:169,
                 color:"#A4A4A4",
                 left:60
             }}
             numberOfLines={1}>
                 {this.props.secondtagname}
            </Text>
            {/* 远TextView的Text */}

            <Text style={{
                fontSize:11,
                color:themeColor,
                position:"absolute",
                fontSize:10,
                backgroundColor:"#fff",
                top:170,
                borderRadius:2,
                left:5,
                borderColor:themeColor,
                borderWidth:0.5
            }}>
             {this.props.livingtext}
            </Text>
            {/* 直播标题 */}

            <Text style={{
                 fontSize:11,
                 position:"absolute",
                 top:169,
                 color:"#A4A4A4",
                 left:73
             }}
             numberOfLines={1}>
                 {this.props.thirdtagname}
            </Text>
            {/* 2号点赞 */}

            <Text style={{
                fontSize:11,
                color:"#A4A4A4",
                position:"absolute",
                fontSize:10,
                backgroundColor:"#fff",
                top:170,
                borderRadius:2,
                left:5,
                borderColor:"#A4A4A4",
                
                borderWidth:0.5
                }}>
             {this.props.guanggaotext}
            </Text>
            {/* 广告介绍 */}

            </View>
           
        )
    }
}





// 转跳的路由组件
export const  RecommendToVideo =createAppContainer(
    createStackNavigator(
        {
            Recommend:{
                screen:Recommend,
                navigationOptions:{
                    header:null
                }
            },
            Video:{
                screen:Video,
                navigationOptions:{
                    header:null
                },
            
            },
            
            

        },
        
    )
)
