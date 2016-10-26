/* global window, document */
/* eslint no-render-return-value: 0, jsx-filename-extension: 0 */

// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Counter from './components/Counter';
import homeReducer from './reducers';
import { unlockHome, lockHome } from './actions'; // action creators

/* eslint-disable no-underscore-dangle */
const store = createStore(homeReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-enable */

// an app that locks or unlocks your home
// with a click of a button: <LOCK> <UNLOCK>

const render = () => ReactDOM.render(
  <div>
    <HomeManager
      onAddUserDevice={(e) => store.dispatch(addDevice(e.target.value))}
    />
    <Home
      insideLightMode={store.getState().lights}
      lockOn={store.getState().locked}
      devices={store.getState().devices}
      turnOnOven={() => store.dispatch(powerOven('on'))}
      turnOffOven={() => store.dispatch(powerOven('off'))}
      onLock={() => store.dispatch(unlockHome())}
      onUnlock={() => store.dispatch(lockHome())}
    />
  </div>,
  document.getElementById('root')
);

render();
store.subscribe(render);

// spec change:
// 'loved the app! but I don't really like that my lights turn on
// when I get inside the house and it's still light outside.
// The lights should just not be on during the daytime'



// spec change 2:
// 'great change! can we also make the lights dim when it is almost bedtime?
// would be great if I could tell the app when my bedtime is, and
// have the lights automatically dim to prepare me for sleeping



// spec change 3:
// 'woah this is great! I realized I still want my outside porch light on
// when it is nighttime and I've left the house. Can we turn off all
// lights in the house except for my porch light when I lock up at night?'


// spec change 4:
// 'also, can you make sure all my lights are off if it is still night after bedtime,
// regardless of if I have locked up the house or not?'

// spec change 5:
// 'can you turn on my coffeemaker in the morning at a set time I wake up every day?'

// spec change 5b:
// 'can the app let me know if my coffeemaker is on or off?'

// spec change 5c:
// '...what about my oven or stove? or my alarm?'

// spec change 6:
// 'can you let me know if I left the oven on if I've left the house?'
// assume that there is a sensor that clicks a "TURN OVEN ON" or "TURN OVEN OFF" button
// in your app whenever it is turned on/off.

// spec change 7:
// 'can you let me know if I left the coffeemaker on if I've left the house?'
// assume that there is a sensor that clicks a "TURN OVEN ON" or "TURN OVEN OFF" button
// in your app whenever it is turned on/off.

// spec change 8:
// '... as well as my stove or alarm?'
// assume that there is a sensor that clicks a "TURN OVEN ON" or "TURN OVEN OFF" button
// in your app whenever it is turned on/off.

// spec change 9:
// 'Actualy, can you just let me configure what devices I want to be alarmed about if I left them on
// while I've left the house?' (call these "user devices")
// provide the user with a form for creating buttons on their app for turning their custom named device on/off
// (NOTE: this form should probably not be part of the <Home> component)
// assume the user will install sensors on their devices that
// will click the "TURN <DEVICE NAME> ON" button on the app when the device is on/off