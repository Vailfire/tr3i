import { detectAttachedBricks, openConnection } from './transmission/usb';
import { MOTOR_PORT } from './robot';

const startMotor = [0x00, 0x04, 0xFF, 0x64, 0x07, 0x00, 0x00, 0x20, 0x00, 0x00, 0x00, 0x00];
const stopMotor = [0x00, 0x04, 0xFF, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];

detectAttachedBricks.then((nxtBricks) => {
  console.log(nxtBricks);
  openConnection(nxtBricks[0]).then(({ inEndpoint, outEndpoint }) => {
    console.log(startMotor);
    outEndpoint.transfer(new Buffer(startMotor.splice(1, 1, MOTOR_PORT.B)), (err) => {
      console.log('executed', err);
    });
    inEndpoint.transfer(3, (err, data) => {
      console.log('received data', data);
    });
    setTimeout(() => {
      outEndpoint.transfer(new Buffer(stopMotor), (err) => {
        console.log('executed', err);
      });
      outEndpoint.transfer(new Buffer(startMotor.splice(1, 1, MOTOR_PORT.C)), (err) => {
        console.log('executed', err);
      });
    }, 1400);
  });
});
