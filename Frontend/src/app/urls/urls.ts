

export class URLs{
    private host:string = "34.69.133.221";

    public API_URI: string = `http://${this.host}:47012`;
    public url_Usuarios: string = `http://${this.host}:47001/Usuarios`;
    public url_Actualizar_Usuario: string = `http://${this.host}:47001/Actualizar_Usuario`;
    public url_Eliminar_Usuario: string = `http://${this.host}:47001/Eliminar_Usuario`;
    public url_crear: string = `http://${this.host}:47002/book/addBook`;
    public url_eliminar: string = `http://${this.host}:47003/book/deleteBook`;
    public url_editar: string = `http://${this.host}:47004/book/updateBook`;
    public url: string = `http://${this.host}:47005/book/getBooks`;
    public url_deleteSolicitudes: string = `http://${this.host}:47007/EliminarSolicitud`;
    public url_getSolicitudes: string = `http://${this.host}:47008/ObtenerSolicitudes`;
    public url_solicitarLibro: string = `http://${this.host}:47009/SolicitarLibro`;
    public url_newBitacora: string = `http://${this.host}:47010/bitacora/newBitacora`;
    // public url_newBitacora: string = `http://localhost:3450/bitacora/newBitacora`;
    public url_getBitacora: string = `http://${this.host}:47011/bitacora/getBitacora`;
    public url_compra: string = `http://${this.host}:47006/api/compra`;
}