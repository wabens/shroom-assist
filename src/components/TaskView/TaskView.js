import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';


class TaskView extends Component {


    
    componentDidMount(){
        this.props.dispatch({type: "GET_TASK_LIST"})
        this.props.dispatch({type: "GET_TARGET_LIST"})
        this.props.dispatch({type: "GET_CONSTRAINT_LIST"})
    }
    render(){
        return(
            <section>
                <h1>Tasks</h1>
                <Grid container>
                    
                </Grid>
            </section>
        )
    }

}

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(TaskView);