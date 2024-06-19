import re
import os
import hashlib
import filetype
import datetime
from flask_cors import cross_origin
from flask import Flask, request, render_template, url_for, redirect, jsonify
from db.query import get_product_quantity, get_order_quantity, new_product, get5products, get_product_info, new_order, get5orders, get_order_info, stats_query
from utilities.validations import validate_checkboxes, validate_product_list, validate_images, validate_region, validate_city, validate_name, validate_email, validate_phone
from werkzeug.utils import secure_filename

app = Flask(__name__)

app.config["UPLOAD_FOLDER"] = os.path.join(app.static_folder, 'uploads')
app.config["MAX_CONTENT_LENGTH"] = 16 * 1000 * 1000


@app.errorhandler(413)
def entity_too_large(error):
    return 'Archivo demasiado grande', 413


@app.route("/")
@app.route("/index", methods=("GET",))
def index(): 
    return render_template("pages/index.html")


@app.route("/agregar-producto", methods=("GET", "POST"))
def agregar_producto():

    context = {
        "kind" : "producto",
    }

    errors = {}
        
    if request.method == 'POST': 

        valid = True

        context["description"] = request.form["description"]


        valid = validate_checkboxes(request.form, valid, errors)

        valid = validate_product_list(request.form, valid, errors)

        valid = validate_images(request.files, valid, errors)

        valid = validate_region(request.form, valid, errors)

        valid, city_id = validate_city(request.form, valid, errors)
        
        valid = validate_name(request.form, valid, errors)

        valid = validate_email(request.form, valid, errors)

        valid = validate_phone(request.form, valid, errors)

        print(valid)

        if valid:

            routes = []
            
            for image in request.files.getlist("images"):
                file_name = hashlib.sha384(
                    secure_filename(image.filename).encode("utf-8")
                ).hexdigest()

                file_extension = filetype.guess(image.read()).extension
                image.seek(0)

                file_name = f"{file_name}-{str(datetime.datetime.now()).replace(' ','-')}.{file_extension}"

                routes += [file_name]

                image.save(os.path.join(app.config["UPLOAD_FOLDER"], file_name))

            new_product({
                "type" : "fruta" if "fruit" in request.form else "verdura",
                "products" : list(filter((lambda key: request.form[key] == "product"), request.form)),
                "desc" : request.form["description"],
                "city" : city_id,
                "name" : request.form["name"],
                "email" : request.form["email"],
                "phone" : request.form["phone"],
                "files_route" : app.config["UPLOAD_FOLDER"],
                "img_routes" : routes
            })

            return render_template("pages/agregado.html", **context)

    return render_template("pages/agregar.html", **context, **errors)

@app.route("/ver-productos/", methods=("GET",))
@app.route("/ver-productos/page=<page>/", methods=("GET",))
def ver_productos(page=0):

    page = int(page)
    pages = int( get_product_quantity() / 5)

    context = {
        "kind" : "producto",
        "page" : page+1,
        "prev" : max(page-1, 0),
        "prev_button" : "disabled" if page==0 else "",
        "next" : min(page+1, pages),
        "next_button" : "disabled" if page >= pages else "",
        "table_headers":[], 
        "table_content" : [None for i in range(5)],
    }


    content = get5products(page)

    context["table_headers"] = ["Tipo","Productos","Región","Comuna","Fotos"]


    for row in range(len(content)):

        context["table_content"][row] = [
            content[row][0][0].upper() + content[row][0][1:],
            ', '.join(content[row][1]),
            content[row][2],
            content[row][3],
            [url_for('static',filename=f'uploads/{ph}') for ph in content[row][4]],
            ("informacion_producto", (page * 5) + row + 1)
        ]


    return render_template("pages/ver.html", **context)

@app.route("/informacion-producto-<id>", methods=("GET",))
def informacion_producto(id):

    context = {
        "kind" : "producto"
    }

    context["information"] = get_product_info(id)

    context["information"][5][1] = [(url_for('static', filename=f'uploads/{context["information"][5][1][i]}'), i) for i in range(len(context["information"][5][1]))]

    return render_template("pages/informacion.html", **context)


@app.route("/agregar-pedido", methods=("GET", "POST"))
def agregar_pedido():

    context = {
        "kind" : "pedido"
    }

    errors = {}

    if request.method == 'POST':

        valid = True

        context["description"] = request.form["description"]

        valid = validate_checkboxes(request.form, valid, errors)

        valid = validate_product_list(request.form, valid, errors)

        valid = validate_region(request.form, valid, errors)

        valid, city_id = validate_city(request.form, valid, errors)
        
        valid = validate_name(request.form, valid, errors)

        valid = validate_email(request.form, valid, errors)

        valid = validate_phone(request.form, valid, errors)

        print(valid)


        if valid:

            new_order({
                "type" : "fruta" if "fruit" in request.form else "verdura",
                "products" : list(filter((lambda key: request.form[key] == "product"), request.form)),
                "desc" : request.form["description"],
                "city" : city_id,
                "name" : request.form["name"],
                "email" : request.form["email"],
                "phone" : request.form["phone"],
            })

            return render_template("pages/agregado.html", **context)


        
    return render_template("pages/agregar.html", **context, **errors)

@app.route("/ver-pedidos/", methods=("GET",))
@app.route("/ver-pedidos/page=<page>/", methods=("GET",))
def ver_pedidos(page=0):

    page = int(page)
    pages = int( get_order_quantity() / 5)

    context = {
        "kind" : "pedido",
        "page" : page+1,
        "prev" : max(page-1, 0),
        "prev_button" : "disabled" if page==0 else "",
        "next" : min(page+1, pages),
        "next_button" : "disabled" if page >= pages else "",
        "table_headers":[], 
        "table_content" : [None for i in range(5)],
    }

    content = get5orders(page)

    context["table_headers"] = ["Tipo","Productos","Región","Comuna","Nombre comprador"]

    for row in range(len(content)):

        context["table_content"][row] = [
            content[row][0][0].upper() + content[row][0][1:],
            ', '.join(content[row][1]),
            content[row][2],
            content[row][3],
            content[row][4],
            ("informacion_pedido", (page * 5) + row + 1)
        ]

    return render_template("pages/ver.html", **context)

@app.route("/informacion-pedido-<id>", methods=("GET",))
def informacion_pedido(id):

    context = {
        "kind" : "pedido"
    }

    context["information"] = get_order_info(id)

    return render_template("pages/informacion.html", **context)


@app.route("/estadisticas/", methods=("GET", ))
def estadisticas():
    return render_template("pages/estadisticas.html")


@app.route("/get-stats/", methods=("GET", ))
@cross_origin(origin="localhost", supports_credentials=True)
def get_stats():
    return jsonify(stats_query())


if __name__ == "__main__":
    app.run(debug=True)