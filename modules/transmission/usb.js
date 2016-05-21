import usb from 'usb';

export const NXT_VENDOR_ID = 1684;

export const NXT_PRODUCT_ID = 2;

/**
 * Checks whether a given node-usb Device is a NXT brick
 * @param  {Device} device
 * @return {boolean}
 */
export const isNXTBrick = (device) => {
  const { idVendor, idProduct } = device.deviceDescriptor;
  return idVendor === NXT_VENDOR_ID && idProduct === NXT_PRODUCT_ID;
};

export const detectAttachedDevices = () => usb.getDeviceList();

export const filterNXTBricksfromDevices = devices => devices.filter(isNXTBrick);

/**
 * Detect all attached NXT bricks
 * @return {Promise} that resolves found bricks as array
 */
export const detectAttachedBricks = Promise.resolve()
  .then(detectAttachedDevices)
  .then(filterNXTBricksfromDevices);

export const getEndpoints = (device) => {
  const endpoints = device.interfaces[0].endpoints;

  return ({
    inEndpoint: endpoints[1],
    outEndpoint: endpoints[0],
  });
};

/**
 * Open connection to a NXT brick and provide I/O endpoints
 * @param  {Device} device valid NXT brick
 * @return {Promise} that resolves a object with the device itself,
 *  an inEndpoint and an outEndpoint
 */
export const openConnection = (device) => new Promise((resolve) => {
  usb.setDebugLevel(4);
  device.open();
  const nxtInterface = device.interfaces[0];
  nxtInterface.claim();
  const { inEndpoint, outEndpoint } = getEndpoints(device);
  resolve({
    device,
    type: 'usb',
    inEndpoint,
    outEndpoint,
  });
});
