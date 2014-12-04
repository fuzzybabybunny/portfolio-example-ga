Template.Phone.rendered = function(){

	/**
	 * A Vibrate object for detecting and using the window.navigator.vibrate
	 * function.
	 * 
	 * Code borrows from David Walsh's work
	 * http://davidwalsh.name/vibration-api
	 *    
	 * @property {boolean} supported If vibrate is supported in the current context
	 */
	 
	var Vibrate = (function(self) {
	  self.supported = ('vibrate' in window.navigator);
	  var interval = null;
	 
	  /*
	   * Starts vibration for given duration
	   * @param duration  Amount of time in ms to vibrate
	   */
	  self.startVibrate = function(duration) {
	    if (self.supported) {
	      window.navigator.vibrate(duration);
	    }
	  };
	 
	  /*
	   * Clears the interval, if set, and stops any current vibration
	   */
	  self.stopVibrate = function() {
	    if (self.supported) {
	      if (interval !== null) {
	        clearInterval(interval);
	      }
	      window.navigator.vibrate(0);
	    }
	  };
	 
	  /*
	   * Starts a peristent vibration for the given duration and interval
	   * @param duration  The amount of time to vibrate in ms
	   * @param interval  The amount of timne to pause between vibrations in ms
	   */
	  self.startPeristentVibrate = function(duration, interval) {
	    interval = window.setInterval(function() {
	      startVibrate(duration);
	    }, interval);
	  };
	 
	  return self;
	})(Vibrate || {});

	// var phone = new Vibrate();

	$('button').click(function(){
		console.log('clicked!');
		Vibrate.startVibrate(5000);
	})

  init();

  
  function init() {
    if ((window.DeviceMotionEvent) || ('listenForDeviceMovement' in window)) {
      window.addEventListener('devicemotion', deviceMotionHandler, false);
    } else {
      document.getElementById("dmEvent").innerHTML = "Not supported on your device or browser.  Sorry."
    }
  };

	function deviceMotionHandler(eventData) {
	  var info, xyz = "[X, Y, Z]";

	  // Grab the acceleration from the results
	  var acceleration = eventData.acceleration;
	  info = xyz.replace("X", acceleration.x);
	  info = info.replace("Y", acceleration.y);
	  info = info.replace("Z", acceleration.z);
	  document.getElementById("moAccel").innerHTML = info;

	  // Grab the acceleration including gravity from the results
	  acceleration = eventData.accelerationIncludingGravity;
	  info = xyz.replace("X", acceleration.x);
	  info = info.replace("Y", acceleration.y);
	  info = info.replace("Z", acceleration.z);
	  document.getElementById("moAccelGrav").innerHTML = info;

	  // Grab the rotation rate from the results
	  var rotation = eventData.rotationRate;
	  info = xyz.replace("X", rotation.alpha);
	  info = info.replace("Y", rotation.beta);
	  info = info.replace("Z", rotation.gamma);
	  document.getElementById("moRotation").innerHTML = info;

	  // // Grab the refresh interval from the results
	  info = eventData.interval;
	  document.getElementById("moInterval").innerHTML = info;       
	};

  function round(val) {
    var amt = 10;
    return Math.round(val * amt) /  amt;
  };

};