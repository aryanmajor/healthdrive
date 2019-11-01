import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button, Drawer, Divider, List, ListItem, ListItemText, Icon } from '@material-ui/core';
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
    padding-top: 2%;
    background-color: #fff;
  }
  background-color: #fff;
`;


class Patient extends Component{
  render(){
    const items = [{
        name: 'New Patient',
        link: '/new-patient',
        icon: 'note_add'
      },{
        name: 'View Patients',
        link: 'patients',
        icon: 'pageview'
      },{
        name: 'Add To Inventory',
        link: '/new-inventory',
        icon: 'add_circle'
      }, {
        name: 'View Inventory',
        link: '/inventorys',
        icon: 'list_alt'
      }
      
    ];
    return(
      <React.Fragment>
        <AppBar position="static" color="primary" style={{ width: 'calc(100% - 250px)', marginLeft: '250px', color: '#fff' }}>
        <Toolbar>
            <Typography variant="h5">
              Health Drive
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
            
              <Divider color="primary" />
                <List>
                  {items.map((text, index) => (
                    <Link to={text.link} key={text.link} style={{ textDecoration: 'none', color: '#7a7a7a' }}>
                      <ListItem button>
                        <Icon fontSize="default" color="disabled" style={{ marginRight: '10px' }}>{text.icon}</Icon>
                        <ListItemText primary={text.name} />
                      </ListItem>
                    </Link>
                  ))}
                </List>
                <Divider />
            
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