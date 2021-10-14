import React, { useState } from 'react';
import Auth from './auth';
import Navbar from './component/Navbar/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Edit from './pages/Edit';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));


function App() {
  const [isLogged, setIsLogged] = useState(Auth());
  const [editId, setIEditId] = useState("");
  const classes = useStyles();

  const handleDashboard = (data) => {
    sessionStorage.setItem('user_key',data); 
    setIsLogged(Auth());  
  }

  const handleLogout = () => {
    sessionStorage.removeItem('user_key');
    setIsLogged(false);
  }

  const handleEdit=(id)=>{
    console.log(id,"=========");
    setIEditId(id);
  }
  return (
    <Router>
      <div className={classes.root}>
        <Navbar isLogged={isLogged} handleLogout={handleLogout} />

        <Switch>
        <Route exact path="/">
          {isLogged? <Dashboard isLogged={isLogged} handleEdit={handleEdit}/>:<Register handleDashboard={handleDashboard} isLogged={isLogged}/>}           
          </Route>
          <Route path="/edit">
          {isLogged? <Edit isLogged={isLogged} id={editId}/>:<Register handleDashboard={handleDashboard} isLogged={isLogged}/>}           
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
