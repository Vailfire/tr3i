import { detectAttachedBricks, openConnection } from './transmission/usb';
import { MOTOR_PORT } from './robot/index';

const startMotor = (port = MOTOR_PORT.ALL) => [0x00, 0x04, port,
  0x64, 0x07, 0x00, 0x00, 0x20, 0x00, 0x00, 0x00, 0x00];

const stopMotor = [0x00, 0x04, 0xFF, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];

detectAttachedBricks.then((nxtBricks) => {
  console.log(nxtBricks);
  openConnection(nxtBricks[0]).then(({ inEndpoint, outEndpoint }) => {
    const delayAction = (port, delay) => {
      setTimeout(() => {
        outEndpoint.transfer(new Buffer(stopMotor), (err) => {
          console.log('executed', err);
        });
        outEndpoint.transfer(new Buffer(startMotor(port)), (err) => {
          console.log('executed', err);
        });
      }, delay);
    };
    delayAction(MOTOR_PORT.ALL, 0);
    delayAction(MOTOR_PORT.A, 2000);
    delayAction(MOTOR_PORT.B, 2000);
    delayAction(MOTOR_PORT.C, 2000);
    inEndpoint.transfer(3, (err, data) => {
      console.log('received data', data);
    });
  });
});
