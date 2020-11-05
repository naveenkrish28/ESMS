import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pagedata = [];
  
  pagename="";
  pageTitle="";
  isEnable:boolean=false;
  
 
  staticform:FormGroup;
  slectionpages=[];
  dynamicForm:FormGroup;
  constructor(private fb:FormBuilder,
    private sfb:FormBuilder,
    public cs:CommonService,
    private elementRef:ElementRef) {
      this.slectionpages=this.cs.pages;
     }

  ngOnInit(): void {

    this.staticform = this.sfb.group({
      pageselection:['']
    });

    this.dynamicForm = this.fb.group({});    
  }

 

  loadPages()
  {
    console.log('success'+this.staticform.controls.pageselection.value);
    let pageid;
    if(this.staticform.controls.pageselection.value > 0)
    {
      this.isEnable=true;
        pageid=this.staticform.controls.pageselection.value;
        this.cs.getpageData(this.staticform.controls.pageselection.value).subscribe(resdata=>{

          this.pagedata=resdata.PageData;
          this.pageTitle=resdata.pageTitle;
  
          this.pagedata.forEach(section => {            
            this.loadSectionData(section.Response);
            //this.addControlEvent(section.Response);
          });
          this.pagename=resdata.pageName;
          
      });
    }
    else
    {
      this.isEnable=false;
    }
    
  }

  loadSectionData(sectionData)
  {
    console.log(sectionData);
    if(sectionData!==undefined)
    {          
      // section based
      sectionData.forEach(element => {
        if(element.type_of_field=="textbox" || element.type_of_field=="dropdown" || element.type_of_field=="radio") 
        {         
          if(element.required=='yes')
          {
            this.dynamicForm.addControl(element.name_of_field, new FormControl(element.def_value,Validators.required));
          }
          else{
            this.dynamicForm.addControl(element.name_of_field, new FormControl(element.def_value,[]));            
          }          
        }    
        else if(element.type_of_field=="checkbox")
        {
          this.dynamicForm.addControl(element.name_of_field, new FormControl(element.def_value,this.fb.array([])));
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
