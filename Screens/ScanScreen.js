
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner'

export default class ScanPage extends React.Component {

  constructor() {
    super()

    this.state = {

      HasCameraPermitions: null,
      scanned: false,
      scannedData: '',
      buttonPressed: 'normal'

    }
  }

  //handle QR code function
  handleBarCodeScaned = async ({ type, data }) => {

    this.setState({

      scannedData: data,
      scanned: true,
      buttonPressed: 'normal'

    })
  }

  //getCameraPermissionFuntion
  getCameraPermission = async () => {

    const { status } = await Permissions.askAsync(Permissions.CAMERA)

    this.setState({

      HasCameraPermitions: status === "granted",
      scanned: false,
      buttonPressed: 'clicked'

    })
  }

  render() {

    const HasCameraPermitions = this.state.HasCameraPermitions;
    const scanned = this.state.scanned;
    const buttonPressed = this.state.buttonPressed;
    console.log(HasCameraPermitions)
    if (buttonPressed === 'clicked' && HasCameraPermitions === true) {
      return (
        //console.log("work")
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScaned}
          style={StyleSheet.absoluteFillObject}
        />
      )
    }

    else if (buttonPressed === 'normal') {
      return (

        <View style={{ marginTop: 1000 }}>
          <View style={styles.ScannedDataView}>
            <Text style={styles.permitStyles}>
              {

                HasCameraPermitions === true ? this.state.scannedData : 'requestCameraPermission'

              }

            </Text>
          </View>

          <View>
            <TouchableOpacity onPress={this.getCameraPermission} style={styles.QRbuttonStyle}>

              <Text style={styles.textStyle}>Scan Qr  Code</Text>

            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({

  QRbuttonStyle: {

    backgroundColor: 'red',
    width: "30%",
    height: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 7,
    borderColor: 'darkred',
    borderRadius: 60,
   
  },

  textStyle: {

    fontSize: 40,
    color: 'black',
    fontSize: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    fontWeight: 'bold'

  },

  permitStyles: {

    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 500,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginTop: 120,

  },

  ScannedDataView: {

    marginTop: 200,
    fontWeight: 'bold'



  }
})