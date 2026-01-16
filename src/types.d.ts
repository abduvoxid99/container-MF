// Remote mikrofrontendlar uchun type declarations
declare module "reactMF/ReactApp" {
  import { ComponentType } from "react";
  const ReactApp: ComponentType;
  export default ReactApp;
}

declare module "vueMF/VueApp" {
  const mount: (el: HTMLElement) => void;
  export default mount;
}

declare module "angularMF/AngularApp" {
  const mount: (el: HTMLElement) => void;
  export default mount;
}
