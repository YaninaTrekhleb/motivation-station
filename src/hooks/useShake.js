import { useEffect } from 'react';

export function useShake(callback, threshold = 15) {
  useEffect(() => {
    let lastX = null;
    let lastY = null;
    let lastZ = null;

    const handleMotion = (event) => {
      const { accelerationIncludingGravity } = event;
      if (!accelerationIncludingGravity) return;

      const { x, y, z } = accelerationIncludingGravity;

      if (lastX !== null) {
        const deltaX = Math.abs(x - lastX);
        const deltaY = Math.abs(y - lastY);
        const deltaZ = Math.abs(z - lastZ);

        if (deltaX + deltaY + deltaZ > threshold) {
          callback();
        }
      }

      lastX = x;
      lastY = y;
      lastZ = z;
    };

    if (typeof DeviceMotionEvent !== 'undefined' &&
        typeof DeviceMotionEvent.requestPermission === 'function') {
      // iOS 13+ requires permission
      DeviceMotionEvent.requestPermission()
        .then(permission => {
          if (permission === 'granted') {
            window.addEventListener('devicemotion', handleMotion);
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener('devicemotion', handleMotion);
    }

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [callback, threshold]);
}
