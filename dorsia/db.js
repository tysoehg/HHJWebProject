var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";
var Order = require('./public/model/Order.js');
var MenuItem = require('./public/model/MenuItem.js');

MongoClient.connect(url, function(err, db) {
	if(err) throw err;
	var dbo = db.db("restaurant");
	dbo.collection("menu").insertMany(menuItems, function(err, res) {
		if(err) throw err;
		console.log("1 document inserted");
	});
	dbo.collection("tables").insertMany(tables, function(err, res)
	{
		if (err) throw err;
		console.log("tables inserted");
	});
	dbo.collection("orders").insertMany(orders, function(err, res)
	{
		if (err) throw err;
		console.log("orders inserted");
	});
	db.close();
});


var tables = 
[
{ tableNumber: 1 },
{ tableNumber: 2 },
{ tableNumber: 3 },
{ tableNumber: 4 },
{ tableNumber: 5 },
{ tableNumber: 6 },
{ tableNumber: 7 },
{ tableNumber: 8 }
]

var menuItems = [
	new MenuItem(1,"Casu Marzu",33.00,1),
	new MenuItem(2,"Cherry  Tomato and Herb Puff Tarts",5.50,1),
	new MenuItem(3,"Butternut Squash and Sage Soufflés",6.70,1),
	new MenuItem(4,"Cucumber and Almond Soup",4.30,1),
	new MenuItem(5,"Crab Cakes",7.00,0),
	new MenuItem(6,"Whitebait and Dill Mayo",7.50,0),
	new MenuItem(7,"Chicken Wings",5.20,0),
	new MenuItem(8,"Beef and Barley Bun with Horseradish",6.40,0),
	new MenuItem(9,"Sage, Leek and Mushroom Pie",8.90,1),
	new MenuItem(10,"Mushroom Bourguingnon",10.30,1),
	new MenuItem(11,"Ultimate Veggie Lasagne",11.00,1),
	new MenuItem(12,"Middle Eastern Roasted Sprouts",9.70,1),
	new MenuItem(13,"Roast Salmon and Artichokes",13.30,0),
	new MenuItem(14,"Spanish Tortilla",9.80,0),
	new MenuItem(15,"Black Bean Burgers",11.70,0),
	new MenuItem(16,"Venison Shanks, Juniper and Redcurrants",12.50,0),
	new MenuItem(17,"Grilled Apple Pie",6.70,1),
	new MenuItem(18,"Pumpkin and Gingerbread Triffle",7.40,1),
	new MenuItem(19,"Pumpkin Pie with Pecan Crumble",6.80,1),
	new MenuItem(20,"Frozen Cranberry Cranachan",7.50,1),
	new MenuItem(21,"Blackcurrant Ombre Cheesecake",7.10,1),
	new MenuItem(22,"Apple and Date Pie",6.80,1),
	new MenuItem(23,"Squaffee Pie",6.80,1),
	new MenuItem(24,"Almond Pastry Puff",7.00,1),
	new MenuItem(25,"Beer",4.00,1),
	new MenuItem(26,"Wine",9.00,1),
	new MenuItem(27,"Cider",4.80,1),
	new MenuItem(28,"Spirits",6.00,1),
	new MenuItem(29,"Sake",6.00,1),
	new MenuItem(30,"Green Tea",2.00,1),
	new MenuItem(31,"Arrowroot Tea",2.50,1),
	new MenuItem(32,"Amazake",3.00,1)
];

var orders = 
[
new Order([1, Date.now(), [[menuItems[0],menuItems[1]],[menuItems[0],menuItems[1]],[menuItems[0],menuItems[1]]], "no soy"]),
new Order([2, Date.now(), [[menuItems[2],menuItems[2]],[menuItems[2],menuItems[2]]]])
];