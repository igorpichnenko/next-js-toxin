import { useState, ChangeEvent } from 'react';
import PaginationBody, { IPaginationBodyProps } from './components/PaginationBody/PaginationBody';
import PaginationOverview from './components/PaginationOverview/PaginationOverview';

interface IPaginationProps extends IPaginationBodyProps {
  withOverview?: boolean;
}

const Pagination = ({
  count = 15,
  defaultPage = 1,
  withOverview = true,
  onChange,
}: IPaginationProps) => {
  const [calculatedPage, setCalculatedPage] = useState(defaultPage);

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    if (onChange) {
      onChange(event, page);
    }

    setCalculatedPage(page);
  };

  return (
    <div>
      <PaginationBody count={count} defaultPage={defaultPage} onChange={handleChange} />
      {withOverview ? <PaginationOverview page={calculatedPage} /> : ''}
    </div>
  );
};

export default Pagination;
