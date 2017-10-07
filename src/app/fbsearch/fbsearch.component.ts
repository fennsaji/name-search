import { SearchService } from './search.service';
import { Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// import * as FacebookSearch from 'facebook-search';
import { Http } from '@angular/http';

@Component({
  selector: 'app-fbsearch',
  templateUrl: './fbsearch.component.html',
  styleUrls: ['./fbsearch.component.css'],
  providers: [SearchService]
})
export class FbsearchComponent implements OnInit {
  filteredresult = [];
  size = 0;
  name: string;
  nonefound = false;

  constructor( private ser: SearchService) {}

  ngOnInit() {}

  onClick(search: HTMLInputElement) {
    this.name = search.value;
    this.ser.loggedIn.subscribe(
      (value) => {
        if (value) {
          this.ser.search(this.name);
        }
      }
    );
    this.ser.size.subscribe(
      (value: string) => {
        this.size = +value;
        this.filteredresult = this.ser.getFiltResult();
        if (!this.size) {
          this.nonefound = true;
        }
      }
    );
    this.ser.checkLogin();
  }
}
