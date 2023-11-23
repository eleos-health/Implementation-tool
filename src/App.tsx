import './App.css';
import {
  Route,
  Link,
  Routes,
} from 'react-router-dom';
import { MyContext } from './context/Context2';
import CollapsedNoteTypes from './components/CollapsedNoteTypes/CollapsedNoteTypes';
import EhrConfigObject from './components/EhrConfigObject/EhrConfigObject';

const App = () => (
  <div className="App">
    <div >
      <img style={{ height: '48px', paddingTop: '12px' }} src="icons/EleosWhiteBg_PoweredBy.svg"></img>
    </div>
    <div className="button-container">
      <Link to="/configure" className="btn btn-primary">Create a Note Type object</Link>
      <Link to="/jquery" className="btn btn-primary">Create an EHR config object</Link>
    </div>
    <Routes>
      <Route path="/configure" element={<CollapsedNoteTypes />}>
      </Route>
      <Route path="/jquery" element={<EhrConfigObject/>}></Route>
    </Routes>
  </div>
);

export default App;
