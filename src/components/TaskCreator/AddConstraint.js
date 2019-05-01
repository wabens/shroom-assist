import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './TaskCreator.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

class AddConstraint extends Component {

    state={
        constraint:{
            constraint_table: '',
            constraint_column: '',
            constraint_comparison:{
                comparison: '',
                value: ''
            }
        },
        currentTable: [],
        saved: false
    }

    handleChange = field => event => {
        let value = event.target.value
        let currentTable = this.state.currentTable;
       if (field === 'constraint_table' && event.target.value==='incubator'){
            currentTable = this.props.reduxState.processDataTypes.incubatorTypes
       }else if (field === 'constraint_table' && event.target.value==='growing_room'){
            currentTable = this.props.reduxState.processDataTypes.growingRoomTypes
       }

       this.setState({
            constraint:{
                ...this.state.constraint,
                [field]: value
            },
            currentTable: currentTable
       })
    }

    comparisonForm = () => {
        console.log(`in value form`);
        let column = this.state.constraint.constraint_column;
        let dataType = this.typeCheck(column);

        return(
            <>
                <TextField
                    disabled = {this.state.saved}
                    InputLabelProps={{ shrink: true }}
                    type={dataType}
                    className={"formField"}    
                    label={'Value'}
                    value={this.state.constraint.constraint_comparison.value}
                    onChange={this.handleChangeComparison('value')}
                    margin="dense"
                >
                </TextField>
                    <TextField
                        className={"formField"}    
                        InputLabelProps={{ shrink: true }}
                        disabled = {this.state.saved} 
                        label={'Compare'}                   
                        select
                        value={this.state.constraint.constraint_comparison.comparison}
                        onChange={this.handleChangeComparison('comparison')}
                        margin={'dense'}
                    >
                        <MenuItem value={'>'}> > </MenuItem>
                        <MenuItem value={'>='}>>=</MenuItem>
                        <MenuItem value={'<'}>></MenuItem>
                        <MenuItem value={'<='}>>=</MenuItem>
                        <MenuItem value={'='}>=</MenuItem>
                    </TextField>
            </>    
        )
    }

    handleChangeComparison = field => event => {
        this.setState({
            constraint:{
                ...this.state.constraint,
                constraint_comparison:{
                    ...this.state.constraint.constraint_comparison,
                    [field]: event.target.value
                }
            }        
        })
    }

    typeCheck = (columnName) => {
       let tableTypes = this.state.currentTable
       for (let column of tableTypes) {
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

    handleSave = event => {
        console.log('in hanleSave ', this.props)

        this.props.saveConstraint(this.state.constraint);
        this.setState({
            ...this.state,
            saved: true,
            listPosition: this.props.listPosition

        })
    }

    handleEdit = event => {
        this.setState({
            ...this.state,
            saved: false
        })
        this.props.editConstraint(this.state.listPosition)
    }

    render() {
        let comparisonFormEl = null;
        let columnSelectEl = null;
        let saveEditEl = <button onClick={this.handleSave}>save</button>
;
        let tableEl =

                <TextField
                    className={"formField"}
                    select
                    label="Table"
                    value={this.state.constraint.constraint_table}
                    onChange={this.handleChange('constraint_table')}
                    margin="dense"
                    disabled={this.state.saved}
                >
                    <MenuItem value={'incubator'}>incubator</MenuItem>
                    <MenuItem value={'growing_room'}>growing_room</MenuItem>
                </TextField>
        
        if (this.state.constraint.constraint_table){
            columnSelectEl = 
                <FormControl margin={'dense'} >
                    <InputLabel shrink>Table</InputLabel>
                    <Select
                        disabled = {this.state.saved}
                        value={this.state.constraint.constraint_column}
                        onChange={this.handleChange('constraint_column')}
                    >
                        {this.state.currentTable.map((column,i) => (
                            <MenuItem key={i} value={column.column_name}>
                                {column.column_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>;
            if(this.state.constraint.constraint_column){
                comparisonFormEl = this.comparisonForm()
            }
        }

        if(this.state.saved){
            saveEditEl=<button onClick={this.handleEdit}>edit</button>

        }
        console.log(`constraint state in render `, this.state);
        return(
            <div>
                <p>Constraint</p>
                {tableEl}
                {columnSelectEl}
                {comparisonFormEl}
                {saveEditEl}
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(AddConstraint);