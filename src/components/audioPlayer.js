(() => ({
  name: 'AudioPlayer',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { useText } = B;
    const { audioSrc, labelPlay, labelPause, labelReplay } = options;

    const audioSource = useText(audioSrc);
    const buttonLabelPlay = useText(labelPlay);
    const buttonLabelPause = useText(labelPause);
    const buttonLabelReplay = useText(labelReplay);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [buttonLabel, setButtonLabel] = useState(buttonLabelPlay);
    const audioRef = useRef(null);
    const progressRef = useRef(null);

    useEffect(() => {
      B.defineFunction('Toggle play/pause', () => togglePlayPause());

      const audio = audioRef.current;

      // Set the duration once the metadata is loaded
      const setAudioData = () => {
        setDuration(audio.duration);
        setCurrentTime(audio.currentTime);
      };

      // Update the current time while playing
      const updateCurrentTime = () => {
        setCurrentTime(audio.currentTime);
        const progress = (audio.currentTime / audio.duration) * 100;
        progressRef.current.value = progress;
      };

      // Handle when the audio ends
      const handleAudioEnd = () => {
        setIsPlaying(false); // Reset the play button state
        setButtonLabel(buttonLabelReplay);
      };

      audio.addEventListener('loadedmetadata', setAudioData);
      audio.addEventListener('timeupdate', updateCurrentTime);
      audio.addEventListener('ended', handleAudioEnd);

      return () => {
        audio.removeEventListener('loadedmetadata', setAudioData);
        audio.removeEventListener('timeupdate', updateCurrentTime);
        audio.removeEventListener('ended', handleAudioEnd);
      };
    }, []);

    const togglePlayPause = () => {
      const audio = audioRef.current;
      if (isPlaying) {
        audio.pause();
        setButtonLabel(buttonLabelPlay);
      } else {
        audio.play();
        setButtonLabel(buttonLabelPause);
      }
      setIsPlaying(!isPlaying);
    };

    const handleSeek = (event) => {
      const audio = audioRef.current;
      const seekTo = (event.target.value / 100) * audio.duration;
      audio.currentTime = seekTo;
    };

    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    return (
      <div className={classes.audioPlayer}>
        <audio ref={audioRef} src={audioSource} preload="metadata" />
        <div className={classes.controls}>
          <button className={classes.playButton} onClick={togglePlayPause}>
            {buttonLabel}
          </button>
          <div className={classes.time}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          <input
            ref={progressRef}
            type="range"
            min="0"
            max="100"
            defaultValue="0"
            onChange={handleSeek}
            className={classes.rangeSlider}
          />
        </div>
      </div>
    );
  })(),
  styles: (B) => (theme) => {
    const { Styling } = B;
    const style = new Styling(theme);
    return {
      audioPlayer: {
        width: ({ options: { width } }) => width || '100%',
        maxWidth: '400px',
        margin: '20px auto',
        backgroundColor: '#f7f7f7',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      },
      controls: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      playButton: {
        backgroundColor: ({ options: { buttonColor } }) =>
          style.getColor(buttonColor),
        color: ({ options: { buttonTextColor } }) =>
          style.getColor(buttonTextColor),
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '10px',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          filter: 'brightness(90%)',
        },
      },
      time: {
        fontFamily: "'Courier New', Courier, monospace",
        marginBottom: '10px',
        fontSize: '14px',
        color: '#333',
      },

      rangeSlider: {
        '-webkit-appearance': 'none',
        width: '100%',
        height: '5px',
        backgroundColor: '#ddd',
        outline: 'none',
        borderRadius: '5px',
        overflow: 'hidden',
        marginTop: '10px',
        transition:
          'background-color 0.3s ease' /* Smooth background color change */,
        '&:hover': {
          backgroundColor: '#ccc' /* Lighter background on hover */,
        },
        '&::-webkit-slider-thumb': {
          '-webkit-appearance': 'none',
          appearance: 'none',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#007bff',
          cursor: 'pointer',
          transition:
            'transform 0.2s ease, background-color 0.3s ease' /* Smooth thumb transition */,
          '&:hover': {
            transform:
              'scale(1.2)' /* Enlarge the thumb on hover for feedback */,
            backgroundColor: '#0056b3' /* Change thumb color on hover */,
          },
        },
        '&::-moz-range-thumb': {
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#007bff',
          cursor: 'pointer',
          transition:
            'transform 0.2s ease, background-color 0.3s ease' /* Smooth thumb transition */,
          '&:hover': {
            transform:
              'scale(1.2)' /* Enlarge the thumb on hover for feedback */,
            backgroundColor: '#0056b3' /* Change thumb color on hover */,
          },
        },
      },
    };
  },
}))();
