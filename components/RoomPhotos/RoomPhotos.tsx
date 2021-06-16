import classes from './roomPhotos.module.scss';

interface IRoomImages {
  mainImage: string;
  auxImage: string[];
}

interface IRoomPhotosPropsTypes {
  roomPhotosParam: IRoomImages;
}

const RoomPhotos = ({ roomPhotosParam }: IRoomPhotosPropsTypes) => {
  const { mainImage, auxImage } = roomPhotosParam;

  return (
    <div className={classes.photosWrapper}>
      <div className={classes.mainCont}>
        <img className={classes.mainImage} src={mainImage} alt="main-image" />
      </div>
      <div className={classes.auxCont}>
        {auxImage.map((image, key) => (
          <div key={key} className={classes.auxItem}>
            <img className={classes.image} src={image} alt="auxillary-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomPhotos;
export type { IRoomImages };
