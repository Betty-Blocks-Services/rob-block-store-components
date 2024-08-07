(() => ({
  name: 'Fetch',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      urlInput,
      method,
      bodyInput,
      error,
      validate,
      path,
      value,
      actionId,
    } = options;
    const { useText, env, useActionJs } = B;
    const isDev = env === 'dev';
    const urlText = useText(urlInput);
    const body = useText(bodyInput) || null;
    const errorText = useText(error);
    const pathText = useText(path);
    const valueText = useText(value);
    const [loading, setLoading] = useState(false);
    const [actionCallback, { loading: isLoadingAction }] = useActionJs(
      actionId,
      {
        variables: { id: actionId },
        onCompleted(response) {
          const token = response.action.results;
          getResponse(urlText, token);
        },
        onError(error) {
          B.triggerEvent('onError', error);
        },
      },
    );

    const getValueFromObject = (obj, desc) => {
      let object = obj;
      const arr = desc.split('.');
      while (arr.length) object = object[arr.shift()];
      return object;
    };

    const getResponse = (url, token) => {
      setLoading(true);

      try {
        fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...(token && {
              Authorization: token,
            }),
          },
          ...(body && { body }),
        })
          .then((resp) => {
            if (!resp.ok) {
              B.triggerEvent('onError', { message: errorText });
              throw new Error(`${method} ${url} was not ok!`);
            }
            return resp.json();
          })
          .then((responseJson) => {
            const responseValue = getValueFromObject(responseJson, pathText);

            if (String(responseValue) === valueText || !validate) {
              B.triggerEvent('onSuccess', JSON.stringify(responseJson));
            } else {
              B.triggerEvent('onError', { message: errorText });
            }
          });
      } catch (err) {
        throw new Error(JSON.stringify(err));
      }

      setLoading(false);
      B.triggerEvent('onDone');
    };

    useEffect(() => {
      B.defineFunction('Fetch', () =>
        actionId ? actionCallback() : getResponse(urlText),
      );
    }, []);

    useEffect(() => {
      if (loading || isLoadingAction) {
        B.triggerEvent('onLoad');
      }
    }, [loading, isLoadingAction]);

    return isDev ? (
      <div className={classes.pristine}>{urlText || 'Fetch'}</div>
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
