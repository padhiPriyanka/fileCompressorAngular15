import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private baseUrl = "http://localhost:8000/api/v1";

  constructor(private http: HttpClient) { }

  upload(pdf: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('pdf', pdf);

    const at = localStorage.getItem('access-token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${at}` });
    return this.http.post(`${this.baseUrl}/compress`, formData, { headers: headers });

  }

  downloadFile(): Observable<any> {

    const filePath = localStorage.getItem('pdfFilePath');
    const url = localStorage.getItem('pdfURL');
    const at = localStorage.getItem('access-token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${at}` });

    return this.http.get(`${url}${filePath}`, { observe: 'response', responseType: 'blob', headers: headers });
  }

  uploadImage(img:File):Observable<any>{
    const formData: FormData = new FormData();

    formData.append('picture', img);

    const at = localStorage.getItem('access-token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${at}` });
    return this.http.post(`${this.baseUrl}/reduce`, formData, { headers: headers });
  }



}
