import React from "react";
import { Chart } from "react-charts";
import PotentialDickersSampleData from './SuccessfulDickersSampleData';
import ResizableBox from "./ResizableBox";
//
// ReactStrap install
// npm install --save bootstrap@^4.0.0 reactstrap
//

/*const data = [
    {
        label: "React Charts",
        data: [
            {
                date: 'January 1st, 2021',
                stars: 202123,
            }
            // ...
        ]
    },
    {
        label: "React Query",
        data: [
            {
                date: 'October 20th, 2021',
                stars: 10234230,
            }
            // ...
        ]
    }
]*/



const PotentialDickersChart = () => {

    const { data } = PotentialDickersSampleData({
        series: 1,
        dataType: "time",
    });

    const primaryAxis = React.useMemo(
        () => ({
            getValue: datum => datum.primary,
        }),
        []
    );

    const secondaryAxes = React.useMemo(
        () => [
            {
                getValue: datum => datum.secondary,
            },
        ],
        []
    );

    return (
        <ResizableBox>
            <h5>Potential Dickers</h5>
            <Chart
                options={{
                    data,
                    primaryAxis,
                    secondaryAxes,
                }}
            />
        </ResizableBox>
    );
}

export default PotentialDickersChart;