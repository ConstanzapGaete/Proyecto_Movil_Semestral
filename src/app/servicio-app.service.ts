import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicioAppService {
  private usuarios: { usuario: string; password: string }[] = [
    { usuario: 'marcopalmap', password: '123456' },
    { usuario: 'constanza', password: '123456' },
    { usuario: 'admin', password: 'admin' },
  ];
  private usuarioAutenticado: { usuario: string; password: string } | null =
    null;

  constructor() {}

  agregarUsuario(usuario: string, password: string): void {
    this.usuarios.push({ usuario, password });
  }

  autenticarUsuario(usuario: string, password: string): boolean {
    const user = this.usuarios.find(
      (user) =>
        user.usuario.trim().toLowerCase() === usuario.trim().toLowerCase() &&
        user.password === password
    );
    if (user) {
      this.usuarioAutenticado = user;
      return true;
    }
    return false;
  }

  hayUsuariosRegistrados(): boolean {
    return this.usuarios.length > 0;
  }

  obtenerUsuarioAutenticado(): { usuario: string; password: string } | null {
    return this.usuarioAutenticado;
  }

  cerrarSesion(): void {
    this.usuarioAutenticado = null;
  }

  verificarUsuarioExistente(usuario: string): boolean {
    return this.usuarios.some(
      (user) =>
        user.usuario.trim().toLowerCase() === usuario.trim().toLowerCase()
    );
  }

  cambiarContrasena(usuario: string, nuevaPassword: string): boolean {
    const user = this.usuarios.find(
      (u) => u.usuario.trim().toLowerCase() === usuario.trim().toLowerCase()
    );

    if (user) {
      user.password = nuevaPassword;
      return true;
    }

    return false;
  }

  obtenerUsuarios() {
    return this.usuarios;
  }
}
