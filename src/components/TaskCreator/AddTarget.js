import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';



class AddTarget extends Component {

    state= {
        target_table: '',
        modification_value: '',
        modification: '',
        currentTable: [],
    }
    
   handleChange = field => event => {
       console.log(`handleChange `, field, event.target.value);
       let currentTable = this.state.currentTable;
       if (field === 'target_table' && event.target.value==='incubator'){
            currentTable = this.props.reduxState.processDataTypes.incubatorTypes
       }else if (field === 'target_table' && event.target.value==='growing_room'){
            currentTable = this.props.reduxState.processDataTypes.growingRoomTypes
       }
       this.setState({
               ...this.state,
               [field]: event.target.value,
               currentTable,
       })
   }
    render(){
        console.log(`in render `, this.state);
        
        let tableEl = null;
        let modificationEl =            
            <TextField
                className={"formField"}
                select
                label="Type"
                value={this.state.modification}
                onChange={this.handleChange('modification')}
                margin="dense"
                variant="outlined"
            >
                <option value={'POST'}>Insert</option>
                <option value={'PUT'}>Update</option>
            </TextField>;
        let columnSelectEl = 
            <TextField
                className={"formField"}
                select
                label="Choose Column"
                value={this.state.modification}
                onChange={this.handleChange('target_column')}
                margin="dense"
                variant="outlined"
            >

            </TextField>;
        
        if(this.state.modification.length){
            console.log(`addTarget modification`);
            tableEl =
                <TextField
                    className={"formField"}
                    select
                    label="Table"
                    value={this.state.target_table}
                    onChange={this.handleChange('target_table')}
                    margin="dense"
                    variant="outlined"
                >
                    <option value={'incubator'}>incubator</option>
                    <option value={'growing_room'}>growing_room</option>
                </TextField>;
            if(this.state.modification === 'PUT'){
                
            } else if (this.state.modification === 'PUT') {

            }
        }


        return(
            <div>
                <p>Target</p>
                {modificationEl}
                {tableEl}
            </div>
            
        )
    }
};

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(AddTarget);
