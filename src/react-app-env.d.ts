/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_EMAILJS_SERVICE_ID: string;
    readonly REACT_APP_EMAILJS_TEMPLATE_ID: string;
    readonly REACT_APP_EMAILJS_PUBLIC_KEY: string;
    readonly REACT_APP_EMAILJS_AUTOREPLY_TEMPLATE_ID?: string;
  }
}
