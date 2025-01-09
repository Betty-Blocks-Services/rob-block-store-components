(() => ({
  name: 'Tooltip',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Tooltip, Grow, Fade, Zoom } = window.MaterialUI.Core;
    const {
      hasVisibleTooltip,
      content,
      placement,
      arrow,
      enterDelay,
      leaveDelay,
      transition,
      transitionDuration,
      followCursor,
    } = options;
    const { env, useText } = B;
    const isDev = env === 'dev';
    const contentValue = useText(content);
    const tooltipRef = useRef(null);
    const [isOpen, setIsOpen] = useState(hasVisibleTooltip);
    const [position, setPosition] = useState({ x: undefined, y: undefined });
    const isEmpty = isDev && children.length === 0;

    useEffect(() => {
      setIsOpen(hasVisibleTooltip);
    }, [hasVisibleTooltip]);

    let TransitionComponent;

    switch (transition) {
      case 'fade':
        TransitionComponent = Fade;
        break;
      case 'zoom':
        TransitionComponent = Zoom;
        break;
      default:
        TransitionComponent = Grow;
    }

    let tooltipProps = {
      title: (
        <span
          style={{ whiteSpace: 'pre-line' }}
          dangerouslySetInnerHTML={{ __html: contentValue }}
        />
      ),
      placement,
      arrow,
      interactive: !followCursor,
      enterDelay,
      leaveDelay,
      TransitionComponent,
      TransitionProps: { timeout: transitionDuration },
      ...(!isDev &&
        followCursor && {
          onMouseMove: (e) => setPosition({ x: e.pageX, y: e.pageY }),
          PopperProps: {
            anchorEl: {
              clientHeight: 0,
              clientWidth: 0,
              getBoundingClientRect: () => ({
                top: position.y,
                left: position.x,
                right: position.x,
                bottom: position.y,
                width: 0,
                height: 0,
              }),
            },
          },
        }),
      classes: {
        tooltip: classes.tooltip,
        arrow: classes.arrow,
      },
    };

    if (isDev) {
      tooltipProps = {
        ...tooltipProps,
        open: isOpen,
      };
    }

    const tooltip = (
      <Tooltip {...tooltipProps}>
        <div className={isEmpty && classes.empty} ref={tooltipRef}>
          {isEmpty ? 'Tooltip' : children}
        </div>
      </Tooltip>
    );

    return <div>{tooltip}</div>;
  })(),
  styles: (B) => (t) => {
    const { Styling } = B;
    const newStyling = new Styling(t);
    return {
      tooltip: {
        backgroundColor: ({ options: { backgroundColor } }) => [
          newStyling.getColor(backgroundColor),
          '!important',
        ],
        color: ({ options: { textColor } }) => [
          newStyling.getColor(textColor),
          '!important',
        ],
        fontSize: ({ options: { fontSize } }) => [fontSize, '!important'],
      },
      arrow: {
        color: ({ options: { backgroundColor } }) => [
          newStyling.getColor(backgroundColor),
          '!important',
        ],
      },
      empty: {
        display: ['flex', '!important'],
        justifyContent: ['center', '!important'],
        alignItems: 'center',
        height: ['2.5rem', '!important'],
        fontSize: '0.75rem',
        color: '#262A3A',
        textTransform: 'uppercase',
        borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: '#F0F1F5',
      },
    };
  },
}))();
