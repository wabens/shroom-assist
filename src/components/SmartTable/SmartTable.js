import React, { Component } from 'react';
import { MultiGrid, AutoSizer } from 'react-virtualized';
import { connect } from 'react-redux';

import './SmartTable.css'
import 'react-virtualized/styles.css'; // only needs to be imported once


class SmartTable extends Component {

  handleDataClick = (row, column) => {    
    console.log(`position `, row, column);
    console.log(`select row`, this.props.dataSet[row]);
    console.log(`select column name`, this.props.dataSet[0][column]);
    
    let selectJSON = this.selectJSON(this.props.dataSet[row]);

    let info={
      row,
      column,
      columnName: this.props.dataSet[0][column],
      value: this.props.dataSet[row][column],
      JSON: selectJSON,
    }

    this.props.dispatch({type: 'DATA_SELECTED', payload: info})
    
  }

  cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    let list = this.props.dataSet;
    // console.log(`list in cellrenderer `, list);
    // console.log(`renderSet `, this.state.renderSet);
    
    let cellStyle = 'dataCell';
    // checks position of selected data cell against current rendering cell
    // changes style if selected for highlight effect

    if(rowIndex===this.props.reduxState.dataSelected.dataSelected.row){
      cellStyle='selectRow';
    }

    if (columnIndex === this.props.reduxState.dataSelected.dataSelected.column){
      cellStyle='selectColumn'
    }
    

    if(rowIndex===0){ // if columnHead (row 0), render button
      if(this.props.sort.active===true && this.props.sort.column===columnIndex){
        // console.log(`in sorted column `, this.props.sort);
        return(
          <div
            key={key}
            style={style}
            className={'headerCell'}
          >
            <button onClick={()=>this.props.handleSort(columnIndex)}>{this.props.sort.direction}</button>
            {list[rowIndex][columnIndex]}
          </div>
        )
      }
      else{
        return(
          <div
            key={key}
            style={style}
            className={'headerCell'}
          >
            <button onClick={()=>this.props.handleSort(columnIndex)}></button>
            {list[rowIndex][columnIndex]}
          </div>
        )
      }
    }else{  // normal data cell
      //console.log(`rowIndex, columnIndex, list`, rowIndex, columnIndex, list);
      //console.log(`list position `, list[rowIndex][columnIndex]);
      
      return (
        <div
          key={key}
          style={style}
          className={cellStyle}
          onClick={()=>this.handleDataClick(rowIndex, columnIndex)}
        >
          {String(list[rowIndex][columnIndex])}
        </div>
      )  
    }
  }

  selectJSON = (rowArray) => {
    let rowObject = {};
    let columnNames = this.props.dataSet[0];
    for(let i=0; i<rowArray.length; i++){
      rowObject={
        ...rowObject,
        [columnNames[i]]: rowArray[i],
      }
    }
    rowObject = JSON.stringify(rowObject)
    return rowObject
  }


  render() {
    // console.log(`smartTable props`, this.props.dataSet);
    
    console.log(`state position `, this.props.reduxState.dataSelected.dataSelected);
    let list = this.props.dataSet;
    // console.log(`selected row`, list[this.state.position.row]);
    
    if(list&&list[1]){
      return (
        <AutoSizer>
        {({ height, width }) => (
          <MultiGrid
            columnCount={list[0].length}
            columnWidth={100}
            height={height}
            rowCount={list.length}
            rowHeight={50}
            width={width}
            fixedColumnCount={1}
            fixedRowCount={1}
            cellRenderer={this.cellRenderer}
            styleTopRightGrid={{
              border: 'solid blue 1px',
            }}
            styleBottomLeftGrid={{
              border: 'solid blue 1px',
            }}
          />
        )}
        </AutoSizer>
      )
    }
    else{
      return(
        null
      )
    }
  }   
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(SmartTable);
