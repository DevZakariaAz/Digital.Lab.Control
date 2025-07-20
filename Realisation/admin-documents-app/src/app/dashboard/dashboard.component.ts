import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Document statistics
  documentStats = [
    { label: 'Word Files', count: 24, icon: 'pi pi-file-word', color: '#3B82F6' },
    { label: 'PDF Files', count: 12, icon: 'pi pi-file-pdf', color: '#EF4444' },
    { label: 'Excel Files', count: 8, icon: 'pi pi-file-excel', color: '#10B981' },
    { label: 'Total Employees', count: 45, icon: 'pi pi-users', color: '#8B5CF6' }
  ];

  // Recent documents
  recentDocuments = [
    { name: 'Employee_Contract.docx', type: 'Word', date: '2023-11-15', size: '2.4 MB' },
    { name: 'Financial_Report.xlsx', type: 'Excel', date: '2023-11-12', size: '1.8 MB' },
    { name: 'Policy_Handbook.pdf', type: 'PDF', date: '2023-11-10', size: '3.2 MB' },
    { name: 'Meeting_Minutes.docx', type: 'Word', date: '2023-11-08', size: '1.5 MB' }
  ];

  // Chart data
  uploadChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Word Documents',
        data: [12, 19, 15, 24, 18, 22],
        borderColor: '#3B82F6'
      },
      {
        label: 'PDF Documents',
        data: [8, 11, 13, 6, 10, 9],
        borderColor: '#EF4444'
      }
    ]
  };

  // Table columns
  cols = [
    { field: 'name', header: 'Document Name' },
    { field: 'type', header: 'Type' },
    { field: 'date', header: 'Upload Date' },
    { field: 'size', header: 'Size' }
  ];
}