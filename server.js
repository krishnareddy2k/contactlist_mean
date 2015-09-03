/**
 * Created by KrishnaReddy on 1/2/2015.
 */
var express=require('express');
var mongoJs=require('mongojs');

var bodyParser=require('body-parser');

var database=mongoJs('ContactsApp',['contacts']);
var app=express();

app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));

app.get('/contacts',function(req,res){
    database.contacts.find(function(err,doc){
    res.json(doc);
    });
});

app.delete('/contacts/:id',function(req,res){
    var id=req.params.id;
    database.contacts.remove(
        {_id:mongoJs.ObjectId(id)},
        function(err,doc){
        res.json(doc);
});
});

app.get('/contacts/:id',function(req,res){
    var id=req.params.id;
    database.contacts.findOne(
        {_id:mongoJs.ObjectId(id)},
        function(err,doc){
        res.json(doc);
});
});

app.post('/contacts',function(req,res){
    var con=req.body;
    database.contacts.insert(con,function(err,doc){
        if(err)
        return err;
        res.json(doc);
        console.log(doc);
    });
});

app.put('/contacts/:id',function(req,res){
    var id=req.params.id;
    var cName=req.body.name;
    var cEmail=req.body.email;
    var cPhone=req.body.phone;
    var cAddress=req.body.address;
    console.log('put req : '+req.body);
    database.contacts.update(
        {_id:mongoJs.ObjectId(id)},
        {$set : {name:cName,email:cEmail,phone:cPhone,address:cAddress}},
        function(err,doc){
        if(err)
        return err;
        res.json(doc);
        console.log(doc);
    });
});


app.listen(3000);
console.log('server listening on port 3000...!');
