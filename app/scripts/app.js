'use strict';

var scores=[
  {key:1, name: 'BOB', score: '1000'},
  {key:2, name: 'KING', score: '2000'},
  {key:3, name: 'XIAO', score: '1500'}
];

var listScores= scores
  .map(function(score){
    return React.createElement('li', {key: score.key},
      React.createElement('h2', {}, score.name),
      React.createElement('h2', {}, score.score)
  )
});

var rootElement =
  React.createElement('div', {}, 
    React.createElement('h1', {}, 'High Scores'),
    React.createElement('ul', {}, listScores)
    );

ReactDOM.render(rootElement, document.getElementById('react-app'));

