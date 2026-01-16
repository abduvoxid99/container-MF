import React, { Suspense } from "react";
import "./App.css";
import VueWrapper from "./VueWrapper";
import AngularWrapper from "./AngularWrapper";

// Lazy loading - remote mikrofrontendlarni dinamik yuklash
// Bu yerda container remoteEntry.js fayllarini yuklaydi
const ReactMF = React.lazy(() => import("reactMF/ReactApp"));

function App(): JSX.Element {
  return (
    <div className="container-app">
      <header className="header">
        <h1>🚀 Mikrofrontend Container App</h1>
        <p>
          Bu container ilovasi React, Vue va Angular mikrofrontendlarini birlashtiradi
        </p>
      </header>

      <div className="microfrontends">
        {/* React Mikrofrontend */}
        <section className="mf-section">
          <h2>⚛️ React Mikrofrontend</h2>
          <div className="mf-container">
            <Suspense fallback={<div className="loading">Yuklanmoqda...</div>}>
              <ReactMF />
            </Suspense>
          </div>
        </section>

        {/* Vue Mikrofrontend */}
        <section className="mf-section">
          <h2>🖖 Vue Mikrofrontend</h2>
          <div className="mf-container">
            <Suspense fallback={<div className="loading">Yuklanmoqda...</div>}>
              <VueWrapper />
            </Suspense>
          </div>
        </section>

        {/* Angular Mikrofrontend */}
        <section className="mf-section">
          <h2>🅰️ Angular Mikrofrontend</h2>
          <div className="mf-container">
            <Suspense fallback={<div className="loading">Yuklanmoqda...</div>}>
              <AngularWrapper />
            </Suspense>
          </div>
        </section>
      </div>

      <footer className="footer">
        <p>
          Har bir mikrofrontend mustaqil deploy qilinishi va yangilanishi
          mumkin!
        </p>
      </footer>
    </div>
  );
}

export default App;
