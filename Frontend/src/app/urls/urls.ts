

export class URLs{
    private host:string = "34.69.133.221";

    public API_URI: string = `http://${this.host}:47001`;
    public url: string = `http://${this.host}:47005/book/getBooks`;
    public url_editar: string = `http://${this.host}:47004/book/updateBook`;
    public url_eliminar: string = `http://${this.host}:47003/book/deleteBook`;
    public url_crear: string = `http://${this.host}:47002/book/addBook`;
    public url_newBitacora: string = `http://${this.host}:47010/bitacora/newBitacora`;
    public url_getBitacora: string = `http://${this.host}:47011/bitacora/getBitacora`;

}