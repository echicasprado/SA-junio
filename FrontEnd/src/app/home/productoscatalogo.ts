export class Productoscatalogo {
    id:  number //Int
    nombre:   String
    precio:  number //double
    url_imagen:  String
    descripcion:  String
    cantidad:  number
    id_restaurante:  number
    restaurante:  String
    id_categoria:  number
    categoria:  String

    constructor(  id, nombre,precio, url_imagen,descripcion,id_restaurante,id_categoria,cantidad,categoria,restaurante){
       this.id= id
       this.nombre= nombre
       this.precio= precio
       this.url_imagen= url_imagen
       this.descripcion= descripcion
       this.id_restaurante= id_restaurante
       this.id_categoria= id_categoria
       this.cantidad= cantidad
       this.categoria= categoria
       this.restaurante= restaurante
       
       
    }
}

