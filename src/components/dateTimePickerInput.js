(() => ({
  name: 'DateTimePickerInput',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      actionVariableId: name,
      autoComplete,
      closeOnSelect,
      disabled,
      error,
      value,
      placeholder = [''],
      variant,
      validationValueMissing,
      inputvariant,
      type,
      dateFormat,
      timeFormat,
      datetimeFormat,
      monthFormat,
      size,
      fullWidth,
      required,
      minValue,
      maxValue,
      validationBeforeMinValue,
      validationAfterMaxValue,
      validationInvalidValue,
      margin,
      helperText = [''],
      disableToolbar,
      disablePastDates,
      hideLabel,
      use24HourClockTime,
      label,
      locale,
      dataComponentAttribute = ['DateTimePicker'],
      floatLabel,
    } = options;
    const { env, useText, Icon, generateUUID } = B;
    const {
      MuiPickersUtilsProvider,
      KeyboardTimePicker,
      KeyboardDatePicker,
      KeyboardDateTimePicker,
    } = window.MaterialUI.Pickers;
    const { DateFnsUtils } = window.MaterialUI;
    const { nlLocale, enLocale } = window.MaterialUI.DateLocales;
    const DateFns = new DateFnsUtils();
    const isDev = env === 'dev';
    const parsedValue = useText(value);
    const [isDisabled, setIsDisabled] = useState(disabled);
    const [selectedDate, setSelectedDate] = useState(parsedValue || null);
    const [errorState, setErrorState] = useState(error);
    const [afterFirstValidation, setAfterFirstValidation] = useState(false);
    const helperTextResolved = useText(helperText);
    const [helper, setHelper] = useState(helperTextResolved);
    const valueMissingMessage = useText(validationValueMissing);
    const placeholderText = useText(placeholder);
    const minValueText = useText(minValue);
    const maxValueText = useText(maxValue);
    const beforeMinValueMessage = useText(validationBeforeMinValue);
    const afterMaxValueMessage = useText(validationAfterMaxValue);
    const invalidValueMessage = useText(validationInvalidValue);
    const dataComponentAttributeValue = useText(dataComponentAttribute);
    const clearable = true;
    const { current: labelControlRef } = useRef(generateUUID());

    const localeMap = {
      nl: nlLocale,
      en: enLocale,
    };

    <sander></sander>;

    const parsedLabel = useText(label);
    const labelText = parsedLabel;
    const isValidDate = (date) => date instanceof Date && !isNaN(date);

    const convertToDate = (date) => {
      if (isValidDate(date)) {
        const dateString = `${date.getFullYear()}-${String(
          date.getMonth() + 1,
        ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

        return dateString;
      }
      return '';
    };

    const convertToValidDate = (date) => {
      const formattedValue = DateFns.parse(date, dateFormat);
      const valueIsValid =
        DateFns.isValid(formattedValue) || DateFns.isValid(date);

      if (date && valueIsValid) {
        if (isValidDate(formattedValue)) {
          return formattedValue;
        }
        // convert to slashes because it conflicts with the MUI DateTimeCmp
        const parsedValueWithSlashes = date.replace(/-/g, '/');
        return new Date(parsedValueWithSlashes);
      }
      return undefined;
    };

    const validationMessage = (validityObject) => {
      if (validityObject.valueMissing && valueMissingMessage) {
        return valueMissingMessage;
      }
      if (validityObject.invalidValue) {
        return invalidValueMessage;
      }
      if (validityObject.beforeMinValue) {
        return beforeMinValueMessage;
      }
      if (validityObject.afterMaxValue) {
        return afterMaxValueMessage;
      }
      return '';
    };

    const handleValidation = (validation) => {
      setErrorState(!validation.valid);
      const message = validationMessage(validation) || helperTextResolved;
      setHelper(message);
    };

    const changeHandler = (date) => {
      setSelectedDate(date);

      setTimeout(() => {
        if (type === 'date') {
          B.triggerEvent('onChange', convertToDate(date));
        } else if (!date || DateFns.isValid(date)) {
          B.triggerEvent('onChange', date);
        } else {
          B.triggerEvent('onChange', '');
        }
      }, 250);
    };

    // invalidHandler is called on form submission with invalid value
    const invalidHandler = (event) => {
      event.preventDefault();
      const {
        target: { validity },
      } = event;
      handleValidation(validity);
    };

    // errorHandler is called on render and every time the value changes
    const errorHandler = (message) => {
      const validation = {
        valid: !message && (selectedDate || !required || !afterFirstValidation),
        valueMissing: !selectedDate && required && afterFirstValidation,
        invalidValue: message.includes('Invalid'),
        beforeMinValue: message.includes('minimal date'),
        afterMaxValue: message.includes('maximal date'),
      };
      handleValidation(validation);
    };

    useEffect(() => {
      if (parsedValue) {
        switch (type) {
          case 'date': {
            const formattedDate = DateFns.parse(parsedValue, dateFormat);

            if (isValidDate(formattedDate)) {
              setSelectedDate(formattedDate);
            } else {
              // convert to slashes because it conflicts with the MUI DateTimeCmp
              const parsedValueWithSlashes = parsedValue.replace(/-/g, '/');
              setSelectedDate(new Date(parsedValueWithSlashes));
            }
            break;
          }

          case 'datetime': {
            const formatDefaultParse = DateFns.parse(
              parsedValue,
              datetimeFormat,
            );

            if (isValidDate(formatDefaultParse)) {
              setSelectedDate(formatDefaultParse);
            } else {
              setSelectedDate(new Date(parsedValue));
            }

            break;
          }

          case 'time': {
            if (parsedValue.length === timeFormat.length) {
              setSelectedDate(DateFns.parse(parsedValue, timeFormat));
            } else {
              const parsedTime = DateFns.parse(
                parsedValue.substr(0, timeFormat.length),
                timeFormat,
              );
              setSelectedDate(parsedTime);
            }
            break;
          }

          case 'month': {
            const formattedDate = DateFns.parse(parsedValue, monthFormat);

            if (isValidDate(formattedDate)) {
              setSelectedDate(formattedDate);
            } else {
              // convert to slashes because it conflicts with the MUI DateTimeCmp
              const parsedValueWithSlashes = parsedValue.replace(/-/g, '/');
              setSelectedDate(new Date(parsedValueWithSlashes));
            }
            break;
          }

          default:
        }
      } else {
        setSelectedDate(null);
      }
    }, [parsedValue]);

    B.defineFunction('Clear', () => setSelectedDate(null));
    B.defineFunction('Enable', () => setIsDisabled(false));
    B.defineFunction('Disable', () => setIsDisabled(true));

    let DateTimeComponent;
    let format;
    let resultString;
    let use24HourClock = true;
    let minDate;
    let maxDate;
    let views;

    switch (type) {
      case 'date': {
        DateTimeComponent = KeyboardDatePicker;
        format = dateFormat || 'dd/MM/yyyy';
        views = ['year', 'date'];

        minDate = convertToValidDate(minValueText);
        maxDate = convertToValidDate(maxValueText);

        resultString = isValidDate(selectedDate)
          ? DateFns.format(selectedDate, 'yyyy-MM-dd')
          : null;
        break;
      }
      case 'datetime': {
        DateTimeComponent = KeyboardDateTimePicker;
        format = datetimeFormat || 'dd/MM/yyyy HH:mm:ss';
        use24HourClock = use24HourClockTime;
        views = ['year', 'date', 'hours', 'minutes'];

        resultString = isValidDate(selectedDate)
          ? selectedDate.toISOString()
          : null;
        break;
      }
      case 'time': {
        DateTimeComponent = KeyboardTimePicker;
        format = timeFormat || 'HH:mm:ss';
        use24HourClock = use24HourClockTime;
        views = ['hours', 'minutes'];

        resultString = isValidDate(selectedDate)
          ? DateFns.format(selectedDate, 'HH:mm:ss')
          : null;
        break;
      }
      case 'month': {
        DateTimeComponent = KeyboardDatePicker;
        format = monthFormat || 'MMMM';
        views = ['month'];

        resultString = isValidDate(selectedDate)
          ? DateFns.format(selectedDate, 'yyyy-MM')
          : null;
        break;
      }
      default:
    }

    const onBlurHandler = (event) => {
      const {
        target: { validity },
      } = event;

      handleValidation(validity);
      setAfterFirstValidation(true);
    };

    const DateTimeCmp = (
      <DateTimeComponent
        id={labelControlRef}
        error={errorState}
        value={selectedDate}
        size={size}
        onBlur={onBlurHandler}
        autoComplete={autoComplete ? 'on' : 'off'}
        classes={{
          root: `${classes.formControl} ${floatLabel && classes.floatLabel}`,
        }}
        variant={variant}
        placeholder={placeholderText}
        fullWidth={fullWidth}
        onChange={changeHandler}
        inputVariant={inputvariant}
        onInvalid={invalidHandler}
        onError={errorHandler}
        InputProps={{
          inputProps: {
            tabIndex: isDev ? -1 : undefined,
            className: includeStyling(),
            // this prevents the form from submitting when in error state
            ...(errorState && { pattern: '^a' }),
          },
        }}
        KeyboardButtonProps={{
          tabIndex: isDev ? -1 : undefined,
        }}
        required={required}
        disabled={isDisabled}
        label={!hideLabel && labelText}
        views={views}
        margin={margin}
        helperText={helper}
        disableToolbar={disableToolbar}
        disablePast={disablePastDates}
        autoOk={closeOnSelect}
        format={format}
        minDate={minDate}
        maxDate={maxDate}
        data-component={dataComponentAttributeValue}
        PopoverProps={{
          classes: {
            root: classes.popover,
          },
        }}
        DialogProps={{
          className: classes.dialog,
        }}
        ampm={!use24HourClock}
        keyboardIcon={
          type === 'time' ? (
            <Icon name="AccessTime" fontSize={size} />
          ) : (
            <Icon name="Event" fontSize={size} />
          )
        }
        clearable={clearable}
      />
    );

    return isDev ? (
      <div className={classes.root}>
        <MuiPickersUtilsProvider
          utils={DateFnsUtils}
          locale={localeMap[locale]}
        >
          {variant === 'static' ? (
            <div className={classes.static}>{DateTimeCmp}</div>
          ) : (
            DateTimeCmp
          )}
        </MuiPickersUtilsProvider>
      </div>
    ) : (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
        <input type="hidden" name={name} value={resultString} />
        {variant === 'static' ? (
          <div className={classes.static}>{DateTimeCmp}</div>
        ) : (
          DateTimeCmp
        )}
      </MuiPickersUtilsProvider>
    );
  })(),
  styles: (B) => (t) => {
    const { Styling } = B;
    const style = new Styling(t);
    return {
      root: {
        display: ({ options: { fullWidth } }) =>
          fullWidth ? 'block' : 'inline-block',
        '& > *': {
          pointerEvents: 'none',
        },
        width: ({ options: { fullWidth } }) => (fullWidth ? '100%' : 'auto'),
      },
      dialog: {
        '& .MuiPickersToolbar-toolbar, & .MuiPickersDay-daySelected': {
          backgroundColor: ({ options: { backgroundColorPopup } }) => [
            style.getColor(backgroundColorPopup),
            '!important',
          ],
        },
        '& .MuiButton-textPrimary': {
          color: ({ options: { backgroundColorPopup } }) => [
            style.getColor(backgroundColorPopup),
            '!important',
          ],
        },
      },
      popover: {
        '& .MuiPickersToolbar-toolbar, & .MuiPickersDay-daySelected': {
          backgroundColor: ({ options: { backgroundColorPopup } }) => [
            style.getColor(backgroundColorPopup),
            '!important',
          ],
        },
      },
      floatLabel: {
        '& > label': {
          position: 'static !important',
          transform: 'none !important',
          marginBottom: '8px !important',
        },
        '& .MuiInputBase-root': {
          '& > fieldset': {
            '& > legend': {
              maxWidth: '0px !important',
            },
          },
        },
      },
      formControl: {
        '& > label': {
          color: ({ options: { labelColor } }) => [
            style.getColor(labelColor),
            '!important',
          ],
          zIndex: ({ options: { inputvariant } }) =>
            inputvariant === 'standard' ? 1 : null,

          '&.Mui-focused': {
            color: ({ options: { borderFocusColor } }) => [
              style.getColor(borderFocusColor),
              '!important',
            ],
          },
          '&.Mui-error, &.Mui-error .Mui-error': {
            color: ({ options: { errorColor } }) => [
              style.getColor(errorColor),
              '!important',
            ],
          },
          '&.Mui-disabled': {
            pointerEvents: 'none',
            opacity: '0.7',
          },
        },
        '& > p': {
          color: ({ options: { helperColor } }) => [
            style.getColor(helperColor),
            '!important',
          ],
          '&.Mui-error': {
            color: ({ options: { errorColor } }) => [
              style.getColor(errorColor),
              '!important',
            ],
          },
        },
        '& .MuiInputBase-root': {
          color: ({ options: { textColor } }) => [
            style.getColor(textColor),
            '!important',
          ],
          backgroundColor: ({ options: { backgroundColor } }) => [
            style.getColor(backgroundColor),
            '!important',
          ],
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline, & .MuiFilledInput-underline, & .MuiInput-underline':
              {
                borderColor: ({ options: { borderHoverColor } }) => [
                  style.getColor(borderHoverColor),
                  '!important',
                ],
              },
          },
          '&.Mui-focused, &.Mui-focused:hover': {
            '& .MuiOutlinedInput-notchedOutline, & .MuiFilledInput-underline, & .MuiInput-underline':
              {
                borderColor: ({ options: { borderFocusColor } }) => [
                  style.getColor(borderFocusColor),
                  '!important',
                ],
              },
          },
          '& fieldset': {
            top: ({ options: { hideLabel } }) => (hideLabel ? 0 : null),
          },
          '& legend': {
            display: ({ options: { hideLabel } }) =>
              hideLabel ? ['none', '!important'] : null,
          },
          '& input': {
            '&::placeholder': {
              color: ({ options: { placeholderColor } }) => [
                style.getColor(placeholderColor),
                '!important',
              ],
            },
          },
          '&.Mui-disabled': {
            pointerEvents: 'none',
            opacity: '0.7',
          },
        },
        '& .MuiIconButton-root': {
          color: ({ options: { textColor } }) => [
            style.getColor(textColor),
            '!important',
          ],
          marginRight: '-12px',
        },
        '& .MuiOutlinedInput-notchedOutline, & .MuiFilledInput-underline, & .MuiInput-underline':
          {
            borderColor: ({ options: { borderColor } }) => [
              style.getColor(borderColor),
              '!important',
            ],
          },
        '& .MuiInput-underline, & .MuiFilledInput-underline': {
          '&::before, &::after': {
            borderColor: ({ options: { borderColor } }) => [
              style.getColor(borderColor),
              '!important',
            ],
          },
          '&:hover': {
            '&::before, &::after': {
              borderColor: ({ options: { borderHoverColor } }) => [
                style.getColor(borderHoverColor),
                '!important',
              ],
            },
          },
          '&.Mui-focused::before, &.Mui-focused::after, &.Mui-focused:hover::before, &.Mui-focused:hover::after':
            {
              borderColor: ({ options: { borderFocusColor } }) => [
                style.getColor(borderFocusColor),
                '!important',
              ],
            },
        },
        '& .MuiInputBase-root.Mui-error, & .MuiInputBase-root.Mui-error:hover, & .MuiInputBase-root.Mui-error.Mui-focused, & .MuiInputBase-root.Mui-error.Mui-focused:hover':
          {
            '& .MuiOutlinedInput-notchedOutline, & .MuiFilledInput-underline, & .MuiInput-underline':
              {
                borderColor: ({ options: { errorColor } }) => [
                  style.getColor(errorColor),
                  '!important',
                ],
              },
            '&.MuiInput-underline, &.MuiFilledInput-underline': {
              '&::before, &::after': {
                borderColor: ({ options: { errorColor } }) => [
                  style.getColor(errorColor),
                  '!important',
                ],
              },
              '&:hover': {
                '&::before, &::after': {
                  borderColor: ({ options: { errorColor } }) => [
                    style.getColor(errorColor),
                    '!important',
                  ],
                },
              },
              '&.Mui-focused::before, &.Mui-focused::after, &.Mui-focused:hover::before, &.Mui-focused:hover::after':
                {
                  borderColor: ({ options: { errorColor } }) => [
                    style.getColor(errorColor),
                    '!important',
                  ],
                },
            },
          },
      },
      static: {
        '& .MuiPickersStaticWrapper-staticWrapperRoot': {
          '& .MuiToolbar-root, & .MuiPickersDay-daySelected': {
            backgroundColor: ({ options: { backgroundColorPopup } }) => [
              style.getColor(backgroundColorPopup),
              '!important',
            ],
          },
        },
      },
    };
  },
}))();
