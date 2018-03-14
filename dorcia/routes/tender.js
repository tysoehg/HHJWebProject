var express = require('express');
var router = express.Router();
var Order = require("../model/Order");

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
	// add to db
	console.log("adding order");
	console.log(JSON.parse(req.body.order));
	var o = new Order(JSON.parse(req.body.order));
	var collection = db.get("orders");
	collection.insert(o, function(e)
	{
		console.log(e);
	});
});
	
/*
  DELETE to delete menu item.
 *//*
 router.delete('/deleteitem/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('menu');
    var itemToDelete = req.params.id;
    collection.remove({ '_id' : itemToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});
*/
/*
  DELETE to delete order item.
 */
router.delete('/deleteorderitem/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('menu');
    var itemToDelete = req.params.id;
    collection.remove({ '_id' : itemToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;