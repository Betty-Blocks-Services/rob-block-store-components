(() => ({
  name: 'Page Exit Guard',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
  const { env, useText } = B;
  const isDev = env === 'dev';
  const { defaultEnabled } = options;
  const [isEnabled, setIsEnabled] = useState(useText(defaultEnabled) === 'true');

  useEffect(() => {
    B.defineFunction('Enable', () => setIsEnabled(true));
    B.defineFunction('Disable', () => setIsEnabled(false));
  }, []);

  useEffect(() => {
    // If not enabled, don't even add the listener
    if (isDev || !isEnabled) return;

    // Detection for "Exit Intent" (Mouse leaves the window towards the top)
    const handleMouseOut = (event) => {
      if (event.clientY <= 0) {
        B.triggerEvent('onIntentToExit');
      }
    };

    // Standard "Before Unload" (The safety net)
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
      return '';
    };

    document.addEventListener('mouseleave', handleMouseOut);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('mouseleave', handleMouseOut);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isEnabled]);

  return (
    <div className={isDev ? classes.pristine : classes.hidden}>
      {isDev ? <span>Page Exit Guard</span> : null}
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
