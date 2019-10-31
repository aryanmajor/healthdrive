import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'  ;
import DisplayQues from './DisplayQues';
import axios from 'axios';

class PatientList extends Component{
  constructor(props){
    super(props);
    this.state={
      list:[]
    };
  }

  componentDidMount(){
    axios.get('/allPatient').then((response)=>{
      this.setState({
        list: response.data
      })
    }).catch((err)=>{
      console.log(err);
    });
  }

  render(){
    const {list}= this.state || [];
    let patientList=(<h2>Empty</h2>);
    if (list.length>0){
      patientList = list.map((patient)=>{
          return(
            <DisplayQues
              key={patient._id}
              title={patient.name}
              askedBy={patient.askedBy}
              patient={patient.diagnosis}
              askedOn={new Date(patient.time*1000).toDateString()}
              numOfAns={patient.medicine.length}
              onClick={()=> this.props.history.push(`/patient/${patient._id}`)}
            />
          )
      });
    }
    return(
      <Container fixed>
        {patientList}
        <Link to={'/new-question'}>
          <Fab aria-label="add" color="secondary" style={{ position: 'fixed', bottom: '3%', left: '75%' }}>
            <AddIcon />
          </Fab>
        </Link>
      </Container>
    )
  }
};

export default PatientList;