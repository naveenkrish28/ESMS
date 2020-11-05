import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-previewdialog',
  templateUrl: './previewdialog.component.html',
  styleUrls: ['./previewdialog.component.css']
})
export class PreviewdialogComponent implements OnInit {

  dynamicForm:FormGroup;
  pagedata = [];
  pagename;
  dynamicpagedata={
    "pageTitle":"ESMS  - Customer Page",
    "PageData":
      [  
        {  
          "section_order":"1",
          "section_alignemnt":"Middle",
          "sectiontitle":" Customer Form  ",
          "columntype": "1",
          "sectiontype":"1",
          "Response":[]
        }
      ]
    };
  constructor(private fb:FormBuilder,
    public dialogRef: MatDialogRef<PreviewdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogdata: any,
    private cs:CommonService) {
      dialogdata.Response.forEach(element => {
        console.log(this.cs.commonarary[1]);
        if(element['dropdownoptions'] > 0)
        {
          element['dropdownoptions']=this.cs.commonarary[element['dropdownoptions']];
          this.dynamicpagedata.PageData[0]['Response'].push(element);
        }
        else{
          this.dynamicpagedata.PageData[0]['Response'].push(element);
        }
      });      
      this.pagename=this.dynamicpagedata['pageTitle'];
    this.pagedata=this.dynamicpagedata.PageData;
     }
 
  ngOnInit(): void {
    this.dynamicForm = this.fb.group({}); 
    
    console.log(this.pagedata);
    this.loadPages();
  }

  loadPages()
  {         
    this.dynamicpagedata.PageData.forEach(section => {    
      console.log(section.Response);        
      this.loadSectionData(section.Response);      
    });     
  }

  loadSectionData(sectionData)
  {
    console.log(sectionData);
    if(sectionData!==undefined)
    {          
      // section based
      sectionData.forEach(element => {
        if(element.ftype=="textbox" || element.ftype=="dropdown" || element.ftype=="radio" || element.ftype=="textarea") 
        {         
          if(element.vrequired=== true)
          {
            this.dynamicForm.addControl(element.fname, new FormControl(element.defvalue,Validators.required));
          }
          else{
            this.dynamicForm.addControl(element.fname, new FormControl(element.defvalue,[]));            
          }          
        }    
        else if(element.ftype=="checkbox")
        {
          this.dynamicForm.addControl(element.fname, new FormControl(element.defvalue,this.fb.array([])));
        }   
      }); 

    }
  }

  closeDilaog()
  {
    this.dialogRef.close();
  }

}
