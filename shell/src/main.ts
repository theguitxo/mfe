import { initFederation } from '@angular-architects/native-federation';

const manifestFile = (): string => {
  if (location?.hostname === 'localhost') {
    return './assets/local.federation.manifest.json';
  }

  return './assets/federation.manifest.json';
}

initFederation(manifestFile())
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
