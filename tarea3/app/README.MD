# Detalles a tener en cuenta para la corrección :D

## Agregar producto:

Para la elección del tipo de producto decidí mantener las checkboxes que activan un selector con los productos específicos que implementé para la tarea 1, aquí se pueden seleccionar como maximo 5 que van apareciendo junto con un botón para descartarlos y poder seleccionar otro. Para regiones y comunas, es parecido pero con dos selectores. 

(IMPORTANTE: debido a que quise mantener la forma en que creaba estos selectores en la tarea 1, hay algunas inconsistencias con los nombres de comunas entre el objeto dentro de form.js y los que hay en la base de datos. Traté de hacer calzar todos los que pude, pero son demasiadas comunas :c, si se encuentra uno de estos problemas durante la corrección, por favor tratar con otra comuna, el backend va a rechazar las request con nombres que no calzan)

Para el formulario, se realizan las siguientes validaciones tanto en backend como frontend:
- Haya un tipo seleccionado de producto
- Haya de 1 a 5 productos seleccionados (está hecho para no poder seleccionar más de 5)
- Haya una comuna y región seleccionada
- El largo del nombre del productor entre entre los 3 y 80 carácteres de largo
- El email esté ingresado en un formato válido del estilo nombre@domain.algo
- En caso de estar ingresado el número de telefono, que siga el formato de Chile *+569[8 números válidos]*

Para el caso particular de los archivos, estos se manejaron de la siguiente manera en el backend:
- Se limitó el tamaño de una imagen mediante configuraciones de flask a 16MB
- Se reviso que sus mimetypes y extensiones sean un formato de imagen válido.
- Se guardaron las imagenes con nombres hasheados y con la hora de procesamiento para evitar repeticiones.

Si se considera el contenido del formulario como válido, se bloquea el form y aparece una ventana de confirmación para que el usuario pueda "enviar" el formulario o volver a editar, en cuyo caso se desbloquea el form.

## Ver productos/Información producto

Tal como pide el enunciado, la información de la tabla se construye en el backend y se muestra de 5 por paǵina cuando existen más de 5 productos en la base de datos, justo debajo de la tabla se encuentran dos botones para pasar de página que se bloquean cuando corresponde y un número indicando la página, hacer click en una fila llevara a la página con su información . Al hacer click una imagen en la página de información de un producto, se despliega en su mayor tamaño, difuminando el fondo y quitando la barra superior, para poder mostrar toda la imagen, al hacer click en cualquier parte de la página la imagen se irá.

## Otros

Ya que todas las templates usadas vienen desde la misma base, preferí mantener todo el CSS (mismo de la tarea1) en el mismo archivo.

Todo contenido usado en templates es creado en el backend, para evitar inseguridades relacionadas con inputs de usuario