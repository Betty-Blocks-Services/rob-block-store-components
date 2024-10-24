(() => ({
  name: 'Shortkeys',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env } = B;
    const isDev = env === 'dev';

    // const backspace = 8;
    // const escape = 27;
    // const deleteKey = 46;
    // const D = 68;
    // const E = 69;
    // const N = 78;
    // const S = 83;

    if (!isDev) {
      document.addEventListener('keyup', event => {
        const key = event.keyCode || event.which || 0;
        switch (key) {
          case 8:
          case 46:
            B.triggerEvent('OnDeleteKeyPressed');
            break;
          case 27:
            B.triggerEvent('OnEscapeKeyPressed');
            break;
          case 68:
            B.triggerEvent('OnDKeyPressed');
            break;
          case 69:
            B.triggerEvent('OnEKeyPressed');
            break;
          case 78:
            B.triggerEvent('OnNKeyPressed');
            break;
          case 83:
            B.triggerEvent('OnSKeyPressed');
            break;
          default:
            break;
        }
      });
    }

    return isDev ? (
      <div className={classes.empty}>Shortkeys BACKSPACE + D + E + N + S</div>
    ) : (
      <></>
    );
  })(),
  styles: () => () => ({
    empty: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '2.5rem',
      fontSize: '0.75rem',
      color: '#262A3A',
      textTransform: 'uppercase',
      borderWidth: '0.0625rem',
      borderColor: '#AFB5C8',
      borderStyle: 'dashed',
      backgroundColor: '#F0F1F5',
    },
  }),
}))();
