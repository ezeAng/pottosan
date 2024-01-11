import { useEffect, useState, useRef } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { btoa, atob } from 'react-native-quick-base64';
import { dataText, globalStyles, standardInput, standardText } from '../../GlobalStyles';

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

  const [deviceId, setDeviceId] = useState(null);
  const [devicesFound, setDevicesFound] = useState({});
  const [devicesFoundArray, setDevicesFoundArray] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("Idle");

  const deviceRef = useRef(null);

  var deviceTargetId = targetDev;

  const searchAndConnectToDevice = () => {
    setDevicesFound({});
    setDevicesFoundArray([]);
    setConnectionStatus("Searching...")
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        setConnectionStatus("Error searching for devices");
        alert("Error: " + error.message);
        return;
      }
      if (devicesFound.hasOwnProperty(device.id)) {
        return;
      } else {
        setDevicesFound(prevDict => {
          return { ...prevDict, [device.id]: device.name };
        });
        // Convert the devicesFound object into an array for FlatList
        setDevicesFoundArray(prevArr => {
          return [...prevArr, { id: device.id, name: device.name }]
        })
      }

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
    setDevicesFound({});
    setDevicesFoundArray([]);
    setConnectionStatus("Idle");
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

  // Function to render each item in the list
  const renderDevice = ({ item }) => (
    <Text style={styles.deviceItem}>{`${item.id}: ${item.name}`}</Text>
  );




  return (
    <View style={styles.container}>
      <Text>Target Device id: {qrCode}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTargetDev}
        value={targetDev}
        placeholder="Device Id"
      />
      <TouchableOpacity style={styles.button} onPress={addDeviceFromQR}>
        <Text>Scan QR</Text>
      </TouchableOpacity>
      {/* FlatList to display the devices */}
      <FlatList
        data={devicesFoundArray}
        renderItem={renderDevice}
        keyExtractor={item => item.id}
        style={styles.deviceList}
      />
      <View style={styles.statusContainer}>
        <Text style={dataText}>
          Connection status: {connectionStatus}
        </Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={searchAndConnectToDevice} >
          <Text style={dataText}>Scan for Devices</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNegative} onPress={stopScan} >
          <Text style={dataText}>Stop Scan</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  statusContainer : {
    backgroundColor: globalStyles.BackgroundPrimary,
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    alignSelf: "center",
    width: "95%",
    borderRadius: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center"
  },
  deviceList: {
    height: 200, // Set your desired height here
    // You can add other styles like margins or borders if needed
  },
  deviceItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: globalStyles.BackgroundSecondary,
  },
  buttonContainer: {
    flexDirection: 'row', // Make the buttons horizontal
    marginTop: "5%",
    width: '100%', // Ensure buttons take full width
    justifyContent: 'space-between', // Add space between buttons
  },
  button : {
    flex: 1, // Make both buttons take equal width
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 10,
    height: "40%",
    elevation: 3,
    backgroundColor: globalStyles.Bright
  },
  buttonNegative : {
    flex: 1, // Make both buttons take equal width
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 10,
    height: "40%",
    elevation: 3,
    backgroundColor: globalStyles.Highlight
  }
});

export default BluetoothScreen