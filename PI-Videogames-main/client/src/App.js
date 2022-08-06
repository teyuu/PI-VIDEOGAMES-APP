import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './components/landingPage/LandingPage'
import Home from './components/home/Home';
import FormCreate from './components/form/FormCreate'
import Details from './components/detail/Details';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route  path='/home' component={Home}/>
        <Route  path='/createGame' component={FormCreate}/>
        <Route  path='/videogame/:id' component={Details} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
