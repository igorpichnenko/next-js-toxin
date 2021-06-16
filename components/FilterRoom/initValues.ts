enum Guests {
  adults = 'adults',
  children = 'children',
  babies = 'babies',
}

enum Rules {
  smoke = 'smoke',
  pets = 'pets',
  visitors = 'visitors',
}

enum Rooms {
  bedroom = 'bedroom',
  beds = 'beds',
  baths = 'baths',
}

enum RangeSlider {
  title = 'title',
}

enum CheckboxRich {
  passageTitle = 'passageTitle',
  passageText = 'passageText',
  helperTitle = 'helperTitle',
  helperText = 'helperText',
}

enum CheckboxList {
  breakfast = 'breakfast',
  table = 'table',
  chair = 'chair',
  crib = 'crib',
  tv = 'tv',
  shampoo = 'shampoo',
}

const checkboxParam = [
  { title: Rules.smoke, isChecked: false, text: '' },
  { title: Rules.pets, isChecked: false, text: '' },
  { title: Rules.visitors, isChecked: false, text: '' },
];

const checkboxRichParam = [
  {
    title: CheckboxRich.passageTitle,
    text: CheckboxRich.passageText,
    isChecked: false,
  },
  {
    title: CheckboxRich.helperTitle,
    text: CheckboxRich.helperText,
    isChecked: false,
  },
];

const checkboxListParam = [
  { title: CheckboxList.breakfast, isChecked: false, text: '' },
  { title: CheckboxList.table, isChecked: false, text: '' },
  { title: CheckboxList.chair, isChecked: false, text: '' },
  { title: CheckboxList.crib, isChecked: false, text: '' },
  { title: CheckboxList.tv, isChecked: false, text: '' },
  { title: CheckboxList.shampoo, isChecked: false, text: '' },
];

const rangeSliderParam = {
  valueFrom: 0,
  valueTo: 15000,
  separate: ' ',
  max: 15000,
  min: 0,
  postfix: '₽',
  title: RangeSlider.title,
};

const dropdownParam = [
  { title: Guests.adults, value: 0, id: 1 },
  { title: Guests.children, value: 0, id: 2 },
  { title: Guests.babies, value: 0, id: 3 },
];

const dropdownRoomParam = [
  { title: Rooms.bedroom, value: 0, id: 1 },
  { title: Rooms.beds, value: 0, id: 2 },
  { title: Rooms.baths, value: 0, id: 3 },
];

const initState = {
  dropdownGuest: [0, 0, 0],
  dropdownRoom: [0, 0, 0],
  datepicker: ['2021-05-14', '2021-05-19'],
  checkboxRule: [false, false, false],
  checkboxRich: [false, false],
  checkboxList: [false, false, false, false, false, false],
  rangeSlider: [0, 15000],
};

export {
  checkboxRichParam,
  checkboxParam,
  checkboxListParam,
  rangeSliderParam,
  dropdownParam,
  dropdownRoomParam,
  initState,
};
