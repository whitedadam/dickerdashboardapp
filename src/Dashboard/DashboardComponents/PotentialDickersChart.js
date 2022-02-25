import React from "react";
import { Chart } from "react-charts";
import ResizableBox from "./ResizableBox";
import PotentialDickersSampleData from './PotentialDickersSampleData'

const PotentialDickersChart = () => {

    const { data } = PotentialDickersSampleData({
        series: 1,
        datatype: "ordinal"
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
            <h5>Potential DICKERs</h5>
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