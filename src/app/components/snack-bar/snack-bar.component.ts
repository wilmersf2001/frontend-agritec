import { Component, Inject, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss',
})
export class SnackBarComponent {
  @Input() message: string;
  @Input() icon: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = this.data.message;
    this.icon = this.data.icon;
  }

  snackBarRef = inject(MatSnackBarRef);
}
