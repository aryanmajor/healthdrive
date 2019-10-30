import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import NewPatient from './NewPatient';
import PatientList from './PatientList';
import PatientDetail from './PatientDetails';

class Patient extends Component{
  render(){
    return(
      <React.Fragment>
        <AppBar position="static" color="primary">
        <Toolbar>
            <Typography variant="h5">
              Responsa
            </Typography>
            <span style={{ marginLeft: 'auto' }}>
              <NavLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                <Button color="inherit">
                  <DescriptionIcon  />
                  View All
                </Button>
              </NavLink>
            </span>
          </Toolbar>
        </AppBar>
        
        <Switch>
          <Route path='/new-patient' component={NewPatient} />
          <Route path='/patient/:id' component={PatientDetail} />
          <Route path='/' component={PatientList} />
        </Switch>
      </React.Fragment>
    );
  }
};

export default Patient;