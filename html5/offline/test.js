var addEvent = (function () {
  if (document.addEventListener) {
    return function (el, type, fn) {
      if (el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      } else {
        el.addEventListener(type, fn, false);        
      }
    };
  } else {
    return function (el, type, fn) {
      if (el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      } else {
        el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
      }
    };
  }
})();


var cacheStates = [
"UNCACHED (numeric value 0) -- The ApplicationCache object's cache host is not associated with an application cache at this time.",
"IDLE (numeric value 1) -- The ApplicationCache object's cache host is associated with an application cache whose application cache group's update status is idle, and that application cache is the newest cache in its application cache group, and the application cache group is not marked as obsolete.",
"CHECKING (numeric value 2) -- The ApplicationCache object's cache host is associated with an application cache whose application cache group's update status is checking.",
"DOWNLOADING (numeric value 3) -- The ApplicationCache object's cache host is associated with an application cache whose application cache group's update status is downloading.",
"UPDATEREADY (numeric value 4) -- The ApplicationCache object's cache host is associated with an application cache whose application cache group's update status is idle, and whose application cache group is not marked as obsolete, but that application cache is not the newest cache in its group.",
"OBSOLETE (numeric value 5) -- The ApplicationCache object's cache host is associated with an application cache whose application cache group is marked as obsolete."];

function updateCacheStatus() {
  document.querySelector('#status').innerHTML = cacheStates[window.applicationCache.status];
}

addEvent(document.querySelector('#update'), 'click', function () {
  window.applicationCache.update();
});

addEvent(document.querySelector('#swap'), 'click', function () {
  window.applicationCache.swapCache();
});

var events = "checking,error,noupdate,downloading,progress,updateready,cached,obsolete".split(',');
var i = events.length;

while (i--) {
  addEvent(window.applicationCache, events[i], updateCacheStatus);
}

</script>