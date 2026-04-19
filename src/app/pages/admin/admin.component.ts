import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  activeTab = 'problems';

  stats = [
    { label: 'Total Users', value: '52,481', delta: '+124 today' },
    { label: 'Total Submissions', value: '1.2M', delta: '+3,481 today' },
    { label: 'Platform Load', value: '42%', delta: 'Stable' },
    { label: 'Open Issues', value: '14', delta: '-2 fixed' },
  ];

  ngOnInit(): void {}
}
