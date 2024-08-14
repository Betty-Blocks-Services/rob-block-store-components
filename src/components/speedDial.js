(() => ({
  name: 'SpeedDial',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['SPEED_DIAL_ITEM'],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { CircularProgress } = window.MaterialUI.Core;
    const { SpeedDial, SpeedDialIcon } = window.MaterialUI.Lab;
    const {
      isMenuVisible,
      icon,
      placement,
      tooltipPlacement,
      position,
      disabled,
      size,
      isTooltipVisible,
      dataComponentAttribute,
    } = options;

    const { Children, env, useText, Icon } = B;
    const isDev = env === 'dev';
    const [direction, setDirection] = useState(placement);
    const [open, setOpen] = useState(isMenuVisible);
    const [hidden, setHidden] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [, setOptions] = useOptions();
    const [isDisabled, setIsDisabled] = useState(disabled);

    useEffect(() => {
      setOpen(isMenuVisible);
      setDirection(placement);
      setIsDisabled(disabled);
    }, [disabled, isMenuVisible, placement]);

    useEffect(() => setOptions({ disabled: isDisabled }), [isDisabled]);

    useEffect(() => {
      B.defineFunction('Show', () => setHidden(false));
      B.defineFunction('Hide', () => setHidden(true));
      B.defineFunction('Show/Hide', () => setHidden((s) => !s));
      B.defineFunction('Toggle loading state', () => setIsLoading((s) => !s));
      B.defineFunction('Enable', () => setIsDisabled(false));
      B.defineFunction('Disable', () => setIsDisabled(true));
    }, []);

    const handleClose = () => {
      setOpen(false);
    };

    const handleOpen = () => {
      setOpen(true);
    };

    const SpeedDialComp = (
      <SpeedDial
        data-component={useText(dataComponentAttribute) || 'SpeedDial'}
        ariaLabel="SpeedDial"
        className={classes.speedDial}
        icon={
          isLoading ? (
            <CircularProgress size={16} color="inherit" />
          ) : icon !== 'None' && !open ? (
            <Icon name={icon} />
          ) : (
            <SpeedDialIcon classes={{ icon: classes.icon }} />
          )
        }
        onClose={!isDev && handleClose}
        onOpen={!isDev && handleOpen}
        open={open}
        hidden={hidden}
        direction={direction}
        FabProps={{
          disabled: isDisabled,
          size,
          color: 'inherit',
          className: classes.fab,
        }}
      >
        <Children
          handleClose={handleClose}
          open={open}
          isTooltipVisible={isTooltipVisible}
          tooltipPlacement={tooltipPlacement}
        >
          {children}
        </Children>
      </SpeedDial>
    );

    return isDev ? (
      <div className={classes.wrapper}>{SpeedDialComp}</div>
    ) : (
      SpeedDialComp
    );
  })(),
  styles: (B) => (t) => {
    const { env, mediaMinWidth, Styling } = B;
    const style = new Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);
    const isDev = env === 'dev';
    return {
      wrapper: {
        display: 'inline-block',
        pointerEvents: 'none',
      },
      speedDial: {
        position: ({ options: { position } }) => position,
        top: ({ options: { top } }) => top,
        right: ({ options: { right } }) => right,
        bottom: ({ options: { bottom } }) => bottom,
        left: ({ options: { left } }) => left,
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        [`@media ${mediaMinWidth(600)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
        },
        [`@media ${mediaMinWidth(960)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
        },
        [`@media ${mediaMinWidth(1280)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
        },
      },
      fab: {
        // position: 'absolute',
        backgroundColor: ({ options: { buttonColor, disabled } }) =>
          !disabled && [style.getColor(buttonColor), '!important'],
        color: ({ options: { iconColor, disabled } }) =>
          !disabled && [style.getColor(iconColor), '!important'],
      },
      icon: {
        transition:
          'transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important',
      },
    };
  },
}))();
