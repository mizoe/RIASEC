var lastQuestion = 41;
function saveAnswer(answer, questionNumber){
//	Ti.API.info('questionNumber: ', questionNumber);
//	Ti.API.info('answer: ', answer);
	var answers = new Array();
	answers = Ti.App.Properties.getList('answers');
//	Ti.API.info('answerS1: ', answers);
//	Ti.API.info('answers[0]: ', answers[0]);
	answers[questionNumber] = answer;
//	Ti.API.info('answerS3: ', answers);
	Ti.App.Properties.setList('answers', answers);
	return true;
}

var graphSize = Ti.Platform.displayCaps.platformWidth;
if(graphSize > 600){
	graphSize = 600;
}
var questionNumber = Ti.App.Properties.getInt('questionNumber') + 1;
Ti.UI.currentWindow.backgroundColor = "#fff"; 
Ti.UI.currentWindow.title = "Q" + questionNumber + " / 42";

var tableView = Ti.UI.createTableView({
	separatorColor : '#fff',
	width: graphSize
});
Ti.UI.currentWindow.add(tableView);

var questionA = 'q'+questionNumber+'a';
var questionB = 'q'+questionNumber+'b';

// Question A ---------------------------------- Question A ----------------------------------
var row = Ti.UI.createTableViewRow({
	backgroundColor : '#fff',
	hasDetail: true
});
row.add(
	Ti.UI.createLabel({
		backgroundColor : '#fff',
		color: '#000',
		height: 100,
		textAlign: 'center',
		text: L(questionA)
	})
);
row.addEventListener("click", function(){
	Ti.App.Properties.setInt('questionNumber', questionNumber);
	saveAnswer(1, questionNumber);
	if(questionNumber > lastQuestion){
	    Ti.UI.currentTab.open(Ti.UI.createWindow({url: "result.js"}));
	}else{
	    Ti.UI.currentTab.open(Ti.UI.createWindow({url: "question.js"}));
	}
});
tableView.appendRow(row);

// Question B ---------------------------------- Question B ----------------------------------
var row = Ti.UI.createTableViewRow({
	backgroundColor : '#000',
	hasDetail: true
});
row.add(
	Ti.UI.createLabel({
		backgroundColor : '#000',
		color: '#fff',
		height: 100,
		width: '100%',
		textAlign: 'center',
		text: L(questionB)
	})
);
row.addEventListener("click", function(){
	Ti.App.Properties.setInt('questionNumber', questionNumber);
	saveAnswer(2, questionNumber);
	if(questionNumber > lastQuestion){
	    Ti.UI.currentTab.open(Ti.UI.createWindow({url: "result.js"}));
	}else{
	    Ti.UI.currentTab.open(Ti.UI.createWindow({url: "question.js"}));
	}
});
tableView.appendRow(row);

// 注意書き
var row = Ti.UI.createTableViewRow({
	backgroundColor : '#fff',
    touchEnabled : false,
    selectionStyle :'none'
});
var notice = "●「いいな」と思う方を選んで下さい。\n●　なるべく深く考えず直感で答えて下さい。\n●「どちらも選べない」と思っても、無理やりどちらか選んで下さい。";
if(Ti.Platform.osname == "mobileweb"){
	notice = "●「いいな」と思う方を選んで下さい。<BR>●　なるべく深く考えず直感で答えて下さい。<BR>●「どちらも選べない」と思っても、無理やりどちらか選んで下さい。";
}
row.add(
	Ti.UI.createLabel({
		backgroundColor : '#fff',
		color: 'red',
		height: 'auto',
		textAlign: 'left',
		left:1,
		text: notice,
		font:{fontSize:12}
	})
);
tableView.appendRow(row);
