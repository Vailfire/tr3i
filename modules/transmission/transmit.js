import { getEndpoints } from './usb';

export const sendCommand = (device, command) => new Promise((resolve, reject) => {
  const { outEndpoint } = getEndpoints(device);
  console.log(`Sending command: ${command}`);
  outEndpoint.transfer(new Buffer(command), (error, answer) => {
    if (error) {
      reject(error);
    }
    resolve(answer);
  });
});
