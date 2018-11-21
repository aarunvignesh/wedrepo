var express = require("express"),
    app = express(),
    path = require("path"),
    config = require("./config");

app.set("views", path.join(__dirname,"./views"));
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res){
    res.render("index");
});

app.listen(config.port, function(){
    console.log(">>> Server Started Successfully <<<");
});