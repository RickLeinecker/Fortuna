//@flow strict
import * as React from 'react';

class CannonsViews extends React.Component<{||}> {
    constructor() {
		super();
		this.getMarketSales();
	}

    getMarketSales = async ():Promise<void> => {
		const response = await fetch('/api/marketplace/getMarketSales/', {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
			},
		});
        const body = await response.text();
        console.log(body);
	};
    

    render() { 
        return (
            <h1>This is the Cannons View</h1>
        );
    }
}

export default CannonsViews;