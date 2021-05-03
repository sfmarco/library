import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '@services/user.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Alert } from '@utils/alerts';
import { Persona } from './domain/Persona';

@Component({
  selector: 'app-users-all',
  templateUrl: './users-all.component.html',
  styleUrls: ['./users-all.component.sass']
})
export class StudentsConsultComponent implements OnInit {

  displayedColumns: string[] = ['clave', 'name', 'sex', 'cel','typeUser', 'postalCode', 'delete'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private alert: Alert = new Alert();

  constructor( private _service: UserService) { }

  ngOnInit() {
    
    this.allStudents();
    this.dataSource.paginator = this.paginator;
  }
  
  allStudents() {
  
    this._service.consultStudents()
                  .subscribe(item => {
                    this.dataSource.data = item.map(item => new Persona(item));
                  });
  }

  questionDelete(student:any) { 
    
    Alert.questions("¿Está seguro de eliminar?")
              .then( option => {
                /* condicion ternario */
                (option.value) ? this.delete(student.id) : null;
                  /* if (option.value) {
                    this.delete(student.id);
                  } */
              });
  }
  delete(id:any) {
    
    this._service.delete(id)
                 .subscribe(() => {
                    this.allStudents(); 
                  });
  }

}