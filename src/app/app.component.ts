import { Component, OnInit } from '@angular/core';
import { CommonService } from './common/commonService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Gatway';

  constructor(
    private common: CommonService
  ) {


  }

  ngOnInit() {
    this.common.showLoading();
    setTimeout(() => {
      this.common.toastSuccessMsg('success');
      this.common.hideLoading();
    }, 1000);
  }


}
