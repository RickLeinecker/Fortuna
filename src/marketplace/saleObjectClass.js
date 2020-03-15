//@flow strict
class saleObject {
	name:string;
	price: number;
	amount: number;
	sellerId: string;
	saleId: string;
	constructor(name: string, price: number, amount: number, sellerId: string, saleId: string) {
		this.name = name;
		this.price = price;
		this.amount = amount;
		this.sellerId = sellerId;
		this.saleId = saleId;
	}
}

export default saleObject;