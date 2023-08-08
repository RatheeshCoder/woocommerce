/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, search } from '@wordpress/icons';
import { useContext, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './search.scss';
import { MARKETPLACE_URL } from '../constants';

const searchPlaceholder = __( 'Search extensions and themes', 'woocommerce' );

const marketplaceAPI = MARKETPLACE_URL + '/wp-json/wccom-extensions/1.0/search';

export interface SearchProps {
	locale?: string | 'en_US';
	country?: string | undefined;
}

import { ProductListContext } from '../../contexts/product-list-context';

const searchPlaceholder = __( 'Search extensions and themes', 'woocommerce' );

/**
 * Search component.
 *
 * @return {JSX.Element} Search component.
 */
function Search(): JSX.Element {
	const [ searchTerm, setSearchTerm ] = useState( '' );

	const contextData = useContext( ProductListContext );

	const runSearch = () => {
		const query = searchTerm.trim();
		if ( ! query ) {
			return [];
		}

		contextData.setSearchTerm( query );

		return [];
	};

	const handleInputChange = (
		event: React.ChangeEvent< HTMLInputElement >
	) => {
		setSearchTerm( event.target.value );
	};

	const handleKeyUp = ( event: { key: string } ) => {
		if ( event.key === 'Enter' ) {
			runSearch();
		}
		if ( event.key === 'Escape' ) {
			setSearchTerm( '' );
		}
	};

	return (
		<div className="woocommerce-marketplace__search">
			<label
				className="screen-reader-text"
				htmlFor="woocommerce-marketplace-search-query"
			>
				{ searchPlaceholder }
			</label>
			<input
				id="woocommerce-marketplace-search-query"
				value={ searchTerm }
				className="woocommerce-marketplace__search-input"
				type="search"
				name="woocommerce-marketplace-search-query"
				placeholder={ searchPlaceholder }
				onChange={ handleInputChange }
				onKeyUp={ handleKeyUp }
			/>
			<button
				id="woocommerce-marketplace-search-button"
				className="woocommerce-marketplace__search-button"
				aria-label={ __( 'Search', 'woocommerce' ) }
				onClick={ runSearch }
			>
				<Icon icon={ search } size={ 32 } />
			</button>
		</div>
	);
}

export default Search;
