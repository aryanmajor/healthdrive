import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button, Drawer, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import NewPatient from './Patients/NewPatient';
import PatientList from './Patients/PatientList';
import PatientDetail from './Patients/PatientDetails';
import NewInventory from './Inventory/NewInventory';
import InventoryList from './Inventory/InventoryList';
import styled from 'styled-components';

const LeftDrawer = styled(Drawer)`
  & > div {
    width: 250px;
    flex-shrink: 0;
    margin-top: 2%;
    background-color: #fff;
  }
  background-color: #fff;
`;


class Patient extends Component{
  render(){
    const items = [{
        name: 'New Patient',
        link: '/new-patient'
      },{
        name: 'View Patients',
        link: 'patients'
      },{
        name: 'Add To Inventory',
        link: '/new-inventory'
      }, {
        name: 'View Inventory',
        link: '/inventorys'
      }
      
    ];
    return(
      <React.Fragment>
        <AppBar position="static" color="primary" style={{ width: 'calc(100% - 250px)', marginLeft: '250px' }}>
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
        
        <LeftDrawer
            variant="permanent"
            anchor={'left'}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <div>
              <Divider />
                <List>
                  {items.map((text, index) => (
                    <Link to={text.link}>
                      <ListItem button key={text.link}>
                      
                        <ListItemText primary={text.name} />
                      </ListItem>
                    </Link>
                  ))}
                </List>
                <Divider />
            </div>
          </LeftDrawer>
        
        <div style={{ flexGrow: '1', paddingLeft: '1%', marginLeft: '250px' }}>
          <Switch>
            <Route path='/new-patient' component={NewPatient} />
            <Route path='/patient/:id' component={PatientDetail} />
            <Route path='/patients' component={PatientList} />
            <Route path='/new-inventory' component={NewInventory} />
            <Route path='/inventorys' component={InventoryList} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
};

export default Patient;