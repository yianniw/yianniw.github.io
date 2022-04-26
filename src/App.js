import Home from './Home';
import About from './About';
import {Route} from 'react-router-dom';
import UnderConstruction from './UnderConstruction';
import LoLgress from './lolgress/LoLgress';

function App() {
  return (
    <div>
      <Route exact path="/" component={UnderConstruction} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/LoLgress" component={LoLgress} />
    </div>
  );
}

export default App;
