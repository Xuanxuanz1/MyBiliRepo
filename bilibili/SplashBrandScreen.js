import React, { Component } from 'react';
import { View,Image } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import {SplashAdScreen} from './SplashAdScreen'
import {MainScreen1} from './MainScreen'
import {dataAD} from './data'

// 图片加载页面
export class SplashBrandScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            // topImg:null,
            // bottomImg:null,
            // mode:"half"
            dataBrand:[],
        }
    }
    
    render(){
        return(
            <View style={{
                flex:1,
                alignContent:"center",
                paddingBottom:20
                }}>
             <Image source={{uri:this.state.dataBrand[0]}}
                style={[
                    {
                    flex:1,
                    resizeMode:"stretch"
                    },
                 {width:this.state.dataBrand[2]=="half"?"100%":"100%"}
                ]}>
             </Image>

             <Image source={{uri:this.state.dataBrand[1]}}
                style={{
                    width:70,
                    height:55,
                    position:"absolute",
                    bottom:10,
                    left:"40%"
                    }}>
             </Image>

            </View>
        )
    }

    // 获取数据
    async getSplash_brand(){
        let response = await fetch('https://app.bilibili.com/x/v2/splash/brand/list?access_key=506121e539aa58f41186e45ea805a0a1&appkey=1d8b6e7d45233436&build=6100500&c_locale=zh_CN&channel=bili&device=phone&mobi_app=android&network=wifi&platform=android&s_locale=zh_CN&screen_height=1920&screen_width=1080&statistics=%7B%22appId%22%3A1%2C%22platform%22%3A3%2C%22version%22%3A%226.10.0%22%2C%22abtest%22%3A%22%22%7D&ts=1604537549&sign=679c0c61aba9a4a0fd8e9389bdada386')
        let responseJson = await response.json()
        let splash_brand = responseJson.data.list;
        return splash_brand;
    }

    // 获取splash_ad数据
    async getSplash_ad(){
        let response = await fetch('https://app.bilibili.com/x/v2/splash/list?access_key=506121e539aa58f41186e45ea805a0a1&ad_extra=6BCCA2213B3B094292DFF9454EB0212887A19C8EE2FF44B1B05EEA4164F72165A98D04961D555EC82C416939419FF00DDA8FA77F1173CD7AD10D7EA1B3AA2127214095984D8A2CC09720435619542A8A98A61CE96DD4A5CB29501B13A45DEE831954250FBEEE417BF6ECD5529E975666168E1CA5E47280897BC2FBA3161AE1B37A8C5D2536BB8215A5456394563AE4915ADE5715311EE5CE1A9584AE33823F0FDE7182933F2B0A81C88C386A8BFF367226357B5F0FB715D98DACDF1DBE7260A7BF216DD70CF5E008A3F989BC2032F280DFA5633A0700B9754CBDEF7A8E87E5FEC86E556C6039151A5D227A3DFB31C6CADBB79871628BAD9E3F6CDA781E5E08E93D3BD3B9120A08DF806BB34874F817017FAEC2D7419A45E2B41A76AF817C4E5DD35BB0F0A93FB6485ED1DFF113BED2DFEC026982614BAF2D576E7434BA5CC2EEC2AEDD9166013C0693328B476F55CF1344BC958A3862B9B996126CB1B5C20B7C99178C7AB24B3E557AE0A3FCFE312E05001275455207EE6D4AF4E8691EFA0F203F6F4C5D283C2D96BCC641025D044F009654F185A3FCBCF0F25BE41B179CF05640B52FF688229211399EF1663A14FC8903843F84FD143444759E50155AE42C9B51F51806B38832D319E4C17139EF9A6A850E480C09D5C0F8ADFC1F9050CE5BF589DB1C66FA8A5E4B3DD84C03BD7B1ADF53A45FCB5CC5AF90C3322D50040B2EDAD45BFB07F8BC1ED59569C08CB3B69FC9&appkey=1d8b6e7d45233436&birth=0101&build=6100500&c_locale=zh_CN&channel=bili&height=1920&mobi_app=android&network=wifi&platform=android&s_locale=zh_CN&statistics=%7B%22appId%22%3A1%2C%22platform%22%3A3%2C%22version%22%3A%226.10.0%22%2C%22abtest%22%3A%22%22%7D&ts=1604537549&width=1080&sign=3fc8deb2b3c2c6b6ec4f556201e19806')
        let responseJson = await response.json()
        let splash_ad = responseJson.data.list;
        return splash_ad;

    }

    async init(){
        let splash_brand = await this.getSplash_brand()
        let showIndex_brand = parseInt(Math.random()*splash_brand.length)
        this.setState({
            dataBrand:[
            splash_brand[showIndex_brand].thumb,
            // 上半部分的图片
            splash_brand[showIndex_brand].logo_url,
            // 下半部分的Logo
            splash_brand[showIndex_brand].mode,
            // 动态获取尺寸
        ]
        });

        let splash_ad = await this.getSplash_ad()
        let showIndex_ad = parseInt(Math.random()*splash_ad.length)
        
           dataAD.push(splash_ad[showIndex_ad].thumb),
            // 背景图片
            dataAD.push(splash_ad[showIndex_ad].is_ad),
            // 判断是否广告
            dataAD.push(splash_ad[showIndex_ad].duration),
            // 广告时长
           dataAD.push(splash_ad[showIndex_ad].video_url)
            // 视频路径
        
    }
    
    // render里面不能用setState
    async componentDidMount(){
        await this.init()
        // 初始化页面
        this.timer = setInterval(()=>{
            this.timer&&clearInterval(this.timer);
            this.props.navigation.navigate("SplashAdScreen")
        },2000)
        // 延时跳转
    }
}

export default Stack =createAppContainer(
    createStackNavigator(
        {
            SplashBrandScreen:{screen:SplashBrandScreen},
            SplashAdScreen:{screen:SplashAdScreen},
            MainScreen1:{screen:MainScreen1},
        },
        {
            defaultNavigationOptions:{
                headerShown:false
            }
        }
    )
)