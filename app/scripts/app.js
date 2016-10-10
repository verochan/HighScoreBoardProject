'use strict';

//COMPONENTS

var scoreItem= React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.string.isRequired
  },

  render: function() {
    return (
      React.createElement('li', {className: 'score-view-list-item'},
        React.createElement('h2', {className: 'score-view-list-item-position'}, getPosition(this.props.name, state.scores, 'name')),
        React.createElement('h2', {className: 'score-view-list-item-name'}, this.props.name.toUpperCase()),
        React.createElement('h2', {className: 'score-view-list-item-points'}, this.props.score)
        )
      )
    },
});

var newScore = {name: '', score: ''}

//---------------------  

var NewScoreForm= React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  },

  onNameChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {name: e.target.value}));
  },

  onNewScoreChange: function(e){
    this.props.onChange(Object.assign({}, this.props.value, {score: e.target.value}));
  },

  onSubmit: function(e){
    e.preventDefault();
    this.props.onSubmit();
  },

  render: function() {
    var errors = this.props.value.errors || {};
    return (
      React.createElement('div', {className: 'score-form'},
        React.createElement('form', {onSubmit: this.onSubmit, className: 'highscore-form', noValidate: true}, 
          React.createElement('input', {
            type: 'text',
            maxLength: '4',
            className: errors.name && 'HighScoreForm-error',
            placeholder: 'Name',
            value: this.props.value.name,
            onChange: this.onNameChange,
          }),
          React.createElement('input', {
            type: 'number',
            className: errors.score && 'HighScoreForm-error',
            placeholder: 'Score',
            value: this.props.value.score,
            onChange: this.onNewScoreChange,
          }),
          React.createElement('button', {type: 'submit'}, 'SUBMIT')
          )
        )
      )
  },
});

var ScoreView= React.createClass({
  propTypes: {
    scores: React.PropTypes.array.isRequired,
    newScore: React.PropTypes.object.isRequired,
    onNewScoreFormChange: React.PropTypes.func.isRequired,
    onNewScoreFormSubmit: React.PropTypes.func.isRequired
  },

  render: function(){
    var scoreItemElements= sortByScore(this.props.scores)
      .map(function(score){
        return React.createElement(scoreItem, score)
    });

  return (
    React.createElement('div', {className: 'score-view'},
      React.createElement('h1', {className: 'score-view-title'}, "HIGH SCORES"),
      React.createElement('ul', {className: 'score-view-list'}, scoreItemElements),
      React.createElement(NewScoreForm, {
        value: this.props.newScore,
        onChange: this.props.onNewScoreFormChange,
        onSubmit: this.props.onNewScoreFormSubmit,
        })
      )
    );
  },
});  

var HIGHSCORE_TEMPLATE = {name: '', score: '', errors: null};

//ACTIONS

function sortByScore(scoresToOrder) {
  scoresToOrder.sort(function(a, b){ 
    return b.score-a.score
  })
  return scoresToOrder;
}

function getPosition(value, arr, prop) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return i+1;
        }
    }
    return -1; //to handle the case where the value doesn't exist
}

function updateNewScore(score){
  setState({ newScore: score});
}  

function submitNewScore() {
  var score = Object.assign({}, state.newScore, {key: state.scores.length + 1, errors: {}});
  
  if (!score.name) {
    score.errors.name = ['Please enter your name'];
    alert(score.errors.name);
  }

  if (!score.score) {
    score.errors.score = ['Please enter your score'];
    alert(score.errors.score);
  }

  if(score.score<0 || score.score>9999) {
    score.errors.score= ['Please enter a valid score (0-9999)'];
    alert(score.errors.score);
  }

  console.log('state:'+JSON.stringify(state.scores,null,3));
  var scoresOrdered= sortByScore(state.scores.slice(0).concat(score));
  console.log('ordered:'+JSON.stringify(scoresOrdered,null,3));

  setState(
    Object.keys(score.errors).length === 0
    ? {
        newScore: Object.assign({}, HIGHSCORE_TEMPLATE),
        scores: scoresOrdered,
      }
    : { newScore: score }
  );
}

//MODEL

var state={};

function setState(changes){
  Object.assign(state, changes);
  ReactDOM.render(
    React.createElement(ScoreView, Object.assign({}, state, {
      onNewScoreFormChange: updateNewScore,
      onNewScoreFormSubmit: submitNewScore,
    })),
    document.getElementById('react-app')
  );
}

setState({
  scores:[
    {key:1, name: 'BOB', score: '1000'},
    {key:2, name: 'KING', score: '2000'},
    {key:3, name: 'XIAO', score: '7500'},
    {key:4, name: 'ASUK', score: '7000'},
    {key:5, name: 'DEVI', score: '8200'},
    {key:6, name: 'HEIH', score: '5320'},
    {key:7, name: 'LEI', score: '6890'},
    {key:8, name: 'KUMA', score: '6150'},
    {key:9, name: 'JUN', score: '9230'},
    {key:10, name: 'HWOA', score: '6740'}
  ],
  newScore: Object.assign({}, HIGHSCORE_TEMPLATE),
});