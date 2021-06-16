import { CustomError } from 'services/helpers';
import { IImage } from 'components/ImageUpload/ImageUpload';
import ActionType from './imageUploadActionType';

type ImageUpload = IUploadImage | IGetImage | IUploadImageError | ISaveImage;

interface IUploadImage {
  type: ActionType.UPLOAD_IMAGE;
  payload: IImage;
  uid: string | null;
  blobFile: Blob;
}

interface IGetImage {
  type: ActionType.GET_IMAGE;
  payload: string;
}

interface IUploadImageError {
  type: ActionType.IMAGE_UPLOAD_ERROR;
  payload: CustomError;
}

interface ISaveImage {
  type: ActionType.SAVE_IMAGE
  payload: IImage
  uid: string | null
}

const uploadImage = (payload: IImage, uid: string | null, blobFile: Blob): IUploadImage => ({
  type: ActionType.UPLOAD_IMAGE,
  payload,
  uid,
  blobFile,
});

const getImage = (payload: string): IGetImage => ({
  type: ActionType.GET_IMAGE,
  payload,
});

const uploadImageError = (payload: CustomError): IUploadImageError => ({
  type: ActionType.IMAGE_UPLOAD_ERROR,
  payload,
});

const saveImage = (payload: IImage, uid: string | null): ISaveImage => ({
  type: ActionType.SAVE_IMAGE,
  payload,
  uid,
});

export { uploadImage, getImage, uploadImageError, saveImage };
export type { IUploadImage, ImageUpload };
