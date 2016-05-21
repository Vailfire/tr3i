import { detectAttachedBricks, openConnection } from './transmission/usb';
import { MOTOR_PORT } from './robot/index';

const startMotor = (port = MOTOR_PORT.ALL) => [0x00, 0x04, port,
  0x64, 0x07, 0x00, 0x00, 0x20, 0x00, 0x00, 0x00, 0x00];

const stopMotor = [0x00, 0x04, 0xFF, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];

detectAttachedBricks.then((nxtBricks) => {
  console.log(nxtBricks);
  openConnection(nxtBricks[0]).then(({ inEndpoint, outEndpoint }) => {
    outEndpoint.transfer(new Buffer(startMotor(MOTOR_PORT.ALL)), (err) => {
      console.log('executed', err);
    });
    inEndpoint.transfer(3, (err, data) => {
      console.log('received data', data);
    });
  });
  openConnection(nxtBricks[1]).then(({ inEndpoint, outEndpoint }) => {
    outEndpoint.transfer(new Buffer(startMotor(MOTOR_PORT.ALL)), (err) => {
      console.log('executed', err);
    });
    inEndpoint.transfer(3, (err, data) => {
      console.log('received data', data);
    });
  });
});
