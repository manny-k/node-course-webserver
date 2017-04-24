const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;

var app = express();

app.set("view engine","hbs");

hbs.registerPartials(__dirname + "/views/partials");

app.use((req, res, next) => {
	var now = new Date().toString();
	var url = req.originalUrl
	console.log(now);
	console.log(url);
	console.log(req.method);
	fs.appendFile("myDirectory", req.originalUrl + "\n", (err) => {
		if (err) {
			throw (err);
		}
		console.log("file saved :)");
	})
	next();
})

// app.use((req, res, next) => {
// 	res.render("maintenance.hbs");
// })

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
	res.render("myhome.hbs", {
		pageTitle: "Home",
		currentYear: new Date().getFullYear(),
		welcomeMessage: "Welcome to our homepage, you are brilliant. A wonderful human being indeed."
	})
});

app.get("/about", (req,res) => {
	res.render("about.hbs", {
		pageTitle: "About Page",
		currentYear: new Date().getFullYear()
	});
});

app.get("/bad", function(req,res) {
	res.send({
		errorMessage: "Daaammmmnn, an error again!!!! :("
	})
})

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});

