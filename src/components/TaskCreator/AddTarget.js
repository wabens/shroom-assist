import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';



class AddTarget extends Component {

    state= {
        target:{
            target_table: '',
            modification_value:{},
            modification: '',
            target_column:[],
        },
        currentTable: [],
        columnType: [],
        targetColumnCount:0
    }
    
   handleChange = field => event => {
       console.log(`handleChange `, field, event.target.value);
       let column = null;
       let currentTable = this.state.currentTable;
       if (field === 'target_table' && event.target.value==='incubator'){
            currentTable = this.props.reduxState.processDataTypes.incubatorTypes
       }else if (field === 'target_table' && event.target.value==='growing_room'){
            currentTable = this.props.reduxState.processDataTypes.growingRoomTypes
       }else if (field === 'target_column'){
            for(let x of event.target.value){
                column = {...column, [x]: ''};
        }
    
           console.log(`setting modification_value`, column, event.target.value);

        //    this.setState({
        //        target:{
        //         }
        //     })
       }
       this.setState({
           target:{
                    ...this.state.target,
                    [field]: event.target.value,
                    modification_value:{...column}

               },
               currentTable
       })
    };

    valueForm = () => {
        console.log(`in value form`);
        
        let resultEl = [];
        for(let column of this.state.target.target_column){

            resultEl.push(<TextField
                className={"formField"}    
                label={column}
                value={this.state.target.modification_value[column]}
                onChange={this.handleChangeModificationValue(column)}
                margin="dense"
                variant="outlined"
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
