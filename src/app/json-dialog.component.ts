import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from './service/common.service';

@Component({
  selector: 'app-json-dialog',
  templateUrl: './json-dialog.component.html',
  styleUrls: ['./json-dialog.component.css']
})
export class JsonDialogComponent implements OnInit {

 
  constructor(public json: CommonService,
    public dialogRef: MatDialogRef<JsonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogdata: any) { 
        console.log(dialogdata);
    }

  ngOnInit(): void {
  }

}
