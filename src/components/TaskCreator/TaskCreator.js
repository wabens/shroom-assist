import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './TaskCreator.css'
import { connect } from 'react-redux';
import AddTarget from './AddTarget';
import AddConstraint from './AddConstraint';
const moment = require('moment');




class TaskCreator extends Component {

    state={
        name: '',
        description: '',
        targetList: [],
        constraintList:[]
    }

    componentDidMount(){
        this.props.dispatch({type: 'FETCH_USER'})
        this.props.dispatch({type: 'GET_GROWING_ROOM'})
        this.props.dispatch({type: 'GET_INCUBATOR'})
    }
    
    handleChange = field => event =>{
        console.log(`handleChange `, field, event.target.value);
        
        this.setState({
                ...this.state,
                [field]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();       
  
        this.props.dispatch({type: 'ADD_TASK', payload: this.state})
        this.setState({
            name: '',
            description: '',
            targetList: [],
            constraintList:[]
        })
    }

    saveTarget = target => {
        console.log(`in taskcreator saveTarget `, target);
                
        this.setState({
            targetList:[...this.state.targetList, target]
            
        })
    }

    editTarget = listPosition => {
        let targetList = this.state.targetList;
        targetList.splice(listPosition,1);
        console.log(`editTaret `, this.state);
        
    }

    saveConstraint = constraint => {
        console.log(`in save constraint `, constraint)
        this.setState({
            constraintList:[...this.state.constraintList, constraint]
        });
    }

    editConstraint = listPosition => {
        
        let constraintList = this.state.constraintList;
        constraintList.splice(listPosition, 1)
        console.log(`in editConstraint`, this.state.constraintList);

    }

    demoFillText=()=>{
        this.setState({
            name: 'Transfer to growing room',
            description: 'Transfer mushrooms from the incubator to the growing room. Find entries in the incubator database that are active and older than 30 days. Create a new row for the transfer in the growing room database.'
        })
    }

    render() {
        console.log(`taskcreator state `, this.state);
        
        return(
        <section className={'task-box'}>
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
                    className={"taskDescription"}
                    multiline
                    label="Description"
                    value={this.state.description}
                    onChange={this.handleChange('description')}
                    margin="dense"
                    variant="outlined"
                />
                <AddTarget 
                    saveTarget={this.saveTarget} 
                    editTarget={this.editTarget} 
                    listPosition = {this.state.targetList.length} 
                    list={this.state.targetList}
                />
                <AddTarget 
                    saveTarget={this.saveTarget} 
                    editTarget={this.editTarget} 
                    listPosition = {this.state.targetList.length} 
                    list={this.state.targetList}
                />
                <AddConstraint 
                    saveConstraint={this.saveConstraint} 
                    editConstraint={this.editConstraint} 
                    listPosition = {this.state.constraintList.length}
                    list={this.state.constraintList}
                />
                <AddConstraint 
                    saveConstraint={this.saveConstraint} 
                    editConstraint={this.editConstraint} 
                    listPosition = {this.state.constraintList.length}
                    list={this.state.constraintList}
                />
                <button onClick={this.handleSubmit}>Add task</button>
                <button className='hidden' onClick={this.demoFillText}></button>
            </form>
        </section>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(TaskCreator);
