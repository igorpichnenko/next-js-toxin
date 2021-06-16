import Radio from 'components/RadioGroup/Radio/Radio';
import { IRadioPropsTypes } from './Radio/Radio';
import classes from './radioGroup.module.scss';

interface IRadioSelected {
  name: string;
  value: string;
}

interface IRadioGroupPropsTypes {
  radioGroupParam: {
    name: string;
    variant?: string;
    items: IRadioPropsTypes[];
  };

  onChange: (newSelect: IRadioSelected) => void;
}

const RadioGroup = ({ radioGroupParam, onChange }: IRadioGroupPropsTypes) => {
  const { name, items, variant = 'hor' } = radioGroupParam;
  const cls = [classes.radioGroup, classes[variant]].join(' ');

  const handleRadioGroupChange = (valueSelected: string) => {
    onChange({ name, value: valueSelected });
  };

  return (
    <div className={cls}>
      {items.map((el, key: number) => (
        <div className={classes.item} key={`${name}-${el.value}-${key}`}>
          <Radio
            value={el.value}
            name={name}
            label={el.label}
            defaultChecked={el.defaultChecked}
            onChange={handleRadioGroupChange}
          />
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
export type { IRadioGroupPropsTypes };
