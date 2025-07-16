import { Injectable } from '@angular/core';

export interface Fonctionnaire {
  nom: string;
  prenom: string;
  grade: string;
  dateRecrutement: string;
  documentSource?: string;
}

@Injectable({ providedIn: 'root' })
export class FonctionnaireService {
  private _data: Fonctionnaire[] = [];

  getAll() {
    return this._data;
  }

  add(fn: Fonctionnaire) {
    this._data.push(fn);
  }

  setAll(data: Fonctionnaire[]) {
    this._data = data;
  }

  clear() {
    this._data = [];
  }
}
