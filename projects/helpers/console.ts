import { environment } from "../src/environment/environment";

declare global {
  interface Console {
    logLocal(message?: any, ...optionalParams: any[]): void;
    warnLocal(message?: any, ...optionalParams: any[]): void;
    errorLocal(message?: any, ...optionalParams: any[]): void;
  }
}

console.logLocal = !environment.production
  ? console.log.bind(console)
  : () => {};
console.warnLocal = !environment.production
  ? console.warn.bind(console)
  : () => {};
console.errorLocal = !environment.production
  ? console.error.bind(console)
  : () => {};
