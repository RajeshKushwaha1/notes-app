import { Component } from '@angular/core';
import { Note } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isShowAddItem:boolean = false;
  notesListDetails: Note[] = [];
  searchText: string = ''; 

  notesObject = {
    title: "",
    body:""
  }

  ngOnInit(): void {
    const notesListJSON = localStorage.getItem("notesList");
    this.notesListDetails = notesListJSON !== null ? JSON.parse(notesListJSON) : [];
  }

  onTextChange($event:any){
    if($event){
      const filteredData = this.notesListDetails.filter(note =>
        note.title.toLowerCase().includes($event.toLowerCase()) ||
        note.body.toLowerCase().includes($event.toLowerCase())
      );
      this.notesListDetails = filteredData;
    }else{
      const notesListJSON = localStorage.getItem("notesList");
      this.notesListDetails = notesListJSON !== null ? JSON.parse(notesListJSON) : [];
    }
  }

  addNotesItem(){
    this.searchText = ''
    const notesListJSON = localStorage.getItem("notesList");
    this.notesListDetails = notesListJSON !== null ? JSON.parse(notesListJSON) : [];
    this.isShowAddItem = true;
  }
  
  cancelAddNotes(){
    this.isShowAddItem = false;
    this.notesObject = {
      title: "",
      body:""
    }
    this.searchText = ''
  }

  removeItem(index:number){
    this.notesListDetails.map((item,indexNumber)=>{
      if(indexNumber === index){
        this.notesListDetails.splice(index, 1);
        // this.notesListDetails = this.notesListDetails.filter((_, i) => i !== index);
      }
    })
    localStorage.setItem("notesList", JSON.stringify(this.notesListDetails));
  }

  submitNotesItem(){
    this.notesListDetails.push(this.notesObject)
    localStorage.setItem("notesList", JSON.stringify(this.notesListDetails));

    const notesListJSON = localStorage.getItem("notesList");
    this.notesListDetails = notesListJSON !== null ? JSON.parse(notesListJSON) : [];
  
    this.isShowAddItem = false;
    this.notesObject = {
      title: "",
      body:""
    }
    this.searchText = ''
  }

  editNotesItem(index:number){
    this.notesListDetails.map((item,indexNumber)=>{
      if(indexNumber === index){
        this.notesObject = {
          title: item.title,
          body: item.body,
        }
        this.isShowAddItem = true;
      }
    })
  }
  
  // this fun fixed height dynamically if you hit enter inside textarea and save and again come then height increase
  // calculateTextareaHeight(): number {
  //   // Adjust the base height (e.g., 20px per line) and add some padding
  //   return (this.notesObject.body.split('\n').length * 40) + 40;
  // }
  
}
