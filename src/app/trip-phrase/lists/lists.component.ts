import { Component, OnInit } from '@angular/core';
import { Reference } from '../../shared/model/reference';
import { DatabaseService } from '../../shared/services/model/database.service';
import { ReferenceModelService } from '../../shared/services/model/reference-model.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.sass'],
})
export class ListsComponent implements OnInit {
  public subjects: Reference[] = [];

  constructor(public referenceModelService: ReferenceModelService,public dataBaseService: DatabaseService) {}

  ngOnInit(): void {
   this.refreshData()
  }

  async refreshData() : Promise<void>{
    const db = await this.dataBaseService.getDatabaseConnection();
    this.referenceModelService.getSubjects(db).then((res)=>console.log(res));
  }
}
