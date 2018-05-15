import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  confirm: string = "";
  iIsCreateMode: number = 0;
  isCreateMode: boolean = false;
  lstLblSubmits: [string] = ["Login","Create"];
  lblSubmit:string = "";

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.setLblSubmit();
  }

  toggleIsCreate():void{
   this.iIsCreateMode = (this.iIsCreateMode + 1) % 2
   this.isCreateMode = this.iIsCreateMode == 1;
   this.setLblSubmit();
  }

  setLblSubmit():void{
    this.lblSubmit = this.lstLblSubmits[this.iIsCreateMode];
  }

  msgBtnSubmit_Click: string;
  btnSubmit_Click():void {
    let objPstParams = {
      username: this.username,
      password: this.password,
      confirm: this.confirm,
      isCreateMode: this.isCreateMode
    }
    this.msgBtnSubmit_Click += "_clk_"
    this.httpClient
      .post("login",objPstParams)
      .subscribe(this.btnSubmit_Click_Response)
  }

  btnSubmit_Click_Response(obj : any): void{
    this.msgBtnSubmit_Click += "_rsp_"
  }

}
