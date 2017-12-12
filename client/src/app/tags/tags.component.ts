import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})

export class TagsComponent implements OnInit {

  tags: Array<string>;
  validators: Array<any>;

  constructor() {

  }

  ngOnInit() {
    this.validators = [Validators.minLength(2)];
  }
}
