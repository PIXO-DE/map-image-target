/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

const splashImageComponent = {
    schema: {
      disableWorldTracking: {type: 'bool', default: false},
      requestGyro: {type: 'bool', default: false},
    },
    init() {
      const splashimage = document.getElementById('splashimage');
      splashimage.style.display = 'flex';
      const start = document.getElementById('start');
      start.style.display = 'block';
  
      const addXRWeb = () => {
        if (this.data.requestGyro === true && this.data.disableWorldTracking === true) {
          // If world tracking is disabled, and you still want gyro enabled (i.e. 3DoF mode)
          // Request motion and orientation sensor via XR8's permission API
          XR8.addCameraPipelineModule({
            name: 'request-gyro',
            requiredPermissions: () => ([XR8.XrPermissions.permissions().DEVICE_ORIENTATION]),
          });
        }
        this.el.sceneEl.setAttribute('xrweb', `allowedDevices: any; disableWorldTracking: ${this.data.disableWorldTracking}`);
        splashimage.classList.add('hidden');
        start.classList.add('hidden');
      };
  
      // setTimeout(() => {
      //   start.click(); // Trigger click event on the start button after 3 seconds
      // }, 3000);
      
      start.onclick = addXRWeb;
    },
  };
  
  export { splashImageComponent };