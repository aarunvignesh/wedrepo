var express = require("express"),
    app = express(),
    path = require("path"),
    AWS = require('aws-sdk'),
    config = require("./config"),
    body = require("body-parser"),
    email = require("./services/email");

// Set the region 
AWS.config.update({region: 'us-east-1', accessKeyId: config.aws.accessKey, secretAccessKey:config.aws.secretKey});

app.use(body.urlencoded({extended: true}));
app.use(body.json());
app.set("views", path.join(__dirname,"./views"));
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res){
    res.render("index");
});
app.post("/rsvp",function(req, res){
    email.formatEnquiryMail(req.body).compile().build((err, mail)=>{
        var sendPromise = new AWS.SES({
            accessKeyId: config.aws.accessKey, 
            secretAccessKey:config.aws.secretKey,
            region: "us-east-1",
            apiVersion: '2010-12-01'
        })
        .sendRawEmail({RawMessage: {Data: mail}})
        .promise();

          sendPromise.then(
            function(data) {
                console.log(data);
                res.json({code:200, msg:"Sent successfully..."});
            }).catch(
                function(err) {
                console.error(err, err.stack);
                res.status(500).json({code:500, msg:"Something went wrong..."});
            });
        });
});

app.listen(config.port, function(){
    console.log(">>> Server Started Successfully <<<");
});