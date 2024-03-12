import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { User } from '../../../interfaces/user';

import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { HandleUsuarioComponent } from './handle-usuario/handle-usuario.component';
import { fadeInAnimation } from '../../../animations/fade-in.animation';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  animations: [fadeInAnimation],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent {
  displayedColumns: string[] = [
    'id',
    'nombres',
    'apellidos',
    'telefono',
    'usuario',
    'email',
    'rol',
    'acciones',
  ];
  dataSource: User[] = [];
  loading = true;

  constructor(public dialog: MatDialog, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: any) => {
      this.dataSource = data.data;
      this.loading = false;
    });
  }

  openDialog(action: string, usuario?: User): void {
    const dialogRef = this.dialog.open(HandleUsuarioComponent, {
      data: {
        usuario: usuario,
        action: action,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
