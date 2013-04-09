var mainMenu, tab, tg;
var graphSize = Ti.Platform.displayCaps.platformWidth;
if(graphSize > 600){
	graphSize = 600;
}
if(Ti.Platform.osname == "mobileweb"){
	mainMenu = Ti.UI.createWindow({url: "mobileweb/mainMenu.js", width: graphSize});
//	var mainWindowWidth = 600;
//	Ti.App.Properties.setInt('mainWindowWidth', mainWindowWidth);
}else{
	mainMenu = Ti.UI.createWindow({url: "mainMenu.js"});
	mainMenu.hideTabBar(); // mobilewebのときはhideTabBar()が動作しないので
}
tab = Ti.UI.createTab({window: mainMenu, width: graphSize});
 
tg = Ti.UI.createTabGroup();
tg.addTab(tab);
tg.open();