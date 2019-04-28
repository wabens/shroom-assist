import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TaskView.css';
import TargetForm from './TargetForm'
import TableDrawer from '../TableDrawer/TableDrawer'




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
    }

    render(){
        let taskTargets=this.findTargets();
        let taskConstraints=this.findConstraints();
        console.log(`in render taskConstraints`, taskConstraints);
        
        return(
            <div className={'task-item'}>
                <p>{this.props.task.task_name}</p>
                <p>{this.props.task.description}</p>
                {taskTargets.map( target => 
                    <TargetForm key={target.target_id} target = {target}/>
                )}
                <TableDrawer taskConstraints={taskConstraints} />
                <button onClick={()=>this.handleComplete(taskTargets)}>Complete</button>
            </div>
        )
    }

}

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(TaskItem);