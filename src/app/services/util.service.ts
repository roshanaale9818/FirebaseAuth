import { Injectable } from '@angular/core';
import {Location} from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private location:Location) { }
  goBack(){
    this.location.back();
  }
}
