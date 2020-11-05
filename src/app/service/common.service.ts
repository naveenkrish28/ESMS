import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

export interface TreeNode {
  index: string;
  name: string;
  c?: TreeNode[];
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  json_dialog : String;

  pages=[ {key:"1","name":"Customer"},{key:"2","name":"Agent"},{key:"3","name":"Vendor"},{key:"4","name":"Account Details"}];
  datatypeArray=['Varchar','Number','Float','Double','Text'];
 
  pageformlist = [         
      {
        fid:'',
        orderid:'',
        ftype:'textbox',
        dtype:"varchar",
        src: "assets/textbox.ico",
        flabel:'',
        fname:'',
        defvalue:'',
        stype:false,        
        vrequired:false,
        maxlength:8,
        minlenth:5,
        dropdownoptions:'',
        action:''
      },

      {
        fid:'',
        orderid:'',
        ftype:'dropdown',
        dtype:"varchar",
        src: "assets/dropdown.ico",
        flabel:'',
        fname:'',
        defvalue:'',
        stype:false,        
        vrequired:false,
        maxlength:8,
        minlenth:5,
        dropdownoptions:'',
        action:''
      }  ,
    
        {
          fid:'',
          orderid:'',
          ftype:'radio',
          dtype:"varchar",
          src: "assets/radio.ico",
          flabel:'',
          fname:'',
          defvalue:'',
          stype:false,        
          vrequired:false,
          maxlength:8,
          minlenth:5,
          dropdownoptions:'',
          action:''
        }  ,     

            
    
        {
          fid:'',
          orderid:'',
          ftype:'checkbox',
          dtype:"text",
          src: "assets/checkbox.ico",
          flabel:'',
          fname:'',
          defvalue:'',
          stype:false,        
          vrequired:false,
          maxlength:8,
          minlenth:5,
          dropdownoptions:'',
          action:''
        } ,      
        {
          fid:'',
          orderid:'',
          ftype:'textarea',
          dtype:"text",
          src: "assets/textarea.ico",
          flabel:'',
          fname:'',
          defvalue:'',
          stype:false,        
          vrequired:false,
          maxlength:8,
          minlenth:5,
          dropdownoptions:'',
          action:''
        } ,       
   
        {
          fid:'',
          orderid:'',
          ftype:'button',
          dtype:"",
          flabel:'Button',
          src: "assets/button.ico",
          fname:'',
          defvalue:'',
          stype:false,        
          vrequired:false,
          maxlength:8,
          minlenth:5,
          dropdownoptions:'',
          action:''
        },       
   
        {
          fid:'',
          orderid:'',
          ftype:'date',
          dtype:"",
          flabel:'date',
          src: "assets/date.ico",
          fname:'',
          defvalue:'',
          stype:false,        
          vrequired:false,
          maxlength:8,
          minlenth:5,
          dropdownoptions:'',
          action:''
        } 
   
   ];

   commonarary={     
      "1":[ "India" ,"Malasiya", "Singapore","USA","UK"  ],     
      "2":[ "Tamilnadu" ,"Kerala", "Andhra Pradesh","Karnataka","Mumbai"  ],     
      "3":[ "Cash" ,"Cheque", "Online ","Card","UPI"  ],
      "4":[ "Male" ,"Female", "Others "  ],
      "5":[ 'Single', 'Married', 'Widowed', 'Divorced', 'Separated'],
      "6":['Administrative Assistant','Executive Assistant','Marketing Manager','Customer Service Representative','Nurse Practitioner','Software Engineer','Sales Manager','Data Entry Clerk','Office Assistant'],
      "7":['A', 'B', 'C', 'D', 'E'],
      "8":['Cloud Architect','Cloud Consultant','Cloud Product and Project Manager','Cloud Services Developer','Cloud Software and Network Engineer','Cloud System Administrator','Cloud System Engineer'],
      "9":['Employee', 'Worker' ,' Self-employed'],
      "10":['Reaon 1', 'Reason 2' ,'Reason 3'],
      "11":['Resident', 'Non Resident' ,'H- Owner'],
      "12":['Flag 1', 'Flag 2' ,'Flag 3']
    };

    TREE_DATA: TreeNode[] = [
      {
        index: '1',
        name: 'Stage 1',
        c: [
          { index: '1_1', name: 'Page 1'},
          { index: '1_2', name: 'Page 2' },
          { index: '1_3', name: 'Page 3' },
        ]
      }, {
        index: '2', 
        name: 'Stage 2',
        c: [
          { index: '2_1', name: 'Page 1' },
          { index: '2_2', name: 'Page 2' },
        ]
      },{
        index: '3', 
        name: 'Stage 3',
        c: [
          { index: '3_1', name: 'Page 1' },
          { index: '3_2', name: 'Page 2' },
        ]
      }
    ];
    name: string = "";
    changeNameObs = new Subject();

    stage: number;
    page:number;
    stagePageData =[[{
      "pageTitle":"ESMS  - Customer Page",
      "PageData":[]
      }]];
    sectionData;

    
  constructor(private http:HttpClient,) { }

  httpoptions={
    headers:new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'
    })
  }

  public getpageData(id)
  {
    let parameters={};
    return this.http.get<any>("assets/page"+id+".json",parameters);
  }

  public getpageDatabyjson(filename)
  {
    let parameters={};
    return this.http.get<any>("assets/"+filename+".json",parameters);
  }
 
}
