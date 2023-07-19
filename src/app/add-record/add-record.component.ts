import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { WellService } from '../service/well.service';
import { Well } from '../model/well.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AngularFirestore, } from '@angular/fire/compat/firestore';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from 'src/environments/environment';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent {

  constructor(
    private firestore: AngularFirestore
    ){}


  uwi: any;
  wellname: any;
  state: any;

  async SendToFirebase(form: NgForm)
  {
    //collect inputs
    const uwi: any = form.value.uwi;
    const wellname: any = form.value.wellname;
    const state: any = form.value.state;
    //send inputs
    console.log(uwi);
    console.log(wellname);
    console.log(state);

    const well: Well = {uwi, wellname, state}
    //this.firestore.collection('wellData').doc(this.wellname).set(well);
    await setDoc(doc(db, "wellData", wellname), {
      uwi: uwi,
      wellname: wellname,
      state: state
    });
    
  }

}
