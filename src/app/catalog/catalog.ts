import { Component } from '@angular/core';
import { DataRepositoryService } from '../services/data-repository.service';

@Component({
    styleUrls: ['./catalog.css'],
    template: `
        <div class="departments">
            <button (click)="applyFilter('CH')">Charms</button>
            <button (click)="applyFilter('PO')">Potions</button>
            <button (click)="applyFilter('SP')">Spells</button>
            <button (click)="applyFilter('GEN')">Generals</button>
            <button (click)="applyFilter('')">All</button>
        </div>
        <div>
            <table>
                <thead>
                    <th>Course #</th>
                    <th>Course Name</th>
                    <th>Professor</th>
                    <th>Days</th>
                    <th [ngClass]="getClass('time')">Time</th>
                    <th [ngClass]="getClass('creditHours')">Credits</th>
                </thead>
                <tbody>
                    <tr *ngFor="let class of visibleClasses">
                        <td id="linkCell">
                            <a [routerLink]="['/catalog/' + class.course.courseNumber]">{{ class.course.courseNumber }}</a>
                        </td>
                        <td id="linkCell">
                            <a [routerLink]="['/catalog/' + class.course.courseNumber]">{{ class.course.courseName }}</a>
                        </td>
                        <td>{{ class.professor }}</td>
                        <td>{{ class.days }}</td>
                        <td [ngClass]="getClass('time')">{{ class.time }}</td>
                        <td [ngClass]="getClass('creditHours')">{{ class.course.creditHours }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
})
export class CatalogComponent {
    classes: any[];
    visibleClasses: any[];

    constructor(public dataRepository: DataRepositoryService) {}

    ngOnInit() {
        const catalog = this.dataRepository.getCatalog();
        catalog.subscribe((classes) => {
            this.classes = classes;
            this.applyFilter('');
        });
    }

    applyFilter(filter) {
        if (!filter) {
            return (this.visibleClasses = this.classes);
        } else if (filter === 'GEN') {
            const classes = [];

            this.classes.forEach((c) => {
                if (c.course.courseNumber.startsWith('CH')) {
                    classes.push(c);
                } else if (c.course.courseNumber.startsWith('PO')) {
                    classes.push(c);
                } else if (c.courseNumber.startsWith('SP')) {
                    classes.push(c);
                }
            });

            this.visibleClasses = classes;

            return this.visibleClasses;
        } else {
            const classes = [];

            this.classes.forEach((c) => {
                if (c.course.courseNumber.startsWith(filter)) {
                    classes.push(c);
                }
            });

            this.visibleClasses = classes;

            return this.visibleClasses;
        }
    }

    getClass(fieldType) {
        let isValidFieldType = this.validateClassFieldType(fieldType),
            cssClass;

        if (isValidFieldType) {
            if (fieldType === 'time') {
                cssClass = 'center';
            } else if (fieldType === 'creditHours') {
                cssClass = 'center';
            }

            return cssClass;
        } else {
            return '';
        }
    }

    validateClassFieldType(fieldType) {
        let isValid = false;

        this.classes.forEach((o) => {
            if (fieldType === 'time') {
                if ('time' in o) {
                    isValid = true;
                }
            } else if (fieldType === 'creditHours') {
                if ('course' in o) {
                    if ('creditHours' in o.course) {
                        isValid = true;
                    }
                }
            }

            isValid = true;
        });

        return isValid;
    }
}
