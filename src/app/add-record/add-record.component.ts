import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { WellService } from '../service/well.service';
import { Well } from '../model/well.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent {

  constructor(private wellService:WellService,private _snackBar: MatSnackBar){}

  onSubmit(form: NgForm)
  {
    this.wellService.addWell(form.value)
    this._snackBar.open('Well Record Added','Success',{duration:4000});
  }

}
