import { particlesCursor } from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js';

// Get the full height of the document to set a high enough `sleepRadiusY`
const documentHeight = document.documentElement.scrollHeight;
console.log(documentHeight)
const pc = particlesCursor({
    el: document.querySelector('body'),
    gpgpuSize: 512,
    color: 0x0fff,
    colors: [0x00ffff, 0x00fffc],
    coordScale: 0.5,
    pointSize: 1,
    noiseIntensity: 0.001,
    noiseTimeCoef: 0.001,
    pointDecay: 0.0025,
    sleepRadiusX: 300,
    sleepRadiusY:3000,
    sleepTimeCoefX: 0.005,
    sleepTimeCoefY: 0.002
});
