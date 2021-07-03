export interface Orden{
    id:             number,
    usuario:        string,
    direccion:      string,
    total:          number,
    fecha:          string,
    estado:         string,
}

export interface Orden1{
    _id:            number,
    producto:       Object,
    usuario:        string,
    total:          number,
    estado:         number
}