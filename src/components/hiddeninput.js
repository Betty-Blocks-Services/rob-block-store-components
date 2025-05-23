(() => ({
  name: 'Hidden Input',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { actionVariableId: name, value: valueInput } = options;
    const { env, useText } = B;
    const [value, setValue] = useState(useText(valueInput));
    const isDev = env === 'dev';

    useEffect(() => {
      B.defineFunction('Set value', val => setValue(val));
    }, []);

    useEffect(() => {
      if (value) B.triggerEvent('onChange');
    }, [value]);

    if (isDev) {
      return <div className={classes.dev}>Hidden input {value}</div>;
    }

    function Input() {
      return (
        <input
          className={[isDev ? classes.dev : ''].join(' ')}
          defaultValue={value}
          id={name}
          name={name}
          type="hidden"
        />
      );
    }

    return <Input />;
  })(),
  styles: () => () => ({
    root: {
      '& > *': {
        pointerEvents: 'none',
      },
    },
    dev: {
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
