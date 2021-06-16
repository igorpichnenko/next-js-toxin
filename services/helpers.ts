import { DocumentData, Query, QuerySnapshot } from '@firebase/firestore-types';
import { IFilterState } from 'components/FilterRoom/FilterRoom';
import { IBookedRoom } from 'components/BookedRoomsList/BookedRoom/BookedRoom';
import { IPieChartCellType } from 'components/PieChart/PieChart';
import { IReviewItem } from 'components/ReviewList/ReviewList';
import { IRoomFeatures } from 'components/Features/Features';
import { IRule } from 'components/Rules/Rules';

interface IBookingDate {
  uid: string;
  bookingStart: string;
  bookingEnd: string;
}

interface IRoomsProps {
  dbID: string;
  guestList: number[];
  id: number;
  bookingStart: string;
  bookingEnd: string;
  bookingDates: IBookingDate[];
  images: string[];
  isBreakfast: boolean;
  isCanSmoke: boolean;
  isCrib: boolean;
  isDesk: boolean;
  isFeedingChair: boolean;
  isGuestsPossible: boolean;
  isHelper: boolean;
  isLuxury: boolean;
  isPetsAllowed: boolean;
  isShampoo: boolean;
  isTelevision: boolean;
  isWideCorridor: boolean;
  number: string;
  numberBathrooms: number;
  numberBed: number;
  numberBedrooms: number;
  numberOfReviews: number;
  numberOfStars: number;
  guests: number;
  babies: number;
  price: number;
  collection: number;
  discount: number;
  impressionsAboutTheRoom: IPieChartCellType[];
  reviews: IReviewItem[];
  roomDetails: IRoomFeatures;
  rules: IRule[];
}

function dateRangeOverlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
  if (aStart <= bStart && bStart <= aEnd) return true; // b starts in a
  if (aStart <= bEnd && bEnd <= aEnd) return true; // b ends in a
  if (bStart < aStart && aEnd < bEnd) return true; // a in b
  return false;
}

function datesValid(bookingDates: IBookingDate[], pickerStart: Date, pickerEnd: Date) {
  if (!bookingDates || bookingDates.length === 0) return true;

  // start from false, if there is a single overlap the result is true
  const rangesOverlaps = bookingDates.reduce((sum, date) => {
    const { bookingStart, bookingEnd } = date;
    const startDate = new Date(bookingStart);
    const endDate = new Date(bookingEnd);

    const singleOverlap = dateRangeOverlaps(pickerStart, pickerEnd, startDate, endDate);

    return sum || singleOverlap;
  }, false);

  return !rangesOverlaps;
}

function filterRequest(data: QuerySnapshot<DocumentData>, payload: IFilterState) {
  const { dropdownGuest, dropdownRoom, datepicker } = payload;
  const [adult, children, babies] = dropdownGuest;
  const guests = adult + children;
  const [bedroom, bed, bathroom] = dropdownRoom;
  const [start, end] = datepicker;
  const pickerStart = new Date(start);
  const pickerEnd = new Date(end);

  const cards: IRoomsProps[] = [];

  data.forEach((room) => {
    const value = room.data() as IRoomsProps;

    if (value.numberBed < bed) return;
    if (value.numberBedrooms < bedroom) return;
    if (value.numberBathrooms < bathroom) return;

    if (value.guests < guests) return;
    if (value.babies < babies) return;

    const { bookingDates } = value;
    if (!datesValid(bookingDates, pickerStart, pickerEnd)) return;

    value.dbID = room.id;
    cards.push(value);
  });

  return cards;
}

function filterByCheckbox(
  data: Query<DocumentData>,
  { checkboxList, checkboxRule, checkboxRich }: IFilterState,
): Query<DocumentData> {
  const [isBreakfast, isDesk, isFeedingChair, isCrib, isTelevision, isShampoo] = checkboxList;
  const [isCanSmoke, isPetsAllowed, isGuestsPossible] = checkboxRule;
  const [isWideCorridor, isHelper] = checkboxRich;

  let collection = data;

  if (isBreakfast) {
    collection = collection.where('isBreakfast', '==', isBreakfast);
  }
  if (isCrib) {
    collection = collection.where('isCrib', '==', isCrib);
  }
  if (isDesk) {
    collection = collection.where('isDesk', '==', isDesk);
  }
  if (isFeedingChair) {
    collection = collection.where('isFeedingChair', '==', isFeedingChair);
  }
  if (isShampoo) {
    collection = collection.where('isShampoo', '==', isShampoo);
  }
  if (isTelevision) {
    collection = collection.where('isTelevision', '==', isTelevision);
  }

  if (isCanSmoke) {
    collection = collection.where('isCanSmoke', '==', isCanSmoke);
  }
  if (isPetsAllowed) {
    collection = collection.where('isPetsAllowed', '==', isPetsAllowed);
  }
  if (isGuestsPossible) {
    collection = collection.where('isGuestsPossible', '==', isGuestsPossible);
  }

  if (isWideCorridor) {
    collection = collection.where('isWideCorridor', '==', isWideCorridor);
  }
  if (isHelper) {
    collection = collection.where('isHelper', '==', isHelper);
  }

  return collection;
}

function bookedRoomsRequest(data: QuerySnapshot<DocumentData>, uid: string): IBookedRoom[] {
  const bookedRoomsList = [] as IBookedRoom[];

  // for each room selected
  data.forEach((room) => {
    // get room data
    const roomData = room.data() as IRoomsProps;

    // find all dates for selected user
    if (roomData.bookingDates) {
      roomData.bookingDates.forEach((date: IBookingDate) => {
        if (date.uid === uid) {
          bookedRoomsList.push({
            id: roomData.id,
            dbID: room.id,
            image: roomData.images[0],
            bookingStart: date.bookingStart,
            bookingEnd: date.bookingEnd,
            place: 'moscow',
            status: 'finished',
            cost: roomData.price,
            currency: 'rub',
          });
        }
      });
    }
  });

  return bookedRoomsList;
}

function formatRoom(data: QuerySnapshot<DocumentData>): IRoomsProps {
  let roomDetailsData = {} as IRoomsProps;

  data.forEach((room) => {
    roomDetailsData = room.data() as IRoomsProps;
    roomDetailsData.dbID = room.id;
  });

  return roomDetailsData;
}

enum ErrorCode {
  wrongPassword = 'wrongPassword',
  userNotFound = 'userNotFound',
  tooManyRequests = 'tooManyRequests',
  emailAlreadyInUse = 'emailAlreadyInUse',
  requiresRecentLogin = 'requiresRecentLogin',
  unknownError = 'unknownError',
  dropdownGuestIsNotIterable = 'dropdownGuestIsNotIterable',
  rangeSliderIsNotIterable = 'rangeSliderIsNotIterable',
}

type CustomError = {
  code: string;
  message: string;
};

function defineError(errorCode: string): ErrorCode {
  switch (errorCode) {
    case 'auth/wrong-password':
      return ErrorCode.wrongPassword;
    case 'auth/user-not-found':
      return ErrorCode.userNotFound;
    case 'auth/too-many-requests':
      return ErrorCode.tooManyRequests;
    case 'auth/email-already-in-use':
      return ErrorCode.emailAlreadyInUse;
    case 'auth/requires-recent-login':
      return ErrorCode.requiresRecentLogin;
    case 'dropdownGuest is not iterable':
      return ErrorCode.dropdownGuestIsNotIterable;
    case 'rangeSlider is not iterable':
      return ErrorCode.rangeSliderIsNotIterable;
    default:
      return ErrorCode.unknownError;
  }
}

export default filterRequest;
export type { IRoomsProps, CustomError };
export { bookedRoomsRequest, formatRoom, filterByCheckbox, defineError };
