import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserQRCodeReader } from '@zxing/library';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      code: null
    }
  }

  componentDidMount() {
    this.startScan();
  }

  startScan() {
    const codeReader = new BrowserQRCodeReader();

    codeReader
      .listVideoInputDevices()
      .then(videoInputDevices => {
        videoInputDevices.forEach(device =>
          console.log(`${device.label}, ${device.deviceId}`)
        );

        const firstDeviceId = videoInputDevices[0].deviceId;

        codeReader
          .decodeFromInputVideoDeviceContinuously(firstDeviceId, 'video',
          (result) => {
            if (result) {
              console.log(result.text);
              this.setState({code: result.text});
            }
          });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>QR Code: {this.state.code}</p>
          <video
            id="video"
            width="80%"
            style={{border: "1px solid gray"}}
          ></video>
        </header>
      </div>
    );
  }
}

export default App;
