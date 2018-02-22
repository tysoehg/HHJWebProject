// model for order factory, single course order, double course order and triple course order
// order factory checks number of Course, returns relevant order object
class OrderFactory
{
	constructor()
	{
		this.getOrder = function(order, notes)
		{
			var o;
			if (order.length == 2)
			{
				o = new OrderSingle(order[0], order[1], notes);
			} 
			else if(order.length == 3)
			{
				o = new OrderDouble(order[0], order[1], order[2], notes);
			}
			else if(order.length == 4)
			{
				o = new OrderTriple(order[0], order[1], order[2], order[3], notes);
			}
			return o;
		}
	}
}

class OrderSingle
{
	//constructor (tableNumber, notes, starters, mains, deserts)
	constructor (tableNumber, firstCourse, notes)
	{
		this.tableNumber = tableNumber;
		this.firstCourse = firstCourse; 
		if (notes != null){this.notes = notes;}
	}
}
class OrderDouble
{
	//constructor (tableNumber, notes, starters, mains, deserts)
	constructor (tableNumber, firstCourse, secondCourse, notes)
	{
		this.tableNumber = tableNumber;
		this.firstCourse = firstCourse;
		this.secondCourse = secondCourse;
		if (notes != null){this.notes = notes;}
	}
}
class OrderTriple
{
	//constructor (tableNumber, notes, starters, mains, deserts)
	constructor (tableNumber, firstCourse, secondCourse, thirdCourse, notes)
	{
		this.tableNumber = tableNumber;
		this.firstCourse = firstCourse;
		this.secondCourse = secondCourse;
		this.thirdCourse = thirdCourse;
		if (notes != null){this.notes = notes;}
	}
}
var notacircus = new OrderFactory();
orders = [];

orders.push(notacircus.getOrder([3, [a,b]], "Free Of Charge"));
orders.push(notacircus.getOrder([8, [b,b], [a,b,c,]]));
orders.push(notacircus.getOrder([2, [a,b,b,c], [a,b,a,], [b,c]], "No Soy"));
