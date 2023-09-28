import React, { useState } from 'react';
import './app.scss';
import ThinTemplate from './templates/ThinTemplate/thin-template';
import ReactMarkdown from 'react-markdown';
import objective from './objective.js';
import rehypeRaw from 'rehype-raw';

const options = [
  { value: 'All', label: 'All' },
  { value: '$100', label: '$100' },
  { value: '$200', label: '$200' },
  { value: '$300', label: '$300' },
  { value: '$400', label: '$400' },
  { value: '$500', label: '$500' },
];

function App() {
  const [selected, setSelected] = useState([]);

  const handleButtonClick = (value) => {
    if (value === 'All') {
      setSelected(['All']);
    } else {
      if (selected.includes('All')) {
        setSelected([value]);
      } else {
        if (selected.includes(value)) {
          setSelected(selected.filter((item) => item !== value));
        } else {
          const selectedValues = selected.map((item) => parseInt(item.slice(1)));
          selectedValues.push(parseInt(value.slice(1))); // Convert value to integer
          const min = Math.min(...selectedValues);
          const max = Math.max(...selectedValues);

          // Create a range of selected items
          const range = Array.from({ length: max - min + 1 }, (_, i) => `$${min + i}`);
          setSelected(range);
        }
      }
    }
  };

  return (
    <ThinTemplate instructionTitle="Front-end Interview">
      {/* FilterSelection component */}
      <div className="options">
        {options.map((option) => (
          <button
            type="button"
            key={option.value}
            className={
              selected.includes(option.value)
                ? option.value === 'All'
                  ? 'selected all'
                  : selected.length === 1
                  ? 'selected'
                  : 'selected bidirectional-range'
                : ''
            }
            onClick={() => handleButtonClick(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <ReactMarkdown rehypePlugins={[rehypeRaw]} className="markdown" children={objective} />

      <h2>Selected State</h2>
      <pre>{JSON.stringify(selected, null, 2)}</pre>
    </ThinTemplate>
  );
}

export default App;
