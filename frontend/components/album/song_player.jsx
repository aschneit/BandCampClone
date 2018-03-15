import React from "react";
import { Route, withRouter } from "react-router-dom";
import { merge } from 'lodash';

class SongPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      slider: 0,
    };
    this.handlePlay = this.handlePlay.bind(this);
    this.slider = this.slider.bind(this);
    this.moveSlider = this.moveSlider.bind(this);
    // this.handleSliderChange = this.handleSliderChange.bind(this);
    this.changeTime = this.changeTime.bind(this);
  }

  moveSlider() {
    this.setState({slider: this.slider()});
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    // debugger
    window.weirdName = this.playerAudio;

  }


  handlePlay(e) {


    if (this.state.playing === false)
      {
        this.playerAudio.play();
        this.setState({playing: true});

      } else {
        this.playerAudio.pause();
        this.setState({playing: false});

      }
  }

  slider () {
    return (this.playerAudio.currentTime / this.playerAudio.duration * 250);
  }

  // handleSliderChange (e) {
  //   const time = this.state.slider / 250 * this.playerAudio.duration;
  //   this.setState({time: time});
  //
  // }

 handleSliderChange (e) {
   // this.setState({slider: e.currentTarget.value});
   console.log('changed');
   console.log(this.playerAudio);
   this.playerAudio.currentTime = 200;
   console.log(this.playerAudio.currentTime);


 }

 changeTime (e) {
   this.playerAudio.currentTime = this.state.slider / 250 * this.playerAudio.duration;
 }


  render() {
    let icon;
    if (this.state.playing === true) {
      icon = pause;
    } else {
      icon = play;
    }
    const leadTrack = this.props.leadTrack[0] || {};
    return (
      <div>
        <div className="native-player">
        {this.props.leadTrack[0] &&
        <audio ref={(audio) => this.playerAudio = audio} src={leadTrack.audio_url}
          onTimeUpdate={() => {console.log(this.playerAudio.currentTime)}}
          ></audio>
        }
        </div>
        <div className="player-total">
          <div className="player-button" onClick={this.handlePlay}>
            <div className="play">
              <img src={icon}/>
            </div>
          </div>
          <div className="player-mid-controls">
            <div className="current-track-title">
              {leadTrack.title}
            </div>

          </div>
          <div className="player-advance">
          </div>
        </div>
      </div>

    );
  }
}





export default withRouter(SongPlayer);
