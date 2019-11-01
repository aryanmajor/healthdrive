import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Avatar, Snackbar} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'  ;
import axios from 'axios';
import { getTimeFromDate, NameField, Loader } from '../NewPatient/utils';

class PatientList extends Component{
  constructor(props){
    super(props);
    this.state={
      list:[],
      loadingList: false,
      searchKey: '',
      error: false,
      errorMessage: ''
    };
  }

  componentDidMount(){
    this.setState({
      loadingList: true
    });
    axios.get('/allPatient').then((response)=>{
      this.setState({
        list: response.data,
        loadingList: false 
      })
    }).catch((err)=>{
      console.log(err);
      this.setState({
        loadingList: false,
        error: true,
        errorMessage: 'Error Occurred'
      })
    });
  }

  render(){
    const {list, searchKey, loadingList}= this.state || [];
    return(
      <React.Fragment>
        <Paper style={{ padding: '1% 1%', margin: '2%', maxWidth: '60%' , textAlign: 'left' }}>
          <div>
            <NameField placeholder="Search..." variant="outlined" onChange={(event)=>{
              this.setState({
                searchKey: event.target.value
              })
            }} />
          </div>
          {loadingList && (
          <div style={{ paddingLeft: '45%' }}>
            <Loader />
          </div>
        )}
        {!loadingList && (
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell></TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Sex</TableCell>
                  <TableCell align="center">Age</TableCell>
                  <TableCell align="center">Doctor</TableCell>
                  <TableCell align="center">Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map(patient => {
                  if(patient.name.toLowerCase().indexOf(searchKey.toLowerCase())>-1){
                    return(
                      <TableRow hover key={patient._id} onClick={() => this.props.history.push(`/patient/${patient._id}`)} >
                        <TableCell  scope="row" style={{ paddingRight: '0' }}>
                          <Avatar style={{ color: '8a8a8a', margin: '0' }}>{patient.name[0].toUpperCase()}</Avatar>
                        </TableCell>
                        <TableCell align="left" scope="row">
                          {patient.name}
                        </TableCell>
                        <TableCell align="center">{patient.sex}</TableCell>
                        <TableCell align="center">{patient.age}</TableCell>
                        <TableCell align="center">{patient.doctor}</TableCell>
                        <TableCell align="center">{getTimeFromDate(patient.time*1000)}</TableCell>
                      </TableRow>
                    )}
                  }
                )}
              </TableBody>
          </Table>
        )}
        </Paper>
      
        <Link to={'/new-patient'}>
          <Fab aria-label="add" color="secondary" style={{ position: 'fixed', bottom: '3%', left: '75%' }}>
            <AddIcon />
          </Fab>
        </Link>
        <Snackbar
          open={this.state.error}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          message={this.state.errorMessage}
          variant="error"
          onClose={()=> {
            this.setState({
              error: false
            })
          }}
          autoHideDuration={5000}
        />
        </React.Fragment>
    )
  }
};

export default PatientList;