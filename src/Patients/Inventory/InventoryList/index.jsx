import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'  ;
import axios from 'axios';
import { NameField, Loader } from './../../Patients/NewPatient/utils';
import { Modal, Fade, Backdrop, Divider, Button, CircularProgress, Typography } from '@material-ui/core';
import styled from 'styled-components';

const InventoryModal = styled(Paper)`
  width: 50%;
  padding: 2%;
  margin: 10% 25%;
  max-height: 445px !important;
`;

const CellData = styled(TableCell)`
  color: #fff !important;
  font-size: 1.3em !important;
  letter-spacing: 2px !important;
`;

class PatientList extends Component{
  constructor(props){
    super(props);
    this.state={
      list:[],
      loadingList: true,
      searchKey:'',
      openModal: false,
      modalLoading: false,
      inventoryInfo: {

      },
      medicineForm: {
        noOfQuanta: 0,
        perQuanta: 0
      }
    };
  }

  handleModal(id){
    this.setState({
      modalLoading: true,
      openModal: true
    });
    axios.get(`/fetchInventory/${id}`).then((response)=>{
      console.log(response);
      this.setState({
        inventoryInfo: response.data
      })
    }).catch((err) => {
      console.log(err);
    });
  }

  componentDidMount(){
    this.setState({
      loadingList: true
    });
    axios.get('/allInventory').then((response)=>{
      this.setState({
        list: response.data,
        loadingList: false
      })
    }).catch((err)=>{
      console.log(err);
    });
  }

  handleAddMedicineForm(field, value){
    this.setState((prevState)=>({
      medicineForm: {
        ...prevState.medicineForm,
        [field]: value
      }
    }));
  }

  addMedicineForm(){
    const { inventoryInfo } = this.state;
    const { perQuanta, noOfQuanta } = this.state.medicineForm || {};
    const submitDisabled = perQuanta<1 || noOfQuanta<1;
    return(
      <React.Fragment>
        <NameField label="Number Of Tablets in One Leaf" type="number" required value={perQuanta}
        onChange={(event)=> {
          this.handleAddMedicineForm('perQuanta', event.target.value);
        }}
        />
        <NameField label="Number Of Leaves" type="number" required value={noOfQuanta}
          onChange={(event)=> {
            this.handleAddMedicineForm('noOfQuanta', event.target.value);
          }}
        />
        <Button variant="contained"
          color="secondary"
          onClick={() => {
            const data={
              value: perQuanta*noOfQuanta
            };
            console.log(data);
            axios({
              method: 'POST',
              url: `/updateInventory/${inventoryInfo._id}`,
              data
            }).then((response)=>{
              console.log(response);
              this.setState({
                openModal: false
              });
              this.props.history.push(`/new-inventory`);
            }).catch((e)=>{
              console.log(e);
              this.setState({
                submitLoading: false,
                error: true,
                errorMessage: e.message
              })
            });
          }}
          disabled={ submitDisabled }
          style={{ minHeight: '52px', margin: '2%' , minWidth: '88px' }}
        >
          {this.state.submitLoading && (<CircularProgress color="secondary" />)}
          {!this.state.submitLoading && ("Submit")}
          
        </Button>
      </React.Fragment>
    );
  }

  renderInventoryModal(){
    const { openModal, inventoryInfo } = this.state || {};
    return(
      <Fade in={openModal}>
        <InventoryModal>
          <h2 id="transition-modal-title" style={{ letterSpacing: '2px', fontWeight: '300' }}>Transactions</h2>
          <Divider />
          {this.addMedicineForm()}
          <div style={{ overflow: 'auto' ,maxHeight: '250px' }}>
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Patient ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventoryInfo.transactions && inventoryInfo.transactions.map(transaction => (
                  <TableRow key={transaction._id} style={{ backgroundColor: transaction.increament ? '#00BD9D' : '#F44E3F' }}>
                    <CellData>
                      {transaction.name}
                    </CellData>
                    <CellData align="center">{transaction.value}</CellData>
                    <CellData align="center">{transaction.id}</CellData>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </InventoryModal>
      </Fade>
    );
  }

  render(){
    const {list, openModal, searchKey, loadingList }= this.state || [];
    return(
      <React.Fragment>
        <Paper style={{ padding: '1% 1%', margin: '2%', maxWidth: '60%' , textAlign: 'left' }}>
        <div>
            <NameField placeholder="Search..." variant="outlined" onChange={(event)=>{
              this.setState({
                searchKey: event.target.value
              })
            }} />
            <Typography variant="subtitle1" >
              {`${list.length} Items Found`}
            </Typography>
        </div>
        {loadingList && (
          <div style={{ paddingLeft: '45%' }}>
            <Loader />
          </div>
        )}
        { !loadingList && (<Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Expiry</TableCell>
              <TableCell align="center">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(inventory => {
               if(inventory.name.toLowerCase().indexOf(searchKey.toLowerCase())>-1){
                return(
                  <TableRow hover key={inventory._id} onClick={() => this.handleModal(inventory._id)} >
                    <TableCell component="th" scope="row">
                      {inventory.name}
                    </TableCell>
                    <TableCell align="center">{new Date(inventory.expiry).toDateString()}</TableCell>
                    <TableCell align="center">{inventory.quantity}</TableCell>
                  </TableRow>
                )
               }
            }
            )}
          </TableBody>
        </Table>)}
        </Paper>
        
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openModal}
          onClose={() => this.setState({ openModal: false })}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
      >
        {this.state.inventoryInfo && this.renderInventoryModal()}
      </Modal>

        <Link to={'/new-inventory'}>
          <Fab aria-label="add" color="secondary" style={{ position: 'fixed', bottom: '3%', left: '75%' }}>
            <AddIcon />
          </Fab>
        </Link>
      </React.Fragment>
    );
  }
};

export default PatientList;