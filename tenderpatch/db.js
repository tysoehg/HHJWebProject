var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";

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
	//Starter veg
	{ "id": 1, 
	"item": "Pear and Blue Cheese Tarts", 
	"price":5.00, 
	"course":"starter", 
	"vegetarian":1
	},
	{ "id": 2, 
	"item": "Cherry Tomato and Herb Puff Tarts", 
	"price":5.50, 
	"course":"starter",
	"vegetarian":1
	},
	{ "id": 3, 
	"item": "Butternut Squash and Sage Soufflés", 
	"price":6.70,
	"course":"starter", 
	"vegetarian":1
	},
	{ "id": 4, 
	"item": "Cucumber and Almond Soup",
	"price":4.30,
	"course":"starter", 
	"vegetarian":1
	},
	//Starter nonveg
	{ "id": 5,
	"item": "Crab Cakes",
	"price":7.00,
	"course":"starter", 
	"vegetarian":0
	},
	{ "id": 6, 
	"item": "Whitebait and Dill Mayo", 
	"price":7.50, 
	"course":"starter",
	"vegetarian":0
	},
	{ "id": 7, 
	"item": "Chicken Wings",
	"price":5.20,
	"course":"starter",
	"vegetarian":0
	},
	{ "id": 8,
	"item": "Beef and Barley Bun with Horseradish",
	"price":6.40, 
	"course":"starter",
	"vegetarian":0
	},	
	//main veg
	{ "id": 9,
	"item": "Sage, Leek and Mushroom Pie",
	"price":8.90,
	"course":"main",
	"vegetarian":1
	},
	{ "id": 10,
	"item": "Mushroom Bourguingnon",
	"price":10.30,
	"course":"main", 
	"vegetarian":1
	},
	{ "id": 11, 
	"item": "Ultimate Veggie Lasagne",
	"price":11.00, 
	"course":"main",
	"vegetarian":1
	},
	{ "id": 12,
	"item": "Middle Eastern Roasted Sprouts", 
	"price":9.70,
	"course":"main",
	"vegetarian":1
	},	
	//main nonveg
	{ "id": 13, 
	"item": "Roast Salmon and Artichokes", 
	"price":13.30,
	"course":"main", 
	"vegetarian":0
	},
	{ "id": 14,
	"item": "Spanish Tortilla",
	"price":9.80,
	"course":"main",
	"vegetarian":0
	},
	{ "id": 15,
	"item": "Black Bean Burgers",
	"price":11.70,
	"course":"main", 
	"vegetarian":0
	},
	{ "id": 16,
	"item": "Venison Shanks, Juniper and Redcurrants", 
	"price":11.50,
	"course":"main",
	"vegetarian":0
	},
	//dessert
	{ "id": 17,
	"item": "Grilled Apple Pie",
	"price":6.70,
	"course":"dessert",
	"vegetarian":1
	},
	{ "id": 18,
	"item": "Pumpkin and Gingerbread Trifle",
	"price":7.40, 
	"course":"dessert",
	"vegetarian":1
	},
	{ "id": 19,
	"item": "Pumpkin Pie with Pecan Crumble",
	"price":6.80, 
	"course":"dessert",
	"vegetarian":1
	},
	{ "id": 20,
	"item": "Frozen Cranberry Cranachan",
	"price":7.50, 
	"course":"dessert",
	"vegetarian":1
	},
	{ "id": 21,
	"item": "Blackcurrant Ombre Cheesecake",
	"price":7.10, 
	"course":"dessert", 
	"vegetarian":1
	},
	{ "id": 22,
	"item": "Apple and Date Pie",
	"price":6.80, 
	"course":"dessert", 
	"vegetarian":1
	},
	{ "id": 23,
	"item": "Squaffee Pie",
	"price":6.80,
	"course":"dessert",
	"vegetarian":1
	},
	{ "id": 24,
	"item": "Almond Pastry Puff",
	"price":7.00,
	"course":"dessert",
	"vegetarian":1
	},	
	//drinks
	{ "id": 25,
	"item": "Beer", 
	"price":3.20, 
	"course":"drink",
	"vegetarian":1
	},
	{ "id": 26, 
	"item": "Wine",
	"price":4.10, 
	"course":"drink",
	"vegetarian":1
	},
	{ "id": 27,
	"item": "Cider",
	"price":2.70,
	"course":"drink",
	"vegetarian":1
	},
	{ "id": 28, 
	"item": "Spirits",
	"price":4.60, 
	"course":"drink", 
	"vegetarian":1
	},
	{ "id": 29, 
	"item": "Water",
	"price":1.50, 
	"course":"drink",
	"vegetarian":1
	},
	{ "id": 30,
	"item": "Orange Juice",
	"price":2.00, 
	"course":"drink",
	"vegetarian":1
	},
	{ "id":31, 
	"item": "Coke", 
	"price":2.30, 
	"course":"drink",
	"vegetarian":1
	},
	{ "id": 32,
	"item": "Fanta",
	"price":2.30, 
	"course":"drink",
	"vegetarian":1
	}
	]