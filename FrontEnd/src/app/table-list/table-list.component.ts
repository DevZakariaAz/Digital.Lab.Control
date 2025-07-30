import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  fonctionnaires: any[] = [];

  // fake fallback data adaptée
  fakeData = [
    { nom: 'El Mansouri', prenom: 'Amina', grade: 'Assistante RH', dateRecrutement: new Date('2019-03-15') },
    { nom: 'Benali', prenom: 'Youssef', grade: 'Technicien', dateRecrutement: new Date('2018-07-20') },
    { nom: 'Khalil', prenom: 'Sanae', grade: 'Médecin', dateRecrutement: new Date('2020-01-10') },
    { nom: 'Touhami', prenom: 'Rachid', grade: 'Secrétaire', dateRecrutement: new Date('2017-11-05') }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    // Mettre à jour l'URL avec ton endpoint réel
    this.http.get<any[]>('http://digital-lab-control-api/fonctionnaires').subscribe({
      next: (data) => {
        this.fonctionnaires = data.map(f => ({
          ...f,
          dateRecrutement: new Date(f.dateRecrutement)
        }));
        console.log('✅ Données chargées depuis l’API', this.fonctionnaires);
      },
      error: (error) => {
        console.warn('⚠️ Échec de chargement de l’API, utilisation de données locales');
        this.fonctionnaires = this.fakeData;
      }
    });
  }
}
