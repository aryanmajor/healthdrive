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

export { NameField, Loader };