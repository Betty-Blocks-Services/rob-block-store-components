(() => ({
  name: 'Google Tag Manager',
  type: 'BODY_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useText } = B;
    const isDev = env === 'dev';
    const { type, gTag, gtmTag } = options;
    const googleTagText = useText(type === 'gtm' ? gtmTag : gTag);

    const insertGoogleTag = () => {
      const head = document.getElementsByTagName('head')[0];
      const scriptImport = document.createElement('script');
      const scriptTag = document.createElement('script');

      if (type === 'gtm') {
        scriptImport.innerText = `window.dataLayer = window.dataLayer || [];`;
        scriptTag.innerText = `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${googleTagText}');
        `;
      } else {
        scriptImport.async = true;
        scriptImport.src = `https://www.googletagmanager.com/gtag/js?id=${googleTagText}`;
        scriptTag.innerText = `
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); };
          gtag('js', new Date());
          gtag('config', '${googleTagText}');
        `;
      }

      head.prepend(scriptTag);
      head.prepend(scriptImport);
    };

    useEffect(() => {
      if (!isDev) {
        if (googleTagText) {
          insertGoogleTag();
        }
      }
    }, []);

    return isDev ? (
      <div className={classes.pristine}>
        GOOGLE TAG MANAGER - {googleTagText}
      </div>
    ) : (
      <></>
    );
  })(),
  styles: () => () => ({
    pristine: {
      borderWidth: '0.0625rem',
      borderColor: '#AFB5C8',
      borderStyle: 'dashed',
      backgroundColor: '#F0F1F5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '2rem',
      width: '100%',
      fontSize: '0.75rem',
      color: '#262A3A',
      textTransform: 'uppercase',
      boxSizing: 'border-box',
      textAlign: 'center',
    },
  }),
}))();
