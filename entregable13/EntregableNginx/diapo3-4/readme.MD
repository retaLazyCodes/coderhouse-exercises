* Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:

* Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.

* El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.

* Verificar que todo funcione correctamente.

* Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

* Incluir el archivo de configuración de nginx junto con el proyecto.

* Incluir también un pequeño documento en donde se detallen los comandos que deben ejecutarse por línea de comandos y los argumentos que deben enviarse para levantar todas las instancias de servidores de modo que soporten la configuración detallada en los puntos anteriores.
