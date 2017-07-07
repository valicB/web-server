// CRUD - Create Read Update Delete
var config = require('./config.js');
var http = require('http');
var fs   = require('fs');
// create server
var server = http.createServer((req,res)=>{

    ////////////ROUTING///////////////////
    // action/entity/id
    var url = req.url;
    [x,action,entity,id] = url.split("/");

    var tasks = fs.readdirSync('./database/');
    // console.log(tasks);
    if(action == "create" && entity == "task"){
        // primim ID si cream un task nou
        if(id !== undefined && id.length > 0){
            console.log(id);
            var taskid = id.split('?')[0];
          if(!fs.existsSync('./database/' + taskid + '.json')){

             if(id.split('?')[1] !== undefined){
             var title = id.split('?')[1].split('&')[0];
             var description = id.split('?')[1].split('&')[1];
             var deadline = id.split('?')[1].split('&')[2];
             fs.writeFileSync('./database/' + taskid + '.json', JSON.stringify({
                                                                        id: taskid,
                                                                        "title" : title,
                                                                        "description": description,
                                                                        "deadline" : deadline
                                                                        }));
            res.write('File ' + taskid + '.json was created');
            }
        } else res.write('File ' + taskid + '.json exists' + fs.readFileSync('./database/' + taskid + '.json'));
      } else {
          // scanam baza de date ca sa cautam cel mai mare ID
          var arr = [];
          tasks.forEach(function(item){
              arr.push(number(item.split(".")[0]));

              console.log(item.split(".")[0]);
          })
        //   var maximum = Math.max(arr);
        //   console.log(maximum);
          console.log(arr);
          res.write(fs.readFileSync(`./public/create.html`));
      }
    } else if(action == "show" && entity == "task"){
        if(id !== undefined){
            console.log(id.length);
            if(fs.existsSync('./database/' + id + '.json')) res.write(fs.readFileSync('./database/' + id + '.json'));
            else res.write('404. File not found');
        } else{
            if(fs.existsSync('./database/' + id + '.json')){
              tasks.forEach(function(item) {
                fs.readFileSync('./database/' + item);
                res.write(fs.readFileSync('./database/' + item));
              });
            } else res.write('No more files found');
        }
    } else if (action == "delete" && entity == "task") {
        if (id !== undefined){
          if(fs.existsSync('./database/' + id + '.json')){
            fs.unlinkSync('./database/' + id + '.json');
            res.write('File ' + id + '.json was deleted');
          }
          else res.write('File ' + id + '.json dont exist');
        } else {
            if(tasks[0]){
              tasks.forEach(function(item) { fs.unlinkSync('./database/' + item) });
              res.write('Files was deleted');
            } else res.write('No more files found');
        }
    } else {
        res.write('404. Page not found');
    }
    /////////////////////////////////////

    res.end();
});
server.listen(config.options.port);
console.log("SERVER RUNNING PORT: " + config.options.port);
