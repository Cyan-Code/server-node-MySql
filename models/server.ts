import express, {Application} from 'express';
import * as userRoute from '../routes/user';

class Server {
  private app:Application;
  private port:string;
  private apiPaths = {
    usuarios: '/api/usuarios'
  }

  constructor ( ) {
    this.app = express();
    this.port = process.env.PORT || '8000';
    this.routes()
  }

  routes(){
    this.app.use(this.apiPaths.usuarios, userRoute.default)
  }

  listen(){
    this.app.listen( this.port, ()=> {
      console.log('Servidor corriento en el puerto '+ this.port);
    })
  }

}

export default Server;
