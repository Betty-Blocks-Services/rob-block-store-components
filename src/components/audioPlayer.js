(() => ({
  name: 'AudioPlayer',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { useText } = B;
    const { audioSrc } = options;

    const audioSource = useText(audioSrc);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);
    const progressRef = useRef(null);

    useEffect(() => {
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
        setIsPlaying(false);
        setCurrentTime(0);
        progressRef.current.value = 0;
        B.triggerEvent('OnAudioEnd');
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
      } else {
        audio.play();
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

    B.defineFunction('Play/pause', () => togglePlayPause());

    return (
      <div className={classes.audioPlayer}>
        <audio ref={audioRef} src={audioSource} preload="metadata" />
        <div className={classes.controls}>
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
        width: ({ options: { width } }) => width,
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
          background: ({ options: { progressButtonColor } }) =>
            style.getColor(progressButtonColor),
          cursor: 'pointer',
          transition:
            'transform 0.2s ease, background-color 0.3s ease' /* Smooth thumb transition */,
          '&:hover': {
            transform:
              'scale(1.2)' /* Enlarge the thumb on hover for feedback */,
            filter: 'brightness(90%)' /* Change thumb color on hover */,
          },
        },
        '&::-moz-range-thumb': {
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: ({ options: { progressButtonColor } }) =>
            style.getColor(progressButtonColor),
          cursor: 'pointer',
          transition:
            'transform 0.2s ease, background-color 0.3s ease' /* Smooth thumb transition */,
          '&:hover': {
            transform:
              'scale(1.2)' /* Enlarge the thumb on hover for feedback */,
            filter: 'brightness(90%)' /* Change thumb color on hover */,
          },
        },
      },
    };
  },
}))();
