// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiUrl: 'https://ideasencodigo.com/api/sigese/v1',
  production: false,
  pageSizeOptions: [5, 10, 20, 30],
  ngxTimepickerTheme: {
    container: {
      bodyBackgroundColor: '#FFFF', // BODY
      buttonColor: '#979798', // color button letters
    },
    dial: {
      dialBackgroundColor: '#8BC34A', // HEADER
    },
    clockFace: {
      clockFaceBackgroundColor: '#E9ECEF', // body circle
      clockHandColor: '#8BC34A', // color manesilla
      clockFaceTimeInactiveColor: '#979798' // color active numbers
    }
  },
  // other: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
