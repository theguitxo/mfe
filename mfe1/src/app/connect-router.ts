import { inject } from "@angular/core";
import { Router } from "@angular/router";

export function connectRouter(router = inject(Router), useHash = false): void {
  getUrlAndNavigate(router, useHash);
  useHash ?
  window.addEventListener('hashchange', () => getUrlAndNavigate(router, useHash)) :
  window.addEventListener('popstate', () => getUrlAndNavigate(router, useHash));
}

export function getUrlAndNavigate(router: Router, useHash: boolean): void {
  const url = useHash ?  `${location.hash.substring(1)}${location.search}` :  `${location.pathname.substring(1)}${location.search}`;
  router.navigateByUrl(url);
}
