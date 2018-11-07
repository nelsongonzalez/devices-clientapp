const allDevices = () => {
  return fetch('http://localhost:3000/devices')
    .then(_handleException);
};

const getDevice = (deviceId) => {
  return fetch(`http://localhost:3000/devices/${deviceId}`)
    .then(_handleException);
};

const createDevice = (device) => {
  return fetch('http://localhost:3000/devices', {
    method: 'POST',
    body: JSON.stringify(device),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(_handleException);
};

const updateDevice = (deviceId, device) => {
  return fetch(`http://localhost:3000/devices/${deviceId}`, {
    method: 'PUT',
    body: JSON.stringify(device),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(_handleException);
};

const deleteDevice = (deviceId) => {
  return fetch(`http://localhost:3000/devices/${deviceId}`, {
    method: 'DELETE'
  })
    .then(_handleException);
};

const _handleException = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export { allDevices, getDevice, createDevice, updateDevice, deleteDevice };
