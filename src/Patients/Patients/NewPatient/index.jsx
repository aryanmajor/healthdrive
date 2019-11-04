import React, { Component } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import { Divider } from '@material-ui/core';
import { NameField, Loader } from './utils';


class NewPatient extends Component{
  constructor(props){
    super(props);
    this.state={
      values:{
        name: '',
        age: 0,
        sex: '',
        doctor: '',
        address: '',
        mobile: 0,
        chiefComplain: '',
        symptoms: '',
        diagnosis: '',
        medicine: [{
          name: '',
          days: '',
          dose: '',
          id: ''
        }]
      },
      inventory:[],
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

  changeMedicineInput(index,key,value){
    const { medicine }=this.state.values;
    medicine[index][key]=value;
    if(key==='name'){
      const i=this.state.inventory.findIndex((med)=> (med.name===value));
      if(i>=0){
        medicine[index].id=this.state.inventory[i]._id;
      }
    }
    this.setState((prevState) => {
      return({
        ...prevState,
        values: {
          ...prevState.values,
          medicine
        }
      })
    }, () => {
      console.log(this.state.values);
    });
  }

  renderMedicineArea(){
    const { inventory } = this.state || [];
    const { medicine } = this.state.values || [];
    const medicineForm = medicine.map((med, index)=>{
      return (
        <React.Fragment key={index}>
        <Autocomplete
          options={inventory}
          getOptionLabel={option => option.name}
          autoComplete={true}
          style={{ width: 300 }}
          onBlur={(event)=> this.changeMedicineInput(index, 'name', event.target.value)}
          renderInput={params => (
            <TextField {...params} variant="outlined" fullWidth />
          )}
        />
        <NameField label="Dose" required value={med.dose} onChange={(event)=> this.changeMedicineInput(index, 'dose', event.target.value)} />
        <NameField label="Days" required value={med.days} onChange={(event)=> this.changeMedicineInput(index, 'days', event.target.value)} />
      </React.Fragment>
      );
    });
    return medicineForm;
  }

  handleFormSubmission(){
    this.setState({
      submitLoading: true
    });
    const medicine = this.state.values.medicine.filter((med) => med.id!=='' && med.id!==null);
    const data ={...this.state.values, medicine, time: Math.floor(Date.now()/1000) };
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

  componentDidMount(){
    axios.get('/allInventory')
    .then((response)=>{
      console.log(response);
      this.setState({
        inventory: response.data
      });
    })
    .catch((err) => {
      this.setState({
        submitLoading: false,
        error: true,
        errorMessage: err.message
      })
    });
  }

  render(){
    const {name, age, mobile, sex, chiefComplain, symptoms, diagnosis, doctor, address }=this.state.values;
    // const { inventory } = this.state;
    const  submitDisabled = name.length<2 || age==='' || mobile.length<10 || chiefComplain.length<3 || symptoms.length<4 || diagnosis.length<4 || this.state.submitLoading;
    return(
      <Paper style={{ padding: '2% 5%', margin: '2%', maxWidth: '60%' , textAlign: 'left' }}>
        
        <Typography variant="h6" style={{ marginBottom: '2%'}}>
          Patient Informaton*
        </Typography>
        <TextField placeholder="Enter Patient Name" label="Name" variant="outlined"
          onChange={(event)=> this.handleFormChanges('name', event.target.value)} value={name} fullWidth required
        />
        <NameField label="Age" required type="number" value={age} onChange={(event)=> this.handleFormChanges('age', event.target.value)} />
        <NameField label="Mobile Number" required value={mobile} onChange={(event)=> this.handleFormChanges('mobile', event.target.value)} />
        <Select
          label="Sex"
          value={sex}
          style={{ marginTop: '3.5%' }}
          onChange={(event) => this.handleFormChanges('sex', event.target.value)}
        >
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
          <MenuItem value={'Other'}>Other</MenuItem>
        </Select>

        <TextField placeholder="Patient Address" label="Adress" variant="outlined"
          onChange={(event)=> this.handleFormChanges('address', event.target.value)} value={address} 
          fullWidth required multiline rows="4"
          style={{ margin: '2% 0%' }}
        />

        <Divider style={{ margin: '2% 0%' }} />
        
        <Typography variant="h6" style={{ marginBottom: '2%'}}>
          Patient Diagnosis*
        </Typography>

        <TextField placeholder="Enter Doctor Name" label="Doctor Name" variant="outlined"
          onChange={(event)=> this.handleFormChanges('doctor', event.target.value)} value={doctor} fullWidth required
        />
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
        <Divider style={{ margin: '2% 0%' }} />
        
        <Typography variant="h6" style={{ marginBottom: '2%'}}>
          Available Medicine*
        </Typography>

        {this.renderMedicineArea()}

        <div>
        <Button variant="contained"
            color="default"
            onClick={()=>{
              this.setState((prevState) => ({
                ...prevState,
                values:{
                  ...prevState.values,
                  medicine: [
                    ...prevState.values.medicine,
                    {
                      name: '',
                      days: '',
                      dose: '',
                      id: ''
                    }
                  ]
                }
              }));
            }}
            disabled={ submitDisabled }
            style={{ minHeight: '52px', margin: '2%' , minWidth: '88px' }}
          >
            Add Medicine            
          </Button>
          <Button variant="contained"
            color="secondary"
            onClick={() => this.handleFormSubmission()}
            disabled={ submitDisabled }
            style={{ minHeight: '52px', margin: '2%' , minWidth: '88px' }}
          >
            {this.state.submitLoading && <Loader color="default" />}
            {!this.state.submitLoading && ("Submit")}
            
          </Button>
        </div>

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