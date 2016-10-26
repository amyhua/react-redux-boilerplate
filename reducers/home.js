// import action types
import { LOCK_HOME, UNLOCK_HOME } from '../actions/home';

const initialState = {
  lights: 'off', // optimization: if a binary choice: 0 ('on') or 1 ('off'), use a boolean instead
  locked: true,
  ovenOn: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case LOCK_HOME:
      return {
        lights: 'off',
        locked: true
      };
    case UNLOCK_HOME:
      return {
        lights: action.isDaytime ? 'off' : (action.afterBedtime ? 'off' : 'on'),
        locked: false
      };
    case TURN_ON_DEVICE:
      return Object.assign({}, state, {
        devicesOn: state.devicesOn.push(action.deviceName)
      });
    case ADD_USER_DEVICE:
      return Object.assign({}, state, {
        devices: state.devices.push(action.deviceName)
      });
    default:
      return state;
  }
};
