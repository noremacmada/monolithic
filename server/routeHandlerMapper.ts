import * as express from 'express';

function Route(params : object){
  return function(target: any, key: any){
    target[key]["route"] = params;
  }
}
export {Route as Route};

function RouteHandlerMap(){
  return function constructorDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
      routes = (
        (target: any) => {
          let prototype = Object.getPrototypeOf(target);
          let keys = Object.keys(prototype);
          let routes = keys
            .filter(key => target[key]["route"] != null)
            .map(
              key => {
                return {
                  type:target[key]["route"].type,
                  path: target[key]["route"].path,
                  handler: (req, res, next) => {
                    let instance = Object.create(prototype);
                    instance.constructor.apply(instance, null);
                    instance[key](req, res, next);
                  }
                }
              }
            )
          ;
          return routes;
        }
      )(Object.getPrototypeOf(this));
    }
  }
}
export {RouteHandlerMap as RouteHandlerMap}
