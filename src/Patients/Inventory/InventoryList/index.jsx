import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'  ;
import axios from 'axios';

class PatientList extends Component{
  constructor(props){
    super(props);
    this.state={
      list:[]
    };
  }

  componentDidMount(){
    axios.get('/allInventory').then((response)=>{
      this.setState({
        list: response.data
      })
    }).catch((err)=>{
      console.log(err);
    });
  }

  render(){
    const {list}= this.state || [];
    return(
      <React.Fragment>
        <Paper style={{ padding: '1% 1%', margin: '2%', maxWidth: '60%' , textAlign: 'left' }}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Expiry</TableCell>
              <TableCell align="center">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(inventory => (
              <TableRow key={inventory._id}>
                <TableCell component="th" scope="row">
                  {inventory.name}
                </TableCell>
                <TableCell align="center">{new Date(inventory.expiry).toDateString()}</TableCell>
                <TableCell align="center">{inventory.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
        </Paper>
        <Link to={'/new-inventory'}>
          <Fab aria-label="add" color="secondary" style={{ position: 'fixed', bottom: '3%', left: '75%' }}>
            <AddIcon />
          </Fab>
        </Link>
      </React.Fragment>
    );
  }
};

export default PatientList;