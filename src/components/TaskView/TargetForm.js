import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import './TaskView.css'

// passed a target and renders form based on POST or PUT
// form takes value that will modify the database
class TargetForm extends Component {
    state = {
        modification_value:{
            ...this.props.target.modification_value
        },
        importSelect: false,
        rowId: 'pick a row'

    }

    handleChange = column => event=>{        
        this.setState({
            [column]: event.target.value
        });
    }

    handleSave = () =>{
        let target = this.props.target;
        target.modification_value = this.state.modification_value;        
        this.props.dispatch({ type: 'UPDATE_TARGET_VALUE', payload: target})
    }

    checkType = (columnName) => {
        let table = this.props.target.target_table;
        let tableTypes = [];
        if (table === 'growing_room'){
            tableTypes = this.props.reduxState.processDataTypes.growingRoomTypes;
        } else if (table === 'incubator'){
            tableTypes = this.props.reduxState.processDataTypes.incubatorTypes;
        }
        for (let column of tableTypes) {
           if (column.column_name === columnName && column.data_type === 'integer') {
               console.log(`found type`, column);
               return 'number'
           } else if (column.column_name === columnName && column.data_type === 'timestamp without time zone') {
               console.log(`found type`, column);
               return 'date'
           }
        }
        return 'text'
    }

    handleImport = (field) => {

        let selected = this.props.reduxState.dataSelected.dataSelected.rowData && this.props.reduxState.dataSelected.dataSelected.rowData[0] || 'pick a row';
        console.log(`import reduxstate `, selected);
        this.setState({
            importSelect: true,
            rowId: selected
        })
        
    }

    render(){
        let renderEl = 
            (this.props && this.props.target.target_column.map(column =>
                <>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        type={this.checkType(column)}
                        className={"form-field"}
                        label={column}
                        value={this.state.modification_value[column]}
                        onChange={this.handleChange(column)}
                        margin="dense"
                    />
                    {this.props.target.modification==='PUT' && 
                    <div>
                        <button className={'default'} onClick = {()=>this.handleImport(column)}>
                            Import selected
                        </button>
                    </div>}
                </>
                )
            );
        let rowEl = null;
        
        console.log(`targetFomr state `, this.state);
        
        return(
        <form className={"target-form"}>
            {this.state.importSelect && 
            // <p>{this.props.reduxState.dataSelected.dataSelected}</p>
                <TextField
                        InputLabelProps={{ shrink: true }}
                        className={"form-field"}
                        label={'row id'}
                        value = {
                            this.state.rowId
                        }
                        // onChange={this.handleChange(column)}
                        margin="dense"
                />  
            }
            {renderEl}
        </form>

        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(TargetForm);