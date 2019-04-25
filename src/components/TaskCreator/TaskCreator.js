import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './TaskCreator.css'
import { connect } from 'react-redux';



class TaskCreator extends Component {

    state={
        name: '',
        description: '',
        target_table: '',
        modification_value: '',
        modification: '',
    }


    handleChange= field=>event=>{
        this.setState({
            ...this.state,
            [field]: event.target.value
        })
    }

    handleFill = (event) =>{
        event.preventDefault();

    }
    render() {
        console.log(`state `, this.state);
        let modificationEl=null;
        let updateForm=
            <>
                <TextField
                    className={"formField"}
                    label="Target Table"
                    value={this.state.target_table}
                    onChange={this.handleChange('target_table')}
                    margin="normal"
                    variant="outlined" 
                />
                <label>{this.props.reduxState.dataSelected.dataSelected.columnName}:</label>
                <TextField
                    className={"formField"}
                    label="Value"
                    value={this.state.modification_value}
                    onChange={this.handleChange('modification_value')}
                    margin="normal"
                    variant="outlined" 
                />
            </>;
        if(this.state.modification==='PUT'){
            modificationEl = updateForm
        }
        else if( this.state.modification==='POST'){
            modificationEl=null;
        }
        
        return(
        <section>
            <h1>Task Creator</h1>
            <form className={"taskForm"}>
                <TextField
                    className={"formField"}
                    label="Name"
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    className={"formField"}
                    label="Description"
                    value={this.state.description}
                    onChange={this.handleChange('description')}
                    margin="normal"
                    variant="outlined"
                />
                <div>
 

                    <TextField
                        className={"formField"}
                        select
                        label="Type"
                        value={this.state.modification}
                        onChange={this.handleChange('modification')}
                        margin="normal"
                        variant="outlined"
                    >
                        <option value={'POST'}>Insert</option>
                        <option value={'PUT'}>Update</option>
                    </TextField>
                    {modificationEl}
                    <button onClick={this.handleFill}>add selected data</button>
                </div>
            </form>
        </section>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(TaskCreator);
