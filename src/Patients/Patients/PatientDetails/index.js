import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import styled from 'styled-components';
import { Divider, TableHead } from '@material-ui/core';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { getTimeFromDate } from '../NewPatient/utils';

const PatientCard = styled(Card)`
  width: 70%;
  padding: 1%;
  margin: 5% 10%;
  div.info{
    width: 90%;
    height: 100%;
    margin-left: 10%;
  }
  div.action{
    float: left;
    margin:5% 1%;
    a:hover{
      cursor: pointer;
    }
  }
`;

const MedicineTable = styled(Table)`
  & th{
    font-size: 1.2em;
  }
  margin: 5% 0%;
`;

const PatientArea = styled.div`
  text-align: left;
`;

const WriteAnswerIcon = styled(QuestionAnswerIcon)`
  opacity: 0.6;
  :hover{
    cursor: pointer;
    opacity: 1;
  }
`;

class PatientList extends Component{
  constructor(props){
    super(props);
    this.state={
      patient:{

      },
      loading: false,
      error: false,
      errorMessage: ''
    };
  }

  fetchPatientDetails(id){
    axios.get(`/fetchPatient/${id}`).then((response)=>{
      this.setState({
        patient: {...response.data}
      }, ()=>{
        console.log(this.state);
      });
    }).catch((err)=>{
      console.log(err);
    });
  }

  componentDidMount(){
    console.log(this.props);
    this.fetchPatientDetails(this.props.match.params.id);
  }

  renderPatientArea(){
    const {patient}=this.state || {};
    return (
      <PatientArea>
        <Typography variant="h4" color="textPrimary">
          {patient.name}
        </Typography>
        
        <Typography variant="h6" color="textSecondary">
          {`${patient.age} years`}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {`Mobile No. ${patient.mobile}`}
        </Typography>

        <Divider variant="middle" style={{ margin: '2% 0%' }} />

        <Typography variant="subtitle1" color="secondary">
          {`Diagnosed by ${patient.doctor} at ${getTimeFromDate(patient.time*1000)}`}
        </Typography>

        <Divider variant="middle" style={{ margin: '2% 0%' }} />
      </PatientArea>
    );
  }

  renderDiagnosis(){
    const {patient}=this.state || {};
    return(
      <div style={{ textAlign: 'left' }}>
        <Typography component="h5" variant="h5" color="textSecondary" style={{ margin: '1% 0%' }}>
          Chief Complain : 
        </Typography>
        <Typography component="h6" variant="h6">
          {patient.chiefComplain}
        </Typography>
        <Typography component="h5" variant="h5" color="textSecondary" style={{ margin: '1% 0%' }}>
          Symptoms : 
        </Typography>
        <Typography component="h6" variant="h6">
          {patient.symptoms}
        </Typography>
        <Typography component="h5" variant="h5"color="textSecondary" style={{ margin: '1% 0%' }}>
          Diagnosis : 
        </Typography>
        <Typography component="h6" variant="h6">
          {patient.diagnosis}
        </Typography>
      </div>
    );
  }

  renderMedicineArea(){
    const { patient } = this.state || {};
    return(
      <MedicineTable aria-label="simple table">
        <TableHead>
          <TableRow style={{ fontSize: '1.2em' }}>
            <TableCell>Medicine / Test</TableCell>
            <TableCell>Per Day</TableCell>
            <TableCell>Number Of Days</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{
          patient.medicine && patient.medicine.map((med) => {
            return(
              <TableRow>
                <TableCell>{med.name}</TableCell>
                <TableCell>{med.dose}</TableCell>
                <TableCell>{med.days}</TableCell>
              </TableRow>
            );
          })
        }
        </TableBody>
      </MedicineTable>
    );
  }

  render(){
    return(
      <PatientCard>
        <div className="action">
          <WriteAnswerIcon color="action" fontSize="large" />
        </div>
        <div className="info"  >
          {this.renderPatientArea()}
          {this.renderDiagnosis()}
          <Divider />
          {this.renderMedicineArea()}
        </div>
      </PatientCard>
    )
  }
};

export default PatientList;