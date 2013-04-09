function propertiesInitialize(){
	Ti.API.info('properties initializing ...');
	Ti.App.Properties.setInt('questionNumber', 0);
	var answers = new Array();
	answers[0] = 0;
	Ti.App.Properties.setList('answers', answers);
	Ti.API.info('properties initializing complete.');
}
var osname = Ti.Platform.osname;
var isios = function() {
	return osname === 'iphone' || osname === 'ipad';
};
Ti.UI.currentWindow.backgroundColor = "#fff"; 
Ti.UI.currentWindow.title = "RIASECによる適職診断";

var tableView = Ti.UI.createTableView({
	separatorColor : '#fff'
});
Ti.UI.currentWindow.add(tableView);

var row = Ti.UI.createTableViewRow({
	backgroundColor : '#fff',
    touchEnabled : false, // see here ... http://support.titanium-mobile.jp/questions/58
    selectionStyle :'none'
});
row.add(
	Ti.UI.createLabel({
		backgroundColor : '#fff',
		color: '#222',
		height: 'auto',
		textAlign: 'left',
		text: 'ジョン・L・ホランド（John L. Holland）は、キャリアカウンセリングに大きな影響を及ぼしたアメリカの心理学者です。',
		font:{fontSize:12}
	})
);
tableView.appendRow(row);

var row = Ti.UI.createTableViewRow({
	backgroundColor : '#fff',
    touchEnabled : false,
    selectionStyle :'none'
});
row.add(
	Ti.UI.createLabel({
		backgroundColor : '#fff',
		color: '#222',
		height: 'auto',
		textAlign: 'left',
		text: 'ホランドは人の基本的性格を６つのタイプに分け、その人の性格的特性と、その人が満足感を得られる職業や労働環境などとの間にどのような関係があるかを研究しました。',
		font:{fontSize:12}
	})
);
tableView.appendRow(row);

var row = Ti.UI.createTableViewRow({
	backgroundColor : '#fff',
    touchEnabled : false,
    selectionStyle :'none'
});
row.add(
	Ti.UI.createLabel({
		backgroundColor : '#fff',
		color: '#222',
		height: 'auto',
		textAlign: 'left',
		text: 'このアプリでは、簡単なアンケートで皆さんのホランド・タイプを分析することにより、適職を考えるためのきっかけを提供します。',
		font:{fontSize:12}
	})
);
tableView.appendRow(row);

var row = Ti.UI.createTableViewRow({
	backgroundColor : '#fff',
    touchEnabled : false,
    selectionStyle :'none',
    height: 100
});
if(isios){
	
}
var doitButton = Ti.UI.createButton({
	separatorColor : '#000',
	title: 'ホランドタイプをチェック(全42問)',
	height: 80,
	width: 'auto'
});
doitButton.addEventListener("click", function(){
	if(Ti.App.Properties.getInt('questionNumber') == null){
		propertiesInitialize();
	}
	if(Ti.App.Properties.getInt('questionNumber') < 43){
	    Ti.UI.currentTab.open(Ti.UI.createWindow({url: "question.js"}));
	}else{
	    Ti.UI.currentTab.open(Ti.UI.createWindow({url: "result.js"}));
	}
});
row.add(doitButton);
tableView.appendRow(row);

var row = Ti.UI.createTableViewRow({
	backgroundColor : '#fff',
    touchEnabled : false,
    selectionStyle :'none'
});
row.add(
	Ti.UI.createLabel({
		backgroundColor : '#eee',
		color: 'red',
		height: 'auto',
		textAlign: 'left',
		text: L('notice'),
		font:{fontSize:12}
	})
);
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
	propertiesInitialize();
    Ti.UI.currentTab.open(Ti.UI.createWindow({url: "question.js"}));
});
row.add(doitButton);
tableView.appendRow(row);
