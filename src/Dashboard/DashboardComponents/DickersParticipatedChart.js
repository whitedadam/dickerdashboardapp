import React from "react";
import { Chart } from "react-charts";
import DickersParticipatedSampleData from './DickersParticipatedSampleData';
import ResizableBox from "./ResizableBox";
import acceptedOffers from '../../acceptedOffer-data'

const SampleChart = () => {

    const { data } = DickersParticipatedSampleData({
        series: 3,
        dataType: "ordinal",
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