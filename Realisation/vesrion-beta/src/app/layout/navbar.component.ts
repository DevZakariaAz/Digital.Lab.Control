import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MenubarModule, RouterModule],
  template: `
    <p-menubar [model]="items" styleClass="mb-4">
      <ng-template pTemplate="start">
        <span class="text-lg font-bold">📂 LaboDoc</span>
      </ng-template>
    </p-menubar>
  `
})
export class NavbarComponent {
  items = [
    { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/' },
    { label: 'Civil Servants', icon: 'pi pi-users', routerLink: '/civil-servants' },
    { label: 'Upload Document', icon: 'pi pi-upload', routerLink: '/upload-doc' }
  ];
}
