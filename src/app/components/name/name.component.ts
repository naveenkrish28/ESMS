import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.css']
})
export class NameComponent {

  name: string;
  constructor(private cs: CommonService) { this.name = this.cs.name }

  setFieldName() {
    this.cs.name = this.name;
    this.cs.changeNameObs.next("change name")
    }
  }

