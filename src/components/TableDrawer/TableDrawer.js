import React, { Component } from 'react';
import { connect } from 'react-redux';

import Drawer from '@material-ui/core/Drawer';

import SmartTable from '../SmartTable/SmartTable';
import './TableDrawer.css';

import sort from 'fast-sort'; // to sort columns



// holds the data table
// tab selection pulls raw data from reducer
// raw data is converted to 2d array and 
// object keys are preserved for column headers
class TableDrawer extends Component {
  state= {
    open: false,
    dataSet: [],
    columnNames:[],
    sort:{
      direction: '',
      column: 0,
      active: false,
    },
    table:''
  }

  toggleDrawer = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  fetchDataTable = (table) => {
    let data = '';
    if (table==='incubatorData'){
      data = this.props.reduxState.incubatorData;
      console.log(`fetch data `, data);
      this.listToIndex(data);
    }
    else if (table==='growingRoomData'){
      data = this.props.reduxState.growingRoomData
      this.listToIndex(data);
    };
    this.setState({
      sort:{
        direction: '',
        column: 0,
        active: false,
      },
      table: table
    });
    
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
        columnNames: objectKeys,
    })
  };

    handleSort = (column) =>{
        let list = this.state.dataSet;
        list.shift();
        let columnNames=this.state.columnNames
        if(this.state.sort.direction===''){
            console.log(`pre sorted data `, list);
            console.log(`column names `, this.state.columnNames);
            
            sort(list).asc(l=>l[column]);
            list.unshift(this.state.columnNames);
            console.log(`sorted `, list);
            this.setState({
                sort: {
                    direction: 'ASC',
                    column,
                    active: true,
                },
                dataSet: list
             })
        }
        else if(this.state.sort.direction==='ASC'){
            sort(list).desc(l=>l[column]);
            list.unshift(this.state.columnNames)
            console.log(`sorted `, list);
            this.setState({
                sort: {
                    direction: 'DESC',
                    column,
                    active: true
                },
                dataSet: list
            })
        }
        else if(this.state.sort.direction==='DESC'){
            this.fetchDataTable(this.state.table)
            this.setState({
                sort: {
                direction: '',
                column: 0,
                active: false,
            }
        })
        }

  }



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

            <SmartTable handleSort={this.handleSort} sort={this.state.sort} dataSet = {this.state.dataSet}/>
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
