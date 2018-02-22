// model for menu item
// dummy data defined below
class MenuItem
{
	constructor (name, price, vegetarian)
	{
		this.name = name;
		this.price = price;
		if (vegetarian)
		{
			this.vegetarian = vegetarian;
		}
	}
}

var a = new MenuItem("Chips", 7.50);
var b = new MenuItem("Soup", 9);
var c = new MenuItem("Steak", 18);
