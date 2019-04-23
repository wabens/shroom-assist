import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import SmartTable from '../SmartTable/SmartTable';
import './TableDrawer.css';
import { connect } from 'react-redux';


// holds the data table
// tab selection pulls raw data from reducer
// raw data is converted to 2d array and 
// object keys are preserved for column headers
class TableDrawer extends Component {
  state= {
    open: false,
    dataSet: [],
  }

  toggleDrawer = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  fetchDataTable = (table) => {
    let data = this.props.reduxState.incubatorData;
    console.log(`fetch data `, data);
    
    this.listToIndex(data)
  }
  

  // Called when the drawer is opened and table is selected
  // Grid component within smartTable requires a 2d array as opposed to an array of objects
  // listToIndex pulls the keys off of the first object in the given data set
  // it flattens the objects into arrays and puts an array of keys at the beginning of the new array
  // this new array is set to state and passed to smartTable as props
  listToIndex = (data) => {
    let objectKeys = Object.keys(data[0]);
    let tableData = [];

    for (let obj of data) {
      let newArray = Object.values(obj);
      tableData.push(newArray);
    }

    console.log(`listToIndex...`, tableData);
    console.log(`columnNames...`, objectKeys);
    tableData.unshift(objectKeys)
    
    this.setState({
        dataSet: tableData,
    })
    
  };



  render() {
    console.log(`dataset in tableDrawer `, this.state.dataSet);
    
    return (
    <section>
        <button onClick={this.toggleDrawer}>OPEN</button>
        <Drawer anchor="bottom" open={this.state.open} variant='persistent'>
          <div className={'drawerDiv'}>
            <button onClick={this.toggleDrawer}>CLOSE</button>
            <button onClick={()=>this.fetchDataTable('incubatorData')}>Incubator</button>
            <button onClick={()=>this.fetchDataTable('growingRoomData')}>Growing Room</button>

            <SmartTable dataSet = {this.state.dataSet}/>
          </div>
        </Drawer>
    </section>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(TableDrawer);
