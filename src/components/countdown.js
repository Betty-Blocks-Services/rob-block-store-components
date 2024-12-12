(() => ({
  name: 'Countdown',
  type: 'BODY_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useText } = B;
    const {
      targetDate,
      type,
      daysAppendix,
      hoursAppendix,
      minutesAppendix,
      secondsAppendix,
    } = options;
    const targetDateText = useText(targetDate);
    const isDev = env === 'dev';

    const formatNumber = (number) => (number < 10 ? `0${number}` : number);

    const calculateTimeLeft = () => {
      const difference = Date.parse(targetDateText) - Date.parse(new Date());

      if (!isDev && difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      // Countdown timer is finished
      B.triggerEvent('onCountdownEnd');
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
      if (!isDev) {
        const timer = setInterval(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer); // Clean up the interval on component unmount
      }
    }, []);

    const CountDownComp = ({ days, hours, minutes, seconds }) => {
      if (isNaN(days) || isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        return;
      }

      if (type === 'clock') {
        return (
          formatNumber(days) +
          ':' +
          formatNumber(hours) +
          ':' +
          formatNumber(minutes) +
          ':' +
          formatNumber(seconds)
        );
      }

      return (
        days +
        daysAppendix +
        hours +
        hoursAppendix +
        minutes +
        minutesAppendix +
        seconds +
        secondsAppendix
      );
    };

    return (
      <div className={includeStyling(classes.root)}>
        {CountDownComp(timeLeft)}
      </div>
    );
  })(),
  styles: (B) => (t) => {
    const { Styling } = B;
    const style = new Styling(t);

    return {
      root: {
        color: ({ options: { textColor, textType } }) => {
          return textColor === '[Inherit]'
            ? style.getFontColor(textType)
            : style.getColor(textColor);
        },
        fontFamily: ({ options: { textType } }) =>
          `var(--text-fontFamily-${textType.toString().toLowerCase()})`,
        fontSize: ({ options: { textType } }) =>
          `var(--text-fontSize-${textType.toString().toLowerCase()})`,
        fontStyle: ({ options: { textType } }) =>
          `var(--text-fontStyle-${textType.toString().toLowerCase()})`,
        fontWeight: ({ options: { textType, fontWeight } }) => {
          return fontWeight === '[Inherit]'
            ? style.getFontWeight(textType)
            : fontWeight;
        },
        textTransform: ({ options: { textType } }) =>
          style.getTextTransform(textType),
        letterSpacing: ({ options: { textType } }) =>
          style.getLetterSpacing(textType),
      },
    };
  },
}))();
