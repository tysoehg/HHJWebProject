class KitchenView 
{
	constructor(openOrders, out)
	{
		this.openOrders = openOrders;
		this.out = out;
		var orderHeading = "<tr><th>Table Number</th><th>notes</td></tr>";
		
		var displayCourse = function(course)
		{
			for (var n = 0; n < course.length; n ++)
			{
				out.innerHTML = out.innerHTML 
				+ "<tr><td>" 
				+ course[n].name 
				+ "</td><td><button " + ">" 
				+ "del "
				+ "</button></td></tr>";
			}
		}
		
		this.displayAllOrders = function()
		{
			for (var i = 0; i < openOrders.length; i ++) // per order
			{
				var order = openOrders[i];
				var tableNumber = order.tableNumber;
				
				if (order.notes != null)
				{
					var notes = order.notes;
				}
				else 
				{
					var notes = " ";
				}
				
				out.innerHTML = out.innerHTML 
				+ orderHeading 
				+ "<tr><td>" 
				+ tableNumber 
				+ "</td><td>" 
				+ order.notes 
				+ "</td></tr>"; 
				
				if (order.firstCourse != null)
				{
					out.innerHTML = out.innerHTML + "<tr>1</tr>";
					displayCourse(order.firstCourse);
				}
				if (order.secondCourse != null)
				{
					out.innerHTML = out.innerHTML + "<tr>2</tr>";
					displayCourse(order.secondCourse);
				}
				if (order.thirdCourse != null)
				{
					out.innerHTML = out.innerHTML + "<tr>3</tr>";
					displayCourse(order.thirdCourse);
				}
				out.innerHTML = out.innerHTML + "<tr>___________________</tr>";	
			}
		}
	}
}
var kv = new KitchenView(orders, output);
kv.displayAllOrders();

