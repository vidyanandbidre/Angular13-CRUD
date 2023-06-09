import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


  freshnessList = ["Brand New","Second hand","Refurbished"]
  productForm !: FormGroup;
  actionBtn : string = "Save"
  constructor(private formBuilder : FormBuilder,
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
     private dialogRef: MatDialogRef<DialogComponent>) {   }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      ProductName:['',Validators.required],
       category : ['',Validators.required],
       UesdTime : ['',Validators.required],
       Price : ['',Validators.required],
       date : ['',Validators.required] ,
       comment : ['',Validators.required]
    }) 
    if(this.editData){
      this.actionBtn = "update";
      this.productForm.controls['ProductName'].setValue(this.editData.ProductName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['UesdTime'].setValue(this.editData.UesdTime);
      this.productForm.controls['Price'].setValue(this.editData.Price);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }
  }
  addProduct(){
     if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value,)
        .subscribe({
          next : (res) =>{
            alert("product added successfully");
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error : () =>{
            alert ("Error while adding the product")
          }
        })
       }
     }else{
      this.updateProduct()
    }
  }
  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product upadted successfully")
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error While Updating Records");
      }
    })
  }
}
