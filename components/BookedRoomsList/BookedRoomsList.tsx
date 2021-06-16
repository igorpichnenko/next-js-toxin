import { IRemoveRequest } from 'redux/userRooms/userRoomsActions';

import BookedRoom, { IBookedRoom } from './BookedRoom/BookedRoom';
import classes from './bookedRoomsList.module.scss';

interface IBookedRoomsListPropTypes {
  bookedRoomsListParam: {
    bookedRoomsList: IBookedRoom[];
    onRemoveRoom: (props: IRemoveRequest) => () => void;
    uid: string;
  };
}

const BookedRoomsList = ({ bookedRoomsListParam }: IBookedRoomsListPropTypes) => {
  const { bookedRoomsList, onRemoveRoom, uid } = bookedRoomsListParam;

  return (
    <ul className={classes.roomsList}>
      {bookedRoomsList.map((room, key) => (
        <li key={`room-${key}`} className={classes.roomsItem}>
          <BookedRoom
            roomParam={room}
            onRemoveRoom={onRemoveRoom({
              roomKey: key,
              roomdID: room.id,
              dbID: room.dbID,
              bookingStart: room.bookingStart,
              bookingEnd: room.bookingEnd,
              uid,
            })}
          />
        </li>
      ))}
    </ul>
  );
};

export default BookedRoomsList;
export type { IBookedRoomsListPropTypes, IBookedRoom };
