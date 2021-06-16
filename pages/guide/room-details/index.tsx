import RoomPhotos from 'components/RoomPhotos/RoomPhotos';
import roomPhotosParam from 'components/RoomDetails/initValues';
import classes from './roomDetails.module.scss';

const RoomDetails = () => (
  <div className={classes.wrap}>
    <div className={classes.item}>
      <RoomPhotos roomPhotosParam={roomPhotosParam} />
    </div>
  </div>
);

export default RoomDetails;
