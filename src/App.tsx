import './App.css';
import {
  Route,
  Link,
  Routes,
} from 'react-router-dom';
import NoteTypeConfigure from './components/NoteTypeConfigure/NoteTypeConfigure';
import EhrConfigObject from './components/EhrConfigObject/EhrConfigObject';

const App = () => (
  <div className="App">
    <div >
      <h1>Please choose an action</h1>
      <img style={{ height: '32px' }} src="icons/EleosWhiteBg_PoweredBy.svg"></img>
    </div>
    <div className="button-container">
      <Link to="/configure" className="btn btn-primary">Create Note Type object</Link>
      <Link to="/jquery" className="btn btn-primary">Create EHR config object</Link>
    </div>
    <Routes>
      <Route path="/configure" element={<NoteTypeConfigure />}>
      </Route>
      <Route path="/jquery" element={<EhrConfigObject/>}></Route>
    </Routes>
  </div>
);

export default App;
