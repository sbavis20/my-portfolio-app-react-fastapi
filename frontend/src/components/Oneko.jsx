import { useEffect } from "react";

export default function Oneko() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/oneko.js"; // make sure it's at public/oneko.js
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
