import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { CommonService, TreeNode } from '../../service/common.service';
import { NameComponent } from '../name/name.component';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  treeControl = new NestedTreeControl<TreeNode>(node => node.c);
  dataSource = new MatTreeNestedDataSource<TreeNode>();
  process: String = "Process"
  ind: string;
  currStageIndex: number;
  currPageName: string ;

  pagedata = [];

  pagename = "";
  pageTitle = "";
  isEnable = false;

  staticform: FormGroup;
  slectionpages = [];
  dynamicForm: FormGroup;

  constructor(private dialog: MatDialog, public cs: CommonService, private fb: FormBuilder,
   private router: Router) {
    this.dataSource.data = this.cs.TREE_DATA;

    this.slectionpages = this.cs.pages;
  }

  ngOnInit(): void {
    this.cs.changeNameObs.subscribe(() => {
      if (this.currStageIndex != null) {
        this.cs.TREE_DATA[this.currStageIndex].c[parseInt(this.ind)].name = this.cs.name
        this.dataSource.data = null;
        this.dataSource.data = this.cs.TREE_DATA;
      } else {
        this.cs.TREE_DATA[parseInt(this.ind)].name = this.cs.name
        this.dataSource.data = null;
        this.dataSource.data = this.cs.TREE_DATA;
      }
    })

    this.dynamicForm = this.fb.group({});
  }

  
  loadPages(index: string, pageName: string) {
    let split = index.split("_");
    this.cs.stage = parseInt(split[0]) - 1
    this.cs.page = parseInt(split[1]) - 1
    this.currPageName = pageName;

    if (this.cs.stagePageData[this.cs.stage] && this.cs.stagePageData[this.cs.stage][this.cs.page]) {
      this.pagedata = this.cs.stagePageData[this.cs.stage][this.cs.page].PageData
      this.pageTitle = this.cs.stagePageData[this.cs.stage][this.cs.page].pageTitle
      this.pagedata.forEach(section => {
        this.loadSectionData(section.sectioncontent);
      });
      this.isEnable = true; 
      console.log(this.pagedata)
    }else{
      this.isEnable = false;
    }
  }

  loadSectionData(sectionData) {
    console.log(sectionData)
    if (sectionData !== undefined) {
      // section based
      sectionData.forEach(element => {
        if (element.ftype == "textbox" || element.ftype == "dropdown" || element.ftype == "radio") {
          if (element.required == 'yes') {
            this.dynamicForm.addControl(element.fname, new FormControl(element.defvalue, Validators.required));
          }
          else {
            this.dynamicForm.addControl(element.fname, new FormControl(element.defvalue, []));
          }
        }
        else if (element.ftype == "checkbox") {
          this.dynamicForm.addControl(element.fname, new FormControl(element.defvalue, this.fb.array([])));
        }
      });

    }
  }

  hasChild = (_: number, node: TreeNode) => !!node.c && node.c.length > 0;

  createPage(ind: string, len: number) {
    let l = len + 1;
    let page: TreeNode = {
      index: ind + '_' + (l).toString(),
      name: 'Page ' + l,
    }
    this.cs.TREE_DATA[parseInt(ind) - 1].c.push(page);
    this.dataSource.data = null;
    this.dataSource.data = this.cs.TREE_DATA;
  }

  setName(name: string, index: string) {
    this.cs.name = name;
    if (index.length > 1) {
      let split = index.split("_");
      this.currStageIndex = parseInt(split[0]) - 1;
      console.log(this.currStageIndex)
      this.ind = (parseInt(split[1]) - 1).toString()
      this.dialog.open(NameComponent)
    } else {
      this.currStageIndex = null
      this.ind = (parseInt(index) - 1).toString();
      this.dialog.open(NameComponent)
    }
  }

  editPage(){
    this.router.navigate(['dynamic'])
  }

  createStage() {
    let len = this.cs.TREE_DATA.length + 1;
    let stage: TreeNode = {
      index: (len).toString(),
      name: 'Stage ' + len,
      c: [{ index: len.toString() + '_1', name: 'Page 1' }]
    }
    this.cs.TREE_DATA.push(stage);
    this.dataSource.data = null;
    this.dataSource.data = this.cs.TREE_DATA;
  }
}

