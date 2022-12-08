import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import YouTube from 'react-youtube';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';

const Player = () => {
    const { store } = useContext(GlobalStoreContext);

    let list = '';
    let id = '';
    let songNumber = -1;
    let title = '';
    let artist = '';
    let songs = [];
    let videoId = '';
    let ids = [];
    let opts = {
      height: "324",
      width: "608",
      playerVars: {
        autoplay: 1,
        controls: 0,
      },
    };
    let player;

    if (store.playerList) {
        if (store.playerList._id != id) {
          songNumber = 0;
        list = store.playerList;
        songs = list.songs;
        console.log(songs);
        if (songs.length > 0) {
          title = songs[songNumber].title;
          artist = songs[songNumber].artist;
        }

        for (let i = 0; i < songs.length; i++) {
          ids[i] = songs[i].youTubeId
        }
        videoId = ids[songNumber];
        } 
    }

    function handleVideoEnd(event) {
      console.log(songNumber);
      console.log(songs.length);
      if (songNumber < songs.length) {
        songNumber++;
        if (songs.length > 0) {
          title = songs[songNumber].title;
          artist = songs[songNumber].artist;
          videoId = ids[songNumber]
        }
        document.getElementById('player-song-number').innerHTML = songNumber+1;
        document.getElementById('player-song-title').innerHTML = title;
        document.getElementById('player-song-artist').innerHTML = artist;
        event.target.loadVideoById(videoId);
      }
    }
    function handlePlay() {
      store.player.playVideo();
    }
    function handlePause() {
      store.player.pauseVideo();
    }
    function handleSkip() {
      store.player.seekTo(999999);
    }
    function handleBack(event) {
      console.log(event.target);
      if (songNumber <= 0) {
        store.player.seekTo(0);
      } else {
        songNumber--;
        if (songs.length > 0) {
          title = songs[songNumber].title;
          artist = songs[songNumber].artist;
          videoId = ids[songNumber]
        }
        document.getElementById('player-song-number').innerHTML = songNumber+1;
        document.getElementById('player-song-title').innerHTML = title;
        document.getElementById('player-song-artist').innerHTML = artist;
        store.player.loadVideoById(videoId);
      }
    }

    return (
      <div
        style={{
          float: "right",
          width: "40%",
          height: "100%",
          backgroundColor: "#404040",
        }}
      >
        <div style={{backgroundColor: '#252525', color: 'whitesmoke', display: 'flex', }}>
            <div style={{cursor:'pointer',backgroundColor: '#404040', padding: '0px 8px 0px 12px', fontSize: 24, borderTop: '0px solid red', borderLeft: '0px solid red', borderRight: '0px solid red', borderRadius: '8px 8px 0px 0px'}}>Player</div>
            <div style={{cursor:'pointer',backgroundColor: '#404040', padding: '0px 8px 0px 8px', fontSize: 24, borderTop: '0px solid red', borderLeft: '0px solid red', borderRight: '0px solid red', borderRadius: '8px 8px 0px 0px'}}>Comments</div>
        </div>
        <YouTube
          id='youtube-player'
          videoId={videoId}
          opts={opts}
          onReady={_onReady}
          style={{paddingLeft: 5}}
          onEnd = {handleVideoEnd}
        />
        <div
          style={{
            padding: "5px 0px 5px 20px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "whitesmoke",
          }}
        >
          <div style={{height: 10}} />
          <div>Playlist: {list.name}<br /></div>
          <div style={{height: 10,}} />
          <div style={{display: 'flex'}}>Song #: <div id='player-song-number' style={{paddingLeft: 5}}>{songNumber+1}</div><br /> </div>
          <div style={{height: 10}} />
          <div style={{display: 'flex'}}>Title: <div id='player-song-title' style={{paddingLeft: 5}}>{title}</div><br /> </div>
          <div style={{height: 10}} />
          <div style={{display: 'flex'}}>Artist: <div id='player-song-artist' style={{paddingLeft: 5}}>{artist}</div><br /> </div>
        </div>
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <div
            style={{
              borderRadius: "10px",
              backgroundColor: "#303030",
              fontSize: "36px",
              display: "flex",
              color: "whitesmoke",
              justifyContent: "center",
              width: "50%",
            }}
          >
            <SkipPreviousRoundedIcon fontSize="inherit" style={{cursor: 'pointer'}} onClick={handleBack}/>
            <PauseRoundedIcon fontSize="inherit" style={{cursor: 'pointer'}} onClick={handlePause} />
            <PlayArrowRoundedIcon fontSize="inherit" style={{cursor: 'pointer'}} onClick={handlePlay} />
            <SkipNextRoundedIcon fontSize="inherit" style={{cursor: 'pointer'}} onClick={handleSkip}/>
          </div>
        </div>
        <div style={{height: 25}} />
      </div>
    );

    function _onReady(event) {
      // access to player in all event handlers via event.target
      event.target.playVideo();
      console.log(store.player);
      if (store.currentModal !== "DELETE_LIST") {
        store.setPlayer(event.target);
      }
    }
};

export default Player;