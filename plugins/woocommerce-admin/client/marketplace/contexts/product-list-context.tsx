/**
 * External dependencies
 */
import { useState, useEffect, createContext } from '@wordpress/element';

type ProductListItemType = {
	title: string;
	image: string;
	excerpt: string;
	link: string;
	demo_url: string;
	price: string;
	hash: string;
	slug: string;
	id: number;
	rating: number | null;
	reviews_count: number | null;
	vendor_name: string;
	vendor_url: string;
	icon: string;
};

type ProductListContextType = {
	productList: ProductListItemType[];
	setSearchTerm: ( searchTerm: string ) => void;
	setCategory: ( category: string ) => void;
	isLoading: boolean;
};

export const ProductListContext = createContext< ProductListContextType >( {
	productList: [],
	setSearchTerm: () => {},
	setCategory: () => {},
	isLoading: false,
} );

type ProductListContextProviderProps = {
	children: JSX.Element;
	country?: string;
	locale?: string;
};

/**
 * Internal dependencies
 */
export function ProductListContextProvider(
	props: ProductListContextProviderProps
): JSX.Element {
	const [ isLoading, setIsLoading ] = useState( false );
	const [ searchTerm, setSearchTerm ] = useState( '' );
	const [ category, setCategory ] = useState( '' );
	const [ productList, setProductList ] = useState< ProductListItemType[] >(
		[]
	);

	const contextValue = {
		productList,
		setSearchTerm,
		setCategory,
		isLoading,
	};

	useEffect( () => {
		setIsLoading( true );
		setProductList( [] );

		// Build up a query string
		const params = new URLSearchParams();

		params.append( 'term', searchTerm );
		params.append( 'country', props.country ?? '' );
		params.append( 'locale', props.locale ?? '' );

		const wccomSearchEndpoint =
			'https://woocommerce.com/wp-json/wccom-extensions/1.0/search' +
			'?' +
			params.toString();

		// Fetch data from WCCOM API
		fetch( wccomSearchEndpoint )
			.then( ( response ) => response.json() )
			.then( ( response ) => {
				setProductList( response.products );
			} )
			.finally( () => {
				setIsLoading( false );
			} );
	}, [ searchTerm, category, props.country, props.locale ] );

	return (
		<ProductListContext.Provider value={ contextValue }>
			{ props.children }
		</ProductListContext.Provider>
	);
}
