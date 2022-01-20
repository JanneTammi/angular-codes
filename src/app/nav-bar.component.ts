import { Component } from '@angular/core';
import { DataRepositoryService } from './services/data-repository.service';

@Component({
    selector: 'nav-bar',
    styleUrls: [`./nav-bar.component.css`],
    template: `
        <div class="nav-bar">
            <img class="logo" src="/assets/images/whitebeard-logo.png" alt="Whitebeard Logo" />
            <div class="nav-item"><a [routerLink]="['/catalog']">Catalog</a></div>
        </div>
    `,
})
export class NavBarComponent {
    constructor(private dataRepository: DataRepositoryService) {}

    get currentUser() {
        return this.dataRepository.currentUser;
    }

    handleSignOut() {
        this.dataRepository.currentUser = null;
    }
}
