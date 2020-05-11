var mysql = require('mysql');
var con = mysql.createConnection(process.env["MYSQL_CONSTR"]);

function testConnect() {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.end(function (err) { 
            if (err) throw err;
            else console.log('Done.') 
        });
    });
}

function addMessage(message) {
    con.connect(function(err) {
        if (err) throw err;
        con.query('insert into messages (message_text, message_time) values (?, current_timestamp);', [message], 
            function (err, results, fields) {
                if (err) throw err;
                console.log('Inserted ' + results.affectedRows + ' row(s).');
            })
        con.end(function (err) { 
            if (err) throw err;
            else console.log('Done.') 
        });
    });
}

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function received a request...');
    //testConnect();

    if (req.query.message || (req.body && req.body.message)) {
        var currentDate = new Date();
        var date = currentDate.getDate();
        var month = currentDate.getMonth(); 
        var year = currentDate.getFullYear();
        var date_var = year + "-" + month + "-" + date;
        // Add a message to the Storage queue,
        // which is the name passed to the function.
        context.bindings.msg = (req.query.message || req.body.message);
        addMessage(req.query.message || req.body.message);
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "[" + date_var + "]: Message Received: " + (req.query.message || req.body.message) + "..."
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a 'message' on the query string or in the request body..."
        };
    }
    context.done();
};