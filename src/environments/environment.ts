// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    firebase : {
    apiKey: "AIzaSyCYT40GHD7f8VMEuqAkKTSid32kz74bzh0",
    authDomain: "ignatest-c4444.firebaseapp.com",
    databaseURL: "https://ignatest-c4444.firebaseio.com",
    projectId: "ignatest-c4444",
    storageBucket: "ignatest-c4444.appspot.com",
    messagingSenderId: "93224403202"
  },
   dashgo:{
     URL_SERVER:'https://us-central1-ignatest-c4444.cloudfunctions.net/'  //Desarrollo
   }
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
