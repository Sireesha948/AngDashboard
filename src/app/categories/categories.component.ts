import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
[x: string]: any;
categoryData: any;
formCategory:string | undefined;
formStatus:string | undefined = 'Add';
categoryId:string | undefined;



constructor(private categoryService: CategoriesService) {
  
} 



ngOnInit(): void {
  
   this.categoryService.loadData().subscribe(res=>{
    this.categoryData = res;
   });
   
  


}



onSubmit(formData:any) {

   let categoryData : Category= {
    category: formData.value.category,
   
   }
   if(this.formStatus == 'Add'){
    this.categoryService.saveData(categoryData);
    formData.reset()
   }
   else if(this.formStatus == 'Edit'){
      this.categoryService.updateData(this.categoryId, categoryData);
      formData.reset();
      this.formStatus = 'Add'

     
    }

  // this.categoryService.saveData(categoryData);
  // formData.reset() 
   
}

onEdit(category: any, id:any){
  this.formCategory = category;
  this.formStatus = 'Edit';
  this.categoryId = id;

}
onDelete(id:any){
  id=String(id)
  this.categoryService.deleteData(id);

  

}

}
