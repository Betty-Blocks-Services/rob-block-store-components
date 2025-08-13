(() => ({
  name: 'TinyMCE',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  dependencies: [
    {
      label: 'TinyMCE',
      package: 'npm:@tinymce/tinymce-react@4.3.0',
      imports: ['Editor'],
    },
  ],
  jsx: (() => {
    const {
      TinyMCE: { Editor },
    } = dependencies;
    const {
      source,
      apiKey,
      scriptSrc,
      actionVariableId: name,
      label,
      value: valueProp,
      disabled,
      placeholderText,
      placeholderColor,
      helperText,
      menubar,
      toolbar,
      toolbarMode,
      language,
      fontType,
      fontFamily,
      fontSize,
      bold,
      italic,
      underline,
      strikethrough,
      align,
      lists,
      link,
      image,
      table,
      codeSample,
      accordion,
      lineHeight,
      indent,
      textColor,
      backgroundColor,
      removeFormat,
      sourceCode,
      fullScreen,
      preview,
      print,
      statusbar,
      elementpath,
      help,
      wordCount,
      branding,
      required,
      validationValueMissing,
      maxFileSize,
      maxFileSizeMessage,
      maxTotalSize,
      maxTotalSizeMessage,
      width,
      height,
      hideLabel,
      useDarkMode,
      allowImagePaste,
      askBeforeLeave,
      dataComponentAttribute,
    } = options;
    const { env, useText } = B;
    console.log({ B });
    const { FormControl, InputLabel, FormHelperText } = window.MaterialUI.Core;

    const isDev = env === 'dev';
    const [error, setError] = useState(null);
    const [placeholder, setPlaceholder] = useState(useText(placeholderText));
    const [helper, setHelper] = useState(useText(helperText));
    const labelText = useText(label);
    const valueMissingMessage = useText(validationValueMissing);
    const maxFileSizeExceeded = useText(maxFileSizeMessage);
    const maxTotalSizeExceeded = useText(maxTotalSizeMessage);

    const [editorContent, setEditorContent] = useState({
      content: useText(valueProp) || '',
      rawContent: useText(valueProp) || '',
    });

    const getSizeInMegabytes = (str) => new Blob([str]).size / 1024 / 1024;

    const handleValidation = (rawContent) => {
      const isError = !isDev && !rawContent && required;
      setError(isError);
      setHelper(isError ? valueMissingMessage : useText(helperText));
    };

    const initConfig = {
      width,
      height,
      language,
      placeholder,
      readOnly: isDev || disabled ? 1 : 0,
      skin: useDarkMode ? 'oxide-dark' : 'oxide',
      content_css: useDarkMode ? 'dark' : 'default',
      content_style: `
        html { height: 100%; }
        body { height: calc(100% - 1rem); }
        .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
          color: ${placeholderColor} !important;
        }
      `,
      noneditable_class: 'mceNonEditable',
      plugins: `
        ${!isDev ? 'autosave' : ''} 
        preview searchreplace autolink code visualblocks visualchars fullscreen image link codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists charmap quickbars accordion
        ${wordCount ? 'wordcount' : ''} 
        ${help ? 'help' : ''}`,
      menubar: menubar
        ? 'file edit view insert format tools table help'
        : false,
      toolbar_mode: toolbarMode,
      toolbar: toolbar
        ? `undo redo | 
          ${fontType ? 'blocks' : ''} 
          ${fontFamily ? 'fontfamily' : ''} 
          ${fontSize ? 'fontsize' : ''} |
          ${bold ? 'bold' : ''} 
          ${italic ? 'italic' : ''} 
          ${underline ? 'underline' : ''} 
          ${strikethrough ? 'strikethrough' : ''} | 
          ${align ? 'align' : ''} 
          ${lists ? 'bullist numlist' : ''} |
          ${link ? 'link' : ''} 
          ${image ? 'image' : ''} 
          ${table ? 'table' : ''} 
          ${codeSample ? 'codesample' : ''} | 
          ${accordion ? 'accordion accordionremove' : ''} | 
          ${lineHeight ? 'lineheight' : ''} 
          ${indent ? 'outdent indent' : ''} | 
          ${textColor ? 'forecolor' : ''} 
          ${backgroundColor ? 'backcolor' : ''} 
          ${removeFormat ? 'removeformat' : ''} | 
          ${sourceCode ? 'code' : ''} 
          ${fullScreen ? 'fullscreen' : ''} 
          ${preview ? 'preview' : ''} 
          ${print ? 'print' : ''}`
        : false,
      contextmenu: false,
      quickbars_insert_toolbar: false,
      statusbar,
      branding,
      elementpath,
      formats: {},
      convert_newlines_to_brs: true,
      autosave_ask_before_unload: askBeforeLeave,
      link_title: false,
      link_assume_external_targets: true,
      link_default_protocol: 'https',
      link_default_target: '_blank',
      image_caption: true,
      image_advtab: true,
      paste_data_images: allowImagePaste,
      file_picker_types: 'image',
      file_picker_callback: (callback, value, meta) => {
        const { activeEditor } = tinymce;
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/png,image/jpeg');

        // eslint-disable-next-line func-names
        input.onchange = function () {
          const file = this.files[0];
          const fileSize = file.size / 1024 / 1024;
          const totalSize = getSizeInMegabytes(activeEditor.getContent());
          const newTotalSize = totalSize + fileSize;
          const { clientWidth } = activeEditor.getContainer();
          const editorWidth = clientWidth - 32; // 1rem margin = 2 times 16 px

          if (!!maxFileSize && file.size > maxFileSize * 1024 * 1024) {
            alert(maxFileSizeExceeded);
            return;
          }

          if (!!maxTotalSize && newTotalSize > maxTotalSize) {
            alert(maxTotalSizeExceeded);
            return;
          }

          const reader = new FileReader();
          reader.onload = (event) => {
            const imageObject = new Image();
            imageObject.src = event.target.result;

            imageObject.onload = () => {
              const { width: imgWidth, height: imgHeight } = imageObject;
              const canvas = document.createElement('canvas');
              const calculatedWidth =
                imgWidth < editorWidth ? imgWidth : editorWidth;
              const aspectRatio = calculatedWidth / imgWidth;
              const calculatedHeight = Math.round(imgHeight * aspectRatio);
              canvas.width = calculatedWidth;
              canvas.height = calculatedHeight;
              const canvasContext = canvas.getContext('2d');
              canvasContext.drawImage(
                imageObject,
                0,
                0,
                calculatedWidth,
                calculatedHeight,
              );
              const base64 = canvas.toDataURL('image/*').split(',')[1];
              const { blobCache } = activeEditor.editorUpload;
              const id = `blobid${new Date().getTime()}`;
              const blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);
              callback(blobInfo.blobUri(), {
                title: file.name,
                width: `${calculatedWidth}`,
                height: `${calculatedHeight}`,
              });
            };
          };
          reader.readAsDataURL(file);
        };
        input.click();
      },
      setup: (editor) => {
        editor.on('blur', () => {
          const rawContent = editor.getContent({ format: 'text' }).trim('');
          handleValidation(rawContent);
        });
        editor.on('keydown', (event) => {
          if (event.keyCode === 9) {
            editor.execCommand('mceInsertContent', false, '&emsp;'); // inserts tab
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          return true;
        });
      },
    };

    const handleEditorChange = (content, editor) => {
      const rawContent = editor.getContent({ format: 'text' }).trim('');
      handleValidation(rawContent);
      setEditorContent({ content, rawContent });
      B.triggerEvent('onChange', content);
    };

    useEffect(() => {
      if (isDev) {
        setEditorContent({
          content: useText(valueProp),
          rawContent: useText(valueProp),
        });
        setPlaceholder(useText(placeholderText));
        setHelper(useText(helperText));
      }
    }, [isDev, valueProp, placeholderText, helperText]);

    const copyToClipboard = () => {
      const data = [
        new ClipboardItem({
          'text/plain': new Blob(['<a href="http://google.com/">test</a>'], {
            type: 'text/plain',
          }),
          'text/html': new Blob(['<a href="http://google.com/">test</a>'], {
            type: 'text/html',
          }),
        }),
      ];
      navigator.clipboard.write(data);
      return 'test';
    };

    useEffect(() => {
      B.defineFunction('Copy rich text', copyToClipboard);
      B.defineFunction('Clear', () => tinymce.activeEditor.setContent(''));
    }, []);

    const TinymceCmp = (
      <FormControl
        className={classes.formControl}
        disabled={disabled}
        required={required}
        error={error}
      >
        {labelText && !hideLabel && (
          <InputLabel classes={{ root: classes.label }}>{labelText}</InputLabel>
        )}
        <input
          name={name}
          type="text"
          className={classes.hidden}
          value={editorContent.content}
          required={required}
          disabled={disabled}
          onInvalid={(e) => e.preventDefault()}
        />
        <Editor
          init={initConfig}
          disabled={disabled}
          initialValue={useText(valueProp)}
          onEditorChange={handleEditorChange}
          {...(source === 'self-hosted'
            ? { tinymceScriptSrc: useText(scriptSrc) }
            : { apiKey: useText(apiKey) })}
        />
        {helper && (
          <FormHelperText classes={{ root: classes.helper }}>
            {helper}
          </FormHelperText>
        )}
      </FormControl>
    );

    return (
      <div
        className={classes.root}
        data-component={useText(dataComponentAttribute) || 'TinyMCE'}
      >
        {TinymceCmp}
      </div>
    );
  })(),
  styles: (B) => (t) => {
    const { Styling, env, mediaMinWidth } = B;
    const isDev = env === 'dev';
    const style = new Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    return {
      root: {
        ...(isDev && {
          '& > *': {
            pointerEvents: 'none',
          },
        }),
        paddingTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        paddingRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        paddingBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        paddingLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        [`@media ${mediaMinWidth(600)}`]: {
          paddingTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          paddingRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          paddingBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          paddingLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
        },
        [`@media ${mediaMinWidth(960)}`]: {
          paddingTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          paddingRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          paddingBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          paddingLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
        },
        [`@media ${mediaMinWidth(1280)}`]: {
          paddingTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          paddingRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          paddingBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          paddingLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
        },
        width: ({ options: { width } }) => width,
      },
      label: {
        position: 'static !important',
        transform: 'none !important',
        marginBottom: '8px',
        color: ({ options: { labelColor } }) => [
          style.getColor(labelColor),
          '!important',
        ],
        '&.Mui-error': {
          color: ({ options: { errorColor } }) => [
            style.getColor(errorColor),
            '!important',
          ],
        },
        '&.Mui-error ~ .tox-tinymce': {
          borderColor: ({ options: { errorColor } }) => [
            style.getColor(errorColor),
            '!important',
          ],
        },
        '&.Mui-disabled': {
          pointerEvents: 'none',
          opacity: '0.7',
        },
        '& ~ .tox-tinymce': {
          borderWidth: '1px',
          borderColor: ({ options: { borderColor } }) =>
            style.getColor(borderColor),
          '&:hover': {
            borderColor: ({ options: { borderHoverColor } }) =>
              style.getColor(borderHoverColor),
          },
        },
      },
      helper: {
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
      formControl: {
        width: '100%',
        '& fieldset': {
          top: ({ options: { hideLabel } }) => (hideLabel ? 0 : null),
        },
        '& legend': {
          display: ({ options: { hideLabel } }) =>
            hideLabel ? ['none', '!important'] : null,
        },
      },
      hidden: {
        display: 'none',
      },
    };
  },
}))();
