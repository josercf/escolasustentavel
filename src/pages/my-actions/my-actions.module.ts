import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyActionsPage } from './my-actions';

@NgModule({
  declarations: [
    MyActionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyActionsPage),
  ],
})
export class MyActionsPageModule {}
