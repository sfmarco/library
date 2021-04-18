import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BooksService } from 'src/app/shared/services/books.service';
import * as Regex from '@utils/regex';
import { Alert } from "@utils/alerts";


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit {

  bookForm : FormGroup;
  //public book: Book = new Book(data: any);

  private alert: Alert = new Alert();
  id: number

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private _service: BooksService,
    private route: ActivatedRoute
    ){ 
      this.route.paramMap.subscribe((params:ParamMap)=> [
        this.id = +params.get('id')
      ]);
    }

  ngOnInit() {
    this.validators();
    this.validation();  
  }

  validation() {
    if (this.id > 0) {
      this._service.consultById(this.id).subscribe( item => {
        this.bookForm.patchValue(item);
      });
    }
  }

  create() {
    if (this.id > 0) {
      this._service.update(this.id, this.bookForm.value).subscribe();
    } else {
      this._service.create(this.bookForm.value).subscribe(); 
    }
  }

  alerta() {
    this.alert.questions('Esta seguro de eliminar el elemento?')
    .then((result) => {
      if (result.value) {
      }
    });
  }
 
  testRouter() {
    this.router.navigate(['/home/all-book'])
  }

  validators() {
    this.bookForm = this.fb.group({
      name:['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.pattern(Regex.name)
      ]],
      editorial:['', [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(30), 
        Validators.pattern(Regex.name)
      ]],
      author:['', [
        Validators.required,
        Validators.minLength(3), 
        Validators.maxLength(30), 
        Validators.pattern(Regex.name)
      ]], 
      gender:['', [
        Validators.required,
        Validators.minLength(3), 
        Validators.maxLength(30), 
        Validators.pattern(Regex.name)
      ]],
      nPage:['', [
        Validators.required,
        Validators.minLength(2), 
        Validators.maxLength(10), 
        Validators.pattern(Regex.numeric)
      ]],
      yearEdicion:['', [
        Validators.required,
        Validators.minLength(4), 
        Validators.maxLength(30), 
        Validators.pattern(Regex.numeric)
      ]]
    });
  }

}
