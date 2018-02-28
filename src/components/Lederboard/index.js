import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import './LeaderBoard.css';

class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topPlayersArray: [],
    };
  }
  componentDidMount = () => {
    fetch('/getTop5Users', {
      method: 'GET',
    })
      .then(res => res.json())
      .then((array) => {
        console.log(array);
        this.setState({
          topPlayersArray: array,
        });
      });
  }

  handlePlayAgain = () => {
    this.props.dispatchGoToLogin();
  }

  render() {
    const { score } = this.props.scoreDetails;
    const { numQuestions } = this.props.scoreDetails;
    console.log(score, numQuestions);
    const topPlayers = this.state.topPlayersArray;
    console.log(topPlayers);
    const topPlayerDivs = topPlayers.map((player, idx) => (
      <div className="playerBar">
        <h3>{`${idx + 1}. ${player.userName}`}</h3>
        <h3>{player.score}</h3>
      </div>
    ));
    return (
      <div className="leaderboard">
        <div className="score">
          <h3 style={{ color: 'orange', fontSize: '25px' }}>Your score</h3>
          <div className="scoreDigits">
            <p style={{ color: 'black', fontSize: '45px' }}>{score}</p>
            <p style={{ color: 'black', fontSize: '25px', fontStyle: 'bold' }} >{`/${numQuestions}`}</p>
          </div>
        </div>
        <div className="listing">
          <div className="leaderboardHeader">
            <h2>Leaderboard</h2>
          </div>
          {topPlayerDivs}
        </div>
        <div className="playButtonArea">
          <button className="playAgainButton" onClick={this.handlePlayAgain}>
            <h2>playAgain</h2>
          </button>
        </div>

      </div>
    );
  }
}

function mapDispatchToprops(dispatch) {
  return {
    dispatchGoToLogin: () => dispatch(actions.goToLogin()),
  };
}

function mapStateToProps(state) {
  return {
    scoreDetails: state.updater.scoreDetails,
  };
}

export default connect(mapStateToProps, mapDispatchToprops)(LeaderBoard);
