(() => ({
  name: 'Timer',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useText } = B;
    const { mode, label, repeat, duration, startValue, autoStart, showTimer } = options;

    const isDev = env === 'dev';
    const isCountUp = mode === 'up';
    const goalSeconds = Math.floor(Number(useText(duration)));
    const initialSeconds = Number(useText(startValue)) || 0;

    // Set starting state based on mode
    const [seconds, setSeconds] = useState(isCountUp ? initialSeconds : goalSeconds);
    const [isActive, setIsActive] = useState(false);
    const [timerId, setTimerId] = useState(null);
    const labelText = useText(label);

    const formatTime = (totalSeconds) => {
      const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
      const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
      const s = (totalSeconds % 60).toString().padStart(2, '0');
      return `${h}:${m}:${s}`;
    };

    const clearExistingTimer = () => {
      if (timerId) clearInterval(timerId);
    };

    const start = () => {
      if (isActive) return;
      setIsActive(true);
      
      const id = setInterval(() => {
        setSeconds((prev) => {
          if (isCountUp) {
            const nextValue = prev + 1;

            // Trigger logic for stopwatch
            if (goalSeconds > 0) {
              if (repeat && nextValue % goalSeconds === 0) {
                B.triggerEvent('onTimerEnd');
              } else if (!repeat && nextValue === goalSeconds) {
                B.triggerEvent('onTimerEnd');
              }
            }
            return nextValue;
          } else {
            // Countdown logic
            if (prev <= 1) {
              B.triggerEvent('onTimerEnd');
              if (repeat) return goalSeconds;
              clearInterval(id);
              setIsActive(false);
              return 0;
            }
            return prev - 1;
          }
        });
      }, 1000);
      
      setTimerId(id);
    };

    const pause = () => {
      setIsActive(false);
      clearExistingTimer();
    };

    const reset = () => {
      setIsActive(false);
      clearExistingTimer();
      setSeconds(isCountUp ? 0 : goalSeconds);
    };

    B.defineFunction('startTimer', start);
    B.defineFunction('pauseTimer', pause);
    B.defineFunction('resetTimer', reset);

    useEffect(() => {
      if (!isDev && autoStart) start();
      return () => clearExistingTimer();
    }, []);

    const displayValue = showTimer ? formatTime(seconds) : labelText;

    return (
      <div className={includeStyling(classes.root)}>
        {isDev ? displayValue : (showTimer && formatTime(seconds))}
      </div>
    );
  })(),
  styles: (B) => (t) => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(t);

    return {
      root: {
        display: 'inline-block',
        color: ({ options: { timerTextColor, timerTextStyle } }) => {
          return timerTextColor === '[Inherit]'
            ? style.getFontColor(timerTextStyle)
            : style.getColor(timerTextColor);
        },
        fontFamily: ({ options: { timerTextStyle } }) =>
          `var(--text-fontFamily-${timerTextStyle.toString().toLowerCase()})`,
        fontSize: ({ options: { timerTextStyle } }) =>
          `var(--text-fontSize-${timerTextStyle.toString().toLowerCase()})`,
        fontStyle: ({ options: { timerTextStyle } }) =>
          `var(--text-fontStyle-${timerTextStyle.toString().toLowerCase()})`,
        fontWeight: ({ options: { timerTextStyle, timerTextWeight } }) => {
          return timerTextWeight === '[Inherit]'
            ? style.getFontWeight(timerTextStyle)
            : timerTextWeight;
        },
        textTransform: ({ options: { timerTextStyle } }) => style.getTextTransform(timerTextStyle),
        letterSpacing: ({ options: { timerTextStyle } }) => style.getLetterSpacing(timerTextStyle),
        [`@media ${mediaMinWidth(600)}`]: {
          fontSize: ({ options: { timerTextStyle } }) =>
            style.getFontSize(timerTextStyle, 'Portrait'),
        },
        [`@media ${mediaMinWidth(960)}`]: {
          fontSize: ({ options: { timerTextStyle } }) =>
            style.getFontSize(timerTextStyle, 'Landscape'),
        },
        [`@media ${mediaMinWidth(1280)}`]: {
          fontSize: ({ options: { timerTextStyle } }) =>
            style.getFontSize(timerTextStyle, 'Desktop'),
        },
      }
    };
}}))();
