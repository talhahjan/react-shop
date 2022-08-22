export const loadGoogleScript = () => {
  //loads the Google JavaScript Library
  (function () {
    const id = "g_id_onload";
    const src = "https://accounts.google.com/gsi/client";

    //we have at least one script (React)
    const firstJs = document.getElementsByTagName("script")[0];

    //prevent script from loading twice
    if (document.getElementById(id)) {
      return;
    }
    const js = document.createElement("script");
    js.id = id;
    js.src = src;
    js.async = true;
    js.defer = true;
    js.onload = window.onGoogleScriptLoad;
    firstJs.parentNode.insertBefore(js, firstJs);
  })();

  return <div class="g_id_signin" data-type="standard"></div>;
};
