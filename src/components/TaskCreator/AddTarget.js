import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';



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
        saved: false,
        listPosition: null,
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
       }else if (field === 'target_column'&& this.state.target.modification === 'POST'){ // handles the state of modification_value form
            for(let column of event.target.value){
                console.log(`handlechange for loop `, column, value);
                value = {...value, [column]: value[column]};
            }    
       }else if (field === 'target_column' && this.state.target.modification === 'PUT'){
            event.target.value = [event.target.value];
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
                disabled = {this.state.saved}
                type={dataType}
                id='modificationValue'
                className={"formField"}    
                label={column}
                value={this.state.target.modification_value[column]}
                onChange={this.handleChangeModificationValue(column)}
                margin="dense"
                autoFocus={focus}
                InputLabelProps={{ shrink: true }}
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

    // handleSave sets the internal save position of AddTarget
    // it captures the length of the target list in TaskCreator to get its own position in the list
    // this allows that position to be deleted when the target needs to be edited
    // it also calls the saveTarget passed through props to update the list in TaskCreator
    handleSave = event => {
        console.log('in hanleSave ', this.props)
   
        this.props.saveTarget(this.state.target);
        this.setState({
            ...this.state,
            saved:true,
            listPosition: this.props.listPosition

        })
    }

    handleEdit = event => {
        this.setState({
            ...this.state,
            saved:false
        })
        this.props.editTarget(this.state.listPosition)
    }

    render(){
        let columnSelectEl=null;
        let tableEl = null;
        let valueEl = null;
        let modificationEl =            
            <TextField
                disabled = {this.state.saved}
                className={"formField"}
                select
                label="Type"
                value={this.state.target.modification}
                onChange={this.handleChange('modification')}
                margin="dense"
            >
                <MenuItem value={'POST'}>Insert</MenuItem>
                <MenuItem value={'PUT'}>Update</MenuItem>
            </TextField>;
        let saveEdit = <button onClick={this.handleSave}>Save</button>;


        // nested if statements conditionally render form in order based on selection
        // {modificationEl}{tableEl}{columnSelectEl}{valueEl}
        if(this.state.target.modification.length){
            console.log(`addTarget modification`);
            tableEl =
                <TextField
                    disabled = {this.state.saved}
                    className={"formField"}
                    select
                    label="Table"
                    value={this.state.target.target_table}
                    onChange={this.handleChange('target_table')}
                    margin="dense"
                >
                    <MenuItem key={1} value={'incubator'}>incubator</MenuItem>
                    <MenuItem key={2} value={'growing_room'}>growing_room</MenuItem>
                </TextField>;
            if(this.state.target.target_table.length && this.state.target.modification === 'POST'){
                columnSelectEl = 
                    <FormControl margin={'dense'}>
                        <InputLabel shrink>Column</InputLabel>
                        <Select
                            
                            disabled = {this.state.saved}
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
                    </FormControl>;
                if(this.state.target.target_column && this.state.target.target_column[0]){
                    valueEl = this.valueForm(); 
                }
            } else if (this.state.target.target_table.length && this.state.target.modification === 'PUT') {
                console.log(`PUT and target_table present`);
                                columnSelectEl = 
                    <FormControl margin={'dense'}>
                        <InputLabel shrink>Column</InputLabel>
                        <Select
                            disabled = {this.state.saved}
                            value={this.state.target.target_column}
                            onChange={this.handleChange('target_column')}
                        >
                            {this.state.currentTable.map((column,i) => (
                                <MenuItem key={i} value={column.column_name}>
                                    {column.column_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>;
     
                if(this.state.target.target_column && this.state.target.target_column[0]){
                    valueEl = this.valueForm(); 
                    
                }
            }
        }

        if(this.state.saved){
            saveEdit = <button onClick = {this.handleEdit}>Edit</button>
        }
        // (this.state.target.target_column.length && document.getElementById('modificationValue').focus())
        console.log(`in render `, this.state);

        return(
            <div>
                <p>Target</p>
                {modificationEl}
                {tableEl}
                {columnSelectEl}
                {valueEl}
                {saveEdit}
            </div>
            
        )
    }
};

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(AddTarget);
