var express = require('express');
var router = express.Router();
var Order = require("../public/model/Order");

/*
  GET menu  data json on /tender/menu
*/
router.get('/menu', function(req, res) {
    var db = req.db;
    var collection = db.get('menu');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.get('/tables', function(req, res)
{
	var db = req.db;
	var collection = db.get('tables');
	collection.find({},{},function(e,docs)
	{
		res.json(docs);
	});
});

router.post("/addorder", function(req, res)
{
	var db = req.db;
	var o = new Order(JSON.parse(req.body.order));
	// add to db
	var collection = db.get("orders");
	collection.insert(o, function(e)
	{
		console.log(e);
	});
});
module.exports = router;