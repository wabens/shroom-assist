import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import './TaskView.css'

// passed a target and renders form based on POST or PUT
// form takes value that will modify the database
class TargetForm extends Component {
    state = {
        ...this.props.target.modification_value
    }

    handleChange = column => event=>{
        // console.log(`handlechange target `, event, column);
        
        this.setState({
            [column]: event.target.value
        });
    }

    handleSave = () =>{
        let target = this.props.target;
        target.modification_value = this.state;
        // console.log(`handleSave target `, target);
        
        this.props.dispatch({ type: 'UPDATE_TARGET_VALUE', payload: target})
    }

    checkType = (columnName) => {
        let table = this.props.target.target_table;
        let tableTypes = [];
        if (table === 'growing_room'){
            tableTypes = this.props.reduxState.processDataTypes.growingRoomTypes;
        } else if (table === 'incubator'){
            tableTypes = this.props.reduxState.processDataTypes.incubatorTypes;
        }
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

    render(){

            let renderEl = 
                <form className={"target-form"}>
                    {this.props && this.props.target.target_column.map(column =>
                    <TextField
                    InputLabelProps={{ shrink: true }}
                    type={this.checkType(column)}
                    className={"form-field"}
                    label={column}
                    value={this.state[column]}
                    onChange={this.handleChange(column)}
                    margin="dense"
                    />)
                    }
                    {/* <button onClick={this.handleSave}>Save</button> */}
                </form>

        return(
            renderEl
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(TargetForm);