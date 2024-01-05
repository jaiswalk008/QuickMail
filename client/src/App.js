
import './App.css';
import Signup from './Components/User/Signup';
import {Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route
        path="/signup"
        component={Signup}
      />
    </div>

  );
}

export default App;
