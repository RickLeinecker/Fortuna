//@flow strict

import SaleObject from '../typesAndClasses/SaleObject.js';

/*
	This function takes the following input
		userId: the id of the user
		sellingPrice: how much the user is asking for the bundle of items 
		itemId: the id of either the tank or the item
		itemType: either tank or component which determines what this item is 
		amountOfSellingItems: how many of these items we are selling
	This function returns the body of the sell
*/
function makeASale(
	userId: string, 
	sellingPrice: number, 
	itemId: string, 
	itemType: string, 
	amountOfSellingItems: number, 
	onLoad:(success: boolean) => void
): void {
	const responsePromise: Promise<Response> = fetch('/api/marketplace/addMarketSale/', {
		method: 'POST',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
		},
		body: JSON.stringify({ sellerId: userId, salePrice: sellingPrice, itemId: itemId, itemType: itemType, amount: amountOfSellingItems}),
	});
	responsePromise.then (
		response => response.json().then(data => {
			if (response.status !== 200) {
				console.log(response.status);
				console.log(data);
				onLoad(false);
			}
			else {
				onLoad(true);
			}
		})
	);
}

function getMarketSales(userId: string, onLoad:(sales: Array<SaleObject>) => void): void {
	const  responsePromise: Promise<Response> = fetch('/api/marketplace/getMarketSales/' + userId, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
		},
	});
	responsePromise.then(
		response => response.json().then(data => {
			if (response.status !== 200) {
				console.log(response.status);
				console.log(data);
				onLoad(data);
			}
			else {
				const itemsForSaleArray: Array<SaleObject> = [];
				for(const sale of data) {
					itemsForSaleArray.push(new SaleObject(
						sale.itemId,
						sale.salePrice,
						sale.amount,
						sale.sellerId,
						sale._id
					));
				}
				onLoad(itemsForSaleArray);
			}
		})
	);
}

function getMarketTanks(userId: string, onLoad:(tanks: Array<SaleObject>) => void): void {
	const  responsePromise: Promise<Response> = fetch('/api/marketplace/getTankMarketSales/' + userId, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
		},
	});
	responsePromise.then(
		response => response.json().then(data => {
			if (response.status !== 200) {
				console.log(response.status);
				console.log(data);
				const itemsForSale: Array<SaleObject> = [];
				onLoad(itemsForSale);
			}
			else {
				const itemsForSale: Array<SaleObject> = [];
				for (const sale of data) {
					itemsForSale.push(new SaleObject(
						sale.itemId,
						sale.salePrice,
						sale.amount,
						sale.sellerId,
						sale._id
					));
				} 
				onLoad(itemsForSale);
			}
		})
	);
}

function marketSale(userId: string, sellerId: string, saleId: string, onLoad:(success: boolean) => void): void {
	const responsePromise: Promise<Response> = fetch('/api/marketplace/marketTransaction/', {
		method: 'put',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
		},
		body: JSON.stringify({ buyerId: userId, sellerId: sellerId, saleId: saleId}),
	});
	responsePromise.then(
		response => response.json().then(data => {
			if (response.status !== 201) {
				console.log(response.status);
				console.log(data);
				onLoad(false);
			}
			else {
				onLoad(true);
			}
		})
	);
}


export {
	makeASale,
	getMarketSales,
	getMarketTanks,
	marketSale
}
