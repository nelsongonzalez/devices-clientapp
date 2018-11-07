const allDevices = async () => {
  const response = await fetch('http://localhost:3000/devices');
  return _handleException(response);
};

const getDevice = async (deviceId) => {
  const response = await fetch(`http://localhost:3000/devices/${deviceId}`);
  return _handleException(response);
};

const createDevice = async (device) => {
  const response = await fetch('http://localhost:3000/devices', {
    method: 'POST',
    body: JSON.stringify(device),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return _handleException(response);
};

const updateDevice = async (deviceId, device) => {
  const response = await fetch(`http://localhost:3000/devices/${deviceId}`, {
    method: 'PUT',
    body: JSON.stringify(device),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return _handleException(response);
};

const deleteDevice = async (deviceId) => {
  const response = await fetch(`http://localhost:3000/devices/${deviceId}`, {
    method: 'DELETE'
  });
  return _handleException(response);
};

const _handleException = (response) => {
  if (!response.ok) {

    throw Error(response.statusText);
  }
  return response;
};

export { allDevices, getDevice, createDevice, updateDevice, deleteDevice };
