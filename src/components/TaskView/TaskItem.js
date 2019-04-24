import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TaskView.css';



class TaskItem extends Component {

    state={
        targetEl:'',
    }

    findTargets = ()=>{
        let targetEl=[];
        let targetList = (this.props.taskInfo.targetList)
        console.log(`findtargets `, targetList);

        for (let target of targetList){
            console.log(`target`, target);
            
            if (target.task_id === this.props.task.task_id){
                console.log(`set targetEL `);
                targetEl.push(<p>{target.target_table}, {target.modification}</p>)
            }
        }
        return targetEl
    }

    componentDidMount(){
    }

    render(){
        let targetEl=this.findTargets()
        
        return(
            <div className={'task-item'}>
                <p>{this.props.task.task_name}</p>
                <p>{this.props.task.description}</p>
                {targetEl}
            </div>
        )
    }

}

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(TaskItem);