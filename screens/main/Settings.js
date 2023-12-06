import { useEffect, useState, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { btoa, atob } from 'react-native-quick-base64';

// import { AuthenticationContext } from '../../global/auth/AuthenticationContext';
// import { useContext } from 'react';

const SERVICE_UUID = "";
const SENSOR_DATA_CHAR_UUID = "";

const bleManager = new BleManager();

const Settings = ({navigation}) => {
  // const {logout, userInfo} = useContext(AuthenticationContext);

  const [deviceId, setDeviceId] = useState(null);
  const [devicesFound, setDevicesFound] = useState({});
  const [connectionStatus, setConnectionStatus] = useState("Searching...");

  const deviceRef = useRef(null);

  const deviceTargetId = "30E56056-F0A3-DB2F-037E-06BF23981043"

  const searchAndConnectToDevice = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        setConnectionStatus("Error searching for devices");
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


  const handleLogout = () => {
    // logout();
    navigation.navigate('Home');
  }


  return (
    <View>
      <Text>
        Settings - verticle list
      </Text>
      {Object.entries(devicesFound).map(([key, value]) => (
                <Text key={key}>{`${key}: ${value}`}</Text>
            ))}
      <Text>
        Connection status: {connectionStatus}
      </Text>
      <Button title="Scan for Devices" onPress={searchAndConnectToDevice} />
      <Button title="Stop Scan" onPress={stopScan} />
      <Button 
        title='Logout' 
        onPress={handleLogout}
      />
    </View>
  )
}

export default Settings