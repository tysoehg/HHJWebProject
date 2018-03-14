class Order
{
	constructor(order)
	{
		this.tableNumber = order[0];
		this.timestamp = order[1];
		this.courses = order[2];
		this.notes = order[3];
	}
}
module.exports = Order;
