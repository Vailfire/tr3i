import usb = from 'usb';

usb.setDebugLevel(4);

const nxt = usb.findByIds(1684, 2);

nxt.open();

console.log(nxt);

const interface = nxt.interfaces[0];
interface.claim();
console.log(interface);

const outEndpoint = interface.endpoints[0];
cpnst inEndpoint = interface.endpoints[1];

// '[0x80,0x03,0x0B,0x02,0xF4,0x01]
const startMotor = [0x00,0x04,0x02,0x64,0x07,0x00,0x00,0x20,0x168,0x00,0x00,0x00];

console.log(startMotor);

outEndpoint.transfer(new Buffer(startMotor), function (err) {
	if(err) console.log(err);
});

inEndpoint.transfer(3, function(err, data){
	console.log("received data, ", data);
});

usb.on('attach', function(device) {
	console.log('attached: ',device);
});

usb.on('detach', function(device) {
	console.log('detached: ',device);
});
