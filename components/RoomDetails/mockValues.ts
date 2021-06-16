enum Names {
  ok = 'ok',
  excellent = 'excellent',
  good = 'good',
  poor = 'poor',
}

const impressionsParam = {
  title: 'Впечатления от номера',
  legend: {
    ok: 'Удовлетворительно',
    excellent: 'Великолепно',
    good: 'Хорошо',
    poor: 'Разочарован',
  },
  diagram: {
    width: 120,
    height: 120,
    innerRadius: 56,
    outerRadius: 60,

    items: [
      { name: Names.ok, value: 65, color: 'violet' },
      { name: Names.excellent, value: 130, color: 'yellow' },
      { name: Names.good, value: 65, color: 'green' },
      { name: Names.poor, value: 0, color: 'dark' },
    ],
  },
};

const reviewParam = {
  title: 'Отзывы посетителей номера',
  items: [
    {
      image: '/avatars/avatar-m.jpg',
      name: 'Мурад Сарафанов',
      surname: null,
      date: '5 дней назад',
      msg: 'Великолепный матрас на кровати в основной спальне! А пуфик вообще потрясающий. И стены, действительно, шумоподавляющие. Выкрикивал комплименты повару — никто не жаловался из соседей.',
      like: { amount: 12, active: true },
      userId: '2',
    },
    {
      image: '/avatars/avatar-f.jpg',
      name: 'Патрисия Стёклышкова',
      surname: null,
      date: 'Неделю назад',
      msg: 'Обслуживание на высоте! Всё аккуратно, чисто. Завтраки в номер советую заказать, каждый день новое блюдо и десерт как комплимент',
      like: { amount: 2, active: false },
      userId: '1',
    },
  ],
};

export { impressionsParam, reviewParam };
