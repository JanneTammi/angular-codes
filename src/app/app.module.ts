import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CatalogComponent } from './catalog/catalog';
import { LoadingComponent } from './components/loading-spinner.component';
import { NavBarComponent } from './nav-bar.component';
import { appRoutes } from './routes';
import { DataRepositoryService } from './services/data-repository.service';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(appRoutes)],
    declarations: [AppComponent, NavBarComponent, CatalogComponent, LoadingComponent],
    providers: [DataRepositoryService],
    bootstrap: [AppComponent],
})
export class AppModule {}
