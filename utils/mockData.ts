enum Gender {
  female = 'female',
  male = 'male',
}

const radioGroupParam = {
  name: 'gender',
  items: [
    {
      value: 'male',
      defaultChecked: true,
      label: Gender.male,
    },
    {
      value: 'female',
      defaultChecked: false,
      label: Gender.female,
    },
  ],
};

const cardsInit = [];

const cardRoom = {
  imagesSrc: ['/image.jpg', '/image.jpg', '/image.jpg', '/image.jpg'],
  number: 888,
  type: 'люкс',
  price: 9990,
  reviews: 145,
};

while (cardsInit.length < 60) {
  cardsInit.push(cardRoom);
}

let count = 1;

const cardsParam = cardsInit.map((card) => {
  const newCard = Object.create(card);
  newCard.number += count;
  count += 1;
  return newCard;
});

export { radioGroupParam, cardsParam };
