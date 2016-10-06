'use strict';

var scores=[
  {key:1, name: 'BOB', score: '1000'},
  {key:2, name: 'KING', score: '2000'},
  {key:3, name: 'XIAO', score: '1500'}
];

var scoreItem= React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.string.isRequired
  },

  render: function() {
    return (
      React.createElement('li', {className: 'score'},
        React.createElement('h2', {className: 'score-user'}, this.props.name),
        React.createElement('h2', {className: 'score-value'}, this.props.score)
        )
      )
    },
});

var scoreItemElements= scores
  .map(function(score){
    return React.createElement(scoreItem, score)
});

var rootElement=
  React.createElement('div', {},
    React.createElement('h1', {}, 'HighScores'),
    React.createElement('ul', {}, scoreItemElements)
  );

ReactDOM.render(rootElement, document.getElementById('react-app'));