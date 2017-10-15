import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, browserHistory, Route, IndexRoute, Redirect } from 'react-router';
import { Container, Row, Col } from 'reactstrap';
import './index.scss';

class Index extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col>
                            <div className="pinkRectangle">
                                <div className="yellowRectangle"></div>
                            </div>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col>

                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}



export default Index;      