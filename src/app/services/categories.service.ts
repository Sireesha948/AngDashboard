import { Injectable, OnInit } from '@angular/core';
import { Firestore,collection,addDoc,  deleteDoc, updateDoc, doc, collectionData} from '@angular/fire/firestore';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CategoriesService implements OnInit{
   
  userData!: Observable<any>;
  
  

  constructor(private afs: Firestore) { 

    const collectionInstance = collection(this.afs, 'categories');
    collectionData(collectionInstance, {idField: 'id'}).subscribe(val=>{
      console.log(val)
    })

      this.userData = collectionData(collectionInstance, {idField: 'id'});
  }

   ngOnInit(): void {
   }


  saveData(data: any){
    const collectionInstance = collection(this.afs, 'categories')
    addDoc(collectionInstance, data).then((docRef)=>{
        // console.log(docRef);
        alert('Data Insert Successfully..!');
       
   })
   

  }

  
  loadData(){
   return this.userData;
    }
    
  
  deleteData(id:any){

    const docInstance = doc(this.afs, 'categories',id);
    
    deleteDoc(docInstance)



   

 
  }

  updateData(id:any, EditData:any){

    const docInstance = doc(this.afs, 'categories', id);
    updateDoc(docInstance, EditData).then(()=>{
      alert("Data Updated successfully")
    })
    



  }

}



