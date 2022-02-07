import express, {Application} from 'express';
import * as userRoute from '../routes/user';
import cors from 'cors';

class Server {
  private app:Application;
  private port:string;
  private apiPaths = {
    usuarios: '/api/usuarios'
  }

  constructor ( ) {
    this.app = express();
    this.port = process.env.PORT || '8000';

    this.middlewares();
    this.routes();
  }

  middlewares(){
    //cors
    this.app.use( cors() );
    //Parseo del body
    this.app.use(express.json());
    //habilitacion de Carpetas publicas para servir contenido
    this.app.use(express.static('public'))
  }

  routes(){
    this.app.use(this.apiPaths.usuarios, userRoute.default);
  }

  listen(){
    this.app.listen( this.port, ()=> {
      console.log('Servidor corriento en el puerto '+ this.port);
    })
  }

}

export default Server;
