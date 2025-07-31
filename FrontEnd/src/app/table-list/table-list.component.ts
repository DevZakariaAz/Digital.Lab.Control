import { Component, type OnInit, ViewChild, type ElementRef } from "@angular/core"
import { HttpClient } from "@angular/common/http"

declare var $: any // Pour jQuery/Bootstrap

@Component({
  selector: "app-table-list",
  templateUrl: "./table-list.component.html",
  styleUrls: ["./table-list.component.css"],
})
export class TableListComponent implements OnInit {
  @ViewChild("fileInput") fileInput!: ElementRef

  fonctionnaires: any[] = []
  filteredFonctionnaires: any[] = []
  searchTerm = ""
  sortColumn = ""
  sortDirection: "asc" | "desc" = "asc"

  // Variables pour les modals
  selectedFonctionnaire: any = null
  selectedIndex = -1
  editData: any = {}

  // Variables pour les toasts
  showToast = false
  toastMessage = ""
  toastTitle = ""
  toastIcon = ""
  toastClass = ""

  // Données de test adaptées
  fakeData = [
    { nom: "El Mansouri", prenom: "Amina", grade: "Assistante RH", dateRecrutement: new Date("2019-03-15") },
    { nom: "Benali", prenom: "Youssef", grade: "Technicien", dateRecrutement: new Date("2018-07-20") },
    { nom: "Khalil", prenom: "Sanae", grade: "Médecin", dateRecrutement: new Date("2020-01-10") },
    { nom: "Touhami", prenom: "Rachid", grade: "Secrétaire", dateRecrutement: new Date("2017-11-05") },
    { nom: "Alami", prenom: "Hassan", grade: "Ingénieur", dateRecrutement: new Date("2021-05-12") },
    { nom: "Benjelloun", prenom: "Fatima", grade: "Comptable", dateRecrutement: new Date("2019-09-30") },
  ]

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.http.get<any[]>("http://digital-lab-control-api/fonctionnaires").subscribe({
      next: (data) => {
        this.fonctionnaires = data.map((f) => ({
          ...f,
          dateRecrutement: new Date(f.dateRecrutement),
        }))
        this.filteredFonctionnaires = [...this.fonctionnaires]
        console.log("✅ Données chargées depuis l'API", this.fonctionnaires)
      },
      error: (error) => {
        console.warn("⚠️ Échec de chargement de l'API, utilisation de données locales")
        this.fonctionnaires = this.fakeData
        this.filteredFonctionnaires = [...this.fonctionnaires]
      },
    })
  }

  // Méthodes de filtrage
  applyFilter() {
    if (!this.searchTerm.trim()) {
      this.filteredFonctionnaires = [...this.fonctionnaires]
      return;
    }
    const term = this.searchTerm.toLowerCase().trim()
    this.filteredFonctionnaires = this.fonctionnaires.filter(
      (f) =>
        f.nom.toLowerCase().includes(term) ||
        f.prenom.toLowerCase().includes(term) ||
        f.grade.toLowerCase().includes(term),
    )
  }

      
  clearFilter() {
    this.searchTerm = ""
    this.filteredFonctionnaires = [...this.fonctionnaires]
  }

  // Méthodes de tri
  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc"
    } else {
      this.sortColumn = column
      this.sortDirection = "asc"
    }

    this.filteredFonctionnaires.sort((a, b) => {
      let valueA = a[column]
      let valueB = b[column]

      if (column === "dateRecrutement") {
        valueA = new Date(valueA).getTime()
        valueB = new Date(valueB).getTime()
      } else {
        valueA = valueA?.toString().toLowerCase() || ""
        valueB = valueB?.toString().toLowerCase() || ""
      }

      if (valueA < valueB) {
        return this.sortDirection === "asc" ? -1 : 1
      }
      if (valueA > valueB) {
        return this.sortDirection === "asc" ? 1 : -1
      }
      return 0
    })
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) {
      return "unfold_more"
    }
    return this.sortDirection === "asc" ? "keyboard_arrow_up" : "keyboard_arrow_down"
  }

  // Méthodes pour les modals
  openShowModal(fonctionnaire: any, index: number) {
    this.selectedFonctionnaire = { ...fonctionnaire }
    this.selectedIndex = index
    $("#showModal").modal("show")
  }

  openEditModal(fonctionnaire: any, index: number) {
    this.selectedFonctionnaire = { ...fonctionnaire }
    this.selectedIndex = index
    this.editData = {
      nom: fonctionnaire.nom,
      prenom: fonctionnaire.prenom,
      grade: fonctionnaire.grade,
      dateRecrutement: this.formatDateForInput(fonctionnaire.dateRecrutement),
    }
    $("#editModal").modal("show")
  }

  openEditModalFromShow() {
    $("#showModal").modal("hide")
    setTimeout(() => {
      this.openEditModal(this.selectedFonctionnaire, this.selectedIndex)
    }, 300)
  }

  openDeleteModal(fonctionnaire: any, index: number) {
    this.selectedFonctionnaire = { ...fonctionnaire }
    this.selectedIndex = index
    $("#deleteModal").modal("show")
  }

  // Méthodes d'action
  saveEdit() {
    if (this.editData.nom && this.editData.prenom && this.editData.grade && this.editData.dateRecrutement) {
      const originalIndex = this.getRealIndex(this.selectedFonctionnaire)

      if (originalIndex !== -1) {
        this.fonctionnaires[originalIndex] = {
          ...this.fonctionnaires[originalIndex],
          nom: this.editData.nom.trim(),
          prenom: this.editData.prenom.trim(),
          grade: this.editData.grade.trim(),
          dateRecrutement: new Date(this.editData.dateRecrutement),
        }

        this.applyFilter()
        $("#editModal").modal("hide")
        this.showSuccessToast("Modification réussie", "Le fonctionnaire a été modifié avec succès.")
      }
    }
  }

  confirmDelete() {
    const originalIndex = this.getRealIndex(this.selectedFonctionnaire)

    if (originalIndex !== -1) {
      const deletedName = `${this.selectedFonctionnaire.prenom} ${this.selectedFonctionnaire.nom}`
      this.fonctionnaires.splice(originalIndex, 1)
      this.applyFilter()
      $("#deleteModal").modal("hide")
      this.showSuccessToast("Suppression réussie", `${deletedName} a été supprimé avec succès.`)
    }
  }

  // Méthodes utilitaires
  calculateAnciennete(dateRecrutement: Date): string {
    const now = new Date()
    const diff = now.getTime() - dateRecrutement.getTime()
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30))

    if (years > 0) {
      return `${years} an${years > 1 ? "s" : ""} et ${months} mois`
    } else {
      return `${months} mois`
    }
  }

  formatDateForInput(date: Date): string {
    return date.toISOString().split("T")[0]
  }

  getRealIndex(fonctionnaire: any): number {
    return this.fonctionnaires.findIndex(
      (f) =>
        f.nom === fonctionnaire.nom &&
        f.prenom === fonctionnaire.prenom &&
        f.grade === fonctionnaire.grade &&
        f.dateRecrutement.getTime() === fonctionnaire.dateRecrutement.getTime(),
    )
  }

  // Méthodes pour les toasts
  showSuccessToast(title: string, message: string) {
    this.showToastMessage(title, message, "check_circle", "toast-success")
  }

  showErrorToast(title: string, message: string) {
    this.showToastMessage(title, message, "error", "toast-error")
  }

  showWarningToast(title: string, message: string) {
    this.showToastMessage(title, message, "warning", "toast-warning")
  }

  private showToastMessage(title: string, message: string, icon: string, cssClass: string) {
    this.toastTitle = title
    this.toastMessage = message
    this.toastIcon = icon
    this.toastClass = cssClass
    this.showToast = true

    setTimeout(() => {
      this.hideToast()
    }, 4000)
  }

  hideToast() {
    this.showToast = false
  }

  // Méthodes d'export (inchangées)
  exportToCSV() {
    const headers = ["Nom", "Prénom", "Grade", "Date de Recrutement"]
    const csvContent = [
      headers.join(","),
      ...this.filteredFonctionnaires.map((f) =>
        [`"${f.nom}"`, `"${f.prenom}"`, `"${f.grade}"`, `"${f.dateRecrutement.toLocaleDateString("fr-FR")}"`].join(","),
      ),
    ].join("\n")

    this.downloadFile(csvContent, "fonctionnaires.csv", "text/csv")
  }

  exportToJSON() {
    const jsonContent = JSON.stringify(
      this.filteredFonctionnaires.map((f) => ({
        ...f,
        dateRecrutement: f.dateRecrutement.toISOString().split("T")[0],
      })),
      null,
      2,
    )

    this.downloadFile(jsonContent, "fonctionnaires.json", "application/json")
  }

  exportToExcel() {
    const headers = ["Nom", "Prénom", "Grade", "Date de Recrutement"]
    const csvContent = [
      headers.join("\t"),
      ...this.filteredFonctionnaires.map((f) =>
        [f.nom, f.prenom, f.grade, f.dateRecrutement.toLocaleDateString("fr-FR")].join("\t"),
      ),
    ].join("\n")

    this.downloadFile(csvContent, "fonctionnaires.xlsx", "application/vnd.ms-excel")
  }

  private downloadFile(content: string, filename: string, contentType: string) {
    const blob = new Blob([content], { type: contentType })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.target = "_blank" // évite que ce soit chargé dans le même onglet
    link.download = filename
    link.click()
    window.URL.revokeObjectURL(url)
  }

  // Méthodes d'import (inchangées)
  triggerFileInput() {
    this.fileInput.nativeElement.click()
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e: any) => {
      try {
        if (file.name.endsWith(".json")) {
          this.importFromJSON(e.target.result)
        } else if (file.name.endsWith(".csv")) {
          this.importFromCSV(e.target.result)
        } else {
          this.showErrorToast("Format non supporté", "Utilisez des fichiers JSON ou CSV.")
        }
      } catch (error) {
        console.error("Erreur lors de l'import:", error)
        this.showErrorToast("Erreur d'import", "Erreur lors de l'import du fichier.")
      }
    }
    reader.readAsText(file)
  }

  private importFromJSON(content: string) {
    const data = JSON.parse(content)
    if (Array.isArray(data)) {
      const importedData = data.map((item) => ({
        ...item,
        dateRecrutement: new Date(item.dateRecrutement),
      }))

      this.fonctionnaires = [...this.fonctionnaires, ...importedData]
      this.applyFilter()
      this.showSuccessToast("Import réussi", `${importedData.length} enregistrement(s) importé(s) avec succès.`)
    }
  }

  private importFromCSV(content: string) {
    const lines = content.split("\n")
    const headers = lines[0].split(",")

    const importedData = lines
      .slice(1)
      .filter((line) => line.trim())
      .map((line) => {
        const values = line.split(",").map((v) => v.replace(/"/g, "").trim())
        return {
          nom: values[0] || "",
          prenom: values[1] || "",
          grade: values[2] || "",
          dateRecrutement: new Date(values[3] || new Date()),
        }
      })

    this.fonctionnaires = [...this.fonctionnaires, ...importedData]
    this.applyFilter()
    this.showSuccessToast("Import réussi", `${importedData.length} enregistrement(s) importé(s) avec succès.`)
  }
}
