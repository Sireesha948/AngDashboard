import { Component, OnInit ,} from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit{

 permalink:string='';
 imgSrc:any = './../../assets/image.jpg';
 selectedImg:any;
 categories!: Array<any>;
 
 postForm!: FormGroup;
 post:any;
formStatus: string = 'Add New';
docId:any  ;



  constructor(
    private categoryService: CategoriesService, 
    private fb: FormBuilder,
    private postService:PostsService,
    private route : ActivatedRoute,
                          ){
    this.route.queryParams.subscribe(val =>{

      this.docId = val['id'];
      if(this.docId){

        this.postService.loadOneData(val['id']).then((post: any) =>{
        
          this.post = post;
          this.postForm = this.fb.group({
  
            title: [this.post.title ,[Validators.required, Validators.minLength(10)]],
            permalink: [this.post.permalink,[Validators.required]],
            excerpt: [this.post.excerpt,[Validators.required, Validators.minLength(50)]],
            category: [`${this.post.category.categoryId}-${this.post.category.category}`,[Validators.required]],
            postImg: ['',[Validators.required]],
            content: [this.post.content, [Validators.required]],
            
         })
         this.imgSrc = this.post.postImgPath;
         this.formStatus = 'Edit';
     
        })
        
      }else{

        this.postForm = this.fb.group({
  
          title: ['' ,[Validators.required, Validators.minLength(10)]],
          permalink: ['',[Validators.required]],
          excerpt: ['',[Validators.required, Validators.minLength(50)]],
          category: ['',[Validators.required]],
          postImg: ['',[Validators.required]],
          content: ['', [Validators.required]],
          
       })

      }

      

    })                        
    
    
  }


ngOnInit(): void {

  this.categoryService.loadData().subscribe(val=>{
     this.categories = val;
  })
  
}




onTitleChanged($event:any){

  const title = $event.target.value;
  this. permalink = title.replace(/\s/g,'-');
 
}


showPreview($event:any){

  const reader = new FileReader();
  reader.onload = (e) =>{
    this.imgSrc = e.target?.result;
  }

  reader.readAsDataURL($event.target.files[0]);
  this.selectedImg = $event.target.files[0];

}

onSubmit(){


  let splitted = this.postForm.value.category.split('-');
  console.log(splitted);
  
  const postData: Post = {
    title: this.postForm.value.title,
    permalink:this.postForm.value.permalink,
    category:{
      categoryId: splitted[0],
      category: splitted[1]
    },
    postImgPath:'',
    excerpt:this.postForm.value.excerpt,
    content:this.postForm.value.content,
    isFeatured:false,
    views:0,
    status:'new',
    createdAt:new Date()

  }
   this.postService.uploadImage(this.selectedImg, postData, this.formStatus, this.docId);
   this.postForm.reset();
   this.imgSrc = './../../assets/image.jpg';

  }
saveData(){

}
}
