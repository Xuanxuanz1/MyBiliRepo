import { View,Text,Image} from 'react-native';
import React, { Component } from 'react'
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation'
import {FirstActivity} from "./FirstActivity"
import {Channel} from "./Channel"
import {Dynamic} from "./Dynamic"
import {Myself} from "./Myself"
import {themeColor} from "./data"



export const MainScreen1 =createAppContainer(
  createBottomTabNavigator(
    {
      FirstActivity:{
        screen:FirstActivity,
        navigationOptions:{
          tabBarIcon:({focused})=>renderTabBar("icon",0,focused),
          tabBarLabel:({focused})=>renderTabBar("label",0,focused),
          
        }
      },

      Channel:{
        screen:Channel,
        navigationOptions:{
          tabBarIcon:({focused})=>renderTabBar("icon",1,focused),
          tabBarLabel:({focused})=>renderTabBar("label",1,focused),
        }
      },

      Dynamic:{
        screen:Dynamic,
        navigationOptions:{
          tabBarIcon:({focused})=>renderTabBar("icon",2,focused),
          tabBarLabel:({focused})=>renderTabBar("label",2,focused),
        }
      },

      Myself:{
        screen:Myself,
        navigationOptions:{
          tabBarIcon:({focused})=>renderTabBar("icon",3,focused),
          tabBarLabel:({focused})=>renderTabBar("label",3,focused),
        }
      }

    }
  )
)

function renderTabBar(part,page,focused){

  if(part=="icon"){
    if(page==0){
      icon=focused?require("./image/icon_a/home-filling.png"):require("./image/icon_a/home.png")
    }

    if(page==1){
      icon=focused?require("./image/icon_a/fenqu-filling.png"):require("./image/icon_a/fenqu.png")
    }

    if(page==2){
      icon=focused?require("./image/icon_a/dongtai-filling.png"):require("./image/icon_a/dongtai.png")
    }

    if(page==3){
      icon=focused?require("./image/icon_a/wode-filling.png"):require("./image/icon_a/wode.png")
    }

    return <Image source={icon} style={{width:20,height:20}}></Image>
  }
  else{
    if(page==0){
      label="主页"
      color=focused?themeColor:"#aaa"
     
    }
    
    if(page==1){
      label="频道"
      color=focused?themeColor:"#aaa"
    }

    if(page==2){
      label="动态"
      color=focused?themeColor:"#aaa"
    }

    if(page==3){
      label="我的"
      color=focused?themeColor:"#aaa"
    }

    return <Text style={{color:color,fontSize:12,alignSelf:"center"}}>{label}</Text>
  }
}



