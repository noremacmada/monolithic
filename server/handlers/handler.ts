import { RouteHandlerMap, Route } from "../routeHandlerMapper";
import {Request, Response, NextFunction} from 'express';

@RouteHandlerMap()
export class Handler{
  constructor(){}

  @Route({type:"all", path: "/helloworld"})
  public index(req: Request, res: Response, next: NextFunction): void{
    res.send('HelloWorld')
    res.end();
  }
  @Route({type:"get", path: "/getid"})
  public getid(req: Request, res: Response, next: NextFunction): void{
    res.send('getid')
    res.end();
  }

  private priv(str: string, n: number){
    let z = 1;
  }
}
