import { View, Text, Button, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react'
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner, CameraRuntimeError } from 'react-native-vision-camera';


const QRCamera = ({navigation}) => {
  const { hasPermission, requestPermission, status } = useCameraPermission()
  useEffect(() => {
    requestPermission();
  },[])
  const device = useCameraDevice('back')

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      console.log(`Scanned ${codes[0].value} codes!`);
      navigation.navigate('BluetoothScreen', { scannedCode: codes[0].value });
    }
  })
  if (status === 'denied' || status === 'blocked') {
    return <Text>Camera permission is denied. Please enable it in the settings.</Text>;
  }
  if (device == null) return <Text>No Camera detected on this device.</Text>


  return (
    <View style={StyleSheet.absoluteFill}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />
    </View>
  )
}

export default QRCamera