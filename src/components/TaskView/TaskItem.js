import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TaskView.css';



class TaskItem extends Component {


    findTargets = ()=>{
        let taskTargets=[];
        let targetList = (this.props.taskInfo.targetList)

        for (let target of targetList){
            console.log(`target`, target);
            
            if (target.task_id === this.props.task.task_id){
                console.log(`set targetEL `);
                //targetEl.push(<p>{target.target_table}, {target.modification}</p>)
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
            // else if (target.modification==='PUT'){
            //     this.props.dispatch({type: 'TARGET_PUT', payload: target})

            // }
        }
    }

    render(){
        let taskTargets=this.findTargets();

        return(
            <div className={'task-item'}>
                <p>{this.props.task.task_name}</p>
                <p>{this.props.task.description}</p>
                {taskTargets.map( target => 
                <p>{target.target_table}, {target.modification}</p>)}
                <button onClick={()=>this.handleComplete(taskTargets)}>Complete</button>
            </div>
        )
    }

}

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(TaskItem);