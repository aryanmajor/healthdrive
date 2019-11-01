import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const NameField = styled(TextField)`
  width: 40%;
  margin: 2% 0% !important;
  margin-right: 2% !important;
`;

const Loader = (<CircularProgress color="secondary" />);

export { NameField };