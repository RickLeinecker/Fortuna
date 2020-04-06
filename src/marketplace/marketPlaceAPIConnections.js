//@flow strict

/*
	This function takes the following input
		userId: the id of the user
		sellingPrice: how much the user is asking for the bundle of items 
		itemId: the id of either the tank or the item
		itemType: either tank or component which determines what this item is 
		amountOfSellingItems: how many of these items we are selling
	This function returns the body of the sell
*/
function makeASale(userId:string, sellingPrice: number, itemId: string, itemType: string, amountOfSellingItems: number) : Promise<Response> {
	const responsePromise: Promise<Response> = fetch('/api/marketplace/addMarketSale/', {
		method: 'POST',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
		},
		body: JSON.stringify({ sellerId: userId, salePrice: sellingPrice, itemId: itemId, itemType: itemType, amount: amountOfSellingItems}),
	});
	return responsePromise;
}

/*
	This function takes the following input
		userId: the id of the user
	This function returns the promise of the users current sales
*/
function getUsersCurrentSales(userId:string) : Promise<Response> {
	console.log(userId);
	const responsePromise: Promise<Response> = fetch('/api/marketplace/getUsersMarketSales/' + userId, {
		method: 'get',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
		},
	});
	return responsePromise;
}


export {
	makeASale,
	getUsersCurrentSales,
}
