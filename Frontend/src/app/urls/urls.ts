require('dotenv').load();

export class URLs{
    private host:string =  process.env.SERVICE_IP;
    private service_port1: string = process.env.SERVICE_PORT1;
    private service_port2: string = process.env.SERVICE_PORT2;
    private service_port3: string = process.env.SERVICE_PORT3;
    private service_port4: string = process.env.SERVICE_PORT4;
    private service_port5: string = process.env.SERVICE_PORT5;
    private service_port6: string = process.env.SERVICE_PORT6;
    private service_port7: string = process.env.SERVICE_PORT7;
    private service_port8: string = process.env.SERVICE_PORT8;
    private service_port9: string = process.env.SERVICE_PORT9;
    private service_port10: string = process.env.SERVICE_PORT10;
    private service_port11: string = process.env.SERVICE_PORT11;

    public API_URI: string = `http://${this.host}:${this.service_port1}`;
    public url_Usuarios: string = `http://${this.host}:${this.service_port1}/Usuarios`;
    public url_Actualizar_Usuario: string = `http://${this.host}:${this.service_port1}/Actualizar_Usuario`;
    public url_Eliminar_Usuario: string = `http://${this.host}:${this.service_port1}/Eliminar_Usuario`;
    public url_crear: string = `http://${this.host}:${this.service_port2}/book/addBook`;
    public url_eliminar: string = `http://${this.host}:${this.service_port3}/book/deleteBook`;
    public url_editar: string = `http://${this.host}:${this.service_port4}/book/updateBook`;
    public url: string = `http://${this.host}:${this.service_port5}/book/getBooks`;
    public url_deleteSolicitudes: string = `http://${this.host}:${this.service_port7}/EliminarSolicitud`;
    public url_getSolicitudes: string = `http://${this.host}:${this.service_port8}/ObtenerSolicitudes`;
    public url_solicitarLibro: string = `http://${this.host}:${this.service_port9}/SolicitarLibro`;
    public url_newBitacora: string = `http://${this.host}:${this.service_port10}/bitacora/newBitacora`;
    // public url_newBitacora: string = `http://localhost:3450/bitacora/newBitacora`;
    public url_getBitacora: string = `http://${this.host}:${this.service_port11}/bitacora/getBitacora`;

}