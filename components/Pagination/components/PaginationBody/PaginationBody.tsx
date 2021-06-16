import { usePagination, UsePaginationProps } from '@material-ui/lab/Pagination';
import classes from './paginationBody.module.scss';

interface IPaginationBodyProps {
  count?: number;
  defaultPage?: number;
  onChange: UsePaginationProps['onChange'];
}

const PaginationBody = ({ count = 15, defaultPage = 1, onChange }: IPaginationBodyProps) => {
  const { items: paginationItems } = usePagination({
    count,
    defaultPage,
    siblingCount: 0,
    hidePrevButton: false,
    onChange,
  });

  const renderItems = paginationItems.map(({ page, type, selected, ...item }, index) => {
    let children = null;

    const isDottedElement = type === 'start-ellipsis' || type === 'end-ellipsis';

    if (isDottedElement) {
      children = <div className={`${classes.pagesButton} ${classes.pagesDotted}`}>...</div>;
    } else if (type === 'page') {
      children = (
        <button type="button" className={classes.pagesButton} {...item}>
          {page}
        </button>
      );
    } else if (type === 'next') {
      children = (
        <button
          type="button"
          className={classes.nextPage}
          title="переход на следующую страницу"
          {...item}
        >
          <svg className={classes.nextPageArrow} width="24" height="24">
            <use xlinkHref="#arrow-forward"></use>
          </svg>
        </button>
      );
    }

    const itemClass = selected
      ? `${classes.pagesItem} ${classes.pagesItemActive}`
      : classes.pagesItem;

    return (
      <li key={index} className={itemClass}>
        {children}
      </li>
    );
  });

  return (
    <div className={classes.pagination}>
      <div className={classes.wrap}>
        <div className={classes.links}>
          <ul className={classes.pages}>{renderItems}</ul>
        </div>
      </div>
    </div>
  );
};

export default PaginationBody;
export type { IPaginationBodyProps };
