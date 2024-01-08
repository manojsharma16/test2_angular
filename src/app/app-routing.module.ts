import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Component1Component } from './components/component1/component1.component';
import { Component2Component } from './components/component2/component2.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'comp1',
  //   pathMatch: 'full',
  // },
  {
    path: 'comp1',
    component: Component1Component,
  },
  {
    path: 'comp2',
    component: Component2Component,
  },
  {
    path: 'reactive-form',
    component: ReactiveFormComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
