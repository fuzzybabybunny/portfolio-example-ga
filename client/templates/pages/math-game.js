Template.MathGame.rendered = function(){

	// Sample Selections from the User
	// 0 is addition, 1 is subtraction, 2 is divide, 3 is multi, 4 is power, 5 is sqrt
	var selectedQuestions = [0,1,2];
	var maxNum = 10;
	var score = 0;

	// Returns random integer under a max value
	var returnRandomInteger = function(maxNum){
		var num = Math.round((Math.random() * maxNum), 0);
		return num;
	};

	// Takes the user's selection and returns a random question type
	// 0 is addition, 1 is subtraction, 2 is divide, 3 is multi, 4 is power, 5 is sqrt
	var returnQuestionType = function(userSelectionArray){
		var maxIndex = userSelectionArray.length - 1;
		var index = returnRandomInteger(maxIndex);
		return userSelectionArray[index]; 
	};

  // returns an object with both the question (string) and answer (number), 
  // puts the question on the HTML
	var returnQuestionAndAnswer = function(maxNum, type){

		var questionAndAnswer = {};
		var num1 = returnRandomInteger(maxNum);
		var num2 = returnRandomInteger(maxNum);

		switch (type) {
	    case 0:
        var question = num1 + ' + ' + num2;
        questionAndAnswer = {
        	question: question,
        	answer: eval(question)
        };
        break;
	    case 1:
        var question = num1 + ' - ' + num2;
        questionAndAnswer = {
        	question: question,
        	answer: eval(question)
        };
        break;
	    case 2:
        var question = num1 + ' / ' + num2;
        questionAndAnswer = {
        	question: question,
        	answer: eval(question)
        };
        break;
	    case 3:
        var question = num1 + ' x ' + num2;
        questionAndAnswer = {
        	question: question,
        	answer: (num1 * num2)
        };
        break;
	    case 4:
        var question = num1 + ' ^ ' + num2;
        questionAndAnswer = {
        	question: question,
        	answer: Math.pow(num1, num2)
        };
        break;
	    case 5:
        var question = ' sqrt ' + num1;
        questionAndAnswer = {
        	question: question,
        	answer: Math.sqrt(num1)
        };
        break;
		};

		// User jQuery to put questionAndAnswer.question on the HTML
		$('.question').text(questionAndAnswer.question);
		return questionAndAnswer;

	};

	var questionAndAnswer = returnQuestionAndAnswer( maxNum, returnQuestionType(selectedQuestions) );

	// use jquery to put questionAndAnswer.question on page 
	// use questionAndAnswer.answer to check the user's input

	var checkAnswer = function(userAnswer, questionAndAnswer){
		if(userAnswer === questionAndAnswer.answer){
			timer+= 5;
			// creates a new question and answer
			questionAndAnswer = returnQuestionAndAnswer( maxNum, returnQuestionType(selectedQuestions) );
			score++;
		};
	};

	// on keyup, grab the user's input and run:
	checkAnswer(userAnswer, questionAndAnswer);


};