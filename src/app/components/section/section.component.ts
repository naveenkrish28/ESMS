import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/service/common.service';
import { PreviewallComponent } from '../previewall/previewall.component';
import { PreviewdialogComponent } from '../previewdialog/previewdialog.component';
import { saveAs } from 'file-saver';
import { JsonDialogComponent } from 'src/app/json-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  formcontrollist = [];
  sectiondisplaylist = [];
  pagesetuplist = [];

  sectionlistone = {
    sectiontitle: "section1",
    sectiontype: 1,
    order: 1,
    coltype: "1",
    sectioncontent: []
  };
  sectionlisttwo = {
    sectiontitle: "section2",
    sectiontype: 1,
    order: 2,
    coltype: "1",
    sectioncontent: []
  };
  sectionlistthree = {
    sectiontitle: "section3",
    sectiontype: 1,
    order: 3,
    coltype: "1",
    sectioncontent: []
  };
  sectionlistfour = {
    sectiontitle: "section4",
    sectiontype: 1,
    order: 4,
    coltype: "1",
    sectioncontent: []
  };

  previewArray = [];
  Datatypearray = [];
  isEnableAttrributeDiv: boolean = false;
  isEnableSecAttrributeDiv: boolean = false;

  sectionattributeform: FormGroup;
  fieldAttributeform: FormGroup;

  constructor(
    private cs: CommonService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.formcontrollist = this.cs.pageformlist;
    this.Datatypearray = this.cs.datatypeArray;
  }

  columntype = [
    { "id": "col-one", "name": "1" },
    { "id": "col-two", "name": "2" },
    { "id": "col-four", "name": "4" },
  ]
  ngOnInit(): void {
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
    }
  }
  noReturnPredicate() {
    return false;
  }
  copyToSectionArray(fromcontainerdata, targetcontainerdata, previousindex, currentindex) {
    let fromdata: any;
    fromdata = fromcontainerdata.filter((item, key) => key === previousindex);
    console.log(fromdata);
  }

  /********************* Section Content ****************************/
  showSectionEvent(secid) {
    this.isEnableSecAttrributeDiv = true;
    this.fieldAttributeform.reset();

    if (secid === 1) {
      this.sectionattributeform.controls.sectionindex.patchValue(secid);
      this.sectionattributeform.controls.sectionorder.patchValue(this.sectionlistone.order);
      this.sectionattributeform.controls.sectiontitle.patchValue(this.sectionlistone.sectiontitle);
      this.sectionattributeform.controls.columntype.patchValue(this.sectionlistone.coltype);
    }
    else if (secid === 2) {
      console.log(this.sectionlisttwo);
      this.sectionattributeform.controls.sectionindex.patchValue(secid);
      this.sectionattributeform.controls.sectionorder.patchValue(this.sectionlisttwo.order);
      this.sectionattributeform.controls.sectiontitle.patchValue(this.sectionlisttwo.sectiontitle);
      this.sectionattributeform.controls.columntype.patchValue(this.sectionlisttwo.coltype);
    }
    else if (secid === 3) {
      console.log(this.sectionlistthree);
      this.sectionattributeform.controls.sectionindex.patchValue(secid);
      this.sectionattributeform.controls.sectionorder.patchValue(this.sectionlistthree.order);
      this.sectionattributeform.controls.sectiontitle.patchValue(this.sectionlistthree.sectiontitle);
      this.sectionattributeform.controls.columntype.patchValue(this.sectionlistthree.coltype);
    }
    else if (secid === 4) {
      console.log(this.sectionlistfour);
      this.sectionattributeform.controls.sectionindex.patchValue(secid);
      this.sectionattributeform.controls.sectionorder.patchValue(this.sectionlistfour.order);
      this.sectionattributeform.controls.sectiontitle.patchValue(this.sectionlistfour.sectiontitle);
      this.sectionattributeform.controls.columntype.patchValue(this.sectionlistfour.coltype);
    }
  }

  onChangeSectionEvent() {
    let secindex = this.sectionattributeform.controls.sectionindex.value;
    if (secindex === 1) {
      this.sectionlistone.order = this.sectionattributeform.controls.sectionorder.value;
      this.sectionlistone.sectiontitle = this.sectionattributeform.controls.sectiontitle.value;
      this.sectionlistone.coltype = this.sectionattributeform.controls.columntype.value;
    }
    else if (secindex === 2) {
      this.sectionlisttwo.order = this.sectionattributeform.controls.sectionorder.value;
      this.sectionlisttwo.sectiontitle = this.sectionattributeform.controls.sectiontitle.value;
      this.sectionlisttwo.coltype = this.sectionattributeform.controls.columntype.value;
    }
    else if (secindex === 3) {
      this.sectionlistthree.order = this.sectionattributeform.controls.sectionorder.value;
      this.sectionlistthree.sectiontitle = this.sectionattributeform.controls.sectiontitle.value;
      this.sectionlistthree.coltype = this.sectionattributeform.controls.columntype.value;
    }
    else if (secindex === 4) {
      this.sectionlistfour.order = this.sectionattributeform.controls.sectionorder.value;
      this.sectionlistfour.sectiontitle = this.sectionattributeform.controls.sectiontitle.value;
      this.sectionlistfour.coltype = this.sectionattributeform.controls.columntype.value;
    }
    console.log(this.sectionlistone);
  }

  /********************* Form Content ****************************/
  ShowAttribute(id, crnttype) {
    event.stopPropagation();
    this.isEnableSecAttrributeDiv = false;
    this.isEnableAttrributeDiv = true;
    this.fieldAttributeform.reset();

    this.fieldAttributeform.controls.currnetindex.patchValue(id);
    this.fieldAttributeform.controls.currentsection.patchValue(crnttype);
    this.fieldAttributeform.controls.orderid.patchValue(id + 1);
    this.fieldAttributeform.controls.fid.patchValue(id + 1);

    if (crnttype == 1) {
      this.setformAttributes(this.sectionlistone.sectioncontent, id);
    }
    else if (crnttype == 2) {
      console.log(this.sectionlisttwo);
      this.setformAttributes(this.sectionlisttwo.sectioncontent, id);
    }
    else if (crnttype == 3) {
      this.setformAttributes(this.sectionlistthree.sectioncontent, id);
    }
    else if (crnttype == 4) {
      this.setformAttributes(this.sectionlistfour.sectioncontent, id);
    }
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
    let crtype = this.fieldAttributeform.controls.currentsection.value;
    if (crtype == 1) {
      this.setvaluetoArray(this.sectionlistone.sectioncontent, currentindex);
    }
    else if (crtype == 2) {
      this.setvaluetoArray(this.sectionlisttwo.sectioncontent, currentindex);
    }
    else if (crtype == 3) {
      this.setvaluetoArray(this.sectionlistthree.sectioncontent, currentindex);
    }
    else if (crtype == 4) {
      this.setvaluetoArray(this.sectionlistfour.sectioncontent, currentindex);
    }
  }

  setvaluetoArray(sectioncontent, id) {
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
      if (this.sectionlistone.sectioncontent.length > 0)
        this.cs.stagePageData[this.cs.stage][this.cs.page].PageData.push(this.sectionlistone)
      if (this.sectionlisttwo.sectioncontent.length > 0)
        this.cs.stagePageData[this.cs.stage][this.cs.page].PageData.push(this.sectionlisttwo)
      if (this.sectionlistthree.sectioncontent.length > 0)
        this.cs.stagePageData[this.cs.stage][this.cs.page].PageData.push(this.sectionlistthree)
      if (this.sectionlistfour.sectioncontent.length > 0)
        this.cs.stagePageData[this.cs.stage][this.cs.page].PageData.push(this.sectionlistfour)
      alert("Items Saved Successfully")
      this.router.navigate(['tree'])
    }
  }

  openPreviewDialog() {
    this.pagesetuplist = [];
    if (this.sectionlistone.sectioncontent.length > 0)
      this.pagesetuplist.push(this.sectionlistone);
    if (this.sectionlisttwo.sectioncontent.length > 0)
      this.pagesetuplist.push(this.sectionlisttwo);
    if (this.sectionlistthree.sectioncontent.length > 0)
      this.pagesetuplist.push(this.sectionlistthree);
    if (this.sectionlistfour.sectioncontent.length > 0)
      this.pagesetuplist.push(this.sectionlistfour);

    const dialogRef = this.dialog.open(PreviewallComponent, {
      width: '90%',
      data: this.pagesetuplist,
      disableClose: false
    });
  }

}
