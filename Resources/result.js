var html1 = '<!doctype html><html lang="ja"><head><title>Radar Chart</title><script src="./Chart.js"></script><meta charset="UTF-8"><meta name = "viewport" content = "initial-scale = 1, user-scalable = no"><style>canvas{}</style></head><body><canvas id="canvas" height="450" width="450"></canvas><script>var radarChartData = {labels : ["現実的","研究的","芸術的","社会的","企業的","慣習的"],datasets : [{fillColor : "rgba(151,187,205,0.5)",strokeColor : "rgba(151,187,205,1)",pointColor : "rgba(151,187,205,1)",pointStrokeColor : "#fff",data : [';
var html2 = ']}]}var myRadar = new Chart(document.getElementById("canvas").getContext("2d")).Radar(radarChartData,{scaleShowLabels : false, pointLabelFontSize : 10});	</script></body></html>';
var answers = new Array();
answers = Ti.App.Properties.getList('answers');
var riasecA = ['','E','C','I','I','I','E','C','E','S','R',
	'E','A','I','E','R','A','I','E','S','I',
	'C','R','S','E','A','I','I','R','E','A',
	'E','C','I','E','S','C','E','A','R','S',
	'E','C'];
var riasecB = ['','S','A','R','S','A','R','S','I','R','A',
	'C','S','C','S','C','E','R','C','A','E',
	'S','A','R','A','S','C','A','C','R','C',
	'S','R','R','I','I','A','R','S','A','C',
	'I','I'];
var result = {R:0,I:0,A:0,S:0,E:0,C:0};
for(var i=0; i != answers.length; i++){
	var reasec = new Array();
	if(answers[i] == 1){
		reasec = riasecA;
	}else{
		reasec = riasecB;
	}
	for(var key in result){
//		Ti.API.info('key: ', key);
//		Ti.API.info('answers[i]: ', answers[i]);
		if(reasec[i] == key){
//			Ti.API.info('result[key]: ', result[key]);
			result[key] += 1;
		}
	}
}
var riasecText = 'R:' + result['R']
				+ ' I:' + result['I']
				+ ' A:' + result['A']
				+ ' S:' + result['S']
				+ ' E:' + result['E']
				+ ' C:' + result['C'];

Ti.UI.currentWindow.backgroundColor = "#fff";
var tableView = Ti.UI.createTableView({
	separatorColor : '#fff'
});
Ti.UI.currentWindow.add(tableView);

// riasecText
var row = Ti.UI.createTableViewRow({});
row.add(
	Ti.UI.createLabel({
		text: riasecText
	})
);
tableView.appendRow(row);

// graph
var webview = Ti.UI.createWebView();
var graphSize = Ti.Platform.displayCaps.platformWidth;
if(graphSize > 600){
	graphSize = 600;
}
var resultUrl = "http://www.july.co.jp/~mz/tmp/result.html?w="+graphSize
	+"&R="+result['R']
	+"&I="+result['I']
	+"&A="+result['A']
	+"&S="+result['S']
	+"&E="+result['E']
	+"&C="+result['C'];
Ti.API.info('URL: ', resultUrl);
webview.url = resultUrl;
//webview.url = "http://www.july.co.jp/";
var row = Ti.UI.createTableViewRow({height: graphSize});
row.add(webview);
tableView.appendRow(row);

// reset
var row = Ti.UI.createTableViewRow({
	backgroundColor : '#fff',
    touchEnabled : false,
    selectionStyle :'none'
});
var doitButton = Ti.UI.createButton({
	separatorColor : '#000',
	title: 'リセット',
	font:{fontSize:9},
	width: 'auto'
});
doitButton.addEventListener("click", function(){
	Ti.API.info('properties initializing ...');
	Ti.App.Properties.setInt('questionNumber', 0);
	var answers = new Array();
	answers[0] = 0;
	Ti.App.Properties.setList('answers', answers);
	Ti.API.info('properties initializing complete.');
	Ti.UI.currentTab.open(Ti.UI.createWindow({url: "question.js"}));
});
row.add(doitButton);
tableView.appendRow(row);
