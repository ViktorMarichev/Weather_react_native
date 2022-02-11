import React, { useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity,Animated } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export const Navbar = ({message,openModal,currentCity,setUnit,currentUnit,location,getCurrentLocation,setMessage}) => {
const translation=useRef(new Animated.Value(-50)).current
  EStyleSheet.build({
    // всегда вызывайте EStyleSheet.build(), даже если вы не используете глобальные переменные!
  });

  const onPress = (event) => {
    setUnit();
  };
  useEffect(()=>{
if(message){

 Animated.timing(translation,{
   toValue:0,
   useNativeDriver:true,
   duration:35
 }).start();
}
  },[message])

  return (
    <View style={styles.navBar}>
     {message?<Animated.View style={[styles.message,{transform:[
{translateY:translation}
],}]}><Text>{location!=null?location.city:null}</Text>
      <TouchableOpacity onPress={()=>{setMessage();translation.setValue(-50)}}>
        <Text style={styles.messageOk}>OK</Text></TouchableOpacity></Animated.View>:null}
      <View style={styles.navBarTop}>
        <View>
          <Text style={styles.currentTown}>{currentCity}</Text>
        </View>
        <TouchableOpacity style={styles.switchBox} onPress={onPress}>
          <Text style={styles.switchImg}>º</Text>

          <View style={styles.switch}>
            <View
              style={[styles.switchItem, currentUnit==='metric' ? styles.switchItemActive : null]}
            >
              <Text
                style={[
                  styles.switchItemText,
                  currentUnit==='metric' ? styles.switchItemActiveText : null,
                ]}
              >
                C
              </Text>
            </View>
            <View
              style={[
                styles.switchItem,
                currentUnit==='imperial' ? styles.switchItemActive : null,
              ]}
            >
              <Text
                style={[
                  styles.switchItemText,
                  currentUnit==='imperial' ? styles.switchItemActiveText : null,
                ]}
              >
                F
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.navBarBottom}>
        <TouchableOpacity onPress={openModal} style={[styles.changeCity,styles.bottomItem]}>
          <Text style={styles.bottomItemText}>Сменить город</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.location,styles.bottomItem]}
        onPress={()=>getCurrentLocation()}>
          <Image source={require('./img/location.png')}/>
          <Text style={styles.bottomItemText}>{location!=null?location.city:'Мое местоположение'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  navBar: {
    flexDirection: 'column',
    height: '15.5%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 19,
    paddingRight: 43,
    paddingLeft: 19,
  },
  navBarTop: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    height: 36,
  },
 bottomItem:{
   flexDirection:'row',
   justifyContent:'center',
   alignItems:'center'
 },
 bottomItemText:{
  fontFamily: 'lato-regular',
  fontWeight:'normal',
  fontSize: 15,
  opacity:0.6,
  color: '#FFFFFF',
 },

  changeCity:{

  },
  location:{

  },
  navBarBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 36,
    paddingTop:19,
    width: '100%',
  },
  switchBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switch: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.4,
    borderWidth: 1,
    borderColor:'white',
    borderRadius: 8,
    width: '100%',
    maxWidth: 77,
  },
  switchImg: {
    color: 'white',
    fontFamily: 'lato-regular',
    paddingRight: 9,
  },
  switchItem: {
    width: '50%',
    opacity: 1,
  },
  switchItemActive: {},
  switchItemActiveText: {
    color: 'white',
    fontFamily: 'lato-bold',
    borderWidth: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  switchItemText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    width: '100%',
  },
  currentTown: {
    color: 'white',
    fontFamily: 'lato-regular',
    fontSize: 30,
  },
  message:{
height:30,
backgroundColor:'white',
position:'absolute',
width:'100%',
zIndex:5,
borderRadius:4,
height:53,
justifyContent:'space-between',
paddingHorizontal:18,
alignItems:'center',
flexDirection:'row'
  },
  messageOk:{
    fontFamily:'lato-regular',
    fontSize: 15,

color: '#1086FF',
  },

});
