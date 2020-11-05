import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem, CdkDragExit} from '@angular/cdk/drag-drop';
import { CommonService } from 'src/app/service/common.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PreviewdialogComponent } from '../previewdialog/previewdialog.component';
import { JsonDialogComponent } from '../../json-dialog.component';


@Component({
  selector: 'app-pagesetup',
  templateUrl: './pagesetup.component.html',
  styleUrls: ['./pagesetup.component.css']
})
export class PagesetupComponent implements OnInit {
  formcontrollist = [];
  pagesetuplist = [];
  previewArray=[];
  Datatypearray=[];
  isEnableAttrributeDiv:boolean=false;

  fieldAttributeform:FormGroup;

  constructor(private cs:CommonService,
    private fb:FormBuilder,
    private dialog:MatDialog) { 
    this.formcontrollist=this.cs.pageformlist;
    this.Datatypearray=this.cs.datatypeArray;
  }

  ngOnInit(): void {
    this.fieldAttributeform=this.fb.group({
      currnetindex:[''],
      fid:[''],
      orderid:[''],
      ftype:[''],
      dtype:[''],
      flabel:[''],
      fname:[''],
      defvalue:[''],
      stype:[''],
      vrequired:[''],
      maxlength:[''],
      minlenth:[''],
      dropdownoptions:[''],
      action:['']
    });
  }

  
  drop(event: CdkDragDrop<string[]>) {    
    this.isEnableAttrributeDiv=false;
    if (event.previousContainer === event.container) {     
     
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else { 
      copyArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                        //console.log(event.previousContainer.data);     
                       // console.log(event.container.data);   
                        //console.log(event.previousIndex);   
                        //console.log(event.currentIndex);
    }
  }

  noReturnPredicate() {
    return false;
  }
  ShowAttribute(id)
  {
    
    this.isEnableAttrributeDiv=true;
    this.fieldAttributeform.reset();
    this.pagesetuplist.map((value,key)=> {  

      //console.log(id+"=="+key);     
      if(id==key)
      {       
      let details=value;
    
      this.fieldAttributeform.controls.currnetindex.patchValue(id);
      this.fieldAttributeform.controls.fid.patchValue(details.fid);
      this.fieldAttributeform.controls.orderid.patchValue(id+1);
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

  onChangeEvent()
  {    
    
    let currentindex=this.fieldAttributeform.controls.currnetindex.value;
    //console.log("currentindex::"+currentindex);
    let ijectobj={};
    this.pagesetuplist.map((svalue,skey)=>{     
      //console.log(currentindex +"=="+ skey)
      if(currentindex == skey)
      {
          console.log(svalue.details);
          ijectobj=
          { 
            fid:this.fieldAttributeform.controls.fid.value,
            orderid:this.fieldAttributeform.controls.orderid.value.toString(),
            ftype:this.fieldAttributeform.controls.ftype.value,
            dtype:this.fieldAttributeform.controls.dtype.value,
            flabel:this.fieldAttributeform.controls.flabel.value,
            fname:this.fieldAttributeform.controls.fname.value,
            defvalue:this.fieldAttributeform.controls.defvalue.value,
            stype:(this.fieldAttributeform.controls.stype.value == 'true'),
            vrequired:(this.fieldAttributeform.controls.vrequired.value == 'true'),
            maxlength:this.fieldAttributeform.controls.maxlength.value,
            minlenth:this.fieldAttributeform.controls.minlenth.value,
            dropdownoptions:this.fieldAttributeform.controls.dropdownoptions.value,
            action:this.fieldAttributeform.controls.action.value
          }       
      }       
    });  
    //console.log(ijectobj);   
    this.pagesetuplist[currentindex]=ijectobj;
    //console.log(this.pagesetuplist);
  }

  SavePage()
  {
    this.cs.json_dialog = JSON.stringify(this.pagesetuplist);
    this.dialog.open(JsonDialogComponent, {
      width: '60%',
    })
  }

  openPreviewDialog() {
    const dialogRef = this.dialog.open(PreviewdialogComponent, {
      width: '60%',
      data: {
        Response:this.pagesetuplist
      },
      disableClose: true
    });
  }
}
