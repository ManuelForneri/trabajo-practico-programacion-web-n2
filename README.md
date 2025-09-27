# Trabajo Práctico - Programación Web N2

## Parte 1: Preguntas Teóricas

### 1) ¿Cuáles son las propiedades de CSS para centrar un elemento?

Para centrar un elemento en CSS, podemos utilizar varias propiedades dependiendo del contexto:

**Centrado horizontal:**

- `margin: 0 auto;` (para elementos block-level)
- `text-align: center;` (para elementos inline o inline-block)

**Centrado vertical:**

- `display: flex; align-items: center; justify-content: center;` (para contenedores flexbox)
- `display: grid; place-items: center;` (para contenedores grid)
- `position: absolute; top: 50%; transform: translateY(-50%);` (para posicionamiento absoluto)

**Centrado horizontal y vertical:**

- `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);`

### 2) ¿Qué es el DOM en JavaScript?

El DOM (Document Object Model) es una interfaz de programación que representa la estructura de un documento HTML o XML como un árbol de nodos. En JavaScript, el DOM permite:

- Acceder y manipular elementos HTML
- Cambiar el contenido, estructura y estilos de una página web
- Responder a eventos del usuario (clics, teclas presionadas, etc.)
- Crear dinámicamente nuevos elementos y contenido

El DOM representa el documento como una estructura jerárquica donde cada elemento HTML es un nodo que puede tener propiedades, métodos y eventos asociados.

### 3) ¿Qué es el CEO en una página web?

**CEO** en el contexto de páginas web se refiere a **SEO** (Search Engine Optimization). Hay una confusión tipográfica en la pregunta original.

**SEO (Search Engine Optimization)** es el proceso de optimizar una página web para mejorar su visibilidad y posicionamiento en los motores de búsqueda como Google, Bing, etc. Incluye:

- Optimización de contenido y estructura
- Uso de palabras clave relevantes
- Mejora de la velocidad de carga
- Optimización para dispositivos móviles
- Creación de enlaces de calidad
- Uso de meta tags y descripciones

### 4) ¿Qué son y para qué sirven Git y Github?

**Git** es un sistema de control de versiones distribuido que permite:

- Realizar seguimiento de cambios en el código
- Trabajar de forma colaborativa
- Revertir cambios si es necesario
- Crear ramas para desarrollar características nuevas

**GitHub** es una plataforma web que aloja repositorios Git y proporciona herramientas adicionales para la colaboración.

#### a) ¿Qué es un commit?

Un commit es una instantánea del estado actual del repositorio en un momento específico. Incluye:

- Los cambios realizados en los archivos
- Un mensaje descriptivo
- Información del autor y fecha
- Un identificador único (hash)

#### b) ¿Qué es una branch?

Una branch (rama) es una línea independiente de desarrollo dentro del repositorio. Permite:

- Desarrollar nuevas características sin afectar la rama principal
- Experimentar con cambios
- Trabajar en paralelo con otros desarrolladores
- Fusionar cambios cuando están listos

#### c) ¿Qué es un repositorio?

Un repositorio es un espacio de almacenamiento donde se guarda el historial completo de un proyecto, incluyendo:

- Todos los archivos del proyecto
- Historial de commits
- Ramas existentes
- Configuraciones del proyecto

#### d) Comandos para realizar un push a un repositorio

```bash
# 1. Verificar el estado del repositorio
git status

# 2. Agregar archivos al staging area
git add .

# 3. Crear un commit con mensaje
git commit -m "Mensaje descriptivo del commit"

# 4. Hacer push a la rama remota (generalmente main o master)
```
