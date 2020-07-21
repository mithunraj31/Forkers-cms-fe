import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'frk-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
 //@varible source: list of key pair value
    // the data obtain from parent component 
    // use for display in ng2-smart-table
    // key property will display on first column
    // value property will display on second column
    // @type {{ key: string, value: string }[]}
    @Input() source: { key: string, value: string }[];

   //@variable tableSettings: use for config UI of ng2-smart-table
    //@type {any}
    tableSettings: any = {};

  
  // event information in array of key pair value format
  // @type {any[]}
  event: any[];

  constructor() {
      this.tableSettings = {
        // hide create, update, and delete row buttons from ng2-smart-table
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        // hide column header
        hideHeader: true,
        // hide filter row
        hideSubHeader: true,
        // the property contains column configurations.u
        columns: {
            key: {
                class: 'key-name',

            },
            value: {
                // data feild can add html element
                type: 'html'
            }
        },
        pager: {
            display: false
        }
    };
    }

  ngOnInit(): void {
  }

 

}
