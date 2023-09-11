import { useState } from 'react';
import './app.scss';
import CompanySizeFilters from './components/CompanySizeFilters/company-size-filters';
import ThinTemplate from './templates/ThinTemplate/thin-template';
import { CompanySizeFilterBy } from './components/CompanySizeFilters/company-size-filters';
import ReactMarkdown from 'react-markdown';
import objective from './objective.js';

function App() {
    const [selectedFilters, setSelectedFilters] = useState({
        companySize: {
            field: CompanySizeFilterBy.MARKET_CAP,
            values: [],
        },
    });

    function updateSelectedFilters(key, value) {
        setSelectedFilters((filters) => ({
            ...filters,
            [key]: value,
        }));
    }

    return (
        <ThinTemplate instructionTitle="Front-end Interview">
            <CompanySizeFilters
                onChange={(field, values) => updateSelectedFilters('companySize', { field, values })}
                companySize={selectedFilters.companySize}
            />

            <ReactMarkdown className='markdown' children={objective} />
        </ThinTemplate>
    );
}

export default App;
