<div align="center">
<img src="./client/src/assets/techTinker.svg" alt="Logo Tech Tinker" width="120" height="150"/>
</div> 



- [Sobre el Proyecto](#sobre-el-proyecto)

- [Objetivo](#objetivo)

- [Mockup](#mockup)
  
- [Tecnologías](#tecnologías)

- [Herramientas](#herramientas)

- [Versiones](#versiones)

- [Modelo de datos](#modelo-de-datos)

- [Acesso al proyecto](#instrucciones-de-instalación)

- [Desarrolladoras](#desarrolladoras)


### Food Travel
Como proyecto pedagógico de fin de curso en el bootcamp de desarrollo fullstack de FemCoders, se nos ha encomendado la creación de una página web con un enfoque estilo red social. En esta plataforma, los usuarios tendrán la oportunidad de compartir sus experiencias de viaje a través de la gastronomía de los lugares que han visitado.


### Sobre el proyecto
La idea surgió después de ver la serie "Street Food" en Netflix, donde se elaboran recetas especiales que marcan la diferencia en la comida callejera y ponen el foco en las historias humanas detrás de ella. Antia y Alexandra, nuestras clientes, decidieron buscar recetas típicas de distintos lugares. Sin embargo, se encontraron con la falta de una página que combinara la receta con la historia y la cultura contada por las personas locales.


### Objetivo
 A partir de un mapa en el que puedas seleccionar un país, el usuario no registrado pueda ver las recetas de dicho país con su historia, comunidad detrás de ella y un ranking de popularidad, luego podrá filtrar por dificultad, tiempo de realización y tipo de comida. Cuando un usuario se registra tendrá acceso a un perfil donde puede describir quién es, dónde vive y poder subir una receta con su historia (texto y/o vídeo). El usuario registrado tiene posibilidad de dar likes, votar a recetas y a perfiles (sistema de puntuación) y dejar comentarios de las recetas a otros usuarios.


 ### Mockup
 
<div style="display: flex;">
<img src="/client/src/assets/mockup/Home1.png" alt="Home" width="160"/>
<img src="/client/src/assets/mockup/Home2.png" alt="Home" width="160"/>
<img src="/client/src/assets/mockup/Menu.png" alt="Menu" width="160"/>
<img src="/client/src/assets/mockup/Profile.png" alt="Profile" width="160"/>
<img src="/client/src/assets/mockup/Recipe.png" alt="Recipe" width="160"/>
</div>


### Tecnologías 
<br>
<div>
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/>
<img src="https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg" alt="CSS3" height="50" />
<img src="https://raw.githubusercontent.com/jmnote/z-icons/master/svg/php.svg" alt="Php" width="40" height="40"/>
<img src="https://profilinator.rishav.dev/skills-assets/laravel-plain-wordmark.svg" alt="Laravel" width="40" height="40"/>
<img src="https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg" alt="React" width="40" height="40" />
<img  src="https://profilinator.rishav.dev/skills-assets/javascript-original.svg" alt="JavaScript" width="40" height="50" /> 
<img src="https://raw.githubusercontent.com/uiwjs/bootstrap-icons/fbb21bce981ad0a4b579b5d56d5e0aaf852efcd9/assets/logo.svg" alt="Bootstrap" width="40" height="40"/>
<img  src="https://user-images.githubusercontent.com/16843090/101181820-f3a63780-3612-11eb-9d3a-05452f2b0ad8.png" alt="Axios" width="40" height="50" />
<img src="https://toddsmithsalter.com/content/images/2020/12/All_c0525fe15a8bd68c9fbd762831ef9959_2000.jpg" alt="Sanctum" width="60" height="40"/>
<img src="https://cdn.worldvectorlogo.com/logos/phpunit.svg" alt="Logo Php Unit" width="60" height="40"/>
</div>
<br>


### Herramientas
<br>
<div>
<img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="Figma" width="40" height="40"/>
<img src="https://w7.pngwing.com/pngs/512/824/png-transparent-visual-studio-code-hd-logo-thumbnail.png" alt="vscode" width="40" heigth="40"/>
<img src="https://w7.pngwing.com/pngs/115/721/png-transparent-trello-social-icons-icon.png" alt="trello" width="40" heigth="40"/>
<img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="Git" width="40" height="40"/>
<img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" width="40" heigth="40"/>
<img src="https://profilinator.rishav.dev/skills-assets/xampp.png" alt="Xampp" width="40" height="40"/>
<img src="https://docs.mapbox.com/help/demos/custom-markers-gl-js/mapbox-icon.png" alt="Logo mapBox" width="60" height="40"/>
<img src="https://raw.githubusercontent.com/t4t5/sweetalert/e3c2085473a0eb5a6b022e43eb22e746380bb955/assets/logotype.png" alt="Logo Sweet Alert" width="60" height="40"/>
</div>
<br>

### Versiones

-   react: 18.2.0
-   react-dom: 18.2.0
-   react-router-dom: 6.16.0
-   testing-library/jest-dom: 5.17.0
-   axios: 1.1.2
-   bootstrap: 5.2.3
-   mapbox-gl: 2.15.0
-   sweetalert: 2.1.2
-   fortawesome/react-fontawesome: 0.2.0
-   php: 8.1
-   laravel/framework: 10.10
-   laravel/sanctum: 3.3
-   phpunit/phpunit: 10.1
  
### Modelo de datos
DrawSql: https://drawsql.app/teams/lea-2/diagrams/foodtravel


## Instrucciones de instalación


- Clona el repositorio en GitHub
  

**Instalación del Servidor**

- Abre el proyecto en tu editor de código y en la terminal ingresa al directorio del proyecto `./server`.
- Instala las dependencias mediante el comando `composer install`.
- Crea un archivo .env a partir del archivo .env.example. y agrega tu key.
- Crea tu base de datos en mysql y configura el apartado de la base de datos en el archivo .env.
- Ejecuta las migraciones para crear las tablas de la base de datos `php artisan migrate`.
- Ejecuta los seeders para rellenar las tablas de la base de datos `php artisan db:seed`.
- Inicia el servidor: `php artisan serve`.


**Instalación del Cliente**

- En la terminal ingresa al directorio `./client`.
- Instala las dependencias mediante el comando `npm install`.
- Inicia el servidor: `npm start`.


## Desarrolladoras


  <div style="white-space: nowrap; overflow-x: auto;">
   <table>
    <tr>
     <td>
            <a href="https://www.linkedin.com/in/milena-halas-justiniano-292921211/">
                <img src="https://media.licdn.com/dms/image/C4E03AQFPHnggchf2MA/profile-displayphoto-shrink_200_200/0/1658503997829?e=1701302400&v=beta&t=GSZpboLORHlyKhVRYT7nPg_NLKaxbhlP-RREjHSI0RA"
                    alt="Foto de perfil" width="100">
                Milena Halas
            </a>
      </td>
     <td>
            <a href="https://www.linkedin.com/in/leandra-bujhamer/">
                <img src="https://media.licdn.com/dms/image/D4D03AQHlrb1Uiu9F5A/profile-displayphoto-shrink_200_200/0/1694700343841?e=1701302400&v=beta&t=SM0AjgJLSP87FAY9BEpoP1clf1ckVUva_tOkiyvRFxo"
                    alt="Foto de perfil" width="100">
                Leandra Bujhamer
            </a>
     </td>
     <td>
            <a href="https://www.linkedin.com/in/genesis-núñez-bb466b199/">
                <img src="https://media.licdn.com/dms/image/D4D03AQEhizO-l20wsg/profile-displayphoto-shrink_200_200/0/1692393192591?e=1701302400&v=beta&t=QgfBpEUxBTNYGeq2C789e4PmzlYIn60I7faUU7aRQFo"
                    alt="Foto de perfil" width="100">
                Genesis Núñez
            </a>
    </td>
     <td>
            <a href="https://www.linkedin.com/in/valentina-rios-0a9a7a273/">
                <img src="https://media.licdn.com/dms/image/D4D03AQG9uDDZak9tnA/profile-displayphoto-shrink_200_200/0/1695808649326?e=1701302400&v=beta&t=j0beeOgdyJTADFRVi-6BqnmDCtwHfEJ8snHqFSLY-3E"
                    alt="Foto de perfil" width="100">
                Valentina Ríos
            </a>
    </td>
     <td>
            <a href="https://www.linkedin.com/in/rousmedina/">
                <img src="/client/src/assets/mockup/Rous.jpeg"
                    alt="Foto de perfil" width="100">
                Rosemary Medina
            </a>
    </td>
     <td>
            <a href="https://www.linkedin.com/in/rafaelaprieto/">
                <img src="https://media.licdn.com/dms/image/D4D03AQEd-Uck_3mL6w/profile-displayphoto-shrink_200_200/0/1694167340456?e=1701302400&v=beta&t=MQ1DMF2ndtiMZYbyXIF9WqZosP8shUg85RzTmSd1NUo"
                    alt="Foto de perfil" width="100">
                Rafaela Silveira Prieto
            </a>
    </td>
     </tr>
   </table>
  </div>
