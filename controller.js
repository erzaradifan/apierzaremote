'use strict';

const jwt = require('jsonwebtoken')
var response = require('./res');
var connection = require('./conn');

exports.users = function(req, res) {
    connection.query('SELECT * FROM person', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            res.set('Content-Type', 'application/json');
            response.ok(rows, res)

        }
    });
};

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};

exports.findUsers = function(req, res) {
    
    var user_id = req.params.user_id;

    connection.query('SELECT * FROM person where id = ?',
    [ user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.createUsers = verifyToken, function (req, res) {
    console.log('masuk ga ya 1')
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err){
            res.sendStatus(403);
        } else {
            console.log('masuk ga y 2')
            var first_name = req.body.first_name;
            var last_name = req.body.last_name;
            connection.query('INSERT INTO person (first_name, last_name) values (?,?)',
            [ first_name, last_name ], 
            function (error, rows, fields){
                if(error){
                    console.log(error)
                } else{
                    response.ok("Berhasil menambahkan user!", res)
                }
            });  
        }
    });
};

exports.createUsersjwt = function (req, res) {
    const user = {
        id:1,
        username:'brad',
        email:'brad@gmail.com'
    }
    jwt.sign({user:user}, 'secretkey', (err,token)=> {
        res.json({
            token:token
        }); 
    });
    /*
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;

    connection.query('INSERT INTO person (first_name, last_name) values (?,?)',
    [ first_name, last_name ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan user!", res)
        }
    });*/
};

exports.updateUsers = function(req, res) {
    
    var user_id = req.body.user_id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;

    connection.query('UPDATE person SET first_name = ?, last_name = ? WHERE id = ?',
    [ first_name, last_name, user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah user!", res)
        }
    });
};

exports.deleteUsers = function(req, res) {
    
    var user_id = req.body.user_id;

    connection.query('DELETE FROM person WHERE id = ?',
    [ user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus user!", res)
        }
    });
};

function verifyToken(req, res, next){
    console.log('masuk sini')
    //get auth header value
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        console.log('bearer : ' + bearerToken)
        req.token = bearerToken;
        next();  
    }else{
        //forbidden 
        res.sendStatus(403)
    }

}

//format of the token 
//authorization : Bearer <access+token >