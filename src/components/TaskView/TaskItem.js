import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TaskView.css';
import TargetForm from './TargetForm'
import TableDrawer from '../TableDrawer/TableDrawer'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



class TaskItem extends Component {

    findConstraints=()=>{
        let taskConstraints = [];
        let constraintList = this.props.taskInfo.constraintList;
        for (let constraint of constraintList){
            if (constraint.task_id === this.props.task.task_id){
                taskConstraints.push(constraint);
            }
        }
        return taskConstraints
    }

    findTargets = ()=>{
        let taskTargets=[];
        let targetList = (this.props.taskInfo.targetList)

        for (let target of targetList){
            //console.log(`target`, target);
            
            if (target.task_id === this.props.task.task_id){
                taskTargets.push(target)
            }
        }
        return taskTargets
    }

    handleComplete = (taskTargets) => {
        for (let target of taskTargets){
            if (target.modification==='POST'){
                this.props.dispatch({type: 'TARGET_POST', payload: target})
            }
            else if (target.modification==='PUT'){
                this.props.dispatch({type: 'TARGET_PUT', payload: target})

            }
        }
        this.props.dispatch({type: 'COMPLETE_TASK', payload:this.props.task});
    }

    handleDelete = (task) => {
        this.props.dispatch({type: 'DELETE_TASK', payload: task})
    }

    render(){
        let taskTargets=this.findTargets();
        let taskConstraints=this.findConstraints();
        let activeStatus = '';
        console.log(`in render task`, this.props.task.active);
        if(this.props.task.active===false){
            console.log(`active task`);
            activeStatus='inactive';
        }
        return(
            <div className={activeStatus}>
                <ExpansionPanel className={'target-expand'}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <p>{this.props.task.task_name}</p>
                        <p>{this.props.task.description}</p>
                    </ExpansionPanelSummary>
                    {taskTargets.map( target => 
                        <TargetForm key={target.target_id} target = {target}/>
                    )}
                    <TableDrawer taskConstraints={taskConstraints} />
                    <button onClick ={()=>this.handleDelete(this.props.task)}>Delete</button>
                    <button onClick={()=>this.handleComplete(taskTargets)}>Complete</button>
                </ExpansionPanel>
            </div>
        )
    }

}

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(TaskItem);