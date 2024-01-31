import { Injectable } from '@angular/core';
import { Firestore , collection, addDoc, collectionData, getDoc, doc, getFirestore, updateDoc, deleteDoc, } from '@angular/fire/firestore';
import {  Storage, getDownloadURL,  uploadBytes, uploadBytesResumable, } from '@angular/fire/storage';
import {  Router } from '@angular/router';
import { finalize } from 'rxjs';
import { getStorage , ref, deleteObject} from '@angular/fire/storage';


import { map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PostsService {
  userData: any;
  

  constructor(private storage: Storage, private afs: Firestore, private router: Router) { }


  uploadImage(selectedImg: any, postData:any, formStatus:any, id:any){

     const filePath = `postIMG/${Date.now()}`;
     console.log(filePath);

     const storageRef = ref(this.storage, filePath);

      uploadBytes(storageRef, selectedImg).then(()=>{
        console.log("post image uploaded successfully");
        // this.storage.ref(filePath).getDownloadUrl();

        const imgurl = ref(this.storage, filePath);
        getDownloadURL(imgurl).then((URL)=>{
           postData.postImgPath = URL;
           console.log(postData);
           if(formStatus == 'edit'){

            this.updateData(id, postData)

           }else{
            this.saveData(postData)
           }

           const collectionInstance = collection(this.afs, 'posts');
           addDoc(collectionInstance, postData).then(docRef =>{
            // console.log(docRef);
            // this.saveData(postData);
            this.router.navigate(['post'])
           })

        })
        
      })

  }

  saveData(postData:any){
    const collectionInstance = collection(this.afs, 'posts');
    addDoc(collectionInstance, postData).then(docRef =>{
     // console.log(docRef);
     alert('Data Insert Successfully');
     this.router.navigate(['post'])
    });
  }



  loadData(){
        const collectionInstance = collection(this.afs, 'posts');
        collectionData(collectionInstance, {idField: 'id'}).subscribe(val=>{
        // console.log(val)
    })
    
      this.userData = collectionData(collectionInstance, {idField: 'id'});

         return this.userData;
         }

   async loadOneData(id:any){

        const db = getFirestore();
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    
   }   
   
   updateData(id:any, postData:any){

    const docInstance = doc(this.afs, 'posts', id);
    updateDoc(docInstance, postData).then(()=>{
      alert("Data Updated successfully")
      this.router.navigate(['/posts']);
    })
    
  }


  deleteImage(postImgPath: any, id:any){

    // this.storage.refFromUrl(postImgPath).delete();
    // const imageRef = this.storage.(postImgPath);
    // imageRef.delete()
    // const docInstance = doc(this.afs, 'posts',postImgPath);
    
    // deleteDoc(docInstance).then(()=>{
    //   this.deleteData(id);
    // })

    const desertRef = ref(this.storage, postImgPath);
    deleteObject(desertRef).then(()=>{
      this.deleteData(id);
    })

    



  }
  deleteData(id:any){
    const docInstance = doc(this.afs, 'posts',id);
    
    deleteDoc(docInstance).then(()=>{
        alert('Data Deleted ...!');
    })
  }


  markFeatured(id:any, featuredData:any){
    
    const docInstance = doc(this.afs, `posts/${id}`);
    updateDoc(docInstance, featuredData).then(()=>{
      alert("Data Updated successfully")
      
    })


  }
}
