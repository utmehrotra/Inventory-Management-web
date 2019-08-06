import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import { logActions } from '../actions/logs';
import { IncrementComponent } from '../components/Counter';



class LogPage extends React.Component {
    componentDidMount() {
        const { pid } = this.props.match.params
        this.props.getProductLogs({page: 0, pid});
    }

    render() {
        const { logs } = this.props;
        const { pid } = this.props.match.params
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        
                    </Toolbar>
                </AppBar>
                <div className="row">
                <div className="col-md-12" style={{paddingLeft:50, paddingRight: 50}}>
                    <div className="row">
                        <div className="col-md-10">
                            <h3>Product Log </h3>
                        </div>   
                    </div>
                    
                    
                    {logs.loading && <em>Loading logs...</em>}
                    {logs.error && <span className="text-danger">ERROR: {logs.error}</span>}
                    {
                        logs.items &&
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product Id</TableCell>
                                    <TableCell>Product</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>User</TableCell>
                                </TableRow>
                                {logs.items.map(log => (
                                    <TableRow key={log._id}>
                                        <TableCell>
                                            {log.pid}
                                        </TableCell>
                                        <TableCell>
                                            {log.productName}
                                        </TableCell>
                                        <TableCell>
                                            {log.status ? "Product created" : log.quantity ? "Quantity changed by "+log.quantity : ""}
                                        </TableCell>
                                        <TableCell>
                                            {log.user}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableHead>
                            <TablePagination
                                component="div"
                                rowsPerPageOptions={[logs.meta.itemsOnPage]}
                                count={logs.meta.total}
                                rowsPerPage={logs.meta.itemsOnPage}
                                page={logs.meta.page}
                                backIconButtonProps={{
                                'aria-label': 'previous page',
                                }}
                                nextIconButtonProps={{
                                'aria-label': 'next page',
                                }}
                                onChangePage={(event, newPage) => this.props.getProductLogs({page: newPage, pid})}
                                // onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                        </Table>
                    }
                </div>
                </div>
            </div>
        );
    }
}


function mapState(state) {
    const { logs } = state;
    return { logs };
}

const actionCreators = {
    getProductLogs: logActions.getAll,
}

const connectedLogPage = connect(mapState, actionCreators)(LogPage);
export { connectedLogPage as LogPage };