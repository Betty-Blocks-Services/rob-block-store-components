(() => ({
  name: 'Style Sheet',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { type, url, css, dataComponentAttribute } = options;
    const { env, useText } = B;

    const isDev = env === 'dev';
    const parsedCss = useText(css).replace(/(&nbsp;|\s|\r\n|\n|\r)/gm, '');
    const urlText = useText(url);

    if (type === 'From URL' && urlText) {
      const head = document.getElementsByTagName('head')[0];
      const link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = urlText;
      link.dataComponent = useText(dataComponentAttribute) || type;
      head.appendChild(link);
    }

    const styleSheet =
      type === 'Inline' ? (
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: parsedCss }}
          data-component={useText(dataComponentAttribute) || type}
        />
      ) : (
        <></>
      );

    return isDev ? (
      <div className={classes.root}>{`Style sheet ${type}`}</div>
    ) : (
      styleSheet
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
