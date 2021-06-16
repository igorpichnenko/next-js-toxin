import PieChart, { IPieChartType } from 'components/PieChart/PieChart';
import Typography from 'components/Typography/Typography';
import classes from './impressions.module.scss';

interface IImpressionsTypes {
  impressionsParam: {
    title: string;
    legend: {
      ok: string;
      excellent: string;
      good: string;
      poor: string;
    };
    diagram: IPieChartType;
  };
}

const Impressions = ({ impressionsParam }: IImpressionsTypes) => {
  const { diagram, title, legend } = impressionsParam;

  return (
    <div className={classes.impressions}>
      <div className={classes.title}>
        <Typography variant="h2">{title}</Typography>
      </div>
      <div className={classes.diagram}>
        <PieChart pieChartParam={diagram} />
      </div>
      <div className={classes.legend}>
        <div className={[classes.item, classes.excellent].join(' ')}>{legend.excellent}</div>
        <div className={[classes.item, classes.good].join(' ')}>{legend.good}</div>
        <div className={[classes.item, classes.ok].join(' ')}>{legend.ok}</div>
        <div className={[classes.item, classes.poor].join(' ')}>{legend.poor}</div>
      </div>
    </div>
  );
};

export default Impressions;
export type { IImpressionsTypes, IPieChartType };
