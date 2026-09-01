package com.app.backend.mappers;

import com.app.backend.dtos.requests.UsuarioRequestDTO;
import com.app.backend.dtos.responses.UsuarioResponseDTO;
import com.app.backend.entities.Usuario;

public final class UsuarioMapper {
    public static Usuario toEntity(UsuarioRequestDTO usuarioResponseDTO, String senhaCriptografada) {
        Usuario usuario = new Usuario();
        usuario.setNome(usuarioResponseDTO.nome());
        usuario.setEmail(usuarioResponseDTO.email());
        usuario.setSenha(senhaCriptografada);
        return usuario;
    }

    public static UsuarioResponseDTO toResponseDTO(Usuario usuario) {
        return new UsuarioResponseDTO(usuario.getId(), usuario.getNome(), usuario.getEmail());
    }
}
