import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit{

  constructor(private uploadService: FileUploadService){}

  ngOnInit():void{
    this.fileInfos = this.uploadService.getFiles();
  }


  currentFile ?: File;
  progress= 0;
  fileName = 'Select File';
  // selectedFile = ''

  fileInfos ?: Observable<any>;

  selectFile(event:any):void{     //It helps to get  the currentFile

    if(event.target.files && event.target.files[0]){
      const file : File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    }
    else{
      this.fileName = 'Select File';
    }
  }

  upload(){     // to upload file

    this.progress=0;

    if(this.currentFile){
      this.uploadService.upload(this.currentFile).subscribe({
       next:(event) => {
        if(event.type === HttpEventType.UploadProgress){
          if(event?.loaded && event?.total){
            this.progress = Math.round(100*event.loaded / event.total);
          } 
        }else if(event instanceof HttpResponse){
            this.fileInfos = this.uploadService.getFiles();
        }
       },

      error : (e) =>{
        console.log(e);
        this.progress = 0;
        this.currentFile = undefined;
      }
      });
    }
  }
  
  
  // onFileSelected(event:any){
  //   this.selectedFile = event.target.files[0];
  //   this.uploadService.upload(event.file).subscribe(event => {
  //       console.log('uploaded successfully');
  //   });
  // }

}
