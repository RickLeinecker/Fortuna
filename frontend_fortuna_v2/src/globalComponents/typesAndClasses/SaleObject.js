//@flow strict

class SaleObject {
	name: string;
	price: number;
	amount: number;
	sellerId: string;
	saleId: string;
	isCasusSale: Boolean;
	itemDesc: String;
	tankId: ?string;

	constructor(name: string, price: number, amount: number, sellerId: string, saleId: string, isCasusSale: Boolean, itemDesc: string, tankId: ?string) {
		this.name = name;
		this.price = price;
		this.amount = amount;
		this.sellerId = sellerId;
		this.saleId = saleId;
		this.isCasusSale = isCasusSale;
		this.itemDesc = itemDesc;
		this.tankId = tankId;
	}
}

export default SaleObject;