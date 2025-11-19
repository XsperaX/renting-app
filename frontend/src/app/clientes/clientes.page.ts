import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: false
})
export class ClientesPage implements OnInit {

  // Array donde guardo los clientes que vienen del backend
  clientes: any[] = [];

  // FORMULARIO DEL MODAL
  form = {
    id: null,
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    dni: ""
  };

  // CONTROL DEL MODAL
  modalAbierto = false;
  editando = false;

  constructor(
    private clienteService: ClienteService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.cargarClientes();
  }

  /// GET para obtener todos los clientes
  async cargarClientes() {
    const loading = await this.loadingCtrl.create({
      message: "Cargando clientes..."
    });

    await loading.present();

    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        loading.dismiss();
      },
      error: (err) => {
        console.error("Error cargando clientes", err);
        loading.dismiss();
      }
    });
  }

  /// ABRIR MODAL
  abrirModal(cliente?: any) {

    if (cliente) {
      this.editando = true;
      this.form = { ...cliente };
    } else {
      this.editando = false;
      this.form = {
        id: null,
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        dni: ""
      };
    }

    this.modalAbierto = true;
  }

  /// CERRAR MODAL
  cerrarModal() {
    this.modalAbierto = false;
  }

  /// GUARDAR CLIENTE
  guardar() {
    if (this.editando) {
      this.clienteService.actualizarCliente(this.form.id!, this.form).subscribe({
        next: () => {
          this.cargarClientes();
          this.cerrarModal();
        },
        error: (err) => console.error("Error actualizando cliente", err)
      });
    } else {
      this.clienteService.crearCliente(this.form).subscribe({
        next: () => {
          this.cargarClientes();
          this.cerrarModal();
        },
        error: (err) => console.error("Error creando cliente", err)
      });
    }
  }

  /// ELIMINAR CLIENTE
  async eliminar(id: number) {
    const alert = await this.alertCtrl.create({
      header: "Confirmar",
      message: "¿Seguro que quieres eliminar este cliente?",
      buttons: [
        { text: "Cancelar", role: "cancel" },
        {
          text: "Eliminar",
          handler: () => {
            this.clienteService.eliminarCliente(id).subscribe({
              next: () => this.cargarClientes(),
              error: (err) => console.error("Error eliminando cliente", err)
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
