import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pangolin } from './pangolin.model';

@Injectable()
export class PangolinService {
  selectedPangolin: Pangolin;
  pangolins: Pangolin[];
  readonly baseURL = 'http://localhost:3000/pangolins';

  constructor(private http: HttpClient) { }

  postPangolin(pan: Pangolin) {
    return this.http.post(this.baseURL, pan);
    
  }

  getPangolinList() {
    return this.http.get(this.baseURL);
  }

  putPangolin(pan: Pangolin) {
    return this.http.put(this.baseURL + `/${pan._id}`, pan);
  }

  deletePangolin(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
