import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class AppReuseStrategy implements RouteReuseStrategy {

    /** 为什么不用route.routeConfig.path作为key，而是要自己定义path的key，
     * 主要是loadchildren path有时候为空字符串，设计问题还是bug不太清楚
     * 链接：https://stackoverflow.com/questions/46939612/customreusestrategy-not-working-for-lazy-loaded-components */

    public static handlers: { [key: string]: DetachedRouteHandle } = {};

    /** 表示路由是否允许复用 如果你有路由不想利用可以在这加一些业务逻辑判断 */
    public shouldDetach(route: ActivatedRouteSnapshot): boolean {
        // return route.data.reload === false && route.data.path != null;
        return false; // TODO 暂时关闭缓存
    }

    /** 当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象 */
    public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        AppReuseStrategy.handlers[route.data.path] = handle;
    }

    /** 若 path 在缓存中有的都认为允许还原路由 */
    public shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!route.routeConfig && !!AppReuseStrategy.handlers[route.data.path]
    }

    /** 从缓存中获取快照，若无则返回nul */
    public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (!route.routeConfig) {
            return null;
        }
        return AppReuseStrategy.handlers[route.data.path];
    }

    /** 进入路由触发，判断是否同一路由 */
    public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }
}