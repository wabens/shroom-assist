import React, { Component } from 'react';
import { connect } from 'react-redux';

import TaskItem from './TaskItem';
import './TaskView.css';


class TaskView extends Component {


    getTaskInfo=() => {
        this.props.dispatch({type: "GET_TASK_LIST"});
        this.props.dispatch({type: "GET_TARGET_LIST"});
        this.props.dispatch({type: "GET_CONSTRAINT_LIST"});

    }
    
    componentDidMount(){
        this.getTaskInfo()
    }

    render(){
        console.log(`reduxstate taskView`, this.props.reduxState);
        let taskInfo = this.props.reduxState.taskInfo
        
        
        return(
            <section>
                <h1>Tasks</h1>
                <div className={'task-list'}>
                    {taskInfo.taskList.map( task => 
                            <TaskItem key={task.task_id} task={task} taskInfo={taskInfo}/>
                    )}
                </div>
            </section>
        )
    }

}

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(TaskView);