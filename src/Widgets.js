import React from "react";
import './App.css';

class Widgets extends React.Component {
    render () {
        return (
            <div className={'widgets'}>
                <p>Potential Dickers</p>
                <div className={'potentialDicker'}>
                </div>
                <p>Dickers Participated In</p>
                <div className={'participatedDicker'}>
                </div>
                <p>Successful Dickers</p>
                <div className={'successfulDicker'}>
                </div>
            </div>
        );
    }
}
export default Widgets;
