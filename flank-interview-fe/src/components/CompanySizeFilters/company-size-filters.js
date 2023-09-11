import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { companySizesMarketCap, companySizesBookValue } from './search-filters-data';
import Popover from '../Popover/index';
import Badge from '../Badge/index';
import HorizontalScrollable from '../HorizontalScrollable/index';
import './style.scss';

export const CompanySizeFilterBy = {
    MARKET_CAP: 'marketCap',
    BOOK_VALUE: 'bookValue',
};

export default function CompanySizeFilters({
    onChange,
    companySize = {
        field: CompanySizeFilterBy.MARKET_CAP,
        values: [],
    },
}) {
    /**
     * onChange is a function that takes two parameters:
     * 1. field: string which will always be `companySize.field` for the purposes of this exercise
     * 2. values: array of objects that represent the company sizes currently selected
     * 
     * This function will trigger when a new company size is selected or deselected
     * 
     * Look at ./search-filters-data to see how the company sizes (and UI pills) are structured
     */
    function onCompanySizeClick(size) {
        // 1. when there is no size, call onChange to reset the array

        // 2. find out if the parameter 'size' is already selected and remove it from the companySize.values array
        //    by passing a new array to onChange

        // 3. if the parameter 'size' is not selected, add it to the companySize.values array by creating a temporary array

        // 4. find the min and max index of the selected sizes

        // 5. loop through the array of all sizes and add the sizes between the min and max index to the new array

        // 6. sort the new array by value

        // 7. call onChange with the new array
    }

    function renderCompanySizes() {
        const data =
            companySize.field === CompanySizeFilterBy.MARKET_CAP ? companySizesMarketCap : companySizesBookValue;
        return data.map((cSize) => {
            return (
                <Badge
                    key={cSize.label}
                    label={cSize.label}
                    selected={isCompanySizeSelected(cSize.label !== 'All' ? cSize.label : undefined)}
                    onClick={() => onCompanySizeClick(cSize.label !== 'All' ? cSize : undefined)}
                />
            );
        });
    }

    function changeCompanyFilterBy(label) {
        if (label !== companySize.field) {
            onChange(label, []);
        }
    }

    const isCompanySizeSelected = useCallback(
        (label) => {
            if (!label) {
                return companySize.values.length === 0;
            }
            return companySize.values.some((c) => c.label === label);
        },
        [companySize]
    );

    return (
        <>
            <div className="company-size-header">
                <h3>Company Size</h3>
                <Popover
                    label={companySize.field === CompanySizeFilterBy.MARKET_CAP ? 'Market Cap' : 'Book Value'}
                    openLeft={true}
                    id="company-size-category"
                    actions={[
                        {
                            type: 'button',
                            label: 'Market Cap',
                            onClick: () => {
                                changeCompanyFilterBy(CompanySizeFilterBy.MARKET_CAP);
                            },
                        },
                        {
                            type: 'button',
                            label: 'Book Value',
                            onClick: () => {
                                changeCompanyFilterBy(CompanySizeFilterBy.BOOK_VALUE);
                            },
                        },
                    ]}
                />
            </div>

            <HorizontalScrollable>{renderCompanySizes()}</HorizontalScrollable>
        </>
    );
}

CompanySizeFilters.propTypes = {
    onChange: PropTypes.func,
    companySize: PropTypes.shape({
        field: PropTypes.oneOf(['marketCap', 'bookValue']),
        values: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
            })
        ),
    }),
};
