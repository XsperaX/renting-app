import { Component, OnInit } from '@angular/core';
import { AlquilerService } from '../services/alquiler.service';
import { CocheService } from '../services/coche.service';
import { ClienteService } from '../services/cliente.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-alquileres',
  templateUrl: './alquileres.page.html',
  styleUrls: ['./alquileres.page.scss'],
  standalone: false
})
export class AlquileresPage implements OnInit {

  // =============================================================
  //  ARRAYS donde guardo datos del backend
  // =============================================================
  alquileres: any[] = [];   // Alquileres
  coches: any[] = [];       // Coches para selects
  clientes: any[] = [];     // Clientes para selects

  // =============================================================
  //  FORMULARIO DEL MODAL (Crear / Editar)
  // =============================================================
  form = {
    id: null,
    cocheId: null,
    clienteId: null,
    fecha_inicio: "",
    fecha_fin: "",
    precio_total: 0
  };

  // =============================================================
  //  CONTROL DEL MODAL
  // =============================================================
  modalAbierto = false;
  editando = false;

  constructor(
    private alquilerService: AlquilerService,
    private cocheService: CocheService,
    private clienteService: ClienteService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  // =============================================================
  //  Al entrar en la página cargo TODO
  // =============================================================
  ngOnInit() {
    this.cargarTodo();
  }

  /// ------------------------------------------------------------
  ///  CARGO COCHES, CLIENTES Y ALQUILERES
  /// ------------------------------------------------------------
  async cargarTodo() {

    const load = await this.loadingCtrl.create({
      message: "Cargando alquileres..."
    });
    await load.present();

    // Obtengo coches y clientes para mostrarlos y para selects
    this.cocheService.getCoches().subscribe(c => this.coches = c);
    this.clienteService.getClientes().subscribe(c => this.clientes = c);

    // Obtengo alquileres
    this.alquilerService.getAlquileres().subscribe({
      next: (data) => {
        this.alquileres = data;
        load.dismiss();
      },
      error: () => load.dismiss()
    });
  }

  // =============================================================
  //  FUNCIONES AUXILIARES para HTML (evita errores de Angular)
  // =============================================================

  /// Devuelve un coche por su ID
  getCocheById(id: number) {
    return this.coches.find(c => c.id === id);
  }

  /// Devuelve un cliente por su ID
  getClienteById(id: number) {
    return this.clientes.find(c => c.id === id);
  }

  // =============================================================
  //  ABRIR MODAL (Nuevo o Editar)
  // =============================================================
  abrirModal(alquiler?: any) {

    if (alquiler) {
      // EDITAR
      this.editando = true;

      this.form = {
        id: alquiler.id,
        cocheId: alquiler.cocheId,
        clienteId: alquiler.clienteId,
        fecha_inicio: alquiler.fecha_inicio,
        fecha_fin: alquiler.fecha_fin,
        precio_total: alquiler.precio_total
      };

    } else {
      // NUEVO
      this.editando = false;

      this.form = {
        id: null,
        cocheId: null,
        clienteId: null,
        fecha_inicio: "",
        fecha_fin: "",
        precio_total: 0
      };
    }

    this.modalAbierto = true;
  }

  // =============================================================
  //  CERRAR MODAL
  // =============================================================
  cerrarModal() {
    this.modalAbierto = false;
  }

  // =============================================================
  //  GUARDAR (POST o PUT)
  // =============================================================
  guardar() {

    if (this.editando) {

      // → PUT (editar alquiler)
      this.alquilerService.actualizarAlquiler(this.form.id!, this.form).subscribe(() => {
        this.cargarTodo();
        this.cerrarModal();
      });

    } else {

      // → POST (crear alquiler)
      this.alquilerService.crearAlquiler(this.form).subscribe(() => {
        this.cargarTodo();
        this.cerrarModal();
      });

    }
  }

  // =============================================================
  //  ELIMINAR ALQUILER
  // =============================================================
  async eliminar(id: number) {

    const alert = await this.alertCtrl.create({
      header: "Confirmar",
      message: "¿Quieres eliminar este alquiler?",
      buttons: [
        { text: "Cancelar", role: "cancel" },

        {
          text: "Eliminar",
          handler: () => {
            this.alquilerService.eliminarAlquiler(id).subscribe(() => {
              this.cargarTodo();
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
