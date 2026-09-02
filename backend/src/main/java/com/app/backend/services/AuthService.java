package com.app.backend.services;

import com.app.backend.dtos.requests.LoginRequestDTO;
import com.app.backend.dtos.requests.UsuarioRequestDTO;
import com.app.backend.dtos.responses.AuthResponseDTO;
import com.app.backend.dtos.responses.UsuarioResponseDTO;
import com.app.backend.entities.Usuario;
import com.app.backend.handler.UnauthorizedException;
import com.app.backend.mappers.UsuarioMapper;
import com.app.backend.repositories.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService
    ) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Transactional
    public UsuarioResponseDTO registrar(UsuarioRequestDTO request) throws UnauthorizedException {

        if (usuarioRepository.existsByEmail(request.email())) {
            throw new UnauthorizedException("Não foi possível registrar o usuário.");
        }

        if (!request.senha().equals(request.repitaSenha())) {
            throw new UnauthorizedException("As senhas não coincidem.");
        }

        if (!request.email().equals(request.repitaEmail())) {
            throw new UnauthorizedException("Os emails não coincidem.");
        }

        Usuario usuario = UsuarioMapper.toEntity(request, passwordEncoder.encode(request.senha()));

        Usuario salvo = usuarioRepository.save(usuario);

        return UsuarioMapper.toResponseDTO(salvo);
    }

    public AuthResponseDTO autenticar(LoginRequestDTO request) throws UnauthorizedException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.senha())
        );

        Usuario usuario = (Usuario) authentication.getPrincipal();
        if (usuario == null) {
            throw new UnauthorizedException("Não foi possível autenticar o usuário.");
        }
        String token = jwtService.gerarToken(usuario);

        return new AuthResponseDTO(token, "Bearer", usuario.getEmail(), usuario.getNome());
    }

    public Usuario getUsuarioAutenticado() throws UnauthorizedException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("Usuário não autenticado.");
        }

        Usuario usuario = (Usuario) authentication.getPrincipal();

        if (usuario == null) {
            throw new UnauthorizedException("Usuário não encontrado.");
        }

        return usuario;
    }
}
