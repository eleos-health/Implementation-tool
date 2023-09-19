import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link, Routes,
} from 'react-router-dom';
import NoteTypeConfigure from './components/NoteTypeConfigure/NoteTypeConfigure';
import JqueryGenerator from './components/JqueryGenerator/JqueryGenerator';

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
      document.removeEventListener('click', copyJqueryString);
      setElementSelectorCopyOn(false);
    } else {
      document.addEventListener('click', copyJqueryString);
      setElementSelectorCopyOn(true);
    }
  };

  return (
    <Router>
      <div className="App">
        <div >
          <h1>Please choose an action</h1>
          <img style={{ height: '32px' }} src="icons/EleosWhiteBg_PoweredBy.svg"></img>
        </div>
        <div className="button-container">
          <Link to="/configure" className="btn btn-primary">Create Note Type object</Link>
          <Link to="/jquery" className="btn btn-primary">Generate jQuery string selector</Link>
        </div>

        {/* <Button type="primary">Create Note Type object</Button> */}
        {/* <Button type="primary" onClick={handleJqueryGeneration}>{!elementSelectorCopyOn? 'Generate jQuery string selector' : ' Turn off'}</Button> */}
        <Routes>
          <Route path="/configure" element={<NoteTypeConfigure />}>

          </Route>
          <Route path="/jquery" element={<JqueryGenerator/>}></Route>
        </Routes>
      </div>
    </Router>

  );
};

export default App;
