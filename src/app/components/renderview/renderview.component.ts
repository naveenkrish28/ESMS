import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-renderview',
  templateUrl: './renderview.component.html',
  styleUrls: ['./renderview.component.css']
})
export class RenderviewComponent implements OnInit {
  pagedata = [];
  
  pagename;
  pageTitle;
  isEnable:boolean=false;
  dialogdata;
  slectionpages=[];
  dynamicForm:FormGroup;

  dynamicpagedata={};

  constructor(private fb:FormBuilder,   
    public cs:CommonService) {
      console.log("resdata");
      //let filenmae='audynamic';
      let filenmae='aucredit';

      this.cs.getpageDatabyjson(filenmae).subscribe(resdata=>{
        //console.log(resdata);
        this.dialogdata=resdata;
        console.log(this.dialogdata);
        this.dialogdata.PageData.map(pelement => {
            pelement.sectioncontent.map(element => {
              console.log(element);
              if(element['dropdownoptions'] > 0)
              {
                element['dropdownoptions']=this.cs.commonarary[element['dropdownoptions']];            
              }          
            });
        });
      this.dynamicpagedata=this.dialogdata;
      this.loadPages();   
    });                  
  }

  ngOnInit(): void { 
    this.dynamicForm = this.fb.group({});     
  }

  loadPages()
  {       
    this.isEnable=true;
    this.pagedata=this.dynamicpagedata['PageData'];
    this.pageTitle=this.dynamicpagedata['pageTitle'];
    this.pagedata.forEach(section => {            
      this.loadSectionData(section.sectioncontent);
      //this.addControlEvent(section.Response);
    });
   // this.pagename=resdata.pageName;     
  }

  loadSectionData(sectionData)
  {
    console.log(sectionData);
    if(sectionData!==undefined)
    {          
      // section based
      sectionData.forEach(element => {
        if(element.ftype=="textbox" || element.ftype=="dropdown" || element.ftype=="radio" 
        || element.ftype=="textarea") 
        {         
          if(element.vrequired=='yes')
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


  /*addControlEvent(sectioneventdata)
  {
    sectioneventdata.forEach(evewtdata => {
      if(evewtdata.type_of_field=="button" || evewtdata.type_of_field=="submit") 
      {         
        this.elementRef.nativeElement.querySelector(evewtdata.name_of_field)
                                  .addEventListener('click', evewtdata.actioin);
      }       
    });
    
  }*/

  ngAfterViewInit() {
   
  }

  onSubmitone(){
    console.log(this.dynamicForm.value);
    alert("successfully submitted Submitted one");
  }

  onSubmittwo(){
    console.log(this.dynamicForm.value);
    alert("successfully submitted two");
  }

  onSubmitthree(){
    console.log(this.dynamicForm.value);
    alert("successfully submitted three");
  }

}
