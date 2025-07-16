import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FonctionnaireService, Fonctionnaire } from '../../services/fonctionnaire.service';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';

@Component({
  selector: 'app-civil-servants',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    InputIconModule,
    IconFieldModule
  ],
  template: `
    <p-toolbar class="mb-4">
      <ng-template #start>
        <p-button label="Export" icon="pi pi-upload" (click)="exportCSV()" />
      </ng-template>
    </p-toolbar>

    <p-table #dt [value]="fonctionnaires()" [paginator]="true" [rows]="10" [rowsPerPageOptions]="[10, 20, 30]" [globalFilterFields]="['nom', 'prenom', 'grade']">
      <ng-template #caption>
        <div class="flex justify-between items-center">
          <h5 class="m-0">Civil Servants List</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Search..." />
          </span>
        </div>
      </ng-template>

      <ng-template pTemplate="header">
        <tr>
          <th pSortableColumn="nom">Last Name <p-sortIcon field="nom" /></th>
          <th pSortableColumn="prenom">First Name <p-sortIcon field="prenom" /></th>
          <th pSortableColumn="grade">Grade <p-sortIcon field="grade" /></th>
          <th pSortableColumn="dateRecrutement">Recruitment Date <p-sortIcon field="dateRecrutement" /></th>
          <th pSortableColumn="documentSource">Document Source <p-sortIcon field="documentSource" /></th>
        </tr>
      </ng-template>

      <ng-template pTemplate="body" let-fn>
        <tr>
          <td>{{ fn.nom }}</td>
          <td>{{ fn.prenom }}</td>
          <td>{{ fn.grade }}</td>
          <td>{{ fn.dateRecrutement }}</td>
          <td>{{ fn.documentSource }}</td>
        </tr>
      </ng-template>
    </p-table>
  `
})
export class CivilServantsComponent implements OnInit {
  fonctionnaires = signal<Fonctionnaire[]>([]);

  constructor(private service: FonctionnaireService) {}

  ngOnInit() {
    this.fonctionnaires.set(this.service.getAll());
  }

  exportCSV() {
    // Fonction export avec PrimeNG CSV si nécessaire
    console.log('Export clicked');
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
