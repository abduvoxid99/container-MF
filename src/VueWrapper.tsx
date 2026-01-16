import React, { useEffect, useRef } from "react";

// Vue komponentini React da ishlatish uchun wrapper
// Bu komponent Vue app ni mount qiladi
function VueWrapper(): JSX.Element {
  const vueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Vue mikrofrontendni dinamik yuklash
    import("vueMF/VueApp").then((mountVue) => {
      if (vueRef.current) {
        mountVue.default(vueRef.current);
      }
    });

    // Cleanup - komponent unmount bo'lganda
    return () => {
      if (vueRef.current) {
        vueRef.current.innerHTML = "";
      }
    };
  }, []);

  return <div ref={vueRef}></div>;
}

export default VueWrapper;
