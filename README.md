# WoW Register — Guía para ejecutar la aplicación

Esta guía explica **paso a paso** cómo poner en marcha el **backend** (servidor Java) y la **web** (interfaz en el navegador) para personas con poca experiencia técnica.

---

## ¿Qué necesito tener instalado?

Antes de empezar, asegúrate de tener instalado:

| Herramienta | Para qué sirve | Cómo comprobar si lo tienes |
|-------------|----------------|-----------------------------|
| **Java 21** | Ejecuta el backend | Abre una terminal y escribe: `java -version`. Debe aparecer algo como "21.x.x". |
| **Maven** | Compila y arranca el backend | En la terminal: `mvn -version`. Debe mostrar una versión (ej. 3.9.x). |
| **Node.js** (v18 o superior) | Ejecuta la web | En la terminal: `node -version`. Debe mostrar v18 o superior. |
| **npm** | Instala dependencias de la web | En la terminal: `npm -version`. |
| **MySQL** (8.x recomendado) | Base de datos del emulador | Debe estar instalado y en ejecución. Puedes comprobarlo intentando conectarte con un cliente MySQL. |

Si falta algo, instálalo antes de seguir. En Mac puedes usar [Homebrew](https://brew.sh) para instalar Java, Maven, Node y MySQL.

---

## Resumen rápido (orden de pasos)

1. **MySQL**: tenerlo instalado y en marcha.
2. **Crear las bases de datos** con los scripts del proyecto.
3. **Configurar contraseña de MySQL** en el backend (si no usas la por defecto).
4. **Arrancar el backend** (Java).
5. **Instalar dependencias de la web** e **arrancar la web** (Next.js).
6. **Abrir el navegador** en `http://localhost:3000`.

---

## Paso 1 — MySQL en ejecución

- Asegúrate de que **MySQL está instalado** y que el **servicio está iniciado** (en Mac: abrir Preferencias del Sistema → MySQL → "Start MySQL Server"; en Windows: servicio MySQL en ejecución).
- Necesitas saber:
  - **Usuario** (normalmente `root`).
  - **Contraseña** que configuraste para ese usuario.

Si no recuerdas la contraseña, tendrás que resetearla según la documentación de tu versión de MySQL.

---

## Paso 2 — Crear las bases de datos (auth, characters, world)

El backend usa **tres bases de datos**: `auth`, `characters` y `world`. El proyecto incluye scripts para crearlas y cargar datos de prueba.

1. Abre una **terminal**.
2. Ve a la carpeta de los scripts de base de datos:
   ```bash
   cd /ruta/donde/está/el/proyecto/wow-register/scripts/db
   ```
   (Sustituye `/ruta/donde/está/el/proyecto/` por tu ruta real; por ejemplo: `cd ~/Documents/wow-register/scripts/db`.)

3. Dale permisos de ejecución al script (solo la primera vez):
   ```bash
   chmod +x 00-run-all.sh
   ```

4. Ejecuta el script que crea las bases de datos y carga datos de prueba:
   ```bash
   ./00-run-all.sh root localhost
   ```
   - Si tu usuario de MySQL no es `root`, cambia `root` por tu usuario.
   - Si MySQL está en otra máquina, cambia `localhost` por la IP o nombre del servidor.

5. Cuando te pida **Contraseña MySQL**, escribe la contraseña de tu usuario (no se verá mientras escribes) y pulsa **Enter**.

6. Si todo va bien, al final verás un mensaje tipo: **"Listo. Bases de datos y datos mock creados."**

---

## Paso 3 — Configurar el backend (contraseña de MySQL)

El backend se conecta a MySQL. Por defecto espera:

- Usuario: `root`
- Contraseña: `sebastian`
- Servidor: `localhost:3306`

Si tu contraseña **no** es `sebastian`, tienes dos opciones:

**Opción A — Variables de entorno (recomendado)**  
Antes de arrancar el backend, en la misma terminal donde lo vayas a ejecutar:

- En Linux/Mac:
  ```bash
  export SPRING_DATASOURCE_AUTH_PASSWORD=tu_contraseña
  export SPRING_DATASOURCE_CHARACTERS_PASSWORD=tu_contraseña
  export SPRING_DATASOURCE_WORLD_PASSWORD=tu_contraseña
  ```
- En Windows (CMD):
  ```cmd
  set SPRING_DATASOURCE_AUTH_PASSWORD=tu_contraseña
  set SPRING_DATASOURCE_CHARACTERS_PASSWORD=tu_contraseña
  set SPRING_DATASOURCE_WORLD_PASSWORD=tu_contraseña
  ```

**Opción B — Editar el archivo de configuración**  
Abre el archivo:

`src/main/resources/application.properties`

y cambia las líneas que tienen `password=sebastian` por tu contraseña real en las tres bases (auth, characters, world). No subas este archivo con tu contraseña a un repositorio público.

---

## Paso 4 — Arrancar el backend (servidor Java)

1. Abre una **terminal**.
2. Ve a la **raíz del proyecto** (donde está el archivo `pom.xml`):
   ```bash
   cd /ruta/donde/está/el/proyecto/wow-register
   ```

3. Ejecuta:
   ```bash
   ./mvnw spring-boot:run
   ```
   (En Windows: `mvnw.cmd spring-boot:run`.)

4. Espera a que aparezca un mensaje indicando que la aplicación ha arrancado (suele decir algo como "Started WowrRegisterApplication" y que el servidor está escuchando en el **puerto 8080**).

5. **Deja esta terminal abierta** mientras uses la aplicación. Si la cierras, el backend se apagará.

Para comprobar que el backend responde: abre en el navegador  
`http://localhost:8080/api/realms`  
Deberías ver datos en formato JSON (o una lista vacía `[]`).

---

## Paso 5 — Instalar dependencias e arrancar la web (Next.js)

1. Abre **otra terminal** (deja la del backend abierta).
2. Entra en la carpeta de la web:
   ```bash
   cd /ruta/donde/está/el/proyecto/wow-register/web
   ```

3. Instala las dependencias (solo hace falta hacerlo una vez, o cuando cambien las dependencias del proyecto):
   ```bash
   npm install
   ```

4. Arranca la aplicación web en modo desarrollo:
   ```bash
   npm run dev
   ```

5. Cuando arranque, verás algo como: **"Local: http://localhost:3000"**.  
   **Deja esta terminal abierta** mientras uses la web.

---

## Paso 6 — Usar la aplicación en el navegador

1. Abre el navegador (Chrome, Firefox, Safari, Edge, etc.).
2. En la barra de direcciones escribe:
   ```text
   http://localhost:3000
   ```
3. Pulsa **Enter**.

Deberías ver la página principal de WoW Register. La web se comunica con el backend automáticamente (las peticiones a `/api/*` se redirigen a `http://localhost:8080`).

---

## Orden recomendado cada vez que quieras usar la app

1. **MySQL** en ejecución.
2. **Terminal 1**: desde la raíz del proyecto → `./mvnw spring-boot:run` → esperar a que arranque.
3. **Terminal 2**: desde la carpeta `web` → `npm run dev` → esperar a que diga "Local: http://localhost:3000".
4. **Navegador**: abrir `http://localhost:3000`.

---

## Si algo falla

- **"Failed to configure a DataSource"** o errores de conexión a base de datos  
  - Comprueba que MySQL está en marcha y que el usuario/contraseña en `application.properties` (o en las variables de entorno) son correctos.  
  - Asegúrate de haber ejecutado el script `00-run-all.sh` para crear las bases `auth`, `characters` y `world`.

- **La web no carga datos**  
  - Comprueba que el backend está arrancado (terminal con `spring-boot:run`) y que en el navegador `http://localhost:8080/api/realms` responde.  
  - Si el backend está en otra máquina o puerto, puedes configurar la variable de entorno `NEXT_PUBLIC_API_URL=http://IP:8080` en la carpeta `web` antes de `npm run dev`.

- **Puerto 8080 o 3000 ya en uso**  
  - Cierra la aplicación que esté usando ese puerto, o cambia el puerto del backend (en `application.properties`: `server.port=8081`) o de Next.js (por ejemplo: `npm run dev -- -p 3001`).

- **No tengo Java 21 / Maven / Node**  
  - Instálalos según tu sistema operativo. En Mac con Homebrew: `brew install openjdk@21 maven node`. Luego asegúrate de que `java`, `mvn` y `node` están en el PATH.

---

## Estructura del proyecto (referencia)

- **Backend**: carpeta raíz del repo (`pom.xml`, `src/`). Servidor Spring Boot en el puerto **8080**.
- **Web**: carpeta **`web/`**. Aplicación Next.js; en desarrollo corre en el puerto **3000** y redirige las peticiones `/api/*` al backend.
- **Scripts de base de datos**: carpeta **`scripts/db/`**. El script `00-run-all.sh` ejecuta en orden los SQL que crean las bases y cargan datos de prueba.

Con esto deberías poder ejecutar tanto el backend como la web de forma clara y ordenada.
