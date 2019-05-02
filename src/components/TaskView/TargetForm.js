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
        this.setState({
            [column]: event.target.value
        });
    }

    handleSave = () =>{
        let target = this.props.target;
        target.modification_value = this.state;        
        this.props.dispatch({ type: 'UPDATE_TARGET_VALUE', payload: target})
    }

    typeCheck = (columnName) => {
        let tableTypes = this.state.currentTable
        for (let column of tableTypes) {
            if (column.column_name === columnName && column.data_type === 'integer') {
                return 'number'
            } else if (column.column_name === columnName && column.data_type === 'timestamp without time zone') {
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
                            type={this.typeCheck(column)}
                            className={"form-field"}
                            label={column}
                            value={this.state[column]}
                            onChange={this.handleChange(column)}
                            margin="dense"
                        />  
                    )}
                    <button onClick={this.handleSave}>Save</button>
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