// menu data array for filling in info box
var menuData = [];
var order = [];
var courses = [];
var course = [];
var socket = io.connect("http://localhost:8081");

// DOM Ready =============================================================
$(document).ready(function() 
{
	populateTables();
	
	$('#buttons').on('click', 'button.selecttable', selectTable);
	$('#buttons').on('click', 'button.addCourse', addCourse);
	$('#buttons').on('click', 'button.addCourses', addCourses);
	$('#buttons').on('click', 'button.addNotes', addNotes);
	$('#buttons').on('click', 'button.finishOrder', finishOrder);
	$('#buttons').on('click', 'button.newOrder', newOrder);
	 // Delete menu item link click
    $('#menu table tbody').on('click', 'td a.linkadditem', addItem);
    $('#menu table tbody').on('click', 'td a.linkdeleteitem', deleteItem);
});

// Functions =============================================================

function populateTables()
{
	var content = '';
	
	$.getJSON('/tender/tables', function( data )
	{
		tablesData = data;
		content += "<h1>Select Table Number</h1>";
		$.each(tablesData, function()
		{
			content += '<button class="selecttable" rel="' + this.tableNumber + '">' + this.tableNumber + '</button>';
		});
		
		$('#buttons').html('');
		$('#buttons').html(content);
	});
}



// Fill table with data
function populateMenu() 
{
	$('#menu table tbody').html(' ');
	menuData = null;
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/tender/menu', function( data ) {
		
		menuData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(menuData, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.id + '</td>';
            tableContent += '<td><a href="#" class="linkadditem" rel="' + this.id + '">' + this.item + '</a></td>';
			tableContent += '<td>' + this.price + '</td>';
			tableContent += '<td>' + this.vegetarian + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteitem" rel="' + this._id + '">Select</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
		$('#menu table tbody').html(tableContent);
    });
}

function populateCourse()
{
	$('#course').html('');
	var courseString = '';
	$.each(course, function()
	{
		courseString += " - " + this.item;
	});
	$('#course').html(courseString);
}
function populateCourses()
{
	$('#courses').html('');
	var coursesString = '';
	$.each(courses, function()
	{
		$.each(this, function()
		{
			coursesString += this.item + "<br>";
		});
		coursesString += "<br>";
	});
	$('#courses').html(coursesString);
}
function populateOrder()
{
	var orderString = '';
	orderString += order[0] + "<br>";
	$.each(order[1], function()
	{
		console.log(this);
		$.each(this, function()
		{
			console.log("this");
			console.log(this);
			orderString += this.item + "<br>";
		});
		orderString += "<br>";
	});
	if (order[2] != null)
	{
		orderString += order[2];
	}
	$('#order').html(orderString);
}



function finishCourses()
{
	$('#buttons').html("<button class='addNotes'>Add Notes</button><button class='finishOrder'>Finish Order</button>");
	// clears course box
	populateCourse();
	// clears courses box
	populateCourses();
	populateOrder();
}
function selectTable()
{
	var tablenum = $(this).attr('rel');
	$('#buttons').html("<button class='addCourse'>Add Course</button><button class='addCourses'>Add Courses</button>");
	order.push(tablenum);
	$('#tablenumber').html(tablenum);
	populateMenu();
}
// Add menu item to order
function addItem(event)
{
	event.preventDefault();
	var confirmation = confirm("Add item to course?");
	if (confirmation === true)
	{
		// id == menuData[index] - 1
		var id = $(this).attr('rel');
		var item = menuData[id - 1];
		course.push(item);
		populateCourse();
	}
}
function addCourse(event)
{
	event.preventDefault();
	var confirmation = confirm("Add course to order?");
	if (confirmation === true)
	{
		courses.push(course);
		course = [];
		populateCourse();
		populateCourses();
	}
}
function addCourses(event)
{
	event.preventDefault();
	var confirmation = confirm("Add course to order?");
	if (confirmation === true)
	{
		if (course.length > 0)
		{
			courses.push(course);
			course = [];
		}
		order.push(courses);
		courses = [];
		finishCourses();
	}
}
function addNotes(event)
{
	event.preventDefault();
	var confirmation = confirm("Add course to order?");
	if (confirmation === true)
	{
		var notes = prompt("Enter Notes: ");
		if (notes != null)
		{
			order.push(notes);
		}
		populateOrder();
		$('#buttons').html("<button class='finishOrder'>Finish Order</button>");
	}
}
function finishOrder(event)
{
	event.preventDefault();
	var confirmation = confirm("Add course to order?");
	if (confirmation === true)
	{
		$('#buttons').html('<button class="newOrder">New order</button');
		populateOrder();
		console.log(order);
		// send through socket
		socket.emit("new order", order);
	}
}	
function newOrder(event)
{
	event.preventDefault();
	var confirmation = confirm("Add course to order?");
	if (confirmation === true)
	{
		// reset order creation boxes
		$('#order').html('<h2>Table Number: </h2><div id="tablenumber"></div><h2>Courses: </h2><div id="courses"></div><h2>Course: </h2><div id="course"></div><h2>Notes: </h2><div id="notes"></div>');
		order = [];
		courses = [];
		course = [];
		populateTables();
	}
}
	
// Delete menu item
function deleteItem(event) 
{
    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Delete this menu item?');

    // Check confirmation
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/tender/deleteitem/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateMenu();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

}