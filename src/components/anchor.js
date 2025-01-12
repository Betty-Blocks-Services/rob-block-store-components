(() => ({
  name: 'Anchor',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { anchor, smoothScroll } = options;
    const { useText, env } = B;
    const isDev = env === 'dev';
    const anchorText = useText(anchor);

    if (smoothScroll) {
      const html = document.querySelector('html');
      html.style.scrollBehavior = 'smooth';
    }

    return (
      <div id={anchorText} className={isDev && classes.pristine}>
        {isDev && '#' + anchorText}
      </div>
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
