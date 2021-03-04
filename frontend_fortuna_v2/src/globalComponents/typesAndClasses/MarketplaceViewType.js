//@flow strict

type MarketplaceViewType = 
	// Component Types
	'chassis' | 'weapon' | 'scanner' | 'scannerAddon' | 'jammer' | 'treads' | 'item'
	
	// Tank and casus block
	'tank' | 'casusBlock' | 'casusCode'
	
	// Sale item
	'makeAComponentSale' | 'makeATankSale' | 'removeASale' | 'makeCasusCodeSale';

export type { MarketplaceViewType };