var myApps = {};
myApps.ui = {};
myApps.window = {};
myApps.window.main = require('ui/window').createMainWindow();
myApps.window.entry = require('ui/window').createEntryWindow();
myApps.tableView = require('ui/tableView');

myApps.ui.mainTable = myApps.tableView.init('tableView');
myApps.controller = require('controller/main');

(function(){
  myApps.bloggers = require('model/bloggers').data;
  myApps.ui.bloggerTable = myApps.tableView.init('bloggerTable');
  for(var i=0;i<myApps.bloggers.length;i++){
    var row = myApps.tableView.createBloggerRow(myApps.bloggers[i]);
    row.userid = myApps.bloggers[i].userid;
    row.bloggerName = myApps.bloggers[i].name;
    row.blogTitle = myApps.bloggers[i].blogTitle;
    row.addEventListener('click',function(e){
      myApps.controller.selectBlogger(e.row.userid);

      myApps.window.entry.toolBar = require('ui/toolBar').init(e.row.userid,e.row.blogTitle);

      myApps.window.entry.add(myApps.window.entry.toolBar);
      myApps.window.entry.add(myApps.ui.actInd);
      myApps.window.entry.open({
        transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
      });
    });

    myApps.ui.bloggerTable.appendRow(row,{
        animated:false
    });
  }

  myApps.window.entry.add(myApps.ui.mainTable);
  myApps.window.main.add(myApps.ui.bloggerTable);
  myApps.ui.actInd = require('ui/actInd').init();
  myApps.window.main.add(myApps.ui.actInd);
  myApps.window.main.open();


}).call(this);

