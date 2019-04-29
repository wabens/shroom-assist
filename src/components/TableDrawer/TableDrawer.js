import React, { Component } from 'react';
import { connect } from 'react-redux';

import Drawer from '@material-ui/core/Drawer';

import SmartTable from '../SmartTable/SmartTable';
import './TableDrawer.css';

import sort from 'fast-sort'; // to sort columns
const moment = require('moment');


// holds the data table
// tab selection pulls raw data from reducer
// raw data is converted to 2d array and object keys are preserved for column headers
// filters and sorts data 
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

// Called when the drawer is opened and table is selected
// Calls table based on button click, and sends to listToIndex
// Sets to neutral sort direction and sets table state
// Also sets global redux state for table
  fetchDataTable = (table) => {
    let data = '';
    let tableText = '';
    if (table==='incubatorData'){
      data = this.props.reduxState.incubatorData;
      console.log(`fetch data `, data);
      tableText = 'incubator';
      this.listToIndex(data, tableText);
    }
    else if (table==='growingRoomData'){
      data = this.props.reduxState.growingRoomData
      tableText = 'growing_room';
      this.listToIndex(data, tableText);
    };
    this.setState({
      sort:{
        direction: '',
        column: 0,
        active: false,
      },
      table: table
    });
    this.props.dispatch({type: 'CURRENT_TABLE', payload: tableText});
    
  }
  
  // Called in fetchDataTable
  // Grid component within smartTable requires a 2d array as opposed to an array of objects
  // listToIndex pulls the keys off of the first object in the given data set and sets it to state
  // it flattens the objects into arrays and puts an array of keys at the beginning of the new array
  // this new array is set to state and passed to smartTable as props
  listToIndex = (data, currentTable) => {
    let objectKeys = Object.keys(data[0]);
    // console.log(`column names `, objectKeys);
    
    let tableData = [];

    for (let obj of data) {
      let newArray = Object.values(obj);
      tableData.push(newArray);
    }
    // console.log(`columnNames...`, objectKeys);
    if (this.props.taskConstraints.length) {
      // console.log(`listToIndex...`, currentTable, this.props.taskConstraints[0].constraint_table);
      for(let constraint of this.props.taskConstraints){
        if (currentTable === constraint.constraint_table) {
          tableData = this.constraintFilter(tableData, objectKeys, constraint);
          console.log(`linkToIndex after constraintFilter `, tableData);
        }
      }
    }
    tableData.unshift(objectKeys);
    
    this.setState({
        dataSet: tableData,
        columnNames: objectKeys,
    })
  };

// sorts the data set to state by fetch data table
// passed through props and called in SmartTable
  handleSort = (column) =>{
      let list = this.state.dataSet;
      list.shift(); // pulls column names array off data set
      if(this.state.sort.direction===''){
          // console.log(`pre sorted data `, list);
          // console.log(`column names `, this.state.columnNames);
          sort(list).asc(l=>l[column]);
          list.unshift(this.state.columnNames);
          // console.log(`sorted `, list);
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
          // console.log(`sorted `, list);
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

  // applies filter to each row in data set and constrains data set
  // called in listToIndex 
  constraintFilter = (dataSet, columnNames, constraint) => {
    //console.log(`in constraintFilter`, this.props.taskConstraints, dataSet);
    let columnIndex = columnNames.indexOf(constraint.constraint_column);
    //console.log(`constraintFilter index`, columnIndex);
          console.log(`constraint on dataSet present...`);
      let thisType = this.typeIt(constraint)
      let filterSet = [];
      for (let row of dataSet){        
        if(this.compareIt(row[columnIndex], constraint, thisType)==true){
          //console.log(`filter satisfied row`, row);
          filterSet.push(row);
        }
      //console.log(`filterSet in constraint `, filterSet);
      }
    return filterSet
  } 
 
  // parses string statement and evalutes expression for each row[column]
  compareIt = (data, constraint, thisType) => {
    let operator = constraint.constraint_comparison.comparison;
    let value = constraint.constraint_comparison.value;
    //console.log(`in compareIt data, value`, data, value);
    value=this.convertIt(value, thisType);
    data=this.convertIt(data, thisType);
    if (operator==='=' && value==data){
      //console.log(`compareIt`, operator);
      return true
    }else if (operator==='<='&& value<=data){
      //console.log(`compareIt`, operator);
      return true
    }else if (operator==='>'&& value>data){
      //console.log(`compareIt`, operator);
      return true
    }else{
      return false
    }
  }

  convertIt = (value, thisType) => {
    let result = value
    //console.log(`convertIt`, thisType);
    
    if (thisType === "timestamp without time zone"){
      console.log(`is timestamp`);
      result = moment(value)
    }
    //console.log(`convertIt result `, result, value);
    
    return result
  }

  // references information schema for tables to find the data type of the targeted column
  // called in constraintFilter and result is passed into compareIt
  typeIt = (constraint) => {
    let allTypes = [];
    let thisType = '';
    if(constraint.constraint_table === 'incubator'){
      allTypes = this.props.reduxState.processDataTypes.incubatorTypes;
    }else if(constraint.constraint_table==='growing_room'){
      allTypes = this.props.reduxState.processDataTypes.growingRoomTypes;
    }
    for(let column of allTypes){
      if(column.column_name===constraint.constraint_column){
        thisType = column.data_type;
      };
    }
  console.log(`typeIt result `, thisType, constraint);
    return thisType
  
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
