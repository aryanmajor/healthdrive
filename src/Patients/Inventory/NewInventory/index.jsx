import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import styled from 'styled-components';
import axios from 'axios';

const NameField = styled(TextField)`
  width: 40%;
  margin: 2% 0% !important;
  margin-right: 2% !important;
`;

class NewPatient extends Component{
  constructor(props){
    super(props);
    this.state={
      values:{
        name: '',
        expiry: '2019-11-02',
        perQuanta: '',
        noOfQuanta: ''
      },
      submitLoading: false,
      error: false,
      errorMessage: ''
    };
  }

  handleFormChanges(field, value){
    this.setState({
      values:{
        ...this.state.values,
        [field]: value
      }
    });
  }

  handleFormSubmission(){
    this.setState({
      submitLoading: true
    });
    const data ={...this.state.values };
    axios({
      method: 'POST',
      url: '/newInventory',
      data
    }).then((response)=>{
      console.log(response);
      this.props.history.push(`/inventorys`);
    }).catch((e)=>{
      console.log(e);
      this.setState({
        submitLoading: false,
        error: true,
        errorMessage: e.message
      })
    });
  }

  render(){
    const {name, expiry, noOfQuanta, perQuanta}=this.state.values;
    const  submitDisabled = name.length<2 || expiry==='' || noOfQuanta==='' || perQuanta==='';
    return(
      <Paper style={{ padding: '2% 5%', margin: '2%', maxWidth: '60%' , textAlign: 'left' }}>
        
        <Typography variant="h6" style={{ marginBottom: '2%'}}>
          Medicine Informaton*
        </Typography>
        <TextField placeholder="Enter Medicine Name" label="Name" variant="outlined"
          onChange={(event)=> this.handleFormChanges('name', event.target.value)} value={name} fullWidth required
        />
        <NameField label="Expiry" required value={expiry} type="date" onChange={(event)=> this.handleFormChanges('expiry', event.target.value)} />
        <br />
        <NameField label="Number Of Tablets in One Leaf" required value={perQuanta} onChange={(event)=> this.handleFormChanges('perQuanta', event.target.value)} />
        <NameField label="Number Of Leaves" required value={noOfQuanta} onChange={(event)=> this.handleFormChanges('noOfQuanta', event.target.value)} />
        <Button variant="contained"
          color="secondary"
          onClick={() => this.handleFormSubmission()}
          disabled={ submitDisabled }
          style={{ minHeight: '52px', margin: '2%' , minWidth: '88px' }}
        >
          {this.state.submitLoading && (<CircularProgress color="secondary" />)}
          {!this.state.submitLoading && ("Submit")}
          
        </Button>

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
      </Paper>
    )
  }
};

export default NewPatient;