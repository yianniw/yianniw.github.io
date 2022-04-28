import Home from './Home';
import About from './About';
import {Route} from 'react-router-dom';
import LoLgress from './lolgress/LoLgress';

function App() {
  return (
    <div>
      <Route exact path="/" component={LoLgress} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/about" component={About} />
    </div>
  );
}

export default App;
