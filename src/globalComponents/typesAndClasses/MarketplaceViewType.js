//@flow strict

type MarketplaceViewType = 
	// Component Types
	'chassis' | 'weapon' | 'scanner' | 'scannerAddon' | 'jammer' | 'treads' | 'item' | 
	
	// Tank and casus block
	'tank' | 'casusBlock' | 
	
	// Sale item
	'makeAComponentSale' | 'makeATankSale' | 'removeASale';

export type { MarketplaceViewType };