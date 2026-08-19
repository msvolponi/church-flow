import { Component } from '@angular/core';
import { AdminChurchStatsWidget } from './components/churchstatswidget';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, AdminChurchStatsWidget],
  templateUrl: './dashboard.html'
})
export class AdminDashboard {}
