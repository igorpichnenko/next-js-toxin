import LocalizedStrings from 'react-localization';
import { useEffect, useState, FC } from 'react';

import { State } from 'redux/rootReducer/rootReducer';

import { useRouter } from 'next/router';

import imageUploadLocale from 'public/locales/components/imageUpload/imageUpload';

import { useSelector } from 'react-redux';
import TransitionAlerts from 'components/TransitionAlerts/TransitionAlerts';
import defaultAva from './helpers';
import classes from './imageUpload.module.scss';

interface IImage {
  lastModified: number;
  lastModifiedDate?: {};
  name: string;
  size: number;
  type: string;
  webkitRelativePath?: string;
}

interface IImageUploadProps{
  onChange: (newItems: IImage, blobFile: Blob) => void;
}

const ImageUpload:FC<IImageUploadProps> = ({ onChange }) => {
  const auth = useSelector((state: State) => state.auth);
  const { image, error } = useSelector((state: State) => state.avatarImage);
  const [newImage, setNewImage] = useState(auth.image);

  useEffect(() => {
    if (image.length > 0) {
      setNewImage(image);
    }
  }, [image]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];

    if (file) {
      const blobFile = new Blob([file], { type: file.type });
      onChange(file, blobFile);
    }
  };

  const strings = new LocalizedStrings(imageUploadLocale);
  const { locale = 'ru' } = useRouter();
  strings.setLanguage(locale);

  const { imageAlt } = strings;

  return (<>
    <TransitionAlerts errorCode={error?.message} />
    <label>

      <div className={classes.container}>
        <div className={classes.imageContainer}>
          <img
            className={classes.img}
            src={newImage || defaultAva}
            alt={imageAlt}
          ></img>
        </div>
        Загрузить фото{' '}
        <input
          type="file"
          name="userFile"
          accept=".jpg, .jpeg, .png"
          className={classes.file}
          onChange={handleFileChange}
        />{' '}
      </div>
    </label>
    </>
  );
};

export default ImageUpload;
export type { IImage };
