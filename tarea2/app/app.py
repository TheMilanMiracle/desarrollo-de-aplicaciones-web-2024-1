import re
import os
import hashlib
import filetype
import datetime
from flask import Flask, request, render_template, url_for, redirect
from db.query import get_product_quantity, new_product, get5products, get_product_info
from utilities.validations import validate_checkboxes, validate_product_list, validate_images, validate_region, validate_city, validate_name, validate_email, validate_phone
from werkzeug.utils import secure_filename

app = Flask(__name__)


app.config["UPLOAD_FOLDER"] = os.path.join(app.static_folder, 'uploads')
app.config["MAX_CONTENT_LENGTH"] = 16 * 1000 * 1000


@app.errorhandler(413)
def entity_too_large(error):
    return 'Archivo demasiado grande', 413


@app.route("/")
@app.route("/index")
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



@app.route("/ver-productos/")
@app.route("/ver-productos/page=<page>/")
def ver_productos_page(page=0):

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

@app.route("/informacion-producto-<id>")
def informacion_producto(id):

    context = {
        "kind" : "producto"
    }

    context["product"] = get_product_info(id)

    context["product"][5][1] = [(url_for('static', filename=f'uploads/{context["product"][5][1][i]}'), i) for i in range(len(context["product"][5][1]))]

    return render_template("pages/informacion.html", **context)

@app.route("/agregar-pedido")
def agregar_pedido():

    context = {
        "kind" : "pedido"
    }
        
    return render_template("pages/agregar.html", **context)


@app.route("/ver-pedidos")
def ver_pedidos():

    context = {
        "kind" : "pedido"
    }

    return render_template("pages/ver.html", **context)


if __name__ == "__main__":
    app.run(debug=True)