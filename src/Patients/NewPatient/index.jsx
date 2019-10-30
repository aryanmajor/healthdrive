import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import styled from 'styled-components';
import axios from 'axios';
import { Divider } from '@material-ui/core';

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
        age: '',
        sex: '',
        mobile: '',
        chiefComplain: '',
        symptoms: '',
        diagnosis: '',
        medicine: []
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
    const data ={...this.state.values, time: Math.floor(Date.now()/1000) };
    axios({
      method: 'POST',
      url: '/newPatient',
      data
    }).then((response)=>{
      console.log(response);
      this.props.history.push(`/patient/${response.data._id}`);
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
    const {name, age, mobile, sex, chiefComplain, symptoms, diagnosis}=this.state.values;
    const  submitDisabled = name.length<2 || age==='' || mobile.length<10 || chiefComplain.length<3 || symptoms.length<4 || diagnosis.length<4;
    return(
      <Paper style={{ padding: '2% 5%', margin: '2%', maxWidth: '60%' , textAlign: 'left' }}>
        
        <Typography variant="h6" style={{ marginBottom: '2%'}}>
          Patient Informaton*
        </Typography>
        <TextField placeholder="Enter Patient Name" label="Name" variant="outlined"
          onChange={(event)=> this.handleFormChanges('name', event.target.value)} value={name} fullWidth required
        />
        <NameField label="Age" required value={age} onChange={(event)=> this.handleFormChanges('age', event.target.value)} />
        <NameField label="Mobile Number" required value={mobile} onChange={(event)=> this.handleFormChanges('mobile', event.target.value)} />
        <Select
          label="Sex"
          value={sex}
          onChange={(event) => this.handleFormChanges('sex', event.target.value)}
        >
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
          <MenuItem value={'Other'}>Other</MenuItem>
        </Select>

        <Divider style={{ margin: '2% 0%' }} />
        
        <Typography variant="h6" style={{ marginBottom: '2%'}}>
          Patient Diagnosis*
        </Typography>

        <NameField label="Chief Complain" placeholder="Example: Cough, Fever etc." required value={chiefComplain} onChange={(event)=> this.handleFormChanges('chiefComplain', event.target.value)} />
        <TextField placeholder="Example: Fever with cough etc." label="List Symptoms" variant="outlined"
          onChange={(event)=> this.handleFormChanges('symptoms', event.target.value)} value={symptoms} 
          fullWidth required multiline rows="4"
          style={{ margin: '2% 0%' }}         
        />
        <TextField placeholder="Example: List any precautions, Next Visit" label="Diagnosis" variant="outlined"
          onChange={(event)=> this.handleFormChanges('diagnosis', event.target.value)} value={diagnosis} 
          fullWidth required multiline rows="4"
          style={{ margin: '2% 0%' }}
        />

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