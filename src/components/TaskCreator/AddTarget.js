import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class AddTarget extends Component {

    state= {
        target:{
            target_table: '',
            modification_value:{},
            modification: '',
            target_column:[],
        },
        currentTable: [],
        columnType: []
    }
    
   handleChange = field => event => {
    //    console.log(`handleChange `, field, event.target.value);
       let value = this.state.target.modification_value;
    //    console.log(`handle change value`, value);
       
       let currentTable = this.state.currentTable;
       if (field === 'target_table' && event.target.value==='incubator'){
            currentTable = this.props.reduxState.processDataTypes.incubatorTypes
       }else if (field === 'target_table' && event.target.value==='growing_room'){
            currentTable = this.props.reduxState.processDataTypes.growingRoomTypes
       }else if (field === 'target_column'){ // handles the state of modification_value form
            for(let column of event.target.value){
                console.log(`handlechange for loop `, column, value);
                
                value = {...value, [column]: value[column]};
        }
    
        //    console.log(`setting modification_value`, value, event.target.value);
       }
       this.setState({
           target:{
                    ...this.state.target,
                    [field]: event.target.value,
                    modification_value:{...value}

               },
               currentTable
       })
    };

// renders form for modification_value based on chosen columns in target_column
    valueForm = () => {
        console.log(`in value form`);
        
        let resultEl = [];
        for(let column of this.state.target.target_column){
            let dataType = this.typeCheck(column);
            let focus = false;
            let label = column;
            if(dataType==='date'){
                focus=true
            }
            resultEl.push(<TextField
                type={dataType}
                className={"formField"}    
                label={column}
                value={this.state.target.modification_value[column]}
                onChange={this.handleChangeModificationValue(column)}
                margin="dense"
                autoFocus={focus}
                ref={'focusDate'}
            >
            </TextField>);
        }
        return resultEl
    }
    
    handleChangeModificationValue = column => event => {
        this.setState({
              target: {
                  ...this.state.target,
                  modification_value: {
                      ...this.state.target.modification_value,
                      [column]: event.target.value
                  }

              },
        })
    }

    // checks data type of selected column against information_schema stored in redcuer
    typeCheck = (columnName) => {
        let tableTypes = this.state.currentTable
        for(let column of tableTypes){
            if (column.column_name === columnName && column.data_type === 'integer') {
                console.log(`found type`, column);
                return 'number'
            } else if (column.column_name === columnName && column.data_type === 'timestamp without time zone') {
                console.log(`found type`, column);
                return 'date'
            }
        }
        return 'text'
    }

    render(){
        let columnSelectEl=null;
        let tableEl = null;
        let valueEl = null;
        let modificationEl =            
            <TextField
                className={"formField"}
                select
                label="Type"
                value={this.state.target.modification}
                onChange={this.handleChange('modification')}
                margin="dense"
                variant="outlined"
            >
                <option value={'POST'}>Insert</option>
                <option value={'PUT'}>Update</option>
            </TextField>;

        // nested if statements conditionally render form in order based on selection
        // {modificationEl}{tableEl}{columnSelectEl}{valueEl}
        if(this.state.target.modification.length){
            console.log(`addTarget modification`);
            tableEl =
                <TextField
                    className={"formField"}
                    select
                    label="Table"
                    value={this.state.target.target_table}
                    onChange={this.handleChange('target_table')}
                    margin="dense"
                    variant="outlined"
                >
                    <option value={'incubator'}>incubator</option>
                    <option value={'growing_room'}>growing_room</option>
                </TextField>;
            if(this.state.target.target_table.length && this.state.target.modification === 'PUT'){
                columnSelectEl = 
                    <Select
                        multiple
                        value={this.state.target.target_column}
                        onChange={this.handleChange('target_column')}
                    >
                        {this.state.currentTable.map((column,i) => (
                            <MenuItem key={i} value={column.column_name}>
                                {column.column_name}
                            </MenuItem>
                        ))}
                    </Select>
                if(this.state.target.target_column && this.state.target.target_column[0]){
                    valueEl = this.valueForm(); 
                    
                }
            } else if (this.state.modification === 'POST') {

            }
        }

        console.log(`in render `, this.state);

        return(
            <div>
                <p>Target</p>
                {modificationEl}
                {tableEl}
                {columnSelectEl}
                {valueEl}
            </div>
            
        )
    }
};

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(AddTarget);
