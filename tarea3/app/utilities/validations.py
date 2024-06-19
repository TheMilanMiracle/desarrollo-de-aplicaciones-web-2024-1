import re
import filetype
from db.query import get_cities

def validate_checkboxes(form, valid, errors):
    if ("fruit" in form and "vegetable" in form) or ("fruit" not in form and "vegetable" not in form):

        errors["checkbox"] = "Debe seleccionar un tipo de producto"

        valid = False

    return valid


def validate_product_list(form, valid, errors):
    len_ = len(list(filter((lambda key: form[key] == "product"), form)))
    if len_ < 1 or len_ > 5:
        errors["products"] = "Debe seleccionar de uno a cinco productos"
        valid = False

    return valid


def validate_images(files, valid, errors):
    def validate_img(img):
        ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp"}
        ALLOWED_MIMETYPES = {"image/jpeg", "image/png", "image/webp"}

        # check if a file was submitted
        if img is None:
            return False

        # check if the browser submitted an empty file
        if img.filename == "":
            return False

        ftype_guess = filetype.guess(img.read())
        img.seek(0)

        if ftype_guess is None:
            return False
        
        # check file extension
        if ftype_guess.extension not in ALLOWED_EXTENSIONS:
            return False
        # check mimetype
        if ftype_guess.mime not in ALLOWED_MIMETYPES:
            return False
        return True
    
    images = files.getlist("images")

    
    if len(images) < 1 or "octet-stream" in str(images):
        errors["images"] = "Debe seleccionar al menos una imagen"
        valid = False
    elif len(images) > 3:
        errors["images"] = "Debe seleccionar un máximo de 3 imágenes"
        valid = False
    else:
        for image in images:
            if not validate_img(image):
                errors["images"] = "Debe seleccionar un formato de imagen válido (png/jpg/jpeg/webp)"
                valid = False
                break

    return valid


def validate_region(form, valid, errors):
    if form["region"] == "-1":
        errors["region"] = "Debe seleccionar una region"
        valid = False
    elif not get_cities(form["region"]):
        errors["region"] = "Debe seleccionar una region válida"
        valid = False
    
    return valid


def validate_city(form, valid, errors):
    city_id = 0

    if form["city"] == "-1":
        errors["city"] = "Debe seleccionar una comuna"
        valid = False  
    else:
        for city in get_cities(form["region"]):
            if form["city"].lower() in city[1].lower():
                city_id = city[0]
                break

        if not city_id:
            errors["city"] = "Debe seleccionar una comuna válida"
            valid = False  
    
    return valid, city_id


def validate_name(form, valid, errors):
    len_ = len(form["name"])

    if len_ < 3:
        errors["name"] = "El nombre es demasiado corto (3 mín.)"
        valid = False  
    elif len_ > 80:
        errors["name"] = "El nombre es demasiado largo (80 máx.)"
        valid = False
    
    return valid


def validate_email(form, valid, errors):
    if len(form["email"]) == 0:
        valid = False
        errors["email"] = "Debe ingresar un email"
    elif not re.fullmatch(r"^[A-Za-z0-9\.\+_-]+@[A-Za-z0-9\._-]+\.[a-zA-Z]*$", form["email"]):
        valid = False
        errors["email"] = "El email no tiene un formato válido"

    return valid

def validate_phone(form, valid, errors):
    if len(form["phone"]) != 0 and not re.fullmatch(r"^(\+?56)?(\s?)(2|9)(\s?)[98765432]\d{7}$", form["phone"]):
        valid = False
        errors["phone"] = "El número de teléfono no tiene un formato válido"
    
    return valid

