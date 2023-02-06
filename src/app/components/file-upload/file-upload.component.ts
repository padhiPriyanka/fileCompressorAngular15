import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {


  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(private uploadService: FileUploadService,
    private route: Router) { }

  currentFile?: File;
  progress = 0;
  fileName = 'Select File';

  selectFile(event: any): void {     //It helps to get  the currentFile

    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    }
    else {
      this.fileName = 'Select File';
    }
  }

  upload() {     // to upload file
    if (this.currentFile) {
      this.uploadService.upload(this.currentFile).subscribe({
        next: (res) => {
          console.log(res);
          console.log("pdf uploaded");
          localStorage.getItem('access-token');
          localStorage.setItem('pdfURL', res.baseUrl);
          localStorage.setItem('pdfFilePath', res.filePath);
        },
        error: (e) => {
          console.error(e);
        }
      });
    }
  }

  choseFile(fileName): boolean {
    if (fileName == 'Select File') {
      return true;
    }
    else {
      return false;
    }
  }


  download() {
    this.uploadService.downloadFile().subscribe({
      next: (res) => {
        let fileName = res.url?.split('/')
        console.log(fileName[4]);
        let blob: Blob = res.body as Blob;
        let a = document.createElement('a');
        a.download = fileName[4];
        a.href = window.URL.createObjectURL(blob);
        a.click();
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

}