var express = require('express');
var router = express.Router();

router.get('/unpaidOrders', function(req, res)
{
	var db = req.db;
	var collection = db.get('orders');
	collection.find({ paid: null },{},function(e,docs)
		{
			res.json(docs);
		});
});

router.post('/processOrder', function(req, res) {
    var db = req.db;
	console.log(req.body.id);
	var collection = db.get("orders");
	collection.findOneAndUpdate({_id : req.body.id}, {$set: { paid: true }}, function(e,doc)
		{
			if (e) { throw e }
			else
			{
				console.log("updated order");
				console.log(doc);
			}
		});
});

module.exports = router;