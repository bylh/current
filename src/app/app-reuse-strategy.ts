import {RouteReuseStrategy, DefaultUrlSerializer, ActivatedRouteSnapshot, DetachedRouteHandle} from '@angular/router';

export class AppReuseStrategy implements RouteReuseStrategy {

    _cacheRouters: { [key: string]: DetachedRouteHandle } = {};

    // 是否分离此路由
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        console.log('是否分离', route.data.reload === false);
        return route.data.reload === false;
    }
    // 存储分离的路由
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        // this._cacheRouters[route.routeConfig.path] = {
        //     snapshot: route,
        //     handle: handle
        // };
        this._cacheRouters[route.routeConfig.path] = handle;
        console.log('store: ', route.routeConfig.path, handle);
    }

    // 确定是否应重新连接此路由（及其子树）
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        console.log('shouldAttach: ', !!route.routeConfig && !!this._cacheRouters[route.routeConfig.path]);
        return !!route.routeConfig && !!this._cacheRouters[route.routeConfig.path];
    }
    // 检索先前存储的路线
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        console.log('retrieve: ', route.routeConfig.path, this._cacheRouters[route.routeConfig.path]);
        return this._cacheRouters[route.routeConfig.path];
    }

    // 确定是否应重用路由
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        console.log('shouldReuseRoute: ', future.routeConfig, curr.routeConfig, future.routeConfig === curr.routeConfig);
        return future.routeConfig === curr.routeConfig;
    }
}