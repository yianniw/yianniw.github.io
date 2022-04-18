import './App.css';
import Home from './Home';
import About from './About';
import {Route} from 'react-router-dom';
import UnderConstruction from './UnderConstruction';
import lolgress from './lolgress/lolgress';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={UnderConstruction} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/lolgress" component={lolgress} />
    </div>
  );
}

export default App;
