import React, { useEffect, useRef } from "react";

// Angular komponentini React da ishlatish uchun wrapper
// Bu komponent Angular app ni mount qiladi
function AngularWrapper(): JSX.Element {
  const angularRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Angular mikrofrontendni dinamik yuklash
    import("angularMF/AngularApp").then((mountAngular) => {
      if (angularRef.current) {
        mountAngular.default(angularRef.current);
      }
    });

    // Cleanup - komponent unmount bo'lganda
    return () => {
      if (angularRef.current) {
        angularRef.current.innerHTML = "";
      }
    };
  }, []);

  return <div ref={angularRef}></div>;
}

export default AngularWrapper;
