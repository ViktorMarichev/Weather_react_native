import React, { useState } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FlatGrid } from 'react-native-super-grid';
import {weatherTranslate} from './data';
export const Weather = ({ data,loaded }) => {
  const [items, setItems] = React.useState([
    { name: 'Ветер', code: '#1abc9c' },
    { name: 'Давление', code: '#2ecc71' },
    { name: 'Влажность', code: '#3498db' },
    { name: 'Вероятность дождя', code: '#9b59b6' },
  ]);
  EStyleSheet.build({});


  const DetermineWindDirection=(deg)=>{
switch(true){
  case  deg<=348.75  && deg>= 11.25:return 'северный' ;
  case  deg>=11.25 && deg <= 78.75:return 'северо-восточный';
  case  deg>=78.75 && deg<= 101.25:return 'восточный';
  case  deg>=101.25 && deg<= 168.75: return 'юго-восточный';
  case  deg>=168.75 && deg<= 191.25:return 'южный';
  case  deg>=191.25 && deg<= 258.75:return 'юго-западный';
  case deg>=258.75 && deg <=281.25:return 'западный';
  case  deg>=281.25 && deg<= 348.75: return 'западно-восточный';
  default: return '...';
}

  }
  const getWeatherImg=(desc)=>{
switch(true){
  
}

  }
  return (
    <View style={styles.weatherContainer}>
      {!loaded? <Image source={require('./img/spinner.gif')} />:<View style={styles.weatherWrapper}>
        <View style={styles.weatherBox}>
          <Image style={styles.weatherImg} source={weatherTranslate[data.current.weather[0].description].img} />
          <Text style={styles.weatherDeg}>
            { parseInt(data.current.temp) + 'º' }
          </Text>
        </View>
        <Text style={styles.weather}>
          {weatherTranslate[data.current.weather[0].description].rusDesc}
        </Text>
      </View>}

      <View style={styles.indicators}>
      <View style={styles.itemContainer}>
              <Text style={styles.indicatorName}>Ветер</Text>
              <Text style={styles.indicatorValue}>{loaded?data.current.wind_speed+' м/c, '+DetermineWindDirection(Number.parseFloat(data.current.wind_deg)):<Image source={require('./img/cloud.png')} />}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.indicatorName}>Давление</Text>
              <Text style={styles.indicatorValue}>{loaded?data.current.pressure+' мм рт. ст.':<Image source={require('./img/spinner.gif')} />}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.indicatorName}>Влажность</Text>
              <Text style={styles.indicatorValue}>{loaded?data.current.humidity+'%':<Image source={require('./img/spinner.gif')} />}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.indicatorName}>Вероятность дождя</Text>
              <Text style={styles.indicatorValue}>{loaded?data.hourly[0].pop+'%':<Image source={require('./img/spinner.gif')} />}</Text>
            </View>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  weatherContainer: {
    height: '84.5%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '70%',
    width: '100%',
  },
  weatherBox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weather: {
    color: 'white',
  },
  weatherDeg: {
    fontFamily: 'ptSans',
    fontSize: 110,
    color: '#FFFFFF',
  },
  indicators: {
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 22,
  },
  indicatorName: {
    fontFamily: 'lato-regular',
    fontSize: 15,
    color: 'white',
    opacity: 0.6,
  },
  indicatorValue: {
    fontFamily: 'lato-bold',
    fontSize: 18,
    color: '#FFFFFF',
  },

  itemContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderRadius: 5,
    padding: 10,
    height: 55,
    width: '50%',
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  weatherImg:{
maxWidth:200,
maxHeight:200
  },
  spinner:{
width:15,
height:15
  },
});
