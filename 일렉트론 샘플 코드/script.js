
const fs = require('fs');
let dir = null;
let sqlite3 = require('sqlite3').verbose();
let isConn = false;
let db = null;

//초기화 기능
module.exports.init = function (path){
    dir = path + '/db';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    if (!fs.existsSync(dir + '/my.db')){
        fs.open(dir + '/my.db', "wx", function (err, fd) {
            fs.close(fd, function (err) { });
        });    
    }    
    console.log('dir ::: ',dir);
    db = new sqlite3.Database(dir + '/my.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Connected to the mydb database.');
            isConn = true;
            db.run('CREATE TABLE IF NOT EXISTS DASH_BOARD ( IDX INTEGER PRIMARY KEY autoincrement, NAME TEXT, DESC TEXT, DATE TEXT )',[], arg=>{
                console.log('create',arg);
            });
        }
    });    
};


//조회
module.exports.select = function (arg){
  return new Promise( (succ, fail)=>{  //Promise 사용
    if(isConn){
        try {
            if(arg == undefined || arg == null){
                arg = [];
            }
            db.all('SELECT * FROM DASH_BOARD ',arg, (err,arg)=>{  //일단 조건없이 전부 가져오는 질의문
                succ(arg); 
            });            
        } catch (error) {
            fail(error);
        }
      } 
  });
}

//등록
module.exports.insert = function (arg) {
    if (isConn) {
        db.run('INSERT INTO DASH_BOARD(NAME, DESC, DATE) VALUES(?,?,?)', [arg.NAME, arg.DESC, arg.DATE], (err, arg) => { });
    }
};

//수정
module.exports.update = function(arg){
    return new Promise((succ, fail) => {  //Promise 사용
        if (isConn) {
            try {
                db.run('UPDATE DASH_BOARD SET NAME=?, DESC=? WHERE IDX=? ', [arg.NAME, arg.DESC, arg.IDX], (err, arg) => {
                    succ(arg);
                });
            } catch (error) {
                fail(error);
            }
        }
    });
};

//삭제
module.exports.delete = function(arg){
    return new Promise((succ, fail) => {  //Promise 사용
        if (isConn) {
            try {
                db.run('DELETE FROM DASH_BOARD WHERE IDX=? ', [arg.IDX], (err, arg) => {
                    succ(arg);
                });
            } catch (error) {
                fail(error);
            }
        }
    });
};