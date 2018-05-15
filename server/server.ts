import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import {Route, RouteHandlerMap} from './routeHandlerMapper'
import {Api} from './handlers/api';
import {Login} from './handlers/login';
import {Handler} from './handlers/handler';


class Server {
  app : express.Application;
  router: express.Router;
  constructor() {
    const port : number = 3000;
    let pathDistFolder = path.normalize(path.join(__dirname, "../dist"));

    this.app = express();
    this.app.use(express.static(pathDistFolder));
    this.app.use(bodyParser.urlencoded({extended:true}));
    this.app.use(bodyParser.json());
    this.mapRouteHandler("/login", new Login());

    this.mapRouteHandler("", new Handler());
    this.mapRouteHandler("/api", new Api());
    this.app.get("*",
      (req, res) => {
      res.sendFile(path.join(pathDistFolder, "index.html"));
      }
    );


    this.app.listen(port, function(){
      console.log("Server running on localhost:" + port);
    });

  }
  mapRouteHandler(area:string, handler: any){
    let router = this.app;
    if(handler.routes){
      handler.routes.forEach(
        routeHandlerMapping =>
          router[routeHandlerMapping.type](
            area + routeHandlerMapping.path,
            routeHandlerMapping.handler
        )
      )
    }
  }
}



new Server().app;
