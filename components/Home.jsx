// Create components/Counter.jsx
import React, { Component } from 'react'

const Home = ({ insideLightMode, devicesOn, devices, lockOn, onLock, onUnlock }) => {
  const onDevicesLi = devicesOn.map((deviceName) => <li>{deviceName}</li>)
  return (
    <div>
      <h1>Devices that are on</h1>
      <ul>
        {onDevicesLi}
      </ul>
      <h1>Devices that should not be on</h1>
      {notBeOnDevices}
      <h1>Inside Lights are {insideLightMode}</h1>
      <h1>Porch Light is {porchLightMode}</h1>
      <h1>Door is {lockOn ? 'LOCKED' : 'NOT LOCKED'}</h1>
      <h1>{ovenOn && lockOn ? 'You left the oven on!' : ''}</h1>
      <button onClick={onIncrement}>Unlock Home</button>
      <button onClick={onDecrement}>Lock Home</button>
    </div>
  );
});

export default Home;

/*

var Test = React.createClass({
    render: function() {
        var stationComponents = this.props.stations.map(function(station) {
            return <div className="station">{station.call}</div>;
        });
        return <div>{stationComponents}</div>;
    }
});



var stations = [
  {call:'station one',frequency:'000'},
  {call:'station two',frequency:'001'}
]; 

React.render(<Test stations={stations} />, document.getElementById('container'));

link: https://jsfiddle.net/69z2wepo/14377/
*/