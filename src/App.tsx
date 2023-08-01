import './App.css';
import { Button } from 'antd';
import { useState } from 'react';

const App = () => {
  const [elementSelectorCopyOn, setElementSelectorCopyOn] = useState(false);

  const getPathTo = (element) => {
    if (element.id !== '') return `#${element.id}`;
    if (element === document.body) return element.tagName.toLowerCase();
    const parentElement = element.parentElement;
    const siblings = Array.from(parentElement.children);
    const index = siblings.indexOf(element) + 1;
    return `${getPathTo(parentElement)} > ${element.tagName.toLowerCase()}:nth-child(${index})`;
  };
  const copyJqueryString = (event) => {
    const clickedElement = event.target;
    const cssSelector = getPathTo(clickedElement);
    const jQuerySelector = cssSelector.replace(/:hover/g, '').replace(/:/g, '\\:');
    console.log('Generated jQuery Selector: ', jQuerySelector);
  };
  const handleJqueryGeneration = () => {
    if (elementSelectorCopyOn) {
      document.addEventListener('click', copyJqueryString);
    } else {
      document.removeEventListener('click', copyJqueryString);
    }
  };

  return (
    <div className="App">
      <h1>Please choose an action</h1>
      <Button type="primary">Create Note Type object</Button>
      <Button type="primary" onClick={handleJqueryGeneration}>{elementSelectorCopyOn ? 'Generate jQuery string selector' : ' Turn off'}</Button>
    </div>
  );
};

export default App;
