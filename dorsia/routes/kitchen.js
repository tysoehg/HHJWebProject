var express = require('express');
var router = express.Router();
var Order = require("../public/model/Order");

router.get('/orders', function(req, res)
{
	console.log("retrieving orders");
	var db = req.db;
	var collection = db.get('orders');
	collection.find({},{},function(e,docs)
	{
		console.log(docs);
		res.json(docs);
	});
});
/*
router.delete('/deleteorderitem/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('menu');
    var itemToDelete = req.params.id;
    collection.remove({ '_id' : itemToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});
*/
module.exports = router;