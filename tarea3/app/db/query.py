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

def get_products(type):
	
	conn = get_conn()
	cursor = conn.cursor()

	if type == "fruit":
		cursor.execute("select id, nombre from tipo_verdura_fruta where id <= 37 order by nombre")
	
	if type == "vegetable":
		cursor.execute("select id, nombre from tipo_verdura_fruta where id > 37 order by nombre")	

	return [(t[0], t[1]) for t in cursor.fetchall()]	


def get_regions():

	conn = get_conn()
	cursor = conn.cursor()

	cursor.execute("select id, nombre from region order by id")

	return [(t[0], t[1]) for t in cursor.fetchall()]

def get_cities(region_id):

	conn = get_conn()
	cursor = conn.cursor()

	cursor.execute("select id, nombre from comuna where region_id=%s order by nombre", region_id)

	return [(t[0], t[1]) for t in cursor.fetchall()]

def get_product_quantity():

	conn = get_conn()
	cursor = conn.cursor()

	cursor.execute("select count(*) from producto")

	return cursor.fetchone()[0]

def get_order_quantity():

	conn = get_conn()
	cursor = conn.cursor()

	cursor.execute("select count(*) from pedido")

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


def new_order(attributes):
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


	cursor.execute("insert into pedido (tipo, descripcion, comuna_id, nombre_comprador, email_comprador, celular_comprador) values (%s, %s, %s, %s, %s, %s)", (att))

	cursor.execute("select last_insert_id()")

	order_id = cursor.fetchone()[0]


	for p in attributes["products"]:

		cursor.execute("select id from tipo_verdura_fruta where nombre=%s", (p,))

		id = cursor.fetchone()[0]

		cursor.execute("insert into pedido_verdura_fruta (pedido_id, tipo_verdura_fruta_id) values (%s, %s)", (order_id, id))

	conn.commit()

def get5orders(page):

	conn = get_conn()
	cursor = conn.cursor()

	cursor.execute("select * from pedido order by id limit 5 offset %s", (page*5,))

	pedido = cursor.fetchall()

	products = [None for i in range(5)]
	cities = [None for i in range(5)]
	regions = [None for i in range(5)] 
	photos = [None for i in range(5)] 


	for p in range(len(pedido)):
		
		cursor.execute("select tipo_verdura_fruta_id from pedido_verdura_fruta where pedido_id=%s", (pedido[p][0],))

		products[p] = [i for i in cursor.fetchall()]

		temp = []
		for q in products[p]:

			cursor.execute("select nombre from tipo_verdura_fruta where id=%s", (q,))

			temp += [cursor.fetchone()[0]]

		products[p] = temp
		

		cursor.execute("select region_id, nombre from comuna where id=%s", (pedido[p][3],))

		cities[p] = cursor.fetchone()

		cursor.execute("select nombre from region where id=%s", (cities[p][0],))

		cities[p] = cities[p][1]

		regions[p] = cursor.fetchone()[0]

	return [
		(
			pedido[i][1],
			[pr for pr in products[i]],
			regions[i],
			cities[i],
			pedido[i][4]
		) 
		for i in range(len(pedido))
	]

def get_order_info(order_id):

	#type products desc region comuna fotos nombre email numero
	conn = get_conn()
	cursor = conn.cursor()

	#id | tipo | desc | c_id | name | email | phone
	cursor.execute("select * from pedido where id=%s", order_id)

	pedido = cursor.fetchone()


	cursor.execute("select tipo_verdura_fruta_id from pedido_verdura_fruta where pedido_id=%s", (pedido[0],))

	products = [i for i in cursor.fetchall()]

	temp = []
	for p in products:

		cursor.execute("select nombre from tipo_verdura_fruta where id=%s", (p,))

		temp += [cursor.fetchone()[0]]

	products = temp
	

	cursor.execute("select region_id, nombre from comuna where id=%s", (pedido[3],))

	temp = cursor.fetchone()

	city_name = temp[1]

	cursor.execute("select nombre from region where id=%s", (temp[0],))

	region_name = cursor.fetchone()[0]


	return [

		("Tipo", pedido[1][0].upper() + pedido[1][1:]),
		("Productos", ", ".join([p[0].upper() + p[1:] for p in products])),
		("Descripción", pedido[2]),
		("Región", region_name),
		("Comuna", city_name),
		("Nombre productor", pedido[4]),
		("Email productor", pedido[5]),
		("Número productor", pedido[6])

	]


def stats_query():

	conn = get_conn()
	cursor = conn.cursor()

	cursor.execute("select tipo_verdura_fruta_id, count(*) as amount from producto_verdura_fruta group by tipo_verdura_fruta_id")

	products = cursor.fetchall()

	products_data = []

	for i in range(len(products)):

		cursor.execute("select nombre from tipo_verdura_fruta where id=%s", (products[i][0]))

		p = (cursor.fetchone()[0], products[i][1])

		products_data.append(p)


	cursor.execute("select comuna_id, count(*) from pedido group by comuna_id")

	orders = cursor.fetchall()

	orders_data = []

	for i in range(len(orders)):

		cursor.execute("select nombre from comuna where id=%s", (orders[i][0]))

		o = (cursor.fetchone()[0], orders[i][1])

		orders_data.append(o)


	return {
		"products_data" : products_data,
		"orders_data" : orders_data
		}
