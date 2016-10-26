// assign action types to constants
// export to use in corresponding reducer (for switching on action types)
export const LOCK_HOME = 'home/lock';
export const UNLOCK_HOME = 'home/unlock';

const isDaytime = (date) => {
  // is daytime between 7AM and 6PM
  return date.getHours() >= 7 && date.getHours <= (12 + 6);
};

// export action creators
export const lockHome = () => {
  return {
    type: LOCK_HOME
  };
};

export const unlockHome = () => {
  return {
    type: UNLOCK_HOME,
    isDaytime: isDaytime(new Date()),
    isBedtime: isBedtime(new Date())
  };
};

export const turnOnDevice(deviceName) => {
  return {
    type: TURN_ON_USER_DEVICE,
    deviceName
  }
}

export const addUserDevice = (deviceName) => {
  return {
    type: ADD_USER_DEVICE,
    deviceName
  }
};