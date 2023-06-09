const express = require('express')

const bodyParser = require('body-parser')
const app = express()
const mysql = require('mysql')
const IPAddress = 'localhost'//因为这里是要链接远程数据库，ip 地址是 mysql 的地址！！本地就是 127.0.0.1，服务器上就自己找找看
const UserName = 'root'
const PWD = 'taeyeon'
const DBName = 'articles'
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
//这上面一段固定的，[] 的部分需要根据自己数据库的信息修改//处理get请求。这里是一个 get 请求的方法演示，作用是查询 table1 表中的所有数据并返回。
app.get('/getNovel', (req, res) => { 
  var conn = mysql.createConnection({
    host:IPAddress,
    user:UserName,
    password:PWD,
    database:DBName
  });
  conn.connect();
  conn.query('select * from book_base',function(error,results,field){
    if(error) throw error;
    res.json(results);
    console.log(results)
  })
  conn.end();
})
app.get('/getThree', (req, res) => {
  var conn = mysql.createConnection({
    host: IPAddress,
    user: UserName,
    password: PWD,
    database: DBName
  });
  conn.connect();
  conn.query('select * from book_base limit 3', function (error, results, field) {
    if (error) throw error;
    res.json(results);
    console.log(results)
  })
  conn.end();
})
app.get('/getFenlei', (req, res) => {
  var conn = mysql.createConnection({
    host: IPAddress,
    user: UserName,
    password: PWD,
    database: DBName
  });
  conn.connect();
  conn.query('select sort from book_base group by sort', function (error, results, field) {
    if (error) throw error;
    res.json(results);
    console.log(results)
  })
  conn.end();
})
app.post('/getContent', (req, res) => {
  const book_id = req.body.id;
  console.log(book_id);
  var conn = mysql.createConnection({
    host: IPAddress,
    user: UserName,
    password: PWD,
    database: DBName
  });
  conn.connect();
  conn.query("select * from book_content where book_id='"+book_id+"'", function (error, results, field) {
    if (error) throw error;
    res.json(results);
    console.log(results)
  })
  conn.end();
})
app.post('/getBooks', (req, res) => {
  const sort = req.body.sort;
  console.log(sort)
  var conn = mysql.createConnection({
    host: IPAddress,
    user: UserName,
    password: PWD,
    database: DBName
  });
  conn.connect();
  conn.query("select * from book_base where sort='" + sort+"'", function (error, results, field) {
    if (error) throw error;
    res.json(results);
    console.log(results)
  })
  conn.end();
})
app.post('/getIntro', (req, res) => {
  const book_id = req.body.id;
  var conn = mysql.createConnection({
    host: IPAddress,
    user: UserName,
    password: PWD,
    database: DBName
  });
  conn.connect();
  conn.query("select * from book_base where book_id='" + book_id + "'" , function (error, results, field) {
    if (error) throw error;
    res.json(results);
    console.log(results)
  })
  conn.end();
})
app.post('/search', (req, res) => {
  const word = req.body.word;
  var conn = mysql.createConnection({
    host: IPAddress,
    user: UserName,
    password: PWD,
    database: DBName
  });
  conn.connect();
  console.log(word)
  conn.query("select * from book_base where book_name like '%" + word+"%'", function (error, results, field) {
    if (error) throw error;
    res.json(results);
    console.log(results)
  })
  conn.end();
})
app.post('/getComment', (req, res) => {
  const book_id = req.body.id;
  var conn = mysql.createConnection({
    host: IPAddress,
    user: UserName,
    password: PWD,
    database: DBName
  });
  conn.connect();
  console.log(book_id)
  conn.query("select * from book_comment where book_id ='" + book_id + "'", function (error, results, field) {
    if (error) throw error;
    res.json(results);
    console.log(results)
  })
  conn.end();
})

app.post('/write', (req, res) => {
  console.log(req);
  
  var conn = mysql.createConnection({
    host: IPAddress,
    user: UserName,
    password: PWD,
    database: DBName
  });
  conn.connect();
  var user = {
    "book_id":req.body.book_id ,
    "comment":req.body.comment ,
    "uname":req.body.uname ,
    "create_time": req.body.create_time ,
    "ulocat": req.body.ulocat,
    "uavatar": req.body.uavatar,
    "phone": req.body.phone ,

  }
  conn.query("insert into book_comment set ?",user, function (error, results, field) {
    if (error) throw error;
    res.json(results);
    console.log(results)
  })
  conn.end();
})

app.post('/insertComm', (req, res) => {
  var comm = {
    "book_name":req.body.book_name ,
    "comm":req.body.comm ,
    "time":req.body.time , 
    "uname":req.body.uname , 
    "img":req.body.img , 

  }

  var conn = mysql.createConnection({
    host: IPAddress,
    user: UserName,
    password: PWD,
    database: DBName
  });
  conn.connect();
  conn.query("insert into comm set ?",comm, function (error, results, field) {
    if (error) throw error;
    res.json(results);
    console.log(results)
  })
  conn.end();
})
app.get('/getCommunity', (req, res) => {
  var conn = mysql.createConnection({
    host: IPAddress,
    user: UserName,
    password: PWD,
    database: DBName
  });
  conn.connect();
  conn.query("select * from comm", function (error, results, field) {
    if (error) throw error;
    res.json(results);
    console.log(results)
  })
  conn.end();
})

// insert into book_comment(`book_id`,`comment`,`uname`,`create_time`,`ulocat`,`uavatar`,`phone`) values()

app.post('/download', (req, res) => {
  // 导入fs模块
  const fs = require('fs')
  // 调用fs.writeFile()方法
  const content = req.body.content;
  fs.writeFile("./第一章.txt", content, function (err) {
    // 如果err为true，则文件写入失败，并返回失败信息
    if (err) {
      return console.log('文件写入失败！' + err.message)
    }
    // 若文件写入成功，将显示“文件写入成功”
    console.log('文件写入成功！')
  })
})

app.listen(3000, () => {
  console.log('server running at http://127.0.0.1:3306')
})