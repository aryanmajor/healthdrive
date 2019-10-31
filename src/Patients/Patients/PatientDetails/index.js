import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import styled from 'styled-components';
import { Divider } from '@material-ui/core';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

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

const PatientArea = styled.div`
  text-align: left;
`;

const TablePointer = styled(TableCell)`
  max-width: 10%;
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
          {`Diagnosed by ${patient.askedBy} on ${new Date(patient.time*1000).toDateString()}`}
        </Typography>

        <Divider variant="middle" style={{ margin: '2% 0%' }} />
      </PatientArea>
    );
  }

  renderDiagnosis(){
    const {patient}=this.state || {};
    return(
      <Table aria-label="simple table">
        <TableBody>
          <TableRow>
            <TablePointer>Chief Complain</TablePointer>
            <TableCell>{patient.chiefComplain}</TableCell>
          </TableRow>
          <TableRow>
            <TablePointer>Symptoms</TablePointer>
            <TableCell>{patient.symptoms}</TableCell>
          </TableRow>
          <TableRow>
            <TablePointer>Diagnosis</TablePointer>
            <TableCell>{patient.diagnosis}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
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
        </div>
      </PatientCard>
    )
  }
};

export default PatientList;