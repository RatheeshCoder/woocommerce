export default {
	$schema: 'https://schemas.wp.org/trunk/block.json',
	apiVersion: 2,
	name: 'woocommerce/product-section',
	title: 'Product section',
	category: 'widgets',
	description: 'A product section containing a group of related fields.',
	keywords: [ 'products', 'section' ],
	textdomain: 'default',
	attributes: {
		description: {
			type: 'string',
		},
		title: {
			type: 'string',
		},
		productId: {
			type: 'number',
		},
	},
	supports: {
		align: false,
		html: false,
		multiple: false,
		reusable: false,
		inserter: false,
		lock: false,
	},
	// @todo This could be moved into a parent block if we create one.
	providesContext: {
		productId: 'productId',
	},
};