export interface producto{
    id:             number,
    nombre:         string,
    precio:         number,
    imagen_base64:  string,
    descripcion:    string,
    cantidad:       number,
    id_restaurante: number,
    id_categoria: number,
}

export interface Categoria{
    id:             string,
    nombre:         string
}

export interface productoE{
    id_producto:             number,
    id_usuario:     number,
    nombre:         string,
    precio:         number,
    imagen_base64:  string,
    descripcion:    string,
    cantidad:       number,
    id_restaurante: number,
    id_categoria: number,
}