import { useState, useEffect } from 'react';
import { PieChart as Chart, Pie, Cell } from 'recharts';
import PieChartLabel from './PieChartLabel/PieChartLabel';
import PieChartGradients from './PieChartGradients/PieChartGradients';
import classes from './pieChart.module.scss';

type CellNameType = 'excellent' | 'good' | 'ok' | 'poor';

interface IPieChartCellType {
  name: CellNameType;
  value: number;
}

interface IPieChartType {
  width: number;
  height: number;
  innerRadius: number;
  outerRadius: number;
  items: IPieChartCellType[];
}

interface IPieChartPropsTypes {
  pieChartParam: IPieChartType;
}

const PieChart = ({ pieChartParam }: IPieChartPropsTypes) => {
  const { width, height, innerRadius, outerRadius, items } = pieChartParam;

  const totalItemValue = items.reduce((sum, value) => sum + value.value, 0);

  const [ready, setReady] = useState<null | true>(null);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    ready && (
      <Chart width={width} height={height}>
        <defs>
          <PieChartGradients />
        </defs>

        <foreignObject x={0} y={0} width={width} height={height}>
          <PieChartLabel pieLabelParam={{ amount: totalItemValue }} />
        </foreignObject>

        <Pie
          data={items}
          cx={(width - 10) / 2}
          cy={(height - 10) / 2}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill={'#8884d8'}
          paddingAngle={3}
          dataKey={'value'}
        >
          {items.map((entry, key) => (
            <Cell key={`cell-${key}`} className={classes[entry.name]} stroke="transparent" />
          ))}
        </Pie>
      </Chart>
    )
  );
};

export default PieChart;
export type { IPieChartPropsTypes, IPieChartCellType, IPieChartType, CellNameType };
