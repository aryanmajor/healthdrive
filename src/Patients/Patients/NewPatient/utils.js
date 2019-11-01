import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { CircularProgress } from '@material-ui/core';

const NameField = styled(TextField)`
  width: 40%;
  margin: 2% 0% !important;
  margin-right: 2% !important;
`;

const Loader = (props) => (
  <CircularProgress color={props.color || 'secondary'} />
);

function pad(num) { 
  return ("0"+num).slice(-2);
}
function getTimeFromDate(timestamp) {
  var date = new Date(timestamp * 1000);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  return pad(hours)+":"+pad(minutes)+":"+pad(seconds)
}

export { NameField, Loader, getTimeFromDate };