import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';  // Import the routes from app.routes.ts

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Use the routes defined in app.routes.ts
  exports: [RouterModule]
})
export class AppRoutingModule { }
