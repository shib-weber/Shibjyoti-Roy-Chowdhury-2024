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

function circle(){
    document.querySelector('.atomic').slider({
        range:false,
        min:20,
        max:500,
        value:280,
        slide:function(event , ui){
            console.log(ui.value);
            sphereRad=ui.value;
        }
    })
}
function circle2(){
    document.querySelector("#slider-test").slider({
        range:false,
        min:1.0,
        max:2.0,
        value:1,
        step:0.01,
        slide:function(event , ui){
            console.log(ui.value);
            radius_sp=ui.value
        }
    })
}

circle()
circle2()
