import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Well } from '../model/well.model';
import { WellService } from '../service/well.service';
import { WellSearch } from '../model/well-search.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search-record',
  templateUrl: './search-record.component.html',
  styleUrls: ['./search-record.component.css']
})

export class SearchRecordComponent {
  displayedColumns=["uwi","wellname","state"];
  dataSource = new MatTableDataSource<Well>();
  searchCriteria:WellSearch={};
 
 constructor(private wellService:WellService){}
 
  ngOnInit() {
    this.dataSource.data = this.wellService.getAllWells();
  }

  onSubmit(form: NgForm)
  {
    this.searchCriteria.uwi = form.value.uwi;
    this.searchCriteria.wellname = form.value.wellname;
    this.searchCriteria.state = form.value.state;
    this.dataSource.data = this.wellService.searchWell(this.searchCriteria);
  }
}
