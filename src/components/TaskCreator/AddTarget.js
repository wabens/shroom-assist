import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';



class AddTarget extends Component {

    state= {
        target:{
            target_table: '',
            modification_value: {},
            modification: '',
            target_column:[],
        },
        currentTable: [],
        columnType: [],
        targetColumnCount:0
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
           target:{
               ...this.state.target,
               [field]: event.target.value,
               },
               currentTable
       })
    };

    handleColumnSelect = event => {
        let column = event.target.value;
        let targets = this.state.target.target_column;
        targets.push(column.column_name)
        console.log(`handleColumnSElect`, column, this.state.target);
        
        this.setState({
            target:{
                ...this.state.target,
                target_column: targets
            }
        })
    };

    render(){
        console.log(`in render `, this.state);
        let columnSelectEl=null;
        let tableEl = null;
        let valueEl = null;
        let modificationEl =            
            <TextField
                className={"formField"}
                select
                label="Type"
                value={this.state.target.modification}
                onChange={this.handleChange('modification')}
                margin="dense"
                variant="outlined"
            >
                <option value={'POST'}>Insert</option>
                <option value={'PUT'}>Update</option>
            </TextField>;

        
        if(this.state.target.modification.length){
            console.log(`addTarget modification`);
            tableEl =
                <TextField
                    className={"formField"}
                    select
                    label="Table"
                    value={this.state.target.target_table}
                    onChange={this.handleChange('target_table')}
                    margin="dense"
                    variant="outlined"
                >
                    <option value={'incubator'}>incubator</option>
                    <option value={'growing_room'}>growing_room</option>
                </TextField>;
            if(this.state.target.target_table.length && this.state.target.modification === 'PUT'){
                columnSelectEl = 
                    <TextField
                        className={"formField"}
                        select
                        label="Column"
                        value={this.state.target.target_column[this.state.targetColumnCount]||''}
                        onChange={this.handleColumnSelect}
                        margin="dense"
                        variant="outlined"
                    >
                    {this.state.currentTable.map((column,i) => 
                        <option value={column} key={i}>{column.column_name}</option>    
                    )}
                    </TextField>;
                // if(this.state..length){
                    
                // }
            } else if (this.state.modification === 'POST') {

            }
        }


        return(
            <div>
                <p>Target</p>
                {modificationEl}
                {tableEl}
                {columnSelectEl}
                {valueEl}
            </div>
            
        )
    }
};

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(AddTarget);
