export const perfilFalso = {
    nombre: 'Ana Prueba',
    titular: 'Desarrolladora de prueba',
    bio: 'Bio de prueba.',
    foto: 'img/foto.png',
    fotoAlt: 'Retrato de Ana',
    redes: [
        { id: 'github', etiqueta: 'GitHub', url: 'https://github.com/ana' },
        { id: 'linkedin', etiqueta: 'LinkedIn', url: 'https://linkedin.com/in/ana' },
    ],
    email: 'ana@example.com',
    sobreMi: { 
        parrafos: ['Primer párrafo.', 'Segundo párrafo.'], 
        habilidades: ['React', 'Java'] 
    },
};


export const proyectosFalsos = {
    proyectos: [
        { id: 'p1', titulo: 'Proyecto Uno', descripcion: 'Descripción 1', imagen: 'img/1.png', imagenAlt: 'Alt 1', tecnologias: ['React'], enlace: 'https://github.com/ana/uno' },
        { id: 'p2', titulo: 'Proyecto Dos', descripcion: 'Descripción 2', imagen: 'img/2.png', imagenAlt: 'Alt 2', tecnologias: ['Java', 'SQL'], enlace: 'https://github.com/ana/dos', etiquetaEnlace: 'Ver repositorio' },
        { id: 'p3', titulo: 'Proyecto Tres', descripcion: 'Descripción 3', imagen: 'img/3.png', imagenAlt: 'Alt 3', tecnologias: [], enlace: 'https://github.com/ana/tres' },
    ],
};


export const noticiasFalsas = {
    secciones: [
        { id: 's1', titulo: 'Sección A', noticias: [{ id: 'n1', titulo: 'Noticia 1', fecha: '2024-01-15', contenido: 'Contenido 1' }] },
        { id: 's2', titulo: 'Sección B', noticias: [{ id: 'n2', titulo: 'Noticia 2', fecha: '2024-02-20', contenido: 'Contenido 2' }] },
    ],
};


export const rutasCompletas = {
    'data/profile.json': perfilFalso,
    'data/projects.json': proyectosFalsos,
    'data/news.json': noticiasFalsas,
};