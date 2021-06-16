import sumWords, { ISumObject } from './sumWords';

const formatGuests = ({ itemList, locale }: ISumObject) => {
  const itemsToSum = [
    { ...itemList[0], value: itemList[0].value + itemList[1].value },
    itemList[2],
  ];

  return sumWords({ itemList: itemsToSum, locale });
};

export default formatGuests;
