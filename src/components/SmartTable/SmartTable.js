import React, { Component } from 'react';
import { MultiGrid, AutoSizer } from 'react-virtualized';
import './SmartTable.css'
import 'react-virtualized/styles.css'; // only needs to be imported once


class SmartTable extends Component {

  state={

    position:{
      row: null,
      column: null,
    },
    renderSet: this.props.dataSet,
  }
  
  handleDataClick = (row, column) => {    
    console.log(`position `, row, column);
    this.setState({
      position:{
        row,
        column,
      }
    })    
  }

  cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    let list = this.props.dataSet;
    // console.log(`list in cellrenderer `, list);
    // console.log(`renderSet `, this.state.renderSet);
    
    let cellStyle = 'dataCell';
    // checks position of selected data cell against current rendering cell
    // changes style if selected for highlight effect
    if(columnIndex===this.state.position.column && rowIndex===this.state.position.row){
      cellStyle ='selectCell';
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
          {list[rowIndex][columnIndex]}
        </div>
      )  
    }
  }

  render() {
    // console.log(`smartTable props`, this.props.dataSet);
    
    console.log(`state position `, this.state.position);
    let list = this.props.dataSet;
    // console.log(`list render`, list[1]);
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

export default SmartTable;
