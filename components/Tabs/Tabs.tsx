import { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import TabTitle from './components/TabTitle/TabTitle';
import classes from './tabs.module.scss';

type Props = {
  children: ReactElement[];
};

const Tabs = ({ children }: Props) => {
  const router = useRouter();
  const { query } = router;
  const { tab } = query;
  let startSelectedTab = 0;

  if (typeof tab === 'string') {
    startSelectedTab = Number.parseInt(tab, 10) - 1;
  }
  const [selectedTab, setSelectedTab] = useState(startSelectedTab);

  const handleClick = (evt: React.ChangeEvent<{}>, newValue: number) => {
    evt.preventDefault();
    setSelectedTab(newValue);
    router.push(`?tab=${newValue + 1}`);
  };

  return (
    <div>
      <div className={classes.wrap}>
        <div className={classes.tabListWrap}>
          <ul className={classes.tabList}>
            {children.map((item, index) => (
              <TabTitle
                key={index}
                title={item.props.title}
                index={index}
                selectedTab={selectedTab}
                handleClick={handleClick}
              />
            ))}
          </ul>
        </div>
      </div>
      {children[selectedTab]}
    </div>
  );
};

export default Tabs;
