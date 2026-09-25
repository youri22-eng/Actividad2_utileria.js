# utileria.js

**Alumno:** Ruiz Chavez Youri Jorkaeff

## ¿Qué hice y qué problema resuelve?

Para esta actividad hice una librería en JavaScript llamada `utileria.js`. La idea es tener en un solo archivo todas las validaciones que normalmente se repiten en un formulario (revisar que un correo tenga el formato correcto, que una contraseña sea segura, que un texto solo tenga letras, calcular la edad de alguien, etc.), para no tener que escribir esa lógica otra vez cada vez que hago un formulario nuevo.

La librería no usa ningún framework ni depende de nada externo, es JavaScript puro. La probé conectándola a dos páginas reales: un formulario de registro (`index.html`) y una página de login (`login.html`).

## Cómo la construí

Empecé escribiendo las 6 funciones que pedía la actividad, cada una encargada de una sola cosa:

- **`validarCorreo`**: aquí usé una expresión regular para revisar que el texto tenga la forma de un correo (usuario, arroba, dominio, punto, extensión). Escribí el patrón letra por letra (letras de la A a la Z, números del 0 al 9, y algunos símbolos permitidos como el punto), en vez de usar los atajos cortos de regex, para entender bien qué estaba validando cada parte.

- **`soloLetras`**: también con una expresión regular, pero esta vez listando directamente las vocales acentuadas y la ñ, porque el ejercicio pedía aceptar esos casos.

- **`validarLongitud`**: en vez de usar una regex, aquí recorrí el texto carácter por carácter con un ciclo `for`, revisando uno por uno que cada carácter fuera un número del 0 al 9, y al final comparé la longitud contra el máximo permitido.

- **`calcularEdad`**: la parte que más me costó entender. Se resta el año actual menos el año de nacimiento, pero hay que checar si la persona ya cumplió años este año o todavía no, comparando mes y día. Le agregué la hora `"T00:00:00"` a la fecha porque sin eso el cálculo a veces me daba un día distinto por el tema de la zona horaria.

- **`esMayorDeEdad`**: esta función no repite el cálculo de edad, solo llama a `calcularEdad` y compara el resultado contra 18. Me pareció más limpio reutilizar la función anterior en vez de copiar la misma lógica dos veces.

- **`validarPassword`**: aquí también recorrí la contraseña con un ciclo `for`, letra por letra, y fui prendiendo cuatro "banderas" (variables que empiezan en `false`): si encontré una minúscula, una mayúscula, un número, o un carácter especial. Al final reviso que las cuatro banderas estén en `true` y que la contraseña tenga mínimo 8 caracteres.

Además de esas 6, hice 2 funciones propias, pensando en un problema que quería resolver: que el login se sintiera un poco más personalizado sin necesidad de que el usuario suba una foto.

- **`obtenerNombreDeUsuario`**: recibe un correo completo y devuelve solo la parte de antes del símbolo `@`, para poder saludar al usuario por su nombre de usuario.

- **`obtenerAvatarPorLetra`**: recibe una letra (la primera del nombre de usuario) y devuelve la ruta de una imagen de avatar. Dividí el abecedario en 5 grupos de letras, y cada grupo tiene asignada una imagen distinta, así que dependiendo de con qué letra empiece tu usuario, te toca un avatar diferente.

## Cómo integré todo

- En `index.html` está el formulario de registro: pide nombre, teléfono y fecha de nacimiento, y usa `soloLetras`, `validarLongitud` y `esMayorDeEdad` para validar cada campo antes de dejar pasar al usuario. Si no es mayor de edad, no lo deja avanzar al login.
- En `login.html` está el formulario de acceso: pide correo y contraseña, y usa `validarCorreo` y `validarPassword`. Si todo es correcto, ahí es donde aparece el modal de bienvenida, usando mis dos funciones propias para mostrar el nombre de usuario y el avatar correspondiente.

## Instalación

Para usar `utileria.js` en un proyecto (el mío o cualquier otro), estos son los pasos que seguí:

1. **Coloqué el archivo `utileria.js` dentro de una carpeta llamada `js`**, en la raíz del proyecto. Esto es solo por organización: podría ir en cualquier carpeta, pero es más ordenado tener todos los archivos de JavaScript juntos.

2. **En el HTML donde quiero usar la librería** (en mi caso, `index.html` y `login.html`), agregué una etiqueta `<script>` que apunta a ese archivo. Esta etiqueta va **justo antes de cerrar `</body>`**, no en el `<head>`, porque así el navegador ya terminó de leer todo el HTML (los inputs, botones, etc.) antes de cargar el JavaScript que los va a usar:

```html
   <script src="js/utileria.js"></script>
```

3. **Si mi HTML tiene además otro `<script>` con la lógica propia de esa página** (el código que valida el formulario, muestra el modal, etc.), ese segundo `<script>` debe ir **después** del que carga `utileria.js`, nunca antes. El orden importa: si intentara usar una función como `validarCorreo` antes de que el navegador haya cargado `utileria.js`, me marcaría un error de que esa función no existe. En mi caso, así quedó al final de cada HTML:

```html
   <script src="js/utileria.js"></script>
   <script>
     // aquí va el código que usa las funciones de la libreria,
     // por ejemplo: validarCorreo(correo), validarPassword(password), etc.
   </script>
```

4. **A partir de ahí, todas las funciones de la librería quedan disponibles** para usarse directamente por su nombre, sin tener que importarlas ni escribir nada más — simplemente las llamo como cualquier función normal:

```javascript
   validarCorreo("ana@gmail.com"); // true
```

No hace falta instalar nada con `npm`, ni descargar dependencias de internet: como la librería la escribí yo mismo en un solo archivo, "instalarla" es literalmente copiar ese archivo al proyecto y enlazarlo con la etiqueta `<script>`.

## Ejemplos de uso

```javascript
validarCorreo("ana@gmail.com");     // true
validarCorreo("correo-invalido");   // false

soloLetras("Ana Lopez");            // true
soloLetras("Ana123");               // false

validarLongitud("9511234567", 10);  // true
validarLongitud("12345678901", 10); // false

calcularEdad("2000-05-15");         // por ejemplo, 26

esMayorDeEdad("2010-01-01");        // false
esMayorDeEdad("2000-01-01");        // true

validarPassword("Clave123!");       // true
validarPassword("clave123");        // false

obtenerNombreDeUsuario("ana@gmail.com"); // "ana"

obtenerAvatarPorLetra("a");         // "img/avatar1.png"
obtenerAvatarPorLetra("m");         // "img/avatar3.png"
```

## Capturas de pantalla

![Consola mostrando resultados de las validaciones](img/captura-consola.png)

![Formulario de registro funcionando](img/captura-registro.png)

![Modal de bienvenida con avatar tras iniciar sesion](img/captura-login.png)

## Demo en vivo

<https://youri22-eng.github.io/Actividad2_utileria.js/>

## Video

Video demo de máximo 1 minuto mostrando el problema que resuelve la librería, cómo se usa, y el resultado en acción:

[Ver video demo](https://youtu.be/DMyyHhDPCFE)