import { RouteHandlerMap, Route } from "../routeHandlerMapper";
import {Request, Response, NextFunction} from "express";

@RouteHandlerMap()
export class Login {
  constructor(){}

  @Route({type:"all",path:"/login"})
  login(req: Request, res:Response, next: NextFunction):void  {
    res.send("/login/login");
    res.end();
  }
}
