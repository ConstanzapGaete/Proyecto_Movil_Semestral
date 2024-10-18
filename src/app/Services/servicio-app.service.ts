import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class ServicioAppService {
  private usuarioAutenticado: { usuario: string; password: string } | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async agregarUsuario(usuario: string, password: string): Promise<void> {
    const usuarios = (await this.storage.get('usuarios')) || [];
    usuarios.push({ usuario, password });
    await this.storage.set('usuarios', usuarios);
  }

  async autenticarUsuario(usuario: string, password: string): Promise<boolean> {
    const usuarios = (await this.storage.get('usuarios')) || [];
    const user = usuarios.find(
      (user: { usuario: string; password: string }) =>
        user.usuario.trim().toLowerCase() === usuario.trim().toLowerCase() &&
        user.password === password
    );
    if (user) {
      this.usuarioAutenticado = user;
      return true;
    }
    return false;
  }

  async hayUsuariosRegistrados(): Promise<boolean> {
    const usuarios = (await this.storage.get('usuarios')) || [];
    return usuarios.length > 0;
  }

  obtenerUsuarioAutenticado(): { usuario: string; password: string } | null {
    return this.usuarioAutenticado;
  }

  cerrarSesion(): void {
    this.usuarioAutenticado = null;
  }

  async verificarUsuarioExistente(usuario: string): Promise<boolean> {
    const usuarios = (await this.storage.get('usuarios')) || [];
    return usuarios.some(
      (user: { usuario: string }) =>
        user.usuario.trim().toLowerCase() === usuario.trim().toLowerCase()
    );
  }

  async obtenerUsuarios() {
    return (await this.storage.get('usuarios')) || [];
  }

  async cambiarContrasena(usuario: string, nuevaPassword: string): Promise<boolean> {
    const usuarios = (await this.storage.get('usuarios')) || [];
    const user = usuarios.find(
      (user: { usuario: string }) =>
        user.usuario.trim().toLowerCase() === usuario.trim().toLowerCase()
    );
    if (user) {
      user.password = nuevaPassword;
      await this.storage.set('usuarios', usuarios);
      return true;
    }
    return false;
  }

}
