import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, browserHistory, Route, IndexRoute, Redirect } from 'react-router';
import { Form, Field } from 'simple-react-forms';
import './index.scss';
import { Container, Row, Col } from 'reactstrap';
import Grid from './grid';

class Index extends Component {
    render() {
        return (
            <div>
                <div className="blueRectangle">
                    <div className="grid">
                        <Grid />
                    </div>
                    <Container>
                        <div className="whiteRectangle"></div>
                    </Container>

                </div>
            </div>
        );
    }
}



export default Index;      