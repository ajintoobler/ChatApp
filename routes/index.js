/*
 * GET home page.
 */
var db = require('../config/db');
// db.connect();

exports.insert = function(req, res) {
    var sender = req.param('sender');
    var reciver = req.param('recvr');
    var post = { sender: sender, reciver: reciver };
    db.query('SELECT id FROM users WHERE  (sender=? AND reciver=?) OR (sender=? AND reciver=?) ', [sender, reciver, reciver, sender], function(err, rows) {
        if (rows.length > 0) {
            res.json({ chatId: rows[0].id });
        } else {
            db.query('INSERT INTO users SET?', post, function(err, row) {
                console.log("new user added");
            });
            db.query('SELECT id FROM users WHERE  (sender=? AND reciver=?) OR (sender=? AND reciver=?) ', [sender, reciver, reciver, sender], function(err, rows) {
                if (rows.length > 0) {
                    res.json({ chatId: rows[0].id });
                }
            });


        }
    });
};

exports.insertmsg = function(data) {
    var chatId = data.chatId;
    var chatmsg = data.chatMsg;
    var sender = data.sender;
    var post = { id: chatId, message: chatmsg, sender: sender };
    db.query('INSERT INTO chatmsg SET?', post, function(err, data) {
        console.log("message is saved");
    });
};

exports.getmsg = function(req, res) {
    var chatId = req.param('chatId');
    console.log("hi" + chatId);
    db.query('SELECT sender,message FROM chatmsg WHERE id= ?', chatId, function(err, data) {
        res.json({ chatmsg: data });
    });

};
