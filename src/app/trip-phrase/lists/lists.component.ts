import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { Platform } from '@ionic/angular';
import { Reference } from '../../shared/model/reference';
import { DatabaseService } from '../../shared/services/model/database.service';
import { ReferenceModelService } from '../../shared/services/model/reference-model.service';
import { SQLiteService } from '../../shared/services/model/sqlite.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.sass'],
})
export class ListsComponent implements OnInit, AfterContentInit {
  public subjects: Reference[] = [];

  constructor(
    public referenceModelService: ReferenceModelService,
    public dataBaseService: DatabaseService,
    public sqlite: SQLiteService,
    public platform: Platform
  ) {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.refreshData();
  }

  async refreshData(): Promise<void> {
    await customElements.whenDefined('jeep-sqlite');
    const jeepSqliteEl = document.querySelector('jeep-sqlite');
    if (jeepSqliteEl != null) {
      if (await jeepSqliteEl.isStoreOpen()) {
        const db = await this.dataBaseService.getDatabaseConnection();
        await db.open();
        await this.referenceModelService
          .getSubjects(db)
          .then((res) => console.log(res));
        await db.close();
      }
    }
  }
}
