import React, {useState} from "react";
import ResizableBox from "./ResizableBox";
import {ButtonDropdown, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row} from "reactstrap";
import PropTypes from "prop-types";

//
// ReactStrap install
// npm install --save bootstrap@^4.0.0 reactstrap
//



const SuccessfulDickers = () => {

    const data = [
        {
            label: "Dickers",
            datum: [
                {
                    timeframe: 'YTD',
                    deals: 15,
                },
                {
                    timeframe: 'Past Month',
                    deals: 6
                },
                {
                    timeframe: 'This Week',
                    deals: 4
                },
                {
                    timeframe: 'Today',
                    deals: 2
                }
            ]
        }
    ]
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);
    let currentFilter = data[0].datum[0];

        return (
            <Container>
                <Row>
                    <ResizableBox>
                        <Row>
                            <Col>
                                <h5>Successful Dickers</h5>
                            </Col>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col xs={4}></Col>
                            <Col lg={0}>
                                <h5>{ currentFilter.timeframe }</h5>
                            </Col>
                            <Col xs={4}></Col>
                        </Row>
                        <Row>
                            <Col xs={4}></Col>
                            <Col lg={0}>
                                <h1>{ currentFilter.deals }</h1>
                            </Col>
                            <Col xs={4}></Col>
                        </Row>
                    </ResizableBox>
                </Row>
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col>
                        <ButtonDropdown isOpen={dropdownOpen} onClick={toggle} toggle={true} id={'successDropdown'}>
                            <DropdownToggle caret>
                                Filter Timeline
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Select Date Filter</DropdownItem>
                                <DropdownItem>YTD</DropdownItem>
                                <DropdownItem>This Month</DropdownItem>
                                <DropdownItem>This Week</DropdownItem>
                                <DropdownItem>Today</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </Col>
                </Row>
            </Container>
        );

}

ButtonDropdown.propTypes = {
    disabled: PropTypes.bool,
    direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
    group: PropTypes.bool,
    isOpen: PropTypes.bool,
    tag: PropTypes.string,
    toggle: PropTypes.func
};

DropdownToggle.propTypes = {
    caret: PropTypes.bool,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    'data-toggle': PropTypes.string,
    'aria-haspopup': PropTypes.bool
};

export default SuccessfulDickers;