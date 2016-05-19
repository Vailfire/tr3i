import usb from 'usb';

usb.setDebugLevel(4);

console.log(usb.getDeviceList());

const nxt = usb.findByIds(1684, 2);

nxt.open();

console.log(nxt);

const nxtInterface = nxt.interfaces[0];
nxtInterface.claim();
console.log(nxtInterface);

const outEndpoint = nxtInterface.endpoints[0];
const inEndpoint = nxtInterface.endpoints[1];

// [0x80,0x03,0x0B,0x02,0xF4,0x01]
const startMotor = [0x00, 0x04, 0xFF, 0x64, 0x07, 0x00, 0x00, 0x20, 0x00, 0x00, 0x00, 0x00];

console.log(startMotor);

outEndpoint.transfer(new Buffer(startMotor), (err) => {
  console.log(err);
});

inEndpoint.transfer(3, (err, data) => {
  console.log('received data', data);
});

usb.on('attach', (device) => {
  console.log('attached: ', device);
});

usb.on('detach', (device) => {
  console.log('detached: ', device);
});
