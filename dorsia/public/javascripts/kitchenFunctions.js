var socket = io.connect("http://localhost:8081");
var orders = [];

// DOM Ready =============================================================
$(document).ready(function() 
{
	getOrders();
	
	$('#orders').on('click', 'button.removeItem', removeItem);
	tick();
});

// Functions =============================================================

socket.on("new order", function(data)
{
	console.log("new order");
	var o = new Order(data);
	orders.push(o);
	populateOrders();
});

function tick()
{
	setTimeout(function() 
	{
		requestAnimationFrame(tick);
		populateOrders();
	}, 250);
}

function formatTime(timestamp)
{
	var date = new Date(timestamp);
	// Hours part from the timestamp
	var hours = date.getHours();
	// Minutes part from the timestamp
	var minutes = "0" + date.getMinutes();
	// Seconds part from the timestamp
	var seconds = "0" + date.getSeconds();

	// Will display time in 10:30:23 format
	var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	return formattedTime;
}

function getOrders()
{
	$.getJSON('/kitchen/orders', function( data )
	{
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
		var now = Date.now();
		var timepassed = now - order.timestamp;
		var elapsed = formatTime(timepassed);
		var note = " ";
		if (order.notes != null)
		{
			note = order.notes;
		}
		if (order.courses.length > 0)
		{
			content += "<tr><td><h3>Table " + order.tableNumber + "</h3></td><td>" + note + "</td></tr>";
			content += "<tr><td colspan=2>Time Since Order: " + elapsed + "</td></tr>";
			for (var y = 0; y < order.courses.length; y++)
			{
				var course = order.courses[y];
				if (course.length > 0)
				{
					content += "<tr><td>____________</td><td>____________</td></tr>";
					for (var z = 0; z < course.length; z++)
					{
						content += "<tr><td>" + course[z].name + "</td><td><button class='removeItem' x=" + x + " y=" + y + " z=" + z + ">x</button></td></tr>";
					}
				}
			}
		}
	}
	$('#orders table tbody').html(content);
}
function removeItem()
{
	var x = $(this).attr("x");
	var y = $(this).attr("y");
	var z = $(this).attr("z");
	// remove item from it's course
	orders[x].courses[y].splice(z,1);
	if (orders[x].courses[y].lenght < 1)
	{
		orders[x].courses.splice(y, 1);
	}
	populateOrders();
}