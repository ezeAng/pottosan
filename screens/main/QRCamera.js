import { View, Text, Button, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react'
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';


const QRCamera = ({navigation}) => {
  const { hasPermission, requestPermission } = useCameraPermission()
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
  if (device == null) return <NoCameraDeviceError />


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