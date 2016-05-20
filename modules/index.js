import { detectAttachedBricks, openConnection } from './transmission/usb';

const startMotor = [0x00, 0x04, 0xFF, 0x64, 0x07, 0x00, 0x00, 0x20, 0x00, 0x00, 0x00, 0x00];

detectAttachedBricks.then((nxtBricks) => {
  console.log(nxtBricks);
  openConnection(nxtBricks[0]).then(({ inEndpoint, outEndpoint }) => {
    console.log(startMotor);
    outEndpoint.transfer(new Buffer(startMotor), (err) => {
      console.log(err);
    });
    inEndpoint.transfer(3, (err, data) => {
      console.log('received data', data);
    });
  });
});
