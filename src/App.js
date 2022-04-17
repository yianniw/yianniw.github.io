import './App.css';
import Home from './Home';
import About from './About';
import {Route, Link} from 'react-router-dom';
import UnderConstruction from './UnderConstruction';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={UnderConstruction} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/about" component={About} />
    </div>
  );
}

export default App;
