import express from 'express'
import moment from 'moment'
import mysql from 'mysql2'
import bodyParser from 'body-parser'
const app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
})
app.use(express.json());
app.use(bodyParser.json())
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "abcd1234",
    database: "notes"
})

app.post("/post",(req,res)=>{
    const ddate = req.body.ddate;
    const dtime = req.body.dtime;
    const duedate = ddate.concat(' ').concat(dtime).concat(':00.000');
    const createdat = new Date();
    db.query("insert into notes (name,descr,duedate,createdat) values (?,?,?,?)",[req.body.name,req.body.desc,duedate,createdat],(err,data)=>{
        if(err){
            console.log(err);
        }
    })
})
app.post("/fetch",(req,res)=>{
    if(req.body.search === ''){
        db.query("select * from notes",(err,data)=>{
            if(err) console.log(err);
            res.json(data);
        })
    }else{
        const search = req.body.search.toLowerCase();
        db.query("select * from notes where LOWER(name) like ?", [`%${search}%`],(err,data)=>{
            if(err) console.log(err);
            res.json(data);
        })
    }
})
app.listen(8800, () => {
    console.log("Connected to Backend");
})