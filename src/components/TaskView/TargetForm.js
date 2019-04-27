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
        console.log(`handlechange target `, event, column);
        
        this.setState({
            [column]: event.target.value
        });
    }

    handleSave = () =>{
        let target = this.props.target;
        target.modification_value = this.state;
        console.log(`handSave target `, target);
        
        this.props.dispatch({ type: 'UPDATE_TARGET_VALUE', payload: target})
    }

    render(){


        console.log(`props targetForm`, this.props);
        
        console.log(`state targetForm `, this.state);
        


            let renderEl = 
                <form className={"target-form"}>
                    {this.props && this.props.target.target_column.map(column =>
                    <TextField
                    className={"form-field"}
                    label={column}
                    value={this.state[column]}
                    onChange={this.handleChange(column)}
                    margin="dense"
                    variant="outlined"
                    />)
                    }
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