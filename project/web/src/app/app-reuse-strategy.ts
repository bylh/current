import {RouteReuseStrategy, DefaultUrlSerializer, ActivatedRouteSnapshot, DetachedRouteHandle} from '@angular/router';

export class AppReuseStrategy implements RouteReuseStrategy {

    _cacheRouters: { [key: string]: DetachedRouteHandle } = {};

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        console.log('是否缓存', route.data.reload === false);
        return route.data.reload === false;
    }
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        // this._cacheRouters[route.routeConfig.path] = {
        //     snapshot: route,
        //     handle: handle
        // };
        this._cacheRouters[route.routeConfig.path] = handle;
        console.log('store: ', route.routeConfig.path, handle);
    }
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        console.log('shouldAttach: ', !!route.routeConfig && !!this._cacheRouters[route.routeConfig.path]);
        return !!route.routeConfig && !!this._cacheRouters[route.routeConfig.path];
    }
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        console.log('retrieve: ', route.routeConfig.path, this._cacheRouters[route.routeConfig.path]);
        return this._cacheRouters[route.routeConfig.path];
    }
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        console.log('shouldReuseRoute: ', future.routeConfig, curr.routeConfig, future.routeConfig === curr.routeConfig);
        return future.routeConfig === curr.routeConfig;
    }
}