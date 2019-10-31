import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Divider } from '@material-ui/core';

const AnswerBox = styled(Paper)`
  :hover{
    background-color: #fcfcfc;
    cursor: pointer;
  }
`;

const DisplayQues = (props)=>{
  return(
    <AnswerBox style={{ margin: '1% 0%', padding:'1% 5%', textAlign: 'left'}} onClick={()=> props.onClick()}>
      <Typography variant="h4" color="textPrimary">
          {props.title}
        </Typography>
        
        {/* <Typography variant="subtitle1" color="textPrimary">
          {props.question}
        </Typography> */}
        <Divider variant="middle" style={{ margin: '2% 0%' }} />
        <Typography variant="subtitle2" color="textSecondary">
          {`Asked by ${props.askedBy} on ${props.askedOn}`}
        </Typography>
        <Typography variant="body1" color="textSecondary" component="i">
          {`${props.numOfAns} Answers`}
        </Typography>
    </AnswerBox>
  )
};

export default DisplayQues;