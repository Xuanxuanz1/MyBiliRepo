import React, { Component } from 'react';
import { Text,View,ScrollView,Dimensions,Image} from 'react-native';
import Swiper from 'react-native-swiper'


const styles = {
    swiper:{},
    img:{
        width:Dimensions.width,
        height:100
    },
    paginationStyles:{
        top:90,
        left:300
    },
    dotStyles:{
        backgroundColor:"#C0C0C0"
    },
    activeDotStyles:{
        backgroundColor:"#fff"
    }
}

export class Living extends Component{
    render(){
        return(
            <ScrollView>
            <View style={{flex:1}}>
                <Swiper
                style={styles.swiper}
                height={100}  
                horizontal={true}
                paginationStyle={styles.paginationStyles}
                showsButtons={false}
                autoplay={true}
                autoplayTimeout={6}
                dotStyle={styles.dotStyles}
                activeDotStyle={styles.activeDotStyles}
                >

                <Image source={require("./image/image_swifer/image_01.jpg")}
                    style={styles.img}/>

                <Image source={require("./image/image_swifer/image_02.jpg")}
                    style={styles.img}/>
                    
                <Image source={require("./image/image_swifer/image_03.jpg")}
                    style={styles.img}/>    
                </Swiper>

               
            </View>
            </ScrollView>
        )
    }
}