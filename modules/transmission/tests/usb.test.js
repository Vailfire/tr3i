import test from 'ava';
import { isNXTBrick } from '../usbAdapter';

test(t => {
  t.deepEqual([1, 3], [1, 2]);
});

test('testing something - unit', t => {
  setTimeout(() => { t.deepEqual([1, 3], [1, 2]); }, 1500);
});

const testDevices = [{
  busNumber: 1,
  deviceAddress: 8,
  deviceDescriptor: {
    bLength: 18,
    bDescriptorType: 1,
    bcdUSB: 512,
    bDeviceClass: 0,
    bDeviceSubClass: 0,
    bDeviceProtocol: 0,
    bMaxPacketSize0: 8,
    idVendor: 1684,
    idProduct: 2,
    bcdDevice: 0,
    iManufacturer: 0,
    iProduct: 0,
    iSerialNumber: 1,
    bNumConfigurations: 1,
  },
  portNumbers: [1, 3],
}, {
  busNumber: 1,
  deviceAddress: 1,
  deviceDescriptor: {
    bLength: 18,
    bDescriptorType: 1,
    bcdUSB: 512,
    bDeviceClass: 9,
    bDeviceSubClass: 0,
    bDeviceProtocol: 1,
    bMaxPacketSize0: 64,
    idVendor: 7531,
    idProduct: 2,
    bcdDevice: 1025,
    iManufacturer: 3,
    iProduct: 2,
    iSerialNumber: 1,
    bNumConfigurations: 1,
  },
  portNumbers: [],
},
];

test('isNXTBrick() should recognize valid NXT bricks - unit', t => {
  t.true(isNXTBrick(testDevices[0]));
});

test('isNXTBrick() should not recognize other usb devices than NXT bricks - unit', t => {
  t.false(isNXTBrick(testDevices[1]));
});

// test('filterNXTBricksfromDevices()', t => {
//   const bricks = filterNXTBricksfromDevices(testDevices);
//   it('should recognize valid NXT bricks', () => {
//     expect(bricks[0]).to.be.equal(testDevices[0]);
//   });
//   it('should only recognize NXT bricks', () => {
//     expect(bricks).to.have.lengthOf(1);
//   });
// });
