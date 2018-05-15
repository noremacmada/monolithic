import { RouteHandlerMap, Route } from "../routeHandlerMapper";
import {Request, Response, NextFunction} from "express";

@RouteHandlerMap()
export class Api{
  constructor(){}

  @Route({type:"all", path: "/hello"})
  hello(req: Request, res: Response, next: NextFunction):void {
    res.send("/api/hello");
    res.end();
  }
}
