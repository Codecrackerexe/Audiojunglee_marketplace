import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, Slider, Typography, Grid } from '@mui/material';
import { PlayArrow, Pause, VolumeUp } from '@mui/icons-material';
import { Howl } from 'howler';

const formatTime = (seconds) => {
  if (isNaN(seconds)) return '0:00';
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const AudioPlayer = ({ audioUrl, title }) => {
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [seek, setSeek] = useState(0);
  const [volume, setVolume] = useState(0.5);
  
  const soundRef = useRef(null);
  const intervalRef = useRef(null);
  useEffect(() => {
    soundRef.current = new Howl({
      src: [audioUrl],
      html5: true,
      volume: volume,
      onload: () => {
        setDuration(soundRef.current.duration());
      },
      onend: () => {
        setPlaying(false);
        setSeek(0);
        clearInterval(intervalRef.current);
      }
    });
    
    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [audioUrl, volume]);
  
  const togglePlay = () => {
    if (!soundRef.current) return;
    
    if (playing) {
      soundRef.current.pause();
      clearInterval(intervalRef.current);
    } else {
      soundRef.current.play();
      
      // Start interval to update seek position
      intervalRef.current = setInterval(() => {
        setSeek(soundRef.current.seek());
      }, 1000);
    }
    
    setPlaying(!playing);
  };
  
  const handleSeekChange = (event, newValue) => {
    if (!soundRef.current) return;
    
    clearInterval(intervalRef.current);
    soundRef.current.seek(newValue);
    setSeek(newValue);
    
    if (playing) {
      intervalRef.current = setInterval(() => {
        setSeek(soundRef.current.seek());
      }, 1000);
    }
  };
  
  const handleVolumeChange = (event, newValue) => {
    if (!soundRef.current) return;
    
    soundRef.current.volume(newValue);
    setVolume(newValue);
  };
  
  return (
    <Box sx={{ width: '100%', p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {title || 'Audio Player'}
      </Typography>
      
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <IconButton onClick={togglePlay} color="primary">
            {playing ? <Pause /> : <PlayArrow />}
          </IconButton>
        </Grid>
        
        <Grid item xs>
          <Slider
            value={seek}
            min={0}
            max={duration}
            onChange={handleSeekChange}
            aria-labelledby="audio-slider"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="text.secondary">
              {formatTime(seek)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatTime(duration)}
            </Typography>
          </Box>
        </Grid>
        
        <Grid item>
          <Box sx={{ display: 'flex', alignItems: 'center', width: 100 }}>
            <VolumeUp color="action" sx={{ mr: 1 }} />
            <Slider
              value={volume}
              min={0}
              max={1}
              step={0.01}
              onChange={handleVolumeChange}
              aria-labelledby="volume-slider"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AudioPlayer;
