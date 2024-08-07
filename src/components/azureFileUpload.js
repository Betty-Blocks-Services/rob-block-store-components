(() => ({
  name: 'Azure File Upload Input',
  type: 'BODY_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  dependencies: [
    {
      label: 'Azure',
      package: 'npm:@azure/storage-blob@12.16.0',
      imports: ['ContainerClient'],
    },
  ],
  jsx: (() => {
    const {
      Azure: { ContainerClient },
    } = dependencies;
    const { LinearProgress, IconButton, FormLabel, FormHelperText } =
      window.MaterialUI.Core;
    const { CloudDone } = window.MaterialUI.Icons;
    const { useText, env, Icon } = B;
    const isDev = env === 'dev';

    const {
      actionVariableId: name,
      sasUrl,
      folder,
      disabled,
      required,
      label,
      hideLabel,
      dropText: dropTextOption,
      helperText,
      defaultErrorText: defaultErrorTextOption,
      fileExistsErrorText: fileExistsErrorTextOption,
      accept,
      maxFileSize,
      maxFileSizeMessage,
      incorrectTypeErrorText: incorrectTypeErrorTextOption,
    } = options;

    const sasUrlText = useText(sasUrl);
    const tempContainerClient =
      !isDev && sasUrlText && new ContainerClient(sasUrlText);
    const folderName = useText(folder);
    const labelText = useText(label);
    const dropText = sasUrlText
      ? useText(dropTextOption)
      : 'Please provide a SAS URL';
    const [isDisabled, setIsDisabled] = useState(disabled || !sasUrlText);
    const [helper, setHelper] = useState(useText(helperText));
    const acceptedValue = useText(accept) || '*';
    const incorrectTypeErrorText = useText(incorrectTypeErrorTextOption);
    const maxFileSizeErrorText = useText(maxFileSizeMessage);
    const defaultError = useText(defaultErrorTextOption);
    const errorCodes = {
      UnauthorizedBlobOverwrite: useText(fileExistsErrorTextOption),
    };

    const fileInput = useRef(null);
    const [files, setFiles] = useState({
      files: [],
      uploaded: [],
      failed: [],
    });

    const [status, setStatus] = useState({
      current: null,
      progress: 0,
    });

    B.defineFunction('Enable', () => setIsDisabled(false));
    B.defineFunction('Disable', () => setIsDisabled(true));
    B.defineFunction('Clear', () => {
      setFiles({
        files: [],
        uploaded: [],
        failed: [],
      });
    });

    const uuidv4 = () =>
      'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });

    const deleteBlob = (blobAsset) => {
      const blockBlobClient = tempContainerClient.getBlockBlobClient(blobAsset);
      blockBlobClient
        .delete()
        .then(() => {
          setFiles((prev) => {
            const newUploaded = prev.uploaded.filter(
              (item) => item.blobAsset !== blobAsset,
            );
            return { ...prev, uploaded: newUploaded };
          });
        })
        .catch(() => {
          setFiles((prev) => {
            const newUploaded = prev.uploaded.filter(
              (item) => item.blobAsset !== blobAsset,
            );
            return { ...prev, uploaded: newUploaded };
          });
        });
    };

    const upload = (file) => {
      const fileName = file.name.replace(/[&#+~%–'":;=\\@^*?<>]/g, '');
      const blobAsset = `${folderName}/${uuidv4()}/${fileName}`;
      const blockBlobClient = tempContainerClient.getBlockBlobClient(blobAsset);

      if (!maxFileSize || file.size < maxFileSize * 1024 * 1024) {
        blockBlobClient
          .uploadData(file, {
            onProgress: (ev) => {
              setStatus((prev) => ({
                ...prev,
                progress: (ev.loadedBytes / file.size) * 100,
              }));
            },
            blobHTTPHeaders: {
              blobContentType: file.type,
            },
          })
          .then(() => {
            setFiles((prev) => {
              const newFiles = prev.files.filter(
                (item) => item.name !== file.name,
              );
              return {
                ...prev,
                files: newFiles,
                uploaded: [...prev.uploaded, { name: fileName, blobAsset }],
              };
            });
          })
          .catch((error) => {
            console.error(error);
            setFiles((prev) => {
              const newFiles = prev.files.filter(
                (item) => item.name !== file.name,
              );
              return {
                ...prev,
                files: newFiles,
                failed: [
                  ...prev.failed,
                  {
                    name: file.name,
                    blobAsset,
                    error: errorCodes[error.code] || defaultError,
                  },
                ],
              };
            });
          });
      } else {
        setFiles((prev) => {
          const newFiles = prev.files.filter((item) => item.name !== file.name);
          return {
            ...prev,
            files: newFiles,
            failed: [
              ...prev.failed,
              {
                name: file.name,
                blobAsset,
                error: maxFileSizeErrorText,
              },
            ],
          };
        });
      }
    };

    useEffect(() => {
      const current = files.files.shift();
      if (current) {
        setStatus({ current, progress: 0 });
        upload(current);
      } else {
        B.triggerEvent('onUploadDone');
        setStatus({ current: null, progress: 0 });
      }
    }, [files]);

    useEffect(() => {
      if (isDev) {
        setHelper(helperText);
        setIsDisabled(disabled || !sasUrlText);
      }
    }, [isDev, helperText, disabled, sasUrl]);

    const handleChange = (event) => {
      event.persist();
      B.triggerEvent('onStartUpload');
      setFiles((prev) => ({
        ...prev,
        files: Array.from(event.target.files),
        failed: [],
      }));
    };

    const checkType = (filesArray) => {
      if (acceptedValue !== '*') {
        const typesArray = acceptedValue.split(',').map((item) => item.trim());
        const notOfTypes = filesArray
          .filter((file) => !typesArray.includes(file.type))
          .map((file) => ({ name: file.name, error: incorrectTypeErrorText }));
        const correctTypes = filesArray.filter((file) =>
          typesArray.includes(file.type),
        );
        return { notOfTypes, correctTypes };
      }
      return { notOfTypes: [], correctTypes: filesArray };
    };

    const DropzoneComp = () => {
      const [hover, setHover] = useState(false);
      const handleDrop = (event) => {
        event.persist();
        event.preventDefault();
        event.stopPropagation();
        const filesArray = Array.from(event.dataTransfer.files);
        const { notOfTypes, correctTypes } = checkType(filesArray);
        if (status.current === null && !isDisabled) {
          B.triggerEvent('onStartUpload');
          if (notOfTypes.length > 0) {
            B.triggerEvent('onTypeError');
          }
          setFiles((prev) => ({
            ...prev,
            files: correctTypes,
            failed: notOfTypes,
          }));
          setHover(false);
        }
      };

      const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (status.current === null && !isDisabled) setHover(true);
      };

      const handleDragLeave = () => setHover(false);

      const handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (status.current === null && !isDisabled) {
          if (fileInput.current) fileInput.current.click();
        }
      };

      return (
        <>
          <div
            className={[
              classes.dropzoneContainer,
              hover && classes.dropzoneHover,
              isDisabled && classes.disabled,
            ].join(' ')}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleClick}
            aria-hidden="true"
          >
            <div className={classes.dropFilesText}>
              {status.current ? 'Uploading files' : dropText}
            </div>
            <div>
              <UploadedComp />
              <CurrentFileComp status={status} />
              <UploadQueueComp />
              <ErrorFileComp />
            </div>
          </div>
          <input
            className={classes.hidden}
            ref={fileInput}
            type="file"
            required={required}
            onChange={handleChange}
            accept={acceptedValue}
            multiple
          />
        </>
      );
    };

    const FileElementComp = ({
      fileName,
      blobAsset,
      done,
      error,
      progress,
      queue,
      deleteButton,
    }) => {
      const showUpload = progress || queue;

      const handleDelete = (event) => {
        event.preventDefault();
        event.stopPropagation();
        deleteBlob(blobAsset);
      };
      return (
        <div className={classes.fileElement}>
          {done && <CloudDone classes={{ root: classes.success }} />}
          {showUpload && <Icon name="CloudUpload" />}
          {error && <Icon name="Error" classes={{ root: classes.danger }} />}
          <div className={classes.fileElementBody}>
            <div className={[error && classes.danger].join(' ')}>
              {fileName}
              {error && ` - ${error}`}
            </div>
            {progress && (
              <LinearProgress variant="determinate" value={progress} />
            )}
          </div>
          {deleteButton && (
            <IconButton size="small" onClick={handleDelete}>
              <Icon
                name="DeleteForever"
                size="small"
                classes={{ root: classes.danger }}
              />
            </IconButton>
          )}
        </div>
      );
    };

    const UploadQueueComp = () => (
      <div>
        {files.files.map((file) => (
          <FileElementComp key={file.name} fileName={file.name} queue />
        ))}
      </div>
    );

    const UploadedComp = () => (
      <div>
        {files.uploaded.map((file) => (
          <FileElementComp
            key={file.name}
            fileName={file.name}
            blobAsset={file.blobAsset}
            done
            deleteButton={!status.current}
          />
        ))}
        <input
          className={classes.hidden}
          name={name}
          value={JSON.stringify(files.uploaded)}
          disabled={isDisabled}
        />
      </div>
    );

    const CurrentFileComp = () => (
      <div>
        {status.current && (
          <FileElementComp
            key={status.current.name}
            fileName={status.current.name}
            progress={status.progress}
          />
        )}
      </div>
    );

    const ErrorFileComp = () => (
      <div>
        {files.failed.map((file) => (
          <FileElementComp
            key={file.name}
            fileName={file.name}
            error={file.error}
          />
        ))}
      </div>
    );

    return (
      <div className={classes.root}>
        {labelText && !hideLabel && (
          <FormLabel classes={{ root: classes.formLabel }} component="legend">
            {labelText}
          </FormLabel>
        )}
        <DropzoneComp />
        {helper && (
          <FormHelperText classes={{ root: classes.helper }}>
            {helper}
          </FormHelperText>
        )}
      </div>
    );
  })(),
  styles: (B) => (theme) => {
    const { Styling, env, mediaMinWidth } = B;
    const isDev = env === 'dev';
    const style = new Styling(theme);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    return {
      root: {
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
      },
      dropzoneContainer: {
        borderWidth: ({ options: { borderWidth, borderStyle, borderColor } }) =>
          borderWidth && borderStyle && borderColor ? borderWidth : 0,
        borderStyle: ({ options: { borderStyle } }) => borderStyle,
        borderColor: ({ options: { borderColor } }) =>
          style.getColor(borderColor),
        borderRadius: ({ options: { borderRadius } }) => borderRadius,
        minHeight: ({ options: { dropzoneHeight } }) => dropzoneHeight,
        padding: '20px',
        ...(!isDev && { cursor: 'pointer' }),
      },
      dropzoneHover: {
        borderColor: ({ options: { dragAndDropColor } }) =>
          style.getColor(dragAndDropColor),
      },
      disabled: {
        backgroundColor: '#eee',
        cursor: !isDev && 'not-allowed',
      },
      hidden: {
        display: 'none',
      },
      fileElement: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '26px',
        marginBottom: '10px',
        boxSizing: 'border-box',
        '&:hover': {},
      },
      fileElementBody: {
        width: '100%',
        paddingLeft: '20px',
        paddingRight: '20px',
      },
      dropFilesText: {
        marginBottom: '20px',
      },
      danger: {
        color: ({ options: { errorColor } }) => style.getColor(errorColor),
      },
      success: {
        color: ({ options: { successColor } }) => style.getColor(successColor),
      },
      formLabel: {
        marginBottom: '5px',
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
        '&.Mui-disabled': {
          pointerEvents: 'none',
          opacity: '0.7',
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
    };
  },
}))();
