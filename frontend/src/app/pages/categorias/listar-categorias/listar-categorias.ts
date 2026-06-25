import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria';

@Component({
  selector: 'app-listar-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-categorias.html',
  styleUrl: './listar-categorias.scss',
  encapsulation: ViewEncapsulation.None
})
export class ListarCategorias implements OnInit {

  categorias: any[] = [];
  categoriasFiltradas: any[] = [];
  cargando = true;
  busqueda = '';

  modalFormAbierto = false;
  modalEliminar = false;
  modoEdicion = false;
  categoriaSeleccionada: any = null;
  categoriaAEliminar: any = null;

  form: any = { nombre: '', descripcion: '' };

  constructor(
    private categoriaService: CategoriaService,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.listar().subscribe({
      next: (data) => {
        this.categorias = data;
        this.filtrar();
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  filtrar() {
    const q = this.busqueda.toLowerCase();
    this.categoriasFiltradas = this.categorias.filter(c =>
      c.nombre?.toLowerCase().includes(q) ||
      c.descripcion?.toLowerCase().includes(q)
    );
  }

  abrirNuevo() {
    this.modoEdicion = false;
    this.form = { nombre: '', descripcion: '' };
    this.modalFormAbierto = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  abrirEditar(categoria: any) {
    this.modoEdicion = true;
    this.categoriaSeleccionada = categoria;
    this.form = { nombre: categoria.nombre, descripcion: categoria.descripcion };
    this.modalFormAbierto = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  cerrarForm() {
    this.modalFormAbierto = false;
    this.categoriaSeleccionada = null;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }

  guardar() {
    if (this.modoEdicion) {
      this.categoriaService.actualizar(this.categoriaSeleccionada.id, this.form).subscribe({
        next: (data) => {
          const idx = this.categorias.findIndex(c => c.id === data.id);
          if (idx !== -1) this.categorias[idx] = data;
          this.filtrar();
          this.cerrarForm();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.categoriaService.guardar(this.form).subscribe({
        next: (data) => {
          this.categorias.push(data);
          this.filtrar();
          this.cerrarForm();
        },
        error: (err) => console.error(err)
      });
    }
  }

  confirmarEliminar(categoria: any) {
    this.categoriaAEliminar = categoria;
    this.modalEliminar = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  eliminar() {
    this.categoriaService.eliminar(this.categoriaAEliminar.id).subscribe({
      next: () => {
        this.categorias = this.categorias.filter(c => c.id !== this.categoriaAEliminar.id);
        this.filtrar();
        this.modalEliminar = false;
        this.categoriaAEliminar = null;
        this.document.body.classList.remove('modal-open');
        this.cdr.detectChanges();
      },
      error: () => {
        this.modalEliminar = false;
        this.document.body.classList.remove('modal-open');
        this.cdr.detectChanges();
      }
    });
  }

  cancelarEliminar() {
    this.modalEliminar = false;
    this.categoriaAEliminar = null;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }
}