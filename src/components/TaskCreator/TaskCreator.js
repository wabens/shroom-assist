import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './TaskCreator.css'
import { connect } from 'react-redux';
import AddTarget from './AddTarget';
const moment = require('moment');




class TaskCreator extends Component {

    state={
        name: '',
        description: '',

    }

    componentDidMount(){
        this.props.dispatch({type: 'FETCH_USER'})
        this.props.dispatch({type: 'GET_GROWING_ROOM'})
        this.props.dispatch({type: 'GET_INCUBATOR'})
    }
    
    handleChange= field=>event=>{
        console.log(`handleChange `, field, event.target.value);
        
        this.setState({
            target:{
                ...this.state.target,
                [field]: event.target.value
            }
        })
    }

    handleFill = (event) =>{
        event.preventDefault();

    }

    handleSubmit = (event) => {
        event.preventDefault();
        let create_date = moment()
        console.log(`momment `, create_date);
        
        let task = {
            task_name: this.state.name,
            description: this.state.description,
            create_date: create_date,
            active: true,
            creator: 1

        }
        this.props.dispatch({type: 'ADD_TASK', payload: task})

    }

    render() {
        console.log(`state `, this.state);
        let modificationEl=null;
        let updateForm=
            <>
                {/* <TextField
                    className={"formField"}
                    label="Target Table"
                    value={this.state.target_table}
                    onChange={this.handleChange('target_table')}
                    margin="normal"
                    variant="outlined" 
                /> */}
                <p>Modify: {this.props.reduxState.dataSelected.currentTable}</p>
                <p>Column: {this.props.reduxState.dataSelected.dataSelected.columnName}</p>
                <p>From: {String(this.props.reduxState.dataSelected.dataSelected.value)}</p>
                <label>To:</label>
                <TextField
                    className={"formField"}
                    label="Value"
                    value={this.state.modification_value}
                    onChange={this.handleChange('modification_value')}
                    margin="dense"
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
                    margin="dense"
                    variant="outlined"
                />
                <TextField
                    className={"formField"}
                    label="Description"
                    value={this.state.description}
                    onChange={this.handleChange('description')}
                    margin="dense"
                    variant="outlined"
                />
                <AddTarget/>
                <button onClick={this.handleSubmit}>Add task</button>
            </form>
        </section>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(TaskCreator);
