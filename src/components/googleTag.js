(() => ({
  name: 'GoogleTag',
  type: 'BODY_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useText } = B;
    const isDev = env === 'dev';
    const { googleTagId } = options;
    const googleTagIdText = useText(googleTagId);

    const insertGoogleTag = () => {
      const head = document.getElementsByTagName('head')[0];
      const scriptImport = document.createElement('script');
      const scriptTag = document.createElement('script');
      scriptImport.async = true;
      scriptImport.src = `https://www.googletagmanager.com/gtag/js?id=${googleTagIdText}`;
      const wuser = localStorage.getItem('wuser');

      if (wuser) {
        scriptTag.innerText = `
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag('js', new Date());
          gtag('config', '${googleTagIdText}', {
            'user_id': '${wuser}' 
          });
        `;
      } else {
        scriptTag.innerText = `
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag('js', new Date());
          gtag('config', '${googleTagIdText}');
        `;
      }

      head.prepend(scriptTag);
      head.prepend(scriptImport);
    };

    useEffect(() => {
      if (!isDev) {
        if (googleTagId) {
          insertGoogleTag();
        }
      }
    }, []);

    return isDev ? (
      <div className={classes.pristine}>GOOGLE TAG - {googleTagIdText}</div>
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
