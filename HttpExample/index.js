module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request...');

    if (req.query.message || (req.body && req.body.message)) {
        var currentDate = new Date();
        var date = currentDate.getDate();
        var month = currentDate.getMonth(); 
        var year = currentDate.getFullYear();
        var date_var = year + "-" + month + "-" + date;
        // Add a message to the Storage queue,
        // which is the name passed to the function.
        context.bindings.msg = (req.query.message || req.body.message);
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "[" + date_var + "]: Message Received: " + (req.query.message || req.body.message) + ". Added to queue..."
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