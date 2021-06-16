import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import '@firebase/firestore';
import ReduxSagaFb from 'redux-saga-firebase';
import { IFilterState } from 'components/FilterRoom/FilterRoom';
import { IReviewItem } from 'components/Review/Review';
import { IRemoveRequest } from 'redux/userRooms/userRoomsActions';
import { filterByCheckbox } from './helpers';
import { firebaseConfig } from './firebaseConfigs';
import 'firebase/storage';

interface IFirebaseConfigTypes {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  databaseURL: string;
}

interface IBookingDates {
  bookingStart: string;
  bookingEnd: string;
  uid: string;
}

interface IBookingGuestsItem {
  title: string;
  value: number;
  id: number;
}

class FirebaseApi {
  public app!: ReduxSagaFb;

  public db: firebase.firestore.Firestore;

  public fb: firebase.database.Database;

  constructor(config: IFirebaseConfigTypes) {
    this.init(config);
    this.db = firebase.firestore();
    this.fb = firebase.database();
  }

  public getAllRooms(payload: IFilterState) {
    const { rangeSlider } = payload;
    const [start, end] = rangeSlider;

    const roomsCollection = this.db.collection('rooms').orderBy('price').startAt(start).endAt(end);

    return filterByCheckbox(roomsCollection, payload).get();
  }

  public auth() {
    return this.app.auth;
  }

  public authWithEmailAndPassword() {
    return this.app.auth.signInWithEmailAndPassword;
  }

  public signOut() {
    return this.app.auth.signOut;
  }

  public signUp() {
    return this.app.auth.createUserWithEmailAndPassword;
  }

  public getDateBase() {
    return this.app.database.read;
  }

  public updateDB() {
    return this.app.database.update;
  }

  public removeBookedRoom(removeReq: IRemoveRequest) {
    return this.db
      .collection('rooms')
      .doc(removeReq.dbID)
      .update({
        bookingDates: firebase.firestore.FieldValue.arrayRemove({
          bookingEnd: removeReq.bookingEnd,
          bookingStart: removeReq.bookingStart,
          uid: removeReq.uid,
        }),
      });
  }

  public addComment(id: string, payload: IReviewItem) {
    return this.db
      .collection('rooms')
      .doc(id)
      .update({
        reviews: firebase.firestore.FieldValue.arrayUnion({
          ...payload,
        }),
      });
  }

  public removeComment(id: string, payload: IReviewItem) {
    return this.db
      .collection('rooms')
      .doc(id)
      .update({
        reviews: firebase.firestore.FieldValue.arrayRemove({
          ...payload,
        }),
      });
  }

  public patchDB() {
    return this.app.database.patch;
  }

  public getAuthChannel() {
    return this.app.auth.channel;
  }

  public getUserRooms(ids: number[]) {
    return this.db.collection('rooms').where('id', 'in', ids).limit(180).get();
  }

  public getRoomDetails(id: number) {
    return this.db.collection('rooms').where('id', '==', id).limit(1).get();
  }

  public updateBookingRoom(
    bookingDates: IBookingDates,
    bookingGuestsList: IBookingGuestsItem[],
    id: string,
  ) {
    this.db
      .collection('rooms')
      .doc(id)
      .update({
        bookingDates: firebase.firestore.FieldValue.arrayUnion({
          bookingStart: bookingDates.bookingStart,
          bookingEnd: bookingDates.bookingEnd,
          uid: bookingDates.uid,
          guestsList: bookingGuestsList,
        }),
      });
  }

  public updateBookingUser(bookingDates: IBookingDates, id: number) {
    const ref = this.fb.ref(`/users/${bookingDates.uid}/bookedRooms`);
    ref.once('value').then((snapshot) => {
      const num = String(snapshot.numChildren());
      ref.child(num).set({
        bookingStart: bookingDates.bookingStart,
        bookingEnd: bookingDates.bookingEnd,
        id,
      });
    });
  }

  public uploadFile(path: string, blobFile: Blob) {
    this.app.storage.uploadFile(path, blobFile);
  }

  public getDownloadURL() {
    return this.app.storage.getDownloadURL;
  }

  public addDocument() {
    return this.app.firestore.addDocument
  }

  private init(config: IFirebaseConfigTypes) {
    try {
      if (!firebase.apps.length) {
        this.app = new ReduxSagaFb(firebase.initializeApp(config));
      } else this.app = new ReduxSagaFb(firebase.app());
    } catch (err) {
      console.error(err.message, err.stack);
    }
  }
}

const firebaseApi = new FirebaseApi(firebaseConfig);

export default firebaseApi;
