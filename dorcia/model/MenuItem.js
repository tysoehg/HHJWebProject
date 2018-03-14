// B A C K   E N D
// model for menu item
// dummy data defined below
class MenuItem
{
	constructor (menuItemID, name, price, vegetarian)
	{
		this.id = menuItemID;
		this.name = name;
		this.price = price;
		if (vegetarian)
		{
			this.vegetarian = vegetarian;
		}
	}
}

module.exports = MenuItem;
