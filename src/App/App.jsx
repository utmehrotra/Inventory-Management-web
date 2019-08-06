import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../helpers/history';
import { alertActions } from '../actions/alert';
import { PrivateRoute } from '../components/PrivateRoute';
import { HomePage } from '../Home/Home';
import { LoginPage } from '../LoginPage/Login';
import { RegisterPage } from '../RegisterPage/Register';
import { CreateProductPage } from '../CreateProductPage/CreateProductPage';
import { LogPage } from '../LogPage/LogPage';


class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="row">
                <div className="col-sm-12">
                        {alert.message &&
                            <div className={`alert ${alert.type}`} style={{marginBottom: 0}}>
                                <div className="row">
                                    <div className="col-sm-11">
                                        {alert.message}
                                    </div>
                                    <div className="col-sm-1">
                                        <button onClick={this.props.clearAlerts}>X</button>
                                    </div>
                                </div>
                            </div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/create-product" component={CreateProductPage} />
                                <Route path="/logs/:pid" component={LogPage} />
                            </div>
                        </Router>
                    </div>
            </div>   
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };