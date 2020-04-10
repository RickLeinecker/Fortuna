//@flow strict

import SaleObject from '../typesAndClasses/SaleObject.js';
import { toast } from 'react-toastify';
import getErrorFromObject from '../getErrorFromObject.js';

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
	onLoad:() => void
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
			if (response.status !== 201) {
				console.log(response.status);
				console.log(data);
				toast.error(getErrorFromObject(data));
			}
			else {
				onLoad();
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
				toast.error(getErrorFromObject(data));
			}
			else {
				const itemsForSale: Array<SaleObject> = [];
				for(const sale of data) {
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
				toast.error(getErrorFromObject(data));
			}
			else {
				const itemsForSale: Array<SaleObject> = [];
				for (const sale of data) {
					itemsForSale.push(new SaleObject(
						sale.itemId.tankName,
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

function marketSale(userId: string, sellerId: string, saleId: string, onLoad:() => void): void {
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
				toast.error(getErrorFromObject(data));
			}
			else {
				onLoad();
			}
		})
	);
}

function getUsersCurrentSales(userId:string, onLoad:() => void): void {
	const responsePromise: Promise<Response> = fetch('/api/marketplace/getUsersMarketSales/' + userId, {
		method: 'get',
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
				console.log(data.msg);
				console.log(data);
			}
			else {
				console.log(data);
				const currentListings = data;
				onLoad(currentListings);
			}
		})
	).catch(
		error => {
			toast.error('Couldnt connect to server!');
			console.log(error);
		}
	);
}

function removeASale(saleId: string): void {
	const responsePromise: Promise<Response> = fetch('/api/marketplace/removeAMarketSale/', {
		method: 'delete',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
		},
		body: JSON.stringify({ saleId:saleId }),
	});
	responsePromise.then(
		response => response.json().then(data => {
			toast.error(data.msg);
			this.getUsersCurrentSales();
		})
	).catch(
		error => {
			toast.error('Couldnt connect to server!');
			console.log(error);
		}
	);
}

export {
	makeASale,
	getMarketSales,
	getMarketTanks,
	marketSale,
	getUsersCurrentSales,
	removeASale
}
