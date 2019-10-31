import React, { Component } from 'react';
import { NameField } from './utils';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


class MedicineInfo extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const { inventory, dose, days } = this.props;
    return(
      <React.Fragment>
        <Autocomplete
          options={inventory}
          getOptionLabel={option => option.name}
          style={{ width: 300 }}
          onChange={(event)=> console.log('Name', event.target.value)}
          renderInput={params => (
            <TextField {...params} label="Combo box" variant="outlined" fullWidth />
          )}
        />
        <NameField label="Dose" required value={dose} onChange={(event)=> console.log('Dose', event.target.value)} />
        <NameField label="Days" required value={days} onChange={(event)=> console.log('Days', event.target.value)} />
      </React.Fragment>
    );
  }
}

export default MedicineInfo;