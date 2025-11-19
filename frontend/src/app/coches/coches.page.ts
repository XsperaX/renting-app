import { Component, OnInit } from '@angular/core';
import { CocheService } from '../services/coche.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-coches',
  templateUrl: './coches.page.html',
  styleUrls: ['./coches.page.scss'],
  standalone: false
})
export class CochesPage implements OnInit {

  // -------------------------------------------------------------------
  //  LISTA DE COCHES QUE CARGO DESDE EL BACKEND
  // -------------------------------------------------------------------
  coches: any[] = [];

  // -------------------------------------------------------------------
  //  FORMULARIO DEL MODAL (crear / editar coche)
  // -------------------------------------------------------------------
  form = {
    id: null,
    marca: "",
    modelo: "",
    matricula: "",
    anio: 0,
    precio_dia: 0,
    disponible: true
  };

  // Archivo temporal seleccionado para subir
  fotoSeleccionada: File | null = null;

  // -------------------------------------------------------------------
  //  CONTROL DEL MODAL
  // -------------------------------------------------------------------
  modalAbierto = false;   
  editando = false;       

  constructor(
    private cocheService: CocheService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  // -------------------------------------------------------------------
  //  AL ENTRAR EN LA PÁGINA → CARGO COCHES
  // -------------------------------------------------------------------
  ngOnInit() {
    this.cargarCoches();
  }

  // -------------------------------------------------------------------
  //  GET → obtener lista de coches del backend
  // -------------------------------------------------------------------
  async cargarCoches() {

    const loading = await this.loadingCtrl.create({
      message: "Cargando coches..."
    });

    await loading.present();

    this.cocheService.getCoches().subscribe({
      next: (data) => {
        this.coches = data;
        loading.dismiss();
      },
      error: (err) => {
        console.error("Error cargando coches", err);
        loading.dismiss();
      }
    });
  }

  // -------------------------------------------------------------------
  //  DETECTAR FOTO SELECCIONADA (input file)
  // -------------------------------------------------------------------
  seleccionarFoto(event: any) {
    const archivo = event.target.files[0];
    this.fotoSeleccionada = archivo ?? null;
  }

  // -------------------------------------------------------------------
  //  ABRIR MODAL (tanto para crear como editar)
  // -------------------------------------------------------------------
  abrirModal(coche?: any) {

    if (coche) {
      /// EDITAR COCHE
      this.editando = true;

      this.form = {
        id: coche.id,
        marca: coche.marca,
        modelo: coche.modelo,
        matricula: coche.matricula,
        anio: coche.anio,
        precio_dia: coche.precio_dia,
        disponible: coche.disponible
      };

    } else {
      /// AÑADIR COCHE NUEVO
      this.editando = false;

      this.form = {
        id: null,
        marca: "",
        modelo: "",
        matricula: "",
        anio: 2024,
        precio_dia: 0,
        disponible: true
      };
    }

    this.fotoSeleccionada = null;
    this.modalAbierto = true;
  }

  // -------------------------------------------------------------------
  //  CERRAR MODAL
  // -------------------------------------------------------------------
  cerrarModal() {
    this.modalAbierto = false;
  }

  // -------------------------------------------------------------------
  //  GUARDAR → hace POST o PUT según si estoy editando
  // -------------------------------------------------------------------
  guardar() {

    if (this.editando) {

      /// PUT → actualizar coche existente
      this.cocheService.actualizarCoche(this.form.id!, this.form).subscribe({
        next: () => {

          // Si seleccionó foto -> subirla
          if (this.fotoSeleccionada) {
            this.cocheService.subirFoto(this.form.id!, this.fotoSeleccionada)
              .subscribe(() => this.cargarCoches());
          } else {
            this.cargarCoches();
          }

          this.cerrarModal();
        },
        error: (err) => console.error("Error al editar coche", err)
      });

    } else {

      /// POST → crear coche nuevo
      this.cocheService.crearCoche(this.form).subscribe({
        next: (nuevo) => {

          // Si seleccionó foto -> subirla
          if (this.fotoSeleccionada) {
            this.cocheService.subirFoto(nuevo.id, this.fotoSeleccionada)
              .subscribe(() => this.cargarCoches());
          } else {
            this.cargarCoches();
          }

          this.cerrarModal();
        },
        error: (err) => console.error("Error al crear coche", err)
      });

    }
  }

  // -------------------------------------------------------------------
  //  ELIMINAR → confirmación antes de borrar
  // -------------------------------------------------------------------
  async eliminar(id: number) {

    const alert = await this.alertCtrl.create({
      header: "Confirmar",
      message: "¿Seguro que quieres eliminar este coche?",
      buttons: [
        { text: "Cancelar", role: "cancel" },
        {
          text: "Eliminar",
          handler: () => {
            this.cocheService.eliminarCoche(id).subscribe({
              next: () => this.cargarCoches(),
              error: (err) => console.error("Error eliminando", err)
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
