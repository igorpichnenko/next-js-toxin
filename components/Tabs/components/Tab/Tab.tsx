import React from 'react';

type Props = {
  title: string;
};

const Tab: React.FC<Props> = ({ children }) => <div>{children}</div>;

export default Tab;
