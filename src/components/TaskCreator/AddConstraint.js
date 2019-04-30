import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class AddConstraint extends Component {

    state={
        constraint:{
            constraint_table: '',
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

    render(){
        let columnSelectEl = null;
        let tableEl =
            <TextField
                className={"formField"}
                select
                label="Table"
                value={this.state.constraint.constraint_table}
                onChange={this.handleChange('constraint_table')}
                margin="dense"
                variant="outlined"
            >
                <option value={'incubator'}>incubator</option>
                <option value={'growing_room'}>growing_room</option>
            </TextField>;
        
        if (this.state.constraint.constraint_table.length){
            columnSelectEl = 
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
                </Select>;
        }
        console.log(`constraint state in render `, this.state);
        return(
            <div>
                <p>Constraint</p>
                {tableEl}
                {columnSelectEl}
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(AddConstraint);