import { useEffect, useState, useRef } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { btoa, atob } from 'react-native-quick-base64';

// import { AuthenticationContext } from '../../global/auth/AuthenticationContext';
// import { useContext } from 'react';

const SERVICE_UUID = "";
const SENSOR_DATA_CHAR_UUID = "";

const bleManager = new BleManager();



const BluetoothScreen = ({navigation, route}) => {
  const [qrCode, setQrCode] = useState('');
  const [targetDev, setTargetDev] = useState('');

  useEffect(() => {
    if (route.params?.scannedCode) {
      setQrCode(route.params.scannedCode);
      setTargetDev(route.params.scannedCode)
    }
  }, [route.params?.scannedCode]);

  // const {logout, userInfo} = useContext(AuthenticationContext);

  const [deviceId, setDeviceId] = useState(null);
  const [devicesFound, setDevicesFound] = useState({});
  const [connectionStatus, setConnectionStatus] = useState("Idle");

  const deviceRef = useRef(null);

  var deviceTargetId = targetDev;

  const searchAndConnectToDevice = () => {
    setConnectionStatus("Searching...")
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        setConnectionStatus("Error searching for devices");
        alert("Error: " + error.message);
        return;
      }
      setDevicesFound(prevDict => {
        return { ...prevDict, [device.id]: device.name };
      });
      if (device.id === deviceTargetId) {
        console.log(device.name, device.id);
        bleManager.stopDeviceScan();
        setConnectionStatus("Connecting to " + device.name);
        connectToDevice(device);
      }
    });
  };

  const stopScan = () => {
    bleManager.stopDeviceScan();
  }

  const connectToDevice = (device) => {
    return device
      .connect()
      .then((device) => {
        setDeviceId(device.id);
        setConnectionStatus("Connected");
        deviceRef.current = device;
        return device.discoverAllServicesAndCharacteristics();
      })
      .then((device) => {
        return device.services();
      })
      .then((services) => {
        let service = services.find((service) => service.uuid === SERVICE_UUID);
        return service.characteristics();
      })
      .catch((error) => {
        console.log(error);
        setConnectionStatus("Error in Connection");
      });
  };

  useEffect(() => {
    const subscription = bleManager.onDeviceDisconnected(
      deviceId,
      (error, device) => {
        if (error) {
          console.log("Disconnected with error:", error);
        }
        setConnectionStatus("Disconnected");
        console.log("Disconnected device");
        if (deviceRef.current) {
          setConnectionStatus("Reconnecting...");
          connectToDevice(deviceRef.current)
            .then(() => setConnectionStatus("Connected"))
            .catch((error) => {
              console.log("Reconnection failed: ", error);
              setConnectionStatus("Reconnection failed");
            });
        }
      }
    );
    return () => subscription.remove();
  }, [deviceId]);


  const addDeviceFromQR = () => {
    navigation.navigate("QRCamera");
  }


  return (
    <View style={styles.container}>
      <Text>Target Device id: {qrCode}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTargetDev}
        value={targetDev}
        placeholder="Device Id"
      />
      <Button title='Scan QR' onPress={addDeviceFromQR}/>
      {Object.entries(devicesFound).map(([key, value]) => (
                <Text key={key}>{`${key}: ${value}`}</Text>
            ))}
      <Text>
        Connection status: {connectionStatus}
      </Text>
      <Button title="Scan for Devices" onPress={searchAndConnectToDevice} />
      <Button title="Stop Scan" onPress={stopScan} />
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  }
});

export default BluetoothScreen