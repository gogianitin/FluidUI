import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Well } from '../model/well.model';
import { PeriodicElement } from '../model/periodic-element.model';
import { WellService } from '../service/well.service';
import { WellSearch } from '../model/well-search.model';
import { MatTableDataSource } from '@angular/material/table';
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import {db} from "src/environments/environment";
import {MatIconModule} from '@angular/material/icon'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { collection, query, where, getDocs } from "firebase/firestore";@Component({

  selector: 'app-search-record',
  templateUrl: './search-record.component.html',
  styleUrls: ['./search-record.component.css']
})



export class SearchRecordComponent {
  
  
  constructor(
    public firestore: AngularFirestore,
    private wellService:WellService,
    
    ){}
  
  
  
  
  toggle = true;
  lockType = String("lock");
  selectedWell: Well = { uwi:'Select a Well', wellname:'Select a Well', state:'Select a Well' };
  displayedColumns=["uwi","wellname","state"];
  dataSource = new MatTableDataSource<Well>();
  clickedRows = new Set<PeriodicElement>();;

  searchCriteria:WellSearch={};
 
 //constructor(private wellService:WellService){}
 
 ngOnInit() {
  this.getSnapsot();
}

toggleEdit()
{
  this.toggle = !(this.toggle);
}

toggleLockType()
{
  if(this.lockType == "lock")
  {
    this.lockType = String("lock_open");
  }
  else
  {
    this.lockType = String("lock");
  }
}

async getSnapsot() {
  const tempWells: Well[] = [];
  const querySnapshot = await getDocs(collection(db, 'wellData'));
  querySnapshot.forEach((doc) => {
    const uwi: string = doc.data()['uwi'];
    const state: string = doc.data()['state'];
    const wellname: string = doc.data()['wellname'];

    const tempWell: Well = { uwi, wellname, state };
    tempWells.push(tempWell);
  });

  this.dataSource.data = tempWells;
}



  async onSubmit(form: NgForm)
  {
    this.searchCriteria.uwi = form.value.uwi;
    this.searchCriteria.wellname = form.value.wellname;
    this.searchCriteria.state = form.value.state;
    this.dataSource.data = await this.wellService.searchWell(this.searchCriteria);
  }

  async onSubmitEdit(form: NgForm)
  {
    if(form.value.uwi != '')
    {
      this.searchCriteria.uwi = form.value.uwi;
    }
    else
    {
      this.searchCriteria.uwi = this.selectedWell.uwi;
    }

    if(form.value.wellname != '')
    {
      this.searchCriteria.wellname = form.value.wellname;
    }
    else
    {
      this.searchCriteria.wellname = this.selectedWell.wellname;
    }
    
    if(form.value.state != '')
    {
      this.searchCriteria.state = form.value.state;
    }
    else
    {
      this.searchCriteria.state = this.selectedWell.state;
    }

    console.log(this.searchCriteria.uwi, this.searchCriteria.wellname, this.searchCriteria.state);
    this.wellService.updateWell(this.searchCriteria);
    this.ngOnInit();
  }

  async onSubmitDelete(form: NgForm)
  {
    if(form.value.uwi != '')
    {
      this.searchCriteria.uwi = form.value.uwi;
    }
    else
    {
      this.searchCriteria.uwi = this.selectedWell.uwi;
    }

    if(form.value.wellname != '')
    {
      this.searchCriteria.wellname = form.value.wellname;
    }
    else
    {
      this.searchCriteria.wellname = this.selectedWell.wellname;
    }
    
    if(form.value.state != '')
    {
      this.searchCriteria.state = form.value.state;
    }
    else
    {
      this.searchCriteria.state = this.selectedWell.state;
    }

    console.log(this.searchCriteria.uwi, this.searchCriteria.wellname, this.searchCriteria.state);
    this.wellService.deleteWell(this.searchCriteria);
    this.ngOnInit();
  }
  
}
