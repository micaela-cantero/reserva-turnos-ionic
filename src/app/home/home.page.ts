import { Component } from '@angular/core';

interface Horario {
  hora: string;
  estado: 'Disponible' | 'Reservado';
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  fechaSeleccionada: string = '';

  horarios: Horario[] = [];

  // Aquí se guardarán los horarios de cada fecha
  horariosPorFecha: { [fecha: string]: Horario[] } = {};

  constructor() {}

  cambiarFecha() {
    if (!this.fechaSeleccionada) {
      this.horarios = [];
      return;
    }

    // Si la fecha todavía no tiene horarios, crea una lista nueva
    if (!this.horariosPorFecha[this.fechaSeleccionada]) {
      this.horariosPorFecha[this.fechaSeleccionada] =
        this.crearHorariosIniciales();
    }

    // Muestra los horarios correspondientes a la fecha seleccionada
    this.horarios = this.horariosPorFecha[this.fechaSeleccionada];
  }

  crearHorariosIniciales(): Horario[] {
    return [
      { hora: '08:00', estado: 'Disponible' },
      { hora: '09:00', estado: 'Reservado' },
      { hora: '10:00', estado: 'Disponible' },
      { hora: '11:00', estado: 'Disponible' },
      { hora: '12:00', estado: 'Reservado' },
    ];
  }

  reservarTurno(horario: Horario) {
    if (horario.estado === 'Disponible') {
      horario.estado = 'Reservado';
    }
  }

  get turnosDisponibles(): number {
    return this.horarios.filter(
      horario => horario.estado === 'Disponible'
    ).length;
  }
}