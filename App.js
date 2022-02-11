import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
  TouchableOpacity,
  ScrollView,
  Button
} from 'react-native';
import { Navbar } from './src/Navbar';
import { Weather } from './src/Weather';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { EvilIcons } from '@expo/vector-icons';
import { Cities } from './src/data';
import Geolocation from 'react-native-geolocation-service'; 
import * as Location from 'expo-location';
const apiKey = 'f5317c7c4912afc252ba91e24411c276';
const ApiKeyGeocode='4wp0GmL39smTMPXvOJLDMffn42ugZdzs9kiAzob5r1o';
async function loadApplication() {
  await Font.loadAsync({
    'lato-bold': require('./assets/fonts/Lato-Bold.ttf'),
    'lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
    ptSans: require('./assets/fonts/PTSans-Regular.ttf'),
  });
}
export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState(null);
  const [isModalOpen, setModal] = useState(false);
  const [currentCity,setCurrentCity]=useState({city:'Омск',latitude:54.983334,longitude:73.366669});
  const [unit,setUnit]=useState('metric');
  const [error,setError] =useState('');
  const [location,setCurrentLocaion]=useState(null);
  const [message,setMessage]=useState(false);

  //imperial
  //metric
  const openModal = () => {
    setModal(true);
  };
  const setUnitHandler=()=>{
if(unit==='metric')setUnit('imperial')
else setUnit('metric')
  }
  const closeModal = () => setModal(false);
  const setCity=(city)=>{
setCurrentCity({city:Cities[city].rusName,longitude:Cities[city].longitude,latitude:Cities[city].latitude})
  }
  const toggleMessage=()=>{

    setMessage((prev)=>!prev);
  }
 const getCurrentLocation= async ()=>{
  try {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
console.log('Permission to access location was denied')
      return;
    }
      console.log("You can use the geolocation");
      let position = await Location.getCurrentPositionAsync({});
      getAddressFromCoordinates(position.coords.latitude,position.coords.longitude).then((data)=>{
        console.log('DATA',data)
        setCurrentLocaion({latitude:position.coords.latitude,longitude:position.coords.longitude,city:data[0].local_names.ru});
      setCurrentCity({...currentCity,city:data[0].local_names.ru});
     setMessage(true);
    });

  
    
  } catch (err) {
    console.warn(err);
  }

  }
//`https://api.openweathermap.org/data/2.5/weather?lat=${lat.toString()}&lon=${long.toString()}&appid=${apiKey}&units=metric`
useEffect(()=>{
  
  getCurrentLocation()
},[])
  useEffect(()=>{
    console.log('currentCity changed',location)
    if(location===null)
    getWeatherData(currentCity.latitude,currentCity.longitude);
    else getWeatherData(location.latitude,location.longitude);

  },[currentCity])
  useEffect(()=>{
    if(location===null)
    getWeatherData(currentCity.latitude,currentCity.longitude);
    else getWeatherData(location.latitude,location.longitude);

  },[unit])
  function getWeatherData(lat,long) {

    setLoaded(false);
    fetch(
     `https://api.openweathermap.org/data/2.5/onecall?lat=${lat.toString()}&lon=${long.toString()}&appid=${apiKey}&exclude=minutely,daily,alerts&units=${unit}`
    )
      .then((response) => {

        return response.json();
      })
      .then((resData) => {
        console.log(resData.current.weather[0].description)
if(resData.cod===429|| resData.cod===401){setError(resData.message)}
else{
  setData(resData);
          setLoaded(true);
}

      })
      .catch((error) => {
        Alert.alert('catch:', error.message.toString());
 
      });
  };


  function getAddressFromCoordinates( latitude, longitude ) {
    return new Promise((resolve) => {
      const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=3&appid=${apiKey}`
      fetch(url)
        .then(res => res.json())
        .then((resJson) => {
          console.log(resJson);
          resolve(resJson);
          
        })
        .catch((e) => {
          console.log('Error in getAddressFromCoordinates', e)
          resolve()
        })
    })
  }


  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={(err) => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    );
  } else {

if(error!='')
{
return <View style={styles.errorContainer}><Text style={styles.textError}>{error}</Text><Button onPress={()=> {getWeatherData(currentCity.latitude,currentCity.longitude);
setError('')}} title='try again'/></View>
}

    return (
      <View style={styles.container}>
        <Modal visible={isModalOpen}
        animationType='fade'>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal}>
              <EvilIcons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.cityList}>
            <ScrollView style={styles.scrollView}>
            {Object.keys(Cities).map((elem,index) => {
              return (
                <TouchableOpacity key={index} onPress={()=>{
                  setCurrentLocaion(null);
                  setCity(elem);
                  closeModal();

                }}>
                <View style={styles.listItem}>
                  <Text style={styles.listItemText}>{Cities[elem].rusName}</Text>
                </View>
                </TouchableOpacity>
              );
            })}
            </ScrollView>
          </View>
        </Modal>
        <Navbar currentCity={currentCity.city} currentUnit={unit} setUnit={setUnitHandler} location={location} openModal={openModal} getCurrentLocation={getCurrentLocation} message={message} setMessage={toggleMessage}/>
        <Weather loaded={loaded} data={data}/>
        <StatusBar style="auto"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#498CEC',
    height: '100%',
  },
  errorContainer:{
justifyContent:'center',
alignItems:'center',
height: '100%',
backgroundColor:'#498CEC'
  },
  textError:{
    fontFamily: 'lato-bold',
    color:'white',
    fontSize:20
  },
  cityList: {
    width: '100%',
    flexDirection: 'column',
  },
  listItem: {
    color: 'white',
    padding:2,
    borderRadius:5,
    borderBottomColor:'#498CEC',
    borderWidth:1,
    
  },
  listItemText:{
    fontFamily: 'lato-regular',
    fontSize:24,
    color:'#498CEC'
  },
  modalHeader:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    paddingHorizontal:10,
    
  },
  scrollView:{
    marginBottom:'11%'
  },
});
