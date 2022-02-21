import React from "react";
import { Chart } from "react-charts";
import DickersParticipatedSampleData from './DickersParticipatedSampleData';
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



const SampleChart = () => {

    const { data } = DickersParticipatedSampleData({
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
            <h5>DICKERs Participated In</h5>
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

export default SampleChart;