import { getEndpoints } from 'usb';

export const sendCommand = (device, command) => new Promise((resolve, reject) => {
  const { outEndpoint } = getEndpoints(device);

  outEndpoint.transfer(new Buffer(command), (error, answer) => {
    if (error) {
      reject(error);
    }
    resolve(answer);
  });
});
