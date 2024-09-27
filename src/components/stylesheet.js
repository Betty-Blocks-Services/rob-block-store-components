(() => ({
  name: 'Custom Style Sheet',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { styleSheetUrl } = options;
    const { env, useText } = B;

    const isDev = env === 'dev';
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = useText(styleSheetUrl);
    head.appendChild(link);

    return isDev ? (
      <div className={classes.root}>{'Custom Style Sheet'}</div>
    ) : (
      <></>
    );
  })(),
  styles: (B) => (t) => {
    return {
      root: {
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
    };
  },
}))();
