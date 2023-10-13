import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc, DocumentData,DocumentReference } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import {Observable,of} from "rxjs";// First you need to import Observable

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  constructor(private auth: Auth, private firestore: Firestore, private storage: Storage) { }

  getUserProfile(): Observable<any> {
    const user = this.auth.currentUser;
    if (user){
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef, { idField: 'id' });


    }else{
	    return of(false);
    }

  }

  async uploadImage(cameraFile: Photo) {
    const user = this.auth.currentUser;
    if (user){
    const path = `uploads/${user.uid}/profile.webp`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, (cameraFile.base64String ||""), 'base64');

      const imageUrl = await getDownloadURL(storageRef);

      if (user){
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, {
        imageUrl
      });
      }
      return true;
    } catch (e) {
      return null;
    }
    }else{
	    return null;
    }
  }
}
