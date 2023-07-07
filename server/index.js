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

app.post("/post", (req, res) => {
    const ddate = req.body.ddate;
    const dtime = req.body.dtime;
    const duedate = ddate.concat(' ').concat(dtime).concat(':00.000');
    const createdat = new Date();
    db.query("insert into notes (name,descr,duedate,createdat,updatedat) values (?,?,?,?,?)", [req.body.name, req.body.desc, duedate, createdat, createdat], (err, data) => {
        if (err) {
            console.log(err);
        }
    })
})
app.post("/fetch", (req, res) => {
    const search = req.body.search.toLowerCase();
    db.query("select * from notes where LOWER(name) like ?", [`%${search}%`], (err, data) => {
        if (err) console.log(err);
        for (let i = 0; i < data.length; i++) {
            const created = data[i].createdat;
            let hours, minutes, seconds;
            let zero = "0";
            if (created.getHours() < 10) hours = zero.concat(created.getHours());
            else hours = created.getHours();
            if (created.getMinutes() < 10) minutes = zero.concat(created.getMinutes());
            else minutes = created.getMinutes();
            if (created.getSeconds() < 10) seconds = zero.concat(created.getSeconds());
            else seconds = created.getSeconds();
            const createdDate = " " + created.getDate() + "-" + (created.getMonth() + 1) + "-" + created.getFullYear() + " " + hours + ":" + minutes + ":" + seconds;
            data[i].createdat = createdDate;
        }
        for (let i = 0; i < data.length; i++) {
            const updated = data[i].updatedat;
            let hours, minutes, seconds;
            let zero = "0";
            if (updated.getHours() < 10) hours = zero.concat(updated.getHours());
            else hours = updated.getHours();
            if (updated.getMinutes() < 10) minutes = zero.concat(updated.getMinutes());
            else minutes = updated.getMinutes();
            if (updated.getSeconds() < 10) seconds = zero.concat(updated.getSeconds());
            else seconds = updated.getSeconds();
            const updatedDate = " " + updated.getDate() + "-" + (updated.getMonth() + 1) + "-" + updated.getFullYear() + " " + hours + ":" + minutes + ":" + seconds;
            data[i].updatedat = updatedDate;
        }
        for (let i = 0; i < data.length; i++) {
            const duedate = data[i].duedate;
            let hours, minutes, seconds;
            let zero = "0";
            if (duedate.getHours() < 10) hours = zero.concat(duedate.getHours());
            else hours = duedate.getHours();
            if (duedate.getMinutes() < 10) minutes = zero.concat(duedate.getMinutes());
            else minutes = duedate.getMinutes();
            if (duedate.getSeconds() < 10) seconds = zero.concat(duedate.getSeconds());
            else seconds = duedate.getSeconds();
            const dueDate = " " + duedate.getDate() + "-" + (duedate.getMonth() + 1) + "-" + duedate.getFullYear() + " " + hours + ":" + minutes + ":" + seconds;
            data[i].duedate = dueDate;
        }
        res.json(data);
    })
})
app.post("/delete", (req, res) => {
    db.query("delete from notes where id=?", [req.body.id], (err, data) => {
        if (err) console.log(err);
    })
    return;
})
app.post("/update", (req, res) => {
    const updatedat = new Date();
    db.query("update notes set descr=?,updatedat=? where id=?", [req.body.desc,updatedat, req.body.id], (err, data) => {
        const search = req.body.search.toLowerCase();
        db.query("select * from notes where LOWER(name) like ?", [`%${search}%`], (err, data) => {
            if (err) console.log(err);
            for (let i = 0; i < data.length; i++) {
                const created = data[i].createdat;
                let hours, minutes, seconds;
                let zero = "0";
                if (created.getHours() < 10) hours = zero.concat(created.getHours());
                else hours = created.getHours();
                if (created.getMinutes() < 10) minutes = zero.concat(created.getMinutes());
                else minutes = created.getMinutes();
                if (created.getSeconds() < 10) seconds = zero.concat(created.getSeconds());
                else seconds = created.getSeconds();
                const createdDate = " " + created.getDate() + "-" + (created.getMonth() + 1) + "-" + created.getFullYear() + " " + hours + ":" + minutes + ":" + seconds;
                data[i].createdat = createdDate;
            }
            for (let i = 0; i < data.length; i++) {
                const updated = data[i].updatedat;
                let hours, minutes, seconds;
                let zero = "0";
                if (updated.getHours() < 10) hours = zero.concat(updated.getHours());
                else hours = updated.getHours();
                if (updated.getMinutes() < 10) minutes = zero.concat(updated.getMinutes());
                else minutes = updated.getMinutes();
                if (updated.getSeconds() < 10) seconds = zero.concat(updated.getSeconds());
                else seconds = updated.getSeconds();
                const updatedDate = " " + updated.getDate() + "-" + (updated.getMonth() + 1) + "-" + updated.getFullYear() + " " + hours + ":" + minutes + ":" + seconds;
                data[i].updatedat = updatedDate;
            }
            for (let i = 0; i < data.length; i++) {
                const duedate = data[i].duedate;
                let hours, minutes, seconds;
                let zero = "0";
                if (duedate.getHours() < 10) hours = zero.concat(duedate.getHours());
                else hours = duedate.getHours();
                if (duedate.getMinutes() < 10) minutes = zero.concat(duedate.getMinutes());
                else minutes = duedate.getMinutes();
                if (duedate.getSeconds() < 10) seconds = zero.concat(duedate.getSeconds());
                else seconds = duedate.getSeconds();
                const dueDate = " " + duedate.getDate() + "-" + (duedate.getMonth() + 1) + "-" + duedate.getFullYear() + " " + hours + ":" + minutes + ":" + seconds;
                data[i].duedate = dueDate;
            }
            res.json(data);
        })
    })
})
app.listen(8800, () => {
    console.log("Connected to Backend");
})