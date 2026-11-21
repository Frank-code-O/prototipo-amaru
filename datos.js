/* Datos de la propuesta. Las fichas y los puntos QR son entidades independientes.
 * Las fichas de referencia de cada punto solo orientan el tramo propuesto.
 * Las coordenadas se expresan en el sistema 1041 × 1510 del mapa vectorial. */
const AMARU_DATOS = {
  "fichas": [
    {
      "id": "ficha_01",
      "orden": 1,
      "nombre": "Oncillas",
      "nombreMapa": "Oncillas",
      "nombreLista": "Oncillas",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 754.681,
          "y": 1236.254,
          "radio": 16
        }
      ],
      "especies": [
        {
          "nombre": "Oncillas",
          "nombreCientifico": "",
          "dieta": "Principalmente roedores y aves pequeñas.",
          "habitat": "Bosques de América Central y del Sur; también en Ecuador.",
          "fuente": {
            "nombre": "Amaru",
            "url": "https://www.zoobioparqueamaru.com/nuestros-animales/animal.php?Id_Animal=53-oncilla&Grupo=mamiferos"
          },
          "mostrarFuente": false
        }
      ],
      "comportamiento": "Es ágil y puede trepar a los árboles, aunque suele desplazarse por el suelo.",
      "wireframe": "wireframe_ficha_parada_01_amaru.svg",
      "foto": "foto_animal_01.jpg",
      "nota": "Información educativa resumida.",
      "lecturaEnVozAlta": true
    },
    {
      "id": "ficha_02",
      "orden": 2,
      "nombre": "Venado de cola blanca",
      "nombreMapa": "Venado de cola blanca",
      "nombreLista": "Venados de cola blanca",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 815.167,
          "y": 1261.46,
          "radio": 16
        }
      ],
      "especies": [
        {
          "nombre": "Venado de cola blanca",
          "nombreCientifico": "",
          "dieta": "Pastos, hojas, brotes, ramas tiernas, frutos y flores.",
          "habitat": "Páramos y bosques secos del noroeste de Sudamérica.",
          "fuente": {
            "nombre": "Amaru",
            "url": "https://www.zoobioparqueamaru.com/nuestros-animales/animal.php?Id_Animal=56-venado-de-cola-blanca&Grupo=mamiferos"
          },
          "mostrarFuente": false
        }
      ],
      "comportamiento": "Al percibir peligro puede levantar su cola blanca como señal de alarma.",
      "wireframe": "wireframe_ficha_parada_02_amaru.svg",
      "foto": null,
      "nota": "Información educativa resumida.",
      "lecturaEnVozAlta": false
    },
    {
      "id": "ficha_03",
      "orden": 3,
      "nombre": "Cuchuchos",
      "nombreMapa": "Cuchuchos",
      "nombreLista": "Cuchuchos",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 773.72,
          "y": 1174.119,
          "radio": 16
        }
      ],
      "especies": [
        {
          "nombre": "Cuchuchos",
          "nombreCientifico": "",
          "dieta": "Frutos, huevos, insectos y pequeños animales.",
          "habitat": "Bosques tropicales de la Amazonía y del occidente sudamericano.",
          "fuente": {
            "nombre": "Amaru",
            "url": "https://www.zoobioparqueamaru.com/nuestros-animales/animal.php?Id_Animal=60-cuchucho-amazonico-y-cuchucho-de-nariz-blanca&Grupo=mamiferos"
          },
          "mostrarFuente": false
        }
      ],
      "comportamiento": "Al desplazarse, los cuchuchos suelen llevar la cola levantada.",
      "wireframe": "wireframe_ficha_parada_03_amaru.svg",
      "foto": null,
      "nota": "Información educativa resumida.",
      "lecturaEnVozAlta": false
    },
    {
      "id": "animal",
      "orden": 4,
      "nombre": "Oso andino",
      "nombreMapa": "Oso andino",
      "nombreLista": "Oso andino",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 704.447,
          "y": 1141.293,
          "radio": 16
        }
      ],
      "especies": [
        {
          "nombre": "Oso andino",
          "nombreCientifico": "",
          "dieta": "Omnívoro, come sobre todo plantas, bromelias, hojas y frutos.",
          "habitat": "Vive en los Andes, desde páramos hasta bosques de montaña.",
          "fuente": {
            "nombre": "Amaru",
            "url": "https://www.zoobioparqueamaru.com/nuestros-animales/animal.php?Id_Animal=54-oso-andino&Grupo=mamiferos"
          },
          "mostrarFuente": false
        }
      ],
      "comportamiento": "Es un buen trepador y puede subir a árboles y zonas rocosas.",
      "wireframe": "wireframe_ficha_animal_propuesta_amaru.svg",
      "foto": "foto_animal_04.jpg",
      "nota": "Información educativa resumida.",
      "lecturaEnVozAlta": true
    },
    {
      "id": "ficha_05",
      "orden": 5,
      "nombre": "Buitres negros y curiquingues",
      "nombreMapa": "Buitres negros y curiquingues",
      "nombreLista": "Buitres negros y curiquingues",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 603.979,
          "y": 903.304,
          "radio": 16
        },
        {
          "x": 697.417,
          "y": 938.474,
          "radio": 15
        },
        {
          "x": 750.434,
          "y": 931.44,
          "radio": 15
        }
      ],
      "especies": [
        {
          "nombre": "Buitre negro",
          "nombreCientifico": "Coragyps atratus",
          "dieta": "Principalmente carroña; también huevos y animales pequeños.",
          "habitat": "Gran parte de América; en Ecuador, Costa, Andes y zonas abiertas.",
          "fuente": {
            "nombre": "Bioparque Amaru",
            "url": "https://www.zoobioparqueamaru.com/nuestros-animales/animal.php?Grupo=aves&Id_Animal=13-gallinazo-negro"
          },
          "mostrarFuente": true
        },
        {
          "nombre": "Curiquingue",
          "nombreCientifico": "Phalcoboenus carunculatus",
          "dieta": "Principalmente carroña; también pequeños vertebrados e invertebrados.",
          "habitat": "Páramos de los Andes, desde el sur de Colombia hasta Ecuador.",
          "fuente": {
            "nombre": "Bioparque Amaru",
            "url": "https://zoobioparqueamaru.com/nuestros-animales/animal.php?Grupo=aves&Id_Animal=15-caracara-curiquingue"
          },
          "mostrarFuente": true
        }
      ],
      "comportamiento": "El buitre planea para buscar alimento; el curiquingue suele caminar mientras busca comida.",
      "wireframe": "wireframe_ficha_parada_05_amaru.svg",
      "foto": null,
      "nota": "La ficha presenta información diferenciada de los animales.",
      "lecturaEnVozAlta": false
    },
    {
      "id": "alpacas",
      "orden": 6,
      "nombre": "Alpacas",
      "nombreMapa": "Alpacas",
      "nombreLista": "Alpacas",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 547.448,
          "y": 989.619,
          "radio": 16
        },
        {
          "x": 597.535,
          "y": 982.145,
          "radio": 15
        }
      ],
      "especies": [
        {
          "nombre": "Alpaca",
          "nombreCientifico": "",
          "dieta": "Pastos y hierbas de las laderas y valles andinos.",
          "habitat": "Camélido domesticado de los Andes de Sudamérica.",
          "fuente": {
            "nombre": "Smithsonian’s National Zoo",
            "url": "https://nationalzoo.si.edu/animals/alpaca"
          },
          "mostrarFuente": true
        }
      ],
      "comportamiento": "Las alpacas son animales sociales que viven en rebaños.",
      "wireframe": "wireframe_ficha_alpacas_boceto_amaru.svg",
      "foto": null,
      "nota": "Información general de la especie; no describe la dieta del recinto de Amaru.",
      "lecturaEnVozAlta": false
    },
    {
      "id": "grupo_aviario",
      "orden": 7,
      "nombre": "Aviario tropical",
      "nombreMapa": "Aviario tropical",
      "nombreLista": "Aviario tropical",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 319.564,
          "y": 752.362,
          "radio": 16
        }
      ],
      "especies": [
        {
          "nombre": "Aviario tropical",
          "nombreCientifico": "",
          "dieta": "Depende de cada especie del grupo.",
          "habitat": "Recinto o grupo referencial; no se atribuye un origen único.",
          "fuente": {
            "nombre": "Noticia oficial de Amaru",
            "url": "https://www.zoobioparqueamaru.com/noticias/noticia_detalle.php?Id_Noticia=9"
          },
          "mostrarFuente": false
        }
      ],
      "comportamiento": "En el aviario se observan aves de distintas especies; su comportamiento depende de cada una.",
      "wireframe": "wireframe_ficha_grupo_aviario_amaru.svg",
      "foto": null,
      "nota": "Ficha de grupo. Las especies concretas del recinto requieren confirmación.",
      "lecturaEnVozAlta": false
    },
    {
      "id": "grupo_reptiles",
      "orden": 8,
      "nombre": "Reptiles",
      "nombreMapa": "Reptiles",
      "nombreLista": "Reptiles",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 368.187,
          "y": 587.059,
          "radio": 16
        }
      ],
      "especies": [
        {
          "nombre": "Reptiles",
          "nombreCientifico": "",
          "dieta": "Depende de cada especie del grupo.",
          "habitat": "Recinto o grupo referencial; no se atribuye un origen único.",
          "fuente": {
            "nombre": "Listado oficial de reptiles de Amaru",
            "url": "https://www.zoobioparqueamaru.com/nuestros-animales/reptiles/"
          },
          "mostrarFuente": false
        }
      ],
      "comportamiento": "Los reptiles muestran comportamientos diferentes según la especie y su ambiente.",
      "wireframe": "wireframe_ficha_grupo_reptiles_amaru.svg",
      "foto": null,
      "nota": "Ficha de grupo. Las especies concretas del recinto requieren confirmación.",
      "lecturaEnVozAlta": false
    },
    {
      "id": "grupo_serpientes",
      "orden": 9,
      "nombre": "Serpientes",
      "nombreMapa": "Serpientes",
      "nombreLista": "Serpientes",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 353.102,
          "y": 494.443,
          "radio": 16
        }
      ],
      "especies": [
        {
          "nombre": "Serpientes",
          "nombreCientifico": "",
          "dieta": "Depende de cada especie del grupo.",
          "habitat": "Recinto o grupo referencial; no se atribuye un origen único.",
          "fuente": {
            "nombre": "Listado oficial de reptiles de Amaru",
            "url": "https://www.zoobioparqueamaru.com/nuestros-animales/reptiles/"
          },
          "mostrarFuente": false
        }
      ],
      "comportamiento": "Las serpientes tienen hábitos distintos según la especie; algunas se desplazan por el suelo o entre la vegetación.",
      "wireframe": "wireframe_ficha_grupo_serpientes_amaru.svg",
      "foto": null,
      "nota": "Ficha de grupo. Las especies concretas del recinto requieren confirmación.",
      "lecturaEnVozAlta": false
    },
    {
      "id": "ficha_10",
      "orden": 10,
      "nombre": "Tortuga motelo",
      "nombreMapa": "Tortuga motelo",
      "nombreLista": "Tortugas motelo",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 255.271,
          "y": 479.788,
          "radio": 16
        }
      ],
      "especies": [
        {
          "nombre": "Tortuga motelo",
          "nombreCientifico": "",
          "dieta": "Frutos y plantas; también puede comer insectos y caracoles.",
          "habitat": "Bosques húmedos de la Amazonía sudamericana.",
          "fuente": {
            "nombre": "Amaru",
            "url": "https://www.zoobioparqueamaru.com/nuestros-animales/animal.php?Id_Animal=85-tortuga-motelo&Grupo=reptiles"
          },
          "mostrarFuente": false
        }
      ],
      "comportamiento": "Es terrestre y se refugia entre la vegetación cuando hace mucho calor.",
      "wireframe": "wireframe_ficha_parada_10_amaru.svg",
      "foto": null,
      "nota": "Información educativa resumida.",
      "lecturaEnVozAlta": false
    },
    {
      "id": "ficha_11",
      "orden": 11,
      "nombre": "Mono ardilla",
      "nombreMapa": "Mono ardilla",
      "nombreLista": "Monos ardilla",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 205.329,
          "y": 427.618,
          "radio": 16
        }
      ],
      "especies": [
        {
          "nombre": "Mono ardilla",
          "nombreCientifico": "",
          "dieta": "Insectos, frutos, néctar y flores.",
          "habitat": "Bosques tropicales de la Amazonía sudamericana.",
          "fuente": {
            "nombre": "Amaru",
            "url": "https://www.zoobioparqueamaru.com/nuestros-animales/animal.php?Id_Animal=67-mono-ardilla&Grupo=mamiferos"
          },
          "mostrarFuente": false
        }
      ],
      "comportamiento": "Se mueve principalmente por los árboles, aunque también baja al suelo.",
      "wireframe": "wireframe_ficha_parada_11_amaru.svg",
      "foto": null,
      "nota": "Información educativa resumida.",
      "lecturaEnVozAlta": false
    },
    {
      "id": "ficha_12",
      "orden": 12,
      "nombre": "Mono chorongo",
      "nombreMapa": "Mono chorongo",
      "nombreLista": "Monos chorongos",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 158.464,
          "y": 475.978,
          "radio": 16
        }
      ],
      "especies": [
        {
          "nombre": "Mono chorongo",
          "nombreCientifico": "",
          "dieta": "Principalmente frutos; también hojas jóvenes e insectos.",
          "habitat": "Bosques amazónicos de Ecuador, Perú y Brasil.",
          "fuente": {
            "nombre": "Amaru",
            "url": "https://www.zoobioparqueamaru.com/nuestros-animales/animal.php?Id_Animal=70-mono-chorongo-de-poppig&Grupo=mamiferos"
          },
          "mostrarFuente": false
        }
      ],
      "comportamiento": "Es diurno, vive en los árboles y puede formar grupos.",
      "wireframe": "wireframe_ficha_parada_12_amaru.svg",
      "foto": null,
      "nota": "Información educativa resumida.",
      "lecturaEnVozAlta": false
    },
    {
      "id": "ficha_13",
      "orden": 13,
      "nombre": "Búho listado",
      "nombreMapa": "Búho listado",
      "nombreLista": "Búhos o lechuzas",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 202.986,
          "y": 261.729,
          "radio": 16
        }
      ],
      "especies": [
        {
          "nombre": "Búho listado",
          "nombreCientifico": "",
          "dieta": "Roedores, reptiles pequeños, insectos y aves.",
          "habitat": "América Central y del Sur; en Ecuador, principalmente zonas bajas.",
          "fuente": {
            "nombre": "Amaru",
            "url": "https://www.zoobioparqueamaru.com/nuestros-animales/animal.php?Id_Animal=10-buho-listado&Grupo=aves"
          },
          "mostrarFuente": false
        }
      ],
      "comportamiento": "Suele descansar de día y comenzar a cazar al anochecer.",
      "wireframe": "wireframe_ficha_parada_13_amaru.svg",
      "foto": null,
      "nota": "Información educativa resumida.",
      "lecturaEnVozAlta": false
    },
    {
      "id": "ficha_14",
      "orden": 14,
      "nombre": "Monos araña",
      "nombreMapa": "Monos araña",
      "nombreLista": "Monos araña",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 95.196,
          "y": 225.972,
          "radio": 16
        }
      ],
      "especies": [
        {
          "nombre": "Monos araña",
          "nombreCientifico": "",
          "dieta": "Principalmente frutos; también hojas, flores e insectos.",
          "habitat": "Bosques tropicales de la Amazonía y del occidente de Ecuador.",
          "fuente": {
            "nombre": "Ficha oficial de Amaru",
            "url": "https://www.zoobioparqueamaru.com/nuestros-animales/animal.php?Grupo=mamiferos&Id_Animal=72-mono-ara%C3%B1a%3A-de-vientre-amarillo-y-cabeza-marron."
          },
          "mostrarFuente": false
        }
      ],
      "comportamiento": "Es diurno y utiliza su larga cola prensil para desplazarse entre los árboles.",
      "wireframe": "wireframe_ficha_parada_14_amaru.svg",
      "foto": null,
      "nota": "Información educativa resumida.",
      "lecturaEnVozAlta": false
    },
    {
      "id": "ficha_15",
      "orden": 15,
      "nombre": "Tapir amazónico",
      "nombreMapa": "Tapir amazónico",
      "nombreLista": "Tapires amazónicos",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 263.911,
          "y": 145.666,
          "radio": 16
        }
      ],
      "especies": [
        {
          "nombre": "Tapir amazónico",
          "nombreCientifico": "",
          "dieta": "Frutos, hojas, brotes, ramas tiernas y semillas.",
          "habitat": "Bosques tropicales de Sudamérica; incluida la Amazonía ecuatoriana.",
          "fuente": {
            "nombre": "Amaru",
            "url": "https://www.zoobioparqueamaru.com/nuestros-animales/animal.php?Id_Animal=76-tapir-amazonico&Grupo=mamiferos"
          },
          "mostrarFuente": false
        }
      ],
      "comportamiento": "Es terrestre y generalmente solitario; también dispersa semillas.",
      "wireframe": "wireframe_ficha_parada_15_amaru.svg",
      "foto": null,
      "nota": "Información educativa resumida.",
      "lecturaEnVozAlta": false
    },
    {
      "id": "ficha_16",
      "orden": 16,
      "nombre": "Tigrillo margay",
      "nombreMapa": "Tigrillo margay",
      "nombreLista": "Tigrillos margay",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 417.396,
          "y": 183.181,
          "radio": 16
        }
      ],
      "especies": [
        {
          "nombre": "Tigrillo margay",
          "nombreCientifico": "",
          "dieta": "Mamíferos pequeños, aves y reptiles; a veces insectos y frutos.",
          "habitat": "Bosques tropicales y subtropicales de América Central y del Sur.",
          "fuente": {
            "nombre": "Amaru",
            "url": "https://www.zoobioparqueamaru.com/nuestros-animales/animal.php?Id_Animal=79-tigrillo-margay&Grupo=mamiferos"
          },
          "mostrarFuente": false
        }
      ],
      "comportamiento": "Es un excelente trepador y puede bajar por los troncos con la cabeza hacia abajo.",
      "wireframe": "wireframe_ficha_parada_16_amaru.svg",
      "foto": null,
      "nota": "Información educativa resumida.",
      "lecturaEnVozAlta": false
    },
    {
      "id": "ficha_17",
      "orden": 17,
      "nombre": "Guacamayo azul y amarillo",
      "nombreMapa": "Guacamayo azul y amarillo",
      "nombreLista": "Guacamayo azul y amarillo",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 307.262,
          "y": 279.901,
          "radio": 16
        }
      ],
      "especies": [
        {
          "nombre": "Guacamayo azul y amarillo",
          "nombreCientifico": "Ara ararauna",
          "dieta": "Semillas, frutos secos y frutas.",
          "habitat": "Bosques tropicales de Sudamérica, especialmente cerca de ríos y humedales.",
          "fuente": {
            "nombre": "Animal Diversity Web, Universidad de Michigan",
            "url": "https://animaldiversity.org/accounts/Ara_ararauna/"
          },
          "mostrarFuente": true
        }
      ],
      "comportamiento": "Suele desplazarse en pareja y puede reunirse en bandadas.",
      "wireframe": "wireframe_ficha_parada_17_amaru.svg",
      "foto": null,
      "nota": "Información general de la especie.",
      "lecturaEnVozAlta": false
    },
    {
      "id": "ficha_18",
      "orden": 18,
      "nombre": "Jaguar",
      "nombreMapa": "Jaguar",
      "nombreLista": "Jaguares",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 462.504,
          "y": 395.378,
          "radio": 16
        }
      ],
      "especies": [
        {
          "nombre": "Jaguar",
          "nombreCientifico": "Panthera onca",
          "dieta": "Carne: caza pecaríes, venados, capibaras y reptiles, entre otras presas.",
          "habitat": "América; principalmente selvas tropicales y áreas cercanas al agua, aunque ocupa otros ambientes.",
          "fuente": {
            "nombre": "San Diego Zoo Wildlife Alliance",
            "url": "https://animals.sandiegozoo.org/animals/jaguar"
          },
          "mostrarFuente": true
        }
      ],
      "comportamiento": "Es un felino solitario y sabe nadar.",
      "wireframe": "wireframe_ficha_parada_18_amaru.svg",
      "foto": null,
      "nota": "Información general de la especie; no describe la dieta del recinto de Amaru.",
      "lecturaEnVozAlta": false
    },
    {
      "id": "ficha_19",
      "orden": 19,
      "nombre": "Piqueros + tortuga Galápagos",
      "nombreMapa": "Piqueros + tortuga Galápagos",
      "nombreLista": "Piqueros de patas azules + tortugas de Galápagos",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 513.91,
          "y": 566.397,
          "radio": 16
        },
        {
          "x": 541.443,
          "y": 663.263,
          "radio": 15
        }
      ],
      "especies": [
        {
          "nombre": "Piquero de patas azules",
          "nombreCientifico": "",
          "dieta": "Peces y calamares.",
          "habitat": "Costa occidental de América, incluidas Ecuador y Galápagos.",
          "fuente": {
            "nombre": "Amaru",
            "url": "https://www.zoobioparqueamaru.com/nuestros-animales/animal.php?Id_Animal=40-piquero-patas-azules&Grupo=aves"
          },
          "mostrarFuente": false
        },
        {
          "nombre": "Tortuga gigante de Galápagos",
          "nombreCientifico": "",
          "dieta": "Flores, frutos, hierbas y cactus.",
          "habitat": "Endémica de las islas Galápagos.",
          "fuente": {
            "nombre": "Amaru",
            "url": "https://www.zoobioparqueamaru.com/nuestros-animales/animal.php?Id_Animal=130-tortuga-gigante-de-galapagos&Grupo=reptiles"
          },
          "mostrarFuente": false
        }
      ],
      "comportamiento": "El piquero se zambulle para pescar; la tortuga gigante camina lentamente y busca alimento durante el día.",
      "wireframe": "wireframe_ficha_parada_19_amaru.svg",
      "foto": null,
      "nota": "La ficha presenta información diferenciada de los animales.",
      "lecturaEnVozAlta": false
    },
    {
      "id": "ficha_20",
      "orden": 20,
      "nombre": "León africano",
      "nombreMapa": "León africano",
      "nombreLista": "Leones africanos",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 653.188,
          "y": 708.985,
          "radio": 16
        }
      ],
      "especies": [
        {
          "nombre": "León africano",
          "nombreCientifico": "",
          "dieta": "Presas de tamaño mediano y grande, como cebras y antílopes.",
          "habitat": "Sabanas y zonas abiertas de África subsahariana.",
          "fuente": {
            "nombre": "Amaru",
            "url": "https://www.zoobioparqueamaru.com/nuestros-animales/animal.php?Id_Animal=81-leon-africano&Grupo=mamiferos"
          },
          "mostrarFuente": false
        }
      ],
      "comportamiento": "Los leones viven en grupos familiares llamados manadas.",
      "wireframe": "wireframe_ficha_parada_20_amaru.svg",
      "foto": null,
      "nota": "Información educativa resumida.",
      "lecturaEnVozAlta": false
    },
    {
      "id": "ficha_21",
      "orden": 21,
      "nombre": "Avestruz",
      "nombreMapa": "Avestruz",
      "nombreLista": "Avestruces",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 827.762,
          "y": 721.881,
          "radio": 16
        }
      ],
      "especies": [
        {
          "nombre": "Avestruz",
          "nombreCientifico": "",
          "dieta": "Plantas, flores y semillas; insectos y pequeños vertebrados.",
          "habitat": "Sabanas y zonas abiertas del continente africano.",
          "fuente": {
            "nombre": "Amaru",
            "url": "https://www.zoobioparqueamaru.com/nuestros-animales/animal.php?Id_Animal=41-avestruz&Grupo=aves"
          },
          "mostrarFuente": false
        }
      ],
      "comportamiento": "Es un ave que no vuela y se desplaza corriendo.",
      "wireframe": "wireframe_ficha_parada_21_amaru.svg",
      "foto": null,
      "nota": "Información educativa resumida.",
      "lecturaEnVozAlta": false
    },
    {
      "id": "ficha_22",
      "orden": 22,
      "nombre": "Quililicos",
      "nombreMapa": "Quililicos",
      "nombreLista": "Quililicos",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 920.028,
          "y": 904.769,
          "radio": 16
        }
      ],
      "especies": [
        {
          "nombre": "Quililicos",
          "nombreCientifico": "",
          "dieta": "Roedores, ranas, reptiles pequeños y aves pequeñas.",
          "habitat": "Zonas abiertas de América; en Ecuador, valles de la Sierra.",
          "fuente": {
            "nombre": "Amaru",
            "url": "https://www.zoobioparqueamaru.com/nuestros-animales/animal.php?Id_Animal=48-cernicalo-americano&Grupo=aves"
          },
          "mostrarFuente": false
        }
      ],
      "comportamiento": "Caza pequeñas presas desde una percha o durante el vuelo.",
      "wireframe": "wireframe_ficha_parada_22_amaru.svg",
      "foto": null,
      "nota": "Información educativa resumida.",
      "lecturaEnVozAlta": false
    },
    {
      "id": "ficha_23",
      "orden": 23,
      "nombre": "Pavos reales",
      "nombreMapa": "Pavos reales",
      "nombreLista": "Pavos reales",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 961.768,
          "y": 981.266,
          "radio": 16
        }
      ],
      "especies": [
        {
          "nombre": "Pavos reales",
          "nombreCientifico": "",
          "dieta": "Insectos, plantas, frutos y pequeños reptiles.",
          "habitat": "Originario del sur de Asia, principalmente India y Sri Lanka.",
          "fuente": {
            "nombre": "Amaru",
            "url": "https://www.zoobioparqueamaru.com/nuestros-animales/animal.php?Id_Animal=49-pavo-real&Grupo=aves"
          },
          "mostrarFuente": false
        }
      ],
      "comportamiento": "El macho despliega su cola durante el cortejo.",
      "wireframe": "wireframe_ficha_parada_23_amaru.svg",
      "foto": null,
      "nota": "Información educativa resumida.",
      "lecturaEnVozAlta": false
    },
    {
      "id": "ficha_24",
      "orden": 24,
      "nombre": "Lobo de páramo",
      "nombreMapa": "Lobo de páramo",
      "nombreLista": "Lobo de páramo",
      "qrCode": null,
      "coordenadas": [
        {
          "x": 852.806,
          "y": 1196.394,
          "radio": 16
        }
      ],
      "especies": [
        {
          "nombre": "Lobo de páramo",
          "nombreCientifico": "",
          "dieta": "Pequeños mamíferos, lagartijas, aves y huevos; también carroña.",
          "habitat": "Andes de Sudamérica, desde Colombia hasta Argentina y Chile.",
          "fuente": {
            "nombre": "Amaru",
            "url": "https://www.zoobioparqueamaru.com/nuestros-animales/animal.php?Id_Animal=57-lobo-de-paramo&Grupo=mamiferos"
          },
          "mostrarFuente": false
        }
      ],
      "comportamiento": "Se desplaza por los Andes y suele buscar alimento de forma solitaria.",
      "wireframe": "wireframe_ficha_parada_24_amaru.svg",
      "foto": null,
      "nota": "Información educativa resumida.",
      "lecturaEnVozAlta": false
    }
  ],
  "puntosQR": [
    {
      "id": "punto_01",
      "orden": 1,
      "nombre": "Punto 01",
      "qrCode": "AMARU-QR-01",
      "referencia": "Inicio · junto al acceso",
      "coordenadas": {
        "x": 850,
        "y": 1367
      },
      "imagen": "codigos_demostracion/qr_punto_01.png",
      "fichasReferencia": []
    },
    {
      "id": "punto_02",
      "orden": 2,
      "nombre": "Punto 02",
      "qrCode": "AMARU-QR-02",
      "referencia": "Después de cuchuchos",
      "coordenadas": {
        "x": 764,
        "y": 1155
      },
      "imagen": "codigos_demostracion/qr_punto_02.png",
      "fichasReferencia": [
        "ficha_01",
        "ficha_02",
        "ficha_03"
      ]
    },
    {
      "id": "punto_03",
      "orden": 3,
      "nombre": "Punto 03",
      "qrCode": "AMARU-QR-03",
      "referencia": "Después de alpacas",
      "coordenadas": {
        "x": 574,
        "y": 984
      },
      "imagen": "codigos_demostracion/qr_punto_03.png",
      "fichasReferencia": [
        "animal",
        "ficha_05",
        "alpacas"
      ]
    },
    {
      "id": "punto_04",
      "orden": 4,
      "nombre": "Punto 04",
      "qrCode": "AMARU-QR-04",
      "referencia": "Después de serpientes",
      "coordenadas": {
        "x": 335,
        "y": 477
      },
      "imagen": "codigos_demostracion/qr_punto_04.png",
      "fichasReferencia": [
        "grupo_aviario",
        "grupo_reptiles",
        "grupo_serpientes"
      ]
    },
    {
      "id": "punto_05",
      "orden": 5,
      "nombre": "Punto 05",
      "qrCode": "AMARU-QR-05",
      "referencia": "Después de mono chorongo",
      "coordenadas": {
        "x": 185,
        "y": 484
      },
      "imagen": "codigos_demostracion/qr_punto_05.png",
      "fichasReferencia": [
        "ficha_10",
        "ficha_11",
        "ficha_12"
      ]
    },
    {
      "id": "punto_06",
      "orden": 6,
      "nombre": "Punto 06",
      "qrCode": "AMARU-QR-06",
      "referencia": "Después de tapir amazónico",
      "coordenadas": {
        "x": 276,
        "y": 196
      },
      "imagen": "codigos_demostracion/qr_punto_06.png",
      "fichasReferencia": [
        "ficha_13",
        "ficha_14",
        "ficha_15"
      ]
    },
    {
      "id": "punto_07",
      "orden": 7,
      "nombre": "Punto 07",
      "qrCode": "AMARU-QR-07",
      "referencia": "Después de jaguar",
      "coordenadas": {
        "x": 436,
        "y": 408
      },
      "imagen": "codigos_demostracion/qr_punto_07.png",
      "fichasReferencia": [
        "ficha_16",
        "ficha_17",
        "ficha_18"
      ]
    },
    {
      "id": "punto_08",
      "orden": 8,
      "nombre": "Punto 08",
      "qrCode": "AMARU-QR-08",
      "referencia": "Después de avestruz",
      "coordenadas": {
        "x": 810,
        "y": 761
      },
      "imagen": "codigos_demostracion/qr_punto_08.png",
      "fichasReferencia": [
        "ficha_19",
        "ficha_20",
        "ficha_21"
      ]
    },
    {
      "id": "punto_09",
      "orden": 9,
      "nombre": "Punto 09",
      "qrCode": "AMARU-QR-09",
      "referencia": "Después de lobo de páramo · final",
      "coordenadas": {
        "x": 854,
        "y": 1227
      },
      "imagen": "codigos_demostracion/qr_punto_09.png",
      "fichasReferencia": [
        "ficha_22",
        "ficha_23",
        "ficha_24"
      ]
    }
  ],
  "pantallas": [
    {
      "id": "inicio",
      "nombre": "Inicio",
      "wireframe": "wireframe_inicio_amaru.svg"
    },
    {
      "id": "mapa",
      "nombre": "Mapa",
      "wireframe": "wireframe_mapa_amaru.svg"
    },
    {
      "id": "zona",
      "nombre": "Zona seleccionada",
      "wireframe": "wireframe_zona_seleccionada_amaru.svg"
    },
    {
      "id": "busqueda",
      "nombre": "Búsqueda",
      "wireframe": "wireframe_busqueda_animal_amaru.svg"
    },
    {
      "id": "recorrido",
      "nombre": "Recorrido",
      "wireframe": "wireframe_recorrido_amaru.svg"
    },
    {
      "id": "lista",
      "nombre": "Lista del recorrido",
      "wireframe": "wireframe_lista_recorrido_amaru.svg"
    },
    {
      "id": "informacion",
      "nombre": "Información",
      "wireframe": "wireframe_informacion_actualizada_amaru.svg"
    },
    {
      "id": "servicios",
      "nombre": "Servicios",
      "wireframe": null
    },
    {
      "id": "qr",
      "nombre": "Escáner QR",
      "wireframe": "wireframe_qr_amaru.svg"
    },
    {
      "id": "visitado",
      "nombre": "Visita registrada",
      "wireframe": "wireframe_visitado_amaru.svg"
    },
    {
      "id": "reinicio",
      "nombre": "Iniciar nueva visita",
      "wireframe": "wireframe_nueva_visita_amaru.svg"
    },
    {
      "id": "reiniciado",
      "nombre": "Progreso reiniciado",
      "wireframe": "wireframe_mapa_amaru.svg"
    }
  ],
  "fuentesVisita": {
    "horarios": {
      "nombre": "Bioparque Amaru",
      "url": "https://www.zoobioparqueamaru.com/horarios-precios/"
    },
    "llegar": {
      "nombre": "Bioparque Amaru",
      "url": "https://www.zoobioparqueamaru.com/como-llegar/"
    }
  }
};
