!function() {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    function animation(elem, obj, time, callback) {
        var targetPropName;
        var targetPropValue;
        for(var i in obj) {
            targetPropName = i;
            targetPropValue = obj[i];
        }
        targetPropValue = targetPropValue.replace(/px/g, "");

        var originPropValue = elem.style[targetPropName].replace(/px/g, "");
        
        var diff = targetPropValue - originPropValue;
        var diffEachTime = diff / time * 30;

        requestID = requestAnimationFrame(function() { // 每一帧
            originPropValue = Number(originPropValue) + Number(diffEachTime);
            elem.style[targetPropName] = originPropValue + "px";

            // 循环
            if(originPropValue <= targetPropValue) {
                requestID = requestAnimationFrame(arguments.callee);
            } else {
                cancelAnimationFrame(requestID);
            }
        });
    }

    if(typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = animation;
    } else if(typeof define === 'function' && define.amd) {
        define(function() {
            return animation;
        })
    } else if(typeof define === 'function' && define.cmd) {
        define(function(require, exports, module) {
            module.exports = animation;
        })
    } else {
        window.animation = animation;
    }
}();

// (function() {
//     var lastTime = 0;
//     var vendors = ['ms', 'moz', 'webkit', 'o'];
//     for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
//         window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
//         window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
//                                    || window[vendors[x]+'CancelRequestAnimationFrame'];
//     }
 
//     if (!window.requestAnimationFrame)
//         window.requestAnimationFrame = function(callback, element) {
//             var currTime = new Date().getTime();
//             var timeToCall = Math.max(0, 16 - (currTime - lastTime));
//             var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
//               timeToCall);
//             lastTime = currTime + timeToCall;
//             return id;
//         };
 
//     if (!window.cancelAnimationFrame) {
//         window.cancelAnimationFrame = function(id) {
//             clearTimeout(id);
//         };
//     }
// }());


