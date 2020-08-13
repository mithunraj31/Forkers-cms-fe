/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  wsEndpoint: 'http://54.250.102.34:8080/ws',
  host: "http://localhost:8080/api",
  hostJa: "http://54.250.102.34:4401",
  hostEn: "http://54.250.102.34:4200",
};
