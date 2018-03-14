var socket = io.connect("http://localhost:8081");
var orders = [];

// DOM Ready =============================================================
$(document).ready(function() 
{
	getOrders();
	
	$('#orders').on('click', 'button.removeOrder', removeOrder);
});

// Functions =============================================================

socket.on("new order", function(data)
{
	var o = new Order(data);
	orders.push(o);
	populateOrders();
});

function getOrders()
{
	$.getJSON('/counter/unpaidOrders', function( data )
	{
		console.log(data);
		orders = data;
		populateOrders();
	});
}
function populateOrders()
{
	var content = '';
	$('#orders table tbody').html(content);
	var note = " ";
	for (var x = 0; x < orders.length; x++)
	{
		var order = orders[x];
		var note = " ";
		if (order.notes != null)
		{
			note = order.notes;
		}
		var total = 0;
		if (order.courses.length > 0)
		{
			content += "<tr><td><h3>Table " + order.tableNumber + "</h3></td><td></td></tr>";
			for (var y = 0; y < order.courses.length; y++)
			{
				var course = order.courses[y];
				if (course.length > 0)
				{
					content += "<tr><td>____________</td><td>____________</td></tr>";
					for (var z = 0; z < course.length; z++)
					{
						total += course[z].price;
						content += "<tr><td>" + course[z].name + "</td><td>" + course[z].price + "</td></tr>";
					}
				}
			}
			content += "<tr><td colspan=2><button class='removeOrder' x=" + x + ">Process Order: total : £" + total + "</button></td></tr>";
		}
	}
	$('#orders table tbody').html(content);
}
function removeOrder()
{
	var x = $(this).attr("x");
	// remove item from it's course
	console.log(orders[x]._id);
	$.ajax({
		type: "POST",
		url: "/counter/processOrder",
		data: {"id" : orders[x]._id},
		cache: false,
		success: function(result)
		{
			alert(result);
		}
	});
	
	orders.splice(x,1);
	populateOrders();
}