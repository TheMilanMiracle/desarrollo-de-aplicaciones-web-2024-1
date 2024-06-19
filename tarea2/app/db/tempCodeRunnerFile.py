import pymysql
import json
import os

DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306
DB_CHARSET = "utf8"


def get_conn():
	conn = pymysql.connect(
		db=DB_NAME,
		user=DB_USERNAME,
		passwd=DB_PASSWORD,
		host=DB_HOST,
		port=DB_PORT,
		charset=DB_CHARSET
	)
	return conn


def get_cities(region_id):

	conn = get_conn()
	cursor = conn.cursor()

	cursor.execute(f"select id, nombre from comuna where region_id=%s", region_id)

	return [(t[0], t[1]) for t in cursor.fetchall()]


def get_product_quantity():

	conn = get_conn()
	cursor = conn.cursor()

	cursor.execute("select count(*) from producto")

	return cursor.fetchone()[0]


def new_product(attributes):

	conn = get_conn()
	cursor = conn.cursor()

	att = [
		attributes["type"],
		attributes["desc"],
		attributes["city"],
		attributes["name"],
		attributes["email"],
		attributes["phone"]
	]


	cursor.execute("insert into producto (tipo, descripcion, comuna_id, nombre_productor, email_productor, celular_productor) values (%s, %s, %s, %s, %s, %s)", (att))

	cursor.execute("select last_insert_id()")

	product_id = cursor.fetchone()[0]


	for p in attributes["products"]:

		cursor.execute("select id from tipo_verdura_fruta where nombre=%s", (p,))

		id = cursor.fetchone()[0]

		cursor.execute("insert into producto_verdura_fruta (producto_id, tipo_verdura_fruta_id) values (%s, %s)", (product_id, id))


	for image in attributes["img_routes"]:

		cursor.execute("insert into foto (ruta_archivo, nombre_archivo, producto_id) values (%s, %s, %s)", (attributes["files_route"], image, product_id))


	conn.commit()



def get5products(page):

	conn = get_conn()
	cursor = conn.cursor()

	cursor.execute("select * from producto order by id limit 5 offset %s", (page*5,))

	producto = cursor.fetchall()

	products = [None for i in range(5)]
	cities = [None for i in range(5)]
	regions = [None for i in range(5)] 
	photos = [None for i in range(5)] 

	for p in range(len(producto)):
		
		cursor.execute("select tipo_verdura_fruta_id from producto_verdura_fruta where producto_id=%s", (producto[p][0],))

		products[p] = [i for i in cursor.fetchall()]

		temp = []
		for q in products[p]:

			cursor.execute("select nombre from tipo_verdura_fruta where id=%s", (q,))

			temp += [cursor.fetchone()[0]]

		products[p] = temp
		

		cursor.execute("select region_id, nombre from comuna where id=%s", (producto[p][3],))

		cities[p] = cursor.fetchone()

		cursor.execute("select nombre from region where id=%s", (cities[p][0],))

		cities[p] = cities[p][1]

		regions[p] = cursor.fetchone()[0]

		
		cursor.execute("select ruta_archivo, nombre_archivo from foto where producto_id=%s", (producto[p][0]))

		photos[p] = cursor.fetchall()

	return [
		(
			producto[i][1],
			[pr for pr in products[i]],
			regions[i],
			cities[i],
			# [os.path.join(ph[0], ph[1]) for ph in photos[i]]
			[ph[1] for ph in photos[i]]
		) 
		for i in range(len(producto))
	]



def get_product_info(product_id):
	#type products desc region comuna fotos nombre email numero
	conn = get_conn()
	cursor = conn.cursor()

	#id | tipo | desc | c_id | name | email | phone
	cursor.execute("select * from producto where id=%s", product_id)

	producto = cursor.fetchone()


	cursor.execute("select tipo_verdura_fruta_id from producto_verdura_fruta where producto_id=%s", (producto[0],))

	products = [i for i in cursor.fetchall()]

	temp = []
	for p in products:

		cursor.execute("select nombre from tipo_verdura_fruta where id=%s", (p,))

		temp += [cursor.fetchone()[0]]

	products = temp
	

	cursor.execute("select region_id, nombre from comuna where id=%s", (producto[3],))

	temp = cursor.fetchone()

	city_name = temp[1]

	cursor.execute("select nombre from region where id=%s", (temp[0],))

	region_name = cursor.fetchone()[0]

	
	cursor.execute("select ruta_archivo, nombre_archivo from foto where producto_id=%s", (producto[0]))

	photos = cursor.fetchall()

	print(photos)
	print(photos[0][1])
	print(photos[0][0])

	for route in photos:
		for a in route:
			print(a)

	return [

		("Tipo", producto[1][0].upper() + producto[1][1:]),
		("Productos", ", ".join([p[0].upper() + p[1:] for p in products])),
		("Descripción", producto[2]),
		("Región", region_name),
		("Comuna", city_name),
		["Fotos", [route[1] for route in photos], [num for num in range(len(photos))]],
		("Nombre productor", producto[4]),
		("Email productor", producto[5]),
		("Número productor", producto[6])

	]



DICT ={
	"regiones": [
        {
            "region": "Región de Tarapacá",
            "comunas": ["Alto Hospicio", "Camiña", "Colchane", "Huara", "Iquique", "Pica", "Pozo Almonte"]
        },
        {
            "region": "Región de Antofagasta",
            "comunas": ["Antofagasta", "Calama", "María Elena", "Mejillones", "Ollagüe", "San Pedro Atacama", "Sierra Gorda", "Taltal", "Tocopilla"]
        },
        {
            "region": "Región de Atacama",
            "comunas": ["Alto del Carmen", "Caldera", "Chañaral", "Copiapó", "Diego de Almagro", "Freirina", "Huasco", "Tierra Amarilla", "Vallenar"]
        },
        {
            "region": "Región de Coquimbo",
            "comunas": ["Andacollo", "Combarbalá", "Coquimbo", "Illapel", "La Higuera", "La Serena", "Los Vilos", "Monte Patria", "Ovalle", "Paihuano", "Punitaqui", "Río Hurtado", "Salamanca", "Vicuña"]
        },
        {
            "region": "Región de Valparaíso",
            "comunas": ["Algarrobo", "Cabildo", "Calle Larga", "Cartagena", "Casablanca", "Catemu", "Concón", "El Quisco", "El Tabo", "Hijuelas", "Isla de Pascua", "Juan Fernández", "La Calera", "La Cruz", "La Ligua", "Limache", "Llay Llay", "Los Andes", "Nogales", "Olmué", "Papudo", "Pencahue",  "Petorca", "Puchuncaví", "Putaendo", "Quillota", "Quilpué", "Quintero", "Rinconada", "San Antonio", "San Esteban", "San Felipe", "Santa María", "Santo Domingo", "Valparaíso", "Villa Alemana", "Viña del Mar", "Zapallar"]
        },
        {
            "region": "Región del Libertador Bernardo Ohiggins",
            "comunas": ["Chépica", "Chimbarongo", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "La Estrella", "Las Cabras", "Litueche", "Lolol", "Machalí", "Malloa", "Marchigue", "Mostazal", "Nancagua", "Navidad", "Olivar", "Palmilla", "Paredones", "Peralillo", "Peumo", "Pichidegua", "Pichilemu", "Placilla", "Pumanque", "Quinta Tilcoco", "Rancagua", "Rengo", "Requínoa", "San Fernando", "San Vicente", "Santa Cruz"]
        },
        {
            "region": "Región del Maule",
            "comunas": ["Cauquenes", "Chanco", "Colbún", "Constitución", "Curepto", "Curicó", "Empedrado", "Hualañé", "Licantén", "Linares", "Longaví", "Maule", "Molina", "Parral", "Pelarco", "Pelluhue", "Pencahue", "Rauco", "Retiro", "Río Claro", "Romeral", "Sagrada Familia", "San Clemente", "San Javier", "San Rafael", "Talca", "Teno", "Vichuquén", "Villa Alegre", "Yerbas Buenas"]
        },
        {
            "region": "Región del Biobío",
            "comunas": ["Alto Bio Bío", "Antuco", "Arauco", "Cabrero", "Cañete", "Chiguayante", "Concepción", "Contulmo", "Coronel", "Curanilahue", "Florida", "Hualpén", "Hualqui", "Laja", "Lebu", "Los Álamos", "Los Ángeles", "Lota", "Mulchén", "Nacimiento", "Negrete", "Penco", "Quilaco", "Quilleco", "San Pedro de la Paz", "San Rosendo", "Santa Bárbara", "Santa Juana", "Talcahuano", "Tirúa", "Tomé", "Tucapel", "Yumbel"]
        },
        {
            "region": "Región de La Araucanía",
            "comunas": ["Angol", "Carahue", "Cholchol", "Collipulli", "Cunco", "Curacautín", "Curarrehue", "Ercilla", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Lonquimay", "Los Sauces", "Lumaco", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Puerto Saavedra", "Purén", "Renaico", "Temuco", "Teodoro Schmidt", "Toltén", "Traiguén", "Victoria", "Vilcún", "Villarrica"]
        },
        {
            "region": "Región de Los Lagos",
            "comunas": ["Ancud", "Calbuco", "Castro", "Chaitén", "Chonchi", "Cochamó", "Curaco de Vélez", "Dalcahue", "Fresia", "Frutillar", "Futaleufú", "Hualaihué", "Llanquihue", "Los Muermos", "Maullín", "Osorno", "Palena", "Puerto Montt", "Puerto Octay", "Puerto Varas", "Puqueldón", "Purranque", "Puyehue", "Queilén", "Quellón", "Quemchi", "Quinchao", "Río Negro", "San Juan de la Costa", "San Pablo"]
        },
        {
            "region": "Región Aisén del General Carlos Ibáñez del Campo",
            "comunas": ["Aysen", "Chile Chico", "Cisnes", "Cochrane", "Coyhaique", "Guaitecas", "Lago Verde", "O'Higins", "Río Ibá?ez", "Tortel"]
        },
        {
            "region": "Región de Magallanes y la Antártica Chilena",
            "comunas": ["Antártica", "Cabo de Hornos", "Laguna Blanca", "Natales", "Porvenir", "Primavera", "Punta Arenas", "Río Verde", "San Gregorio", "Timaukel", "Torres del Paine"]
        },
        {
            "region": "Región Metropolitana de Santiago",
            "comunas": ["Alhué", "Buin", "Calera de Tango", "Cerrillos", "Cerro Navia", "Colina", "Conchalí", "Curacaví", "El Bosque", "El Monte", "Estación Central", "Huechuraba", "Independencia", "Isla de Maipo", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Lampa", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "María Pinto", "Melipilla", "Ñuñoa", "Padre Hurtado", "Paine", "Pedro Aguirre Cerda", "Peñaflor", "Peñalolén", "Pirque", "Providencia", "Pudahuel", "Puente Alto", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Bernardo", "San Joaquín", "San José de Maipo", "San Miguel", "San Pedro", "San Ramón", "Santiago", "Talagante", "Tiltil", "Vitacura"]
        },
        {
            "region": "Región Arica y Parinacota",
            "comunas": ["Corral", "Futrono", "La Unión", "Lago Ranco", "Lanco", "Los Lagos", "Mariquina", "Máfil", "Paillaco", "Panguipulli", "Río Bueno", "Valdivia"]
        },
        {
            "region": "Región Arica y Parinacota",
            "comunas": ["Arica", "Camarones", "General Lagos", "Putre"]
        },
        {
            "region": "Región del Ñuble",
            "comunas": ["Bulnes", "Chillán", "Chillán Viejo", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay", "Ñiquén"]
        },
    ]
}

conn = get_conn()
cursor = conn.cursor()

ttotal = 0
total = 0

for info in DICT["regiones"]:
	print(info["region"])

	cursor.execute("select * from region where nombre=%s", (info["region"], ))

	res = cursor.fetchone()

	if res:
		print(res)

	count = 0

	for c in info["comunas"]:
		ttotal += 1
		cursor.execute("select * from comuna where nombre=%s", (c, ))

		res = cursor.fetchone()

		if not res:
			print(c)
			total += 1
			count += 1
	
	print(count)

print(total)
print(ttotal)