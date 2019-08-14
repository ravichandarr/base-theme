/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ExpandableContent from 'Component/ExpandableContent';
import Overlay from 'Component/Overlay';
import Swatch from 'Component/Swatch';
import RangeSelector from 'Component/RangeSelector';
import './CategoryFilterOverlay.style';

class CategoryFilterOverlay extends PureComponent {
    renderPriceRange() {
        const {
            updatePriceRange,
            priceValue,
            minPriceValue,
            maxPriceValue
        } = this.props;

        const { min, max } = priceValue;

        return (
            <ExpandableContent
              heading="Price"
              subHeading={ `From: ${min} to ${max}` }
              mix={ {
                  block: 'CategoryFilterOverlay',
                  elem: 'Filter',
                  mods: { type: 'price' }
              } }
            >
                <RangeSelector
                  value={ priceValue }
                  minValue={ minPriceValue }
                  maxValue={ maxPriceValue }
                  onChangeComplete={ updatePriceRange }
                />
            </ExpandableContent>
        );
    }

    renderFilterItems(filter) {
        const { toggleCustomFilter, getAppliedFilterItems } = this.props;
        const { request_var, filter_items } = filter;
        const appliedFilters = getAppliedFilterItems(filter);

        return filter_items.map((filterItem) => {
            const { value_string } = filterItem;

            return (
                <li key={ value_string }>
                    <Swatch
                      mix={ { block: 'CategoryFilterOverlay', elem: 'Item' } }
                      filterItem={ filterItem }
                      requestVar={ request_var }
                      isSelected={ appliedFilters.indexOf(value_string) !== -1 }
                      onClick={ () => toggleCustomFilter(request_var, value_string) }
                    />
                </li>
            );
        });
    }

    renderFilter(filter) {
        const { getAppliedFilterItemsString } = this.props;
        const { name, request_var: requestVar } = filter;
        const appliedFilterItemsString = getAppliedFilterItemsString(filter);

        return (
            <ExpandableContent
              key={ requestVar }
              heading={ name }
              subHeading={ appliedFilterItemsString }
              mix={ {
                  block: 'CategoryFilterOverlay',
                  elem: 'Filter',
                  mods: { type: requestVar }
              } }
            >
                <ul block="CategoryFilterOverlay" elem="ItemList" mods={ { type: requestVar } }>
                    { this.renderFilterItems(filter) }
                </ul>
            </ExpandableContent>
        );
    }

    renderFilters() {
        const { availableFilters } = this.props;
        return availableFilters.map(filter => this.renderFilter(filter));
    }

    renderSeeResults() {
        const { onSeeResultsClick } = this.props;

        return (
            <button
              block="CategoryFilterOverlay"
              elem="SeeResults"
              mix={ { block: 'Button' } }
              onClick={ onSeeResultsClick }
            >
                { __('SEE RESULTS') }
            </button>
        );
    }

    renderHeading() {
        return (
            <h2 block="CategoryFilterOverlay" elem="Heading">
                { __('Shopping Options') }
            </h2>
        );
    }

    render() {
        return (
            <Overlay mix={ { block: 'CategoryFilterOverlay' } } id="category-filter">
                { this.renderHeading() }
                { this.renderFilters() }
                { this.renderPriceRange() }
                { this.renderSeeResults() }
            </Overlay>
        );
    }
}

CategoryFilterOverlay.propTypes = {
    availableFilters: PropTypes.arrayOf(PropTypes.shape).isRequired,
    updatePriceRange: PropTypes.func.isRequired,
    priceValue: PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number
    }).isRequired,
    minPriceValue: PropTypes.number.isRequired,
    maxPriceValue: PropTypes.number.isRequired,
    onSeeResultsClick: PropTypes.func.isRequired,
    getAppliedFilterItemsString: PropTypes.func.isRequired,
    getAppliedFilterItems: PropTypes.func.isRequired,
    toggleCustomFilter: PropTypes.func.isRequired
};

export default CategoryFilterOverlay;
