
import './App.css';
import Signup from './Components/User/Signup';
import Login from './Components/User/Login';
import {Route , Redirect} from 'react-router-dom';
import Mail from './Components/Mail/Mail';


function App() {
  return (
    <div className="App">
      <Route
        path="/" exact><Redirect to="/login"/></Route>
      <Route
        path="/signup"
        component={Signup}
      />
      <Route
        path="/login"
        component={Login}
      />
      <Route path="/mail"><Mail/></Route>
    </div>

  );
}

export default App;
