import ReactMinimalPieChart from "react-minimal-pie-chart";
import * as React from "react";

interface Board {
  id: string;
  name: string;
  votes: number;
}

interface PieChartProps {
  values: Array<Board>;
}

const PieChart: React.FunctionComponent<PieChartProps> = ({ values }) => {
  const data = values.map(scoreboard => ({
    color: scoreboard.id === "0" ? "#9FB641" : "#5A91D3",
    title: scoreboard.name,
    value: scoreboard.votes
  }));
  return (
    <ReactMinimalPieChart
      animate={true}
      animationDuration={500}
      animationEasing="ease-out"
      data={data}
      label={true}
      labelPosition={50}
      labelStyle={{
        fill: "white",
        fontFamily: "sans-serif",
        fontSize: "5px"
      }}
      lengthAngle={180}
      lineWidth={100}
      paddingAngle={0}
      radius={50}
      rounded={false}
      startAngle={180}
    />
  );
};

export { PieChart };
