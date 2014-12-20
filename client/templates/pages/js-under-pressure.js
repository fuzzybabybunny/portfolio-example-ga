Template.JSUnderPressure.rendered = function(){

	/*

	  So you're a JavaScript coder. A good one.
	  
	  Let me tell you now: you're going to hate this source code.
	  
	  It's a series of bodges, of the digital equivalent of sticky-tape and string,
	  which emphasises quick development and fast patching over any sort of
	  maintenance or legibility.
	  
	  Because that's how we roll.

	*/

	var level = 1;
	var inPlay = false;
	var secs = 0;
	var startTime = new Date().getTime();
	var tests = [];
	var currentTest;
	var testTimeout;
	var evalWorker;

	var levels = [
	  {},
	  {
	    intro: "Code as fast as you can! You need to double the integer and return it.<br>To test your code, click Go or hit Ctrl-Enter/⌘-Enter.",
	    text: "function doubleInteger(i) {\n" +
	"    \n"+
	"    // i will be an integer. Double it and return it.\n"+
	"    \n"+
	"    \n"+
	"    \n"+
	"    return i;\n"+
	"    \n"+
	"}",
	    startCursorAt: [4,4],
	    tests: [
	      { i: "doubleInteger(2);", o: 4 },
	      { i: "doubleInteger(4);", o: 8 },
	      { i: "doubleInteger(-10);", o: -20 },
	      { i: "doubleInteger(0);", o: 0 },
	      { i: "doubleInteger(100);", o: 200 },
	    ],
	    outro: "Click Go or hit Ctrl-Enter/⌘-Enter to move on to level 2!"
	  
	  },
	  
	  {
	    intro: "Little bit trickier now. The clock's started ticking again. Return true or false depending on whether the number is even.<br>You can use console.log() and alert(); the results will show up here.",
	    text: "function isNumberEven(i) {\n" +
	"    \n"+
	"    // i will be an integer. Return true if it's even, and false if it isn't.\n"+
	"    \n"+
	"    \n"+
	"    \n"+
	"    \n"+
	"}",
	    startCursorAt: [4,4],
	    tests: [
	      { i: "isNumberEven(2);", o: true },
	      { i: "isNumberEven(3);", o: false },
	      { i: "isNumberEven(0);", o: true },
	      { i: "isNumberEven(-2);", o: true },
	      { i: "isNumberEven(Math.floor(Math.random()*1000000)*2);", o: true },
	    ],
	    outro: "Two down, three to go. Ready for level 3? 'Go' or Ctrl-Enter/⌘-Enter to move on."
	  
	  },
	  
	  {
	    intro: "Here we go! Given a filename in a string (like 'test.jpg'), return the file extension (like 'jpg'), OR false if it doesn't have one.",
	    text: "function getFileExtension(i) {\n" +
	"    \n"+
	"    // i will be a string, but it may not have a file extension.\n"+
	"    // return the file extension (with no period) if it has one, otherwise false\n"+
	"    \n"+
	"    \n"+
	"    \n"+
	"}",
	    startCursorAt: [5,4],
	    tests: [
	      { i: "getFileExtension('blatherskite.png');", o: 'png' },
	      { i: "getFileExtension('perfectlylegal.torrent');", o: 'torrent' },
	      { i: "getFileExtension('spaces are fine in file names.txt');", o: 'txt' },
	      { i: "getFileExtension('this does not have one');", o: false },
	      { i: "getFileExtension('.htaccess');", o: 'htaccess' }
	    ],
	    outro: "Top work, that was tricky. Two challenges left! Ready to start the clock again?"
	  
	  },

	  {
	    intro: "Level 4 of 5! You'll get an array. Return the longest string inside it.",
	    text: "function longestString(i) {\n" +
	"    \n"+
	"    // i will be an array.\n"+
	"    // return the longest string in the array\n"+
	"    \n"+
	"    \n"+
	"    \n"+
	"}",
	    startCursorAt: [5,4],
	    tests: [
	      { i: "longestString(['a','ab','abc']);", o: 'abc' },
	      { i: "longestString(['big',[0,1,2,3,4],'tiny']);", o: 'tiny' },
	      { i: "longestString(['Hi','World','你好']);", o: 'World' },
	      { i: "longestString([true,false,'lol']);", o: 'lol' },
	      { i: "longestString([{object: true,mainly: 'to confuse you'},'x']);", o: 'x' }
	    ],
	    outro: "Well done! Only one challenge remains. It's time to get recursive."
	  
	  },

	  {
	    intro: "Final challenge! Sum all the integers in a nested array, no matter how many levels deep.",
	    text: "function arraySum(i) {\n" +
	"    \n"+
	"    // i will be an array, containing integers, strings and/or arrays like itself.\n"+
	"    // Sum all the integers you find, anywhere in the nest of arrays.\n"+
	"    \n"+
	"    \n"+
	"    \n"+
	"}",
	    startCursorAt: [5,4],
	    tests: [
	      { i: "arraySum([1,2,3,4,5])", o: 15 },
	      { i: "arraySum([[1,2,3],4,5])", o: 15 },
	      { i: "arraySum([[1,2,false],'4','5'])", o: 3 },
	      { i: "arraySum([[[[[[[[[1]]]]]]]], 1])", o: 2 },
	      { i: "arraySum([['A','B','C','easy as',1,2,3]])", o: 6 }
	    ],
	    outro: "Well done! Only one challenge remains. It's time to get recursive."
	  
	  }

	];

	function startClock() {

	  startTime = new Date().getTime();
	  inPlay = true;
	  setTimeout(tick,100);

	}

	function stopClock() {

	  secs += (new Date().getTime() - startTime);
	  inPlay = false;
	  updateClock();
	  

	}

	function updateClock() {

	  var s = getClock();

	  $('#clockText').text(Math.floor(s / 60) + ":" + Math.floor(s % 60).toFixed(0).pad(2, "0"));

	}

	function getClock() {

	  var s;

	  if (inPlay) {
	    s = (secs + (new Date().getTime() - startTime))/1000;
	  } else {
	    s = secs/1000;
	  }
	  
	  return s;

	}

	function tick() {

	  if (inPlay) {
	  
	    updateClock();
	    setTimeout(tick,100);
	  
	  }

	}

	function panel(id) {

	  $('.panel').hide();
	  $('#' + id).show();

	}

	function runCode() {

	  if(inPlay) {

	    stopClock();
	    editor.setReadOnly(true);
	    $('#test button').attr('disabled','disabled');
	    
	    tests = levels[level].tests.slice(0);
	    
	    test();
	    
	  } else {
	  
	    level++;
	    startLevel();
	  
	  }
	    
	}

	function log(msg,c) {

	  var t = document.getElementById('status');
	  t.innerHTML += "<div class='log " + c + "'>" + msg + "</div>";
	  t.scrollTop = t.scrollHeight;

	}

	function clearLog() {

	  $('#status').html('');

	}

	function test() {
	  
	  if(tests.length > 0) {
	  
	    currentTest = tests.shift();
	    
	    log("Testing \"" + currentTest.i + "\"...",'');
	  
	    var code = editor.getSession().getValue() + "\n" + currentTest.i;
	      
	    try {
	      testTimeout = setTimeout(abandonShip,500);
	      evalWorker.postMessage(code);
	    } catch(e) {
	      log("Compiling failed! Check your code and try again.",'bad');
	      backToGame();
	    }
	    
	  } else {
	  
	    levelComplete();
	  
	  }

	}

	function backToGame() {

	  startClock();
	  editor.setReadOnly(false);
	  editor.focus();
	  $('#test button').attr('disabled',false);
	  
	}

	function validate(i) {
	  clearTimeout(testTimeout);
	  
	  if(currentTest.o == i) {
	  
	    log("RIGHT: " + i + " is the right answer.",'good');
	    setTimeout(test,500);
	  
	  } else {
	  
	    log("WRONG: Got " + i + " but expected " + currentTest.o + ". Try again!",'bad');
	    backToGame();
	  
	  }
	  
	}
	function handleError(i) {
	  clearTimeout(testTimeout);
	  log("ERROR: " + i,'bad');
	  backToGame();
	}
	function abandonShip() {
	  evalWorker.terminate();
	  evalWorker = setupWorker();
	  log("TIMEOUT: Your code took too long to execute. There might be an infinite loop in there.",'bad');
	  backToGame();
	}
	function showLog(l) {
	  log(l,'console');
	}

	function startGame() {

	  panel('game');
	  secs = 0;
	  level = 1;
	  startLevel();

	}

	function startLevel() {

	  editor.getSession().setValue(levels[level].text);
	  editor.setReadOnly(false);
	  editor.focus();
	  editor.moveCursorTo(levels[level].startCursorAt[0],levels[level].startCursorAt[1]);
	  clearLog();
	  log(levels[level].intro,'good');
	  startClock();

	}

	function levelComplete() {

	  _gaq.push(['_trackEvent', 'Interactives', 'JavaScript Quiz', 'Completed level ' + level.toString()]);   
	  if(level == levels.length-1) {
	    declareVictory();
	  } else {
	    var s = getClock();
	    log('SUCCESS! All tests passed. You\'ve used ' + Math.floor(s / 60) + ":" + Math.floor(s % 60).toFixed(0).pad(2, "0") + ' so far. Well done!','gold');
	    log(levels[level].outro,'gold');
	    $('#test button').attr('disabled',false);
	  }
	  
	}

	function declareVictory() {
	  
	  var s = getClock();
	  $('#finaltime').text(Math.floor(s / 60) + " minutes, " + Math.floor(s % 60) + " seconds");
	  panel('victory');
	  document.getElementById('outro_audio').play();
	  
	  animateImg('torvalds');
	  animateImg('stallman');
	  animateImg('babbage');
	  animateImg('lovelace');
	  animateImg('codeparty');
	  animateImg('codeparty2');

	}

	String.prototype.pad = function(l, s){
	    return (l -= this.length) > 0
	        ? (s = new Array(Math.ceil(l / s.length) + 1).join(s)).substr(0, s.length) + this + s.substr(0, l - s.length)
	        : this;
	};

	function setupWorker() {
	  var newWorker = new Worker("eval.js");
	  newWorker.onmessage = function (m) {
	    if(m.data.type == 'result') {
	      validate(m.data.content);
	    }
	    if(m.data.type == 'error') {
	      handleError(m.data.content);
	    }   
	    if(m.data.type == 'log') {
	      showLog(m.data.content);
	    }
	  };
	  newWorker.onerror = function (m) {
	    handleError(m.message);
	  };
	  return newWorker;
	}

	  

	function tweet() {

	  var s = getClock();
	  var tweet_url = 'https://twitter.com/intent/tweet?related=usvsth3m&text=';
	  tweet_url += encodeURIComponent("I completed \"You Can't JavaScript Under Pressure\" in " + Math.floor(s / 60) + " minutes, " + Math.floor(s % 60) + " seconds! Can you code quicker?");
	  tweet_url += '&url=' + window.location.href;
	  
	  window.open(tweet_url,'_blank');
	  
	}

	function facebook() {

	  var s = getClock();
	  FB.ui({
	  method: 'feed',
	  link: window.location.href,
	  picture: 'http://games.usvsth3m.com/javascript-under-pressure/intro.jpg',
	  name: "You Can't JavaScript Under Pressure",
	  description: "I completed \"You Can't JavaScript Under Pressure\" in " + Math.floor(s / 60) + " minutes, " + Math.floor(s % 60) + " seconds! Can you code quicker?"
	  }, function(response){});

	}

	function tweetProgress() {

	  var s = getClock();
	  var tweet_url = 'https://twitter.com/intent/tweet?related=usvsth3m&text=';
	  tweet_url += encodeURIComponent("I got to level " + level + " in \"You Can't JavaScript Under Pressure\" in " + Math.floor(s / 60) + " minutes, " + Math.floor(s % 60) + " seconds! Can you code quicker?");
	  tweet_url += '&url=' + window.location.href;
	  
	  window.open(tweet_url,'_blank');
	  
	}

	function facebookProgress() {

	  var s = getClock();
	  FB.ui({
	  method: 'feed',
	  link: window.location.href,
	  picture: 'http://games.usvsth3m.com/javascript-under-pressure/intro.jpg',
	  name: "You Can't JavaScript Under Pressure",
	  description: "I got to level " + level + " in \"You Can't JavaScript Under Pressure\" in " + Math.floor(s / 60) + " minutes, " + Math.floor(s % 60) + " seconds! Can you code quicker?"
	  }, function(response){});

	}


	function makeNewPosition($container) {

	    // Get viewport dimensions (remove the dimension of the div)
	    var h = $container.height() - 50;
	    var w = $container.width() - 50;

	    var nh = Math.floor(Math.random() * h);
	    var nw = Math.floor(Math.random() * w);

	    return [nh, nw];

	}

	function animateImg(target) {
	    var newq = makeNewPosition($('#' + target).parent());
	    var oldq = $('#' + target + ' img').offset();
	    var speed = calcSpeed([oldq.top, oldq.left], newq);
	    $('#' + target).animate({
	        top: newq[0],
	        left: newq[1]
	    }, speed, function() {
	        animateImg(target);
	    });

	};

	function calcSpeed(prev, next) {

	    var x = Math.abs(prev[1] - next[1]);
	    var y = Math.abs(prev[0] - next[0]);

	    var greatest = x > y ? x : y;

	    var speedModifier = 0.1;

	    var speed = Math.ceil(greatest / speedModifier);

	    return speed;

	};

	function theresAStallmanWaitingInTheSkyHedLikeToComeAndMeetUsButHeThinksHedBlowOurMinds() {

	  $('#stallman_was_right').show();
	  document.getElementById('stallman_audio').play();

	}


	$('document').ready(function () {

	  if(!!window.Worker) {

	    evalWorker = setupWorker();

	  } else {
	  
	    panel('fail');
	  
	  }

	  $(document).keypress(function(event) {
	    if (event.which == 13 && (event.ctrlKey||event.metaKey)) {
	      event.preventDefault();
	      runCode();
	      return false;
	    }
	    return true;
	  });
	  
	  $(window).konami(theresAStallmanWaitingInTheSkyHedLikeToComeAndMeetUsButHeThinksHedBlowOurMinds);
	  $(window).konami(declareVictory,"73,68,68,81,68");
	  $("#stallman_audio").bind('ended', function(){
	    $('#stallman_was_right').hide();
	  });
	  
	});


	(function($) {

		$.fn.konami = function(callback, code) {
			if(code == undefined) code = "38,38,40,40,37,39,37,39,66,65";
			
			return this.each(function() {
				var kkeys = [];
				$(this).keydown(function(e){
					kkeys.push( e.keyCode );
					while (kkeys.length > code.split(',').length) {
						kkeys.shift();
					}
					if ( kkeys.toString().indexOf( code ) >= 0 ){
						$(this).unbind('keydown', arguments.callee);
						callback(e);
					}
				});
			});
		}

	})(jQuery);

};