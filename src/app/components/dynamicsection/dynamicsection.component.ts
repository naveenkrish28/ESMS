import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JsonDialogComponent } from 'src/app/json-dialog.component';
import { CommonService } from 'src/app/service/common.service';
import { PreviewallComponent } from '../previewall/previewall.component';

@Component({
  selector: 'app-dynamicsection',
  templateUrl: './dynamicsection.component.html',
  styleUrls: ['./dynamicsection.component.css']
})
export class DynamicsectionComponent implements OnInit {

  formcontrollist = [];
  sectiondisplaylist = [];
  pagesetuplist = [];

  sectionlistidex = [];
  sectionidlist = [];



  previewArray = [];
  Datatypearray = [];
  isEnableAttrributeDiv: boolean = false;
  isEnableSecAttrributeDiv: boolean = false;

  sectionattributeform: FormGroup;
  fieldAttributeform: FormGroup;


  columntype = [
    { "id": "col-one", "name": "1" },
    { "id": "col-two", "name": "2" },
    { "id": "col-three", "name": "3" },
    { "id": "col-four", "name": "4" },
  ]

  constructor(
    private cs: CommonService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router) {
    this.formcontrollist = this.cs.pageformlist;
    this.Datatypearray = this.cs.datatypeArray;
  }

  ngOnInit(): void {
    this.createdynamicsection(1);
    this.sectionattributeform = this.fb.group({
      sectionorder: [''],
      sectiontitle: [''],
      columntype: [''],
      sectionindex: ['']
    });
    this.fieldAttributeform = this.fb.group({
      currnetindex: [''],
      currentsection: [''],
      fid: [''],
      orderid: [''],
      ftype: [''],
      dtype: [''],
      flabel: [''],
      fname: [''],
      defvalue: [''],
      stype: [''],
      vrequired: [''],
      maxlength: [''],
      minlenth: [''],
      dropdownoptions: [''],
      action: ['']
    });
  }
  // dynamic section list
  createdynamicsection(count) {
    for (let i = 0; i < count; i++) {
      this.sectionlistidex.push({
        sectiontitle: "section" + (i + 1),
        sectiontype: 1,
        order: (i + 1),
        coltype: "1",
        sectioncontent: []
      });
      console.log("cdk-drop-list-" + (i + 1));
      this.sectionidlist.push("cdk-drop-list-" + (i + 1));
    }
  }
  // dynamic additon sdectiion  
  Addsection() {
    console.log(this.sectionidlist.length);
    let i = this.sectionidlist.length;
    this.sectionlistidex.push({
      sectiontitle: "section" + (i + 1),
      sectiontype: 1,
      order: (i + 1),
      coltype: "1",
      sectioncontent: []
    });
    this.sectionidlist.push("cdk-drop-list-" + (i + 1));
    //console.log(this.sectionlistidex);
    //console.log(this.sectionidlist);
  }
  createSectiondroplistid(sectionindex) {
    console.log("createSectiondroplistid=>");
    console.log(sectionindex);
    return "cdk-drop-list-" + (sectionindex + 1);
  }
  //removesection
  deletesection(sectionid) {
    event.stopPropagation();
    //console.log(sectionid);
    this.sectionlistidex.splice(sectionid, 1);
    this.sectionidlist.pop();

    //console.log(this.sectionlistidex);
    //console.log(this.sectionidlist);
  }

  // dynamic dropdrag connecteto list
  createSectionConnecteto(sectionid) {
    /// console.log("createSectionConnecteto sectionid::");
    //console.log(sectionid);
    const connectedtosectlist = [];
    let droptlistleyvar = "cdk-drop-list-";
    const sectioncount = this.sectionlistidex.length;
    connectedtosectlist.push("flist");
    for (let i = 0; i < sectioncount; i++) {
      if (sectionid !== i)
        connectedtosectlist.push(droptlistleyvar + (i + 1));
    }
    //console.log("connected .list")
    //console.log(connectedtosectlist)
    return connectedtosectlist;
  }



  drop(event: CdkDragDrop<string[]>, dragtype) {
    this.isEnableAttrributeDiv = false;
    this.isEnableSecAttrributeDiv = false;

    console.log(event.previousContainer.id);
    if (event.previousContainer === event.container) {
      console.log(event.container.data);
      console.log(event.previousIndex);
      console.log(event.currentIndex);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      if (event.previousContainer.id === 'FcontrolDiv') {
        copyArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
      else {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
      // remove       
    }

    console.log(this.sectionlistidex);
  }
  noReturnPredicate() {
    return false;
  }


  /********************* Section Content ****************************/
  showSectionEvent(secid) {
    this.isEnableAttrributeDiv = false;
    this.isEnableSecAttrributeDiv = true;

    this.fieldAttributeform.reset();
    console.log(secid);
    let sectionAttriubutevalues = this.sectionlistidex[secid];

    this.sectionattributeform.controls.sectionindex.patchValue(secid);
    this.sectionattributeform.controls.sectionorder.patchValue(sectionAttriubutevalues.order);
    this.sectionattributeform.controls.sectiontitle.patchValue(sectionAttriubutevalues.sectiontitle);
    this.sectionattributeform.controls.columntype.patchValue(sectionAttriubutevalues.coltype);

  }

  onChangeSectionEvent() {
    let secindex = this.sectionattributeform.controls.sectionindex.value;
    this.sectionlistidex.map((secvalue, seckey) => {
      if (seckey === secindex) {
        secvalue.order = this.sectionattributeform.controls.sectionorder.value;
        secvalue.sectiontitle = this.sectionattributeform.controls.sectiontitle.value;
        secvalue.coltype = this.sectionattributeform.controls.columntype.value;
      }
    });

    console.log(this.sectionlistidex);
  }

  /********************* Form Content ****************************/
  ShowAttribute(id, sectionid) {
    event.stopPropagation();
    this.isEnableSecAttrributeDiv = false;
    this.isEnableAttrributeDiv = true;
    this.fieldAttributeform.reset();

    this.fieldAttributeform.controls.currnetindex.patchValue(id);
    this.fieldAttributeform.controls.currentsection.patchValue(sectionid);
    this.fieldAttributeform.controls.orderid.patchValue(id + 1);
    this.fieldAttributeform.controls.fid.patchValue(id + 1);
    this.sectionlistidex.map((secvalue, seckey) => {
      if (seckey === sectionid) {
        this.setformAttributes(secvalue.sectioncontent, id)
      }
    });


  }

  setformAttributes(sectioncontent, id) {
    sectioncontent.map((value, key) => {
      if (id == key) {
        let details = value;

        this.fieldAttributeform.controls.ftype.patchValue(details.ftype);
        this.fieldAttributeform.controls.dtype.patchValue(details.dtype);
        this.fieldAttributeform.controls.flabel.patchValue(details.flabel);
        this.fieldAttributeform.controls.fname.patchValue(details.fname);
        this.fieldAttributeform.controls.defvalue.patchValue(details.defvalue);
        this.fieldAttributeform.controls.stype.patchValue(details.stype);
        this.fieldAttributeform.controls.vrequired.patchValue(details.vrequired);
        this.fieldAttributeform.controls.maxlength.patchValue(details.maxlength);
        this.fieldAttributeform.controls.minlenth.patchValue(details.minlenth);
        this.fieldAttributeform.controls.dropdownoptions.patchValue(details.dropdownoptions);
        this.fieldAttributeform.controls.action.patchValue(details.action);
      }
    });
  }

  onChangeEvent() {
    let currentindex = this.fieldAttributeform.controls.currnetindex.value;
    let sectionid = this.fieldAttributeform.controls.currentsection.value;
    this.sectionlistidex.map((secvalue, seckey) => {
      if (seckey === sectionid) {
        this.setvaluetoArray(secvalue.sectioncontent, currentindex);
      }
    });

  }

  setvaluetoArray(sectioncontent, id) {
    console.log(sectioncontent);
    let ijectobj = {};
    sectioncontent.map((svalue, skey) => {
      if (id == skey) {
        ijectobj =
        {
          fid: this.fieldAttributeform.controls.fid.value,
          orderid: this.fieldAttributeform.controls.orderid.value.toString(),
          ftype: this.fieldAttributeform.controls.ftype.value,
          dtype: this.fieldAttributeform.controls.dtype.value,
          flabel: this.fieldAttributeform.controls.flabel.value,
          fname: this.fieldAttributeform.controls.fname.value,
          defvalue: this.fieldAttributeform.controls.defvalue.value,
          stype: (this.fieldAttributeform.controls.stype.value == 'true'),
          vrequired: (this.fieldAttributeform.controls.vrequired.value == 'true'),
          maxlength: this.fieldAttributeform.controls.maxlength.value,
          minlenth: this.fieldAttributeform.controls.minlenth.value,
          dropdownoptions: this.fieldAttributeform.controls.dropdownoptions.value,
          action: this.fieldAttributeform.controls.action.value
        }
      }
    });
    sectioncontent[id] = ijectobj;
  }

  SavePage() {
    this.cs.sectionData = this.sectionlistidex;
    if (this.cs.stage >= 0 && this.cs.page >= 0) {
      if (!this.cs.stagePageData[this.cs.stage]) {
        this.cs.stagePageData[this.cs.stage] =
          [{
            "pageTitle": "ESMS  - Customer Page",
            "PageData": []
          }]
      }
      if (!this.cs.stagePageData[this.cs.stage][this.cs.page]) {
        this.cs.stagePageData[this.cs.stage][this.cs.page] =
        {
          "pageTitle": "ESMS  - Customer Page",
          "PageData": []
        }
      }
      this.cs.stagePageData[this.cs.stage][this.cs.page].PageData.push(...this.cs.sectionData)
      this.cs.sectionData = null;
      alert("Items Saved Successfully")
      this.router.navigate(['tree'])
    }
  }

  openPreviewDialog() {
    // console.log(this.sectionlistidex);
    const dialogRef = this.dialog.open(PreviewallComponent, {
      width: '90%',
      data: this.sectionlistidex,
      disableClose: false
    });
  }

  getsectioncontent(index) {
    return this.sectionlistidex
  }


}
