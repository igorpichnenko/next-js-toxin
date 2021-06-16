const reviewLocale = {
  ru: {
    ago: 'назад',
    years: ['лет', 'год', 'года', 'лет'],
    months: ['месяцев', 'месяц', 'месяца', 'месяцев'],
    weeks: ['недель', 'неделя', 'недели', 'недель'],
    days: ['дней', 'день', 'дня', 'дней'],
    today: 'Сегодня',
  },
  en: {
    ago: 'ago',
    years: ['years', 'year', 'years', 'years'],
    months: ['months', 'month', 'months', 'months'],
    weeks: ['weeks', 'week', 'weeks', 'weeks'],
    days: ['days', 'day', 'days', 'days'],
    today: 'Today',
  },
  ua: {
    ago: 'назад',
    years: ['років', 'рік', 'року', 'років'],
    months: ['місяців', 'місяць', 'місяці', 'місяців'],
    weeks: ['тижнів', 'тиждень', 'тижні', 'тижнів'],
    days: ['днів', 'день', 'дня', 'днів'],
    today: 'Сьогодні',
  },
};

const personCommentLocale = {
  ru: {
    personName: 'Аноним',
    removeButton: 'удалить комментарий',
  },
  en: {
    personName: 'Anonymous',
    removeButton: 'delete comment',
  },
  ua: {
    personName: 'Анонім',
    removeButton: 'видалити коментар',
  },
};

export default reviewLocale;
export { personCommentLocale };
