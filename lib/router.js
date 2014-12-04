Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
  // waitOn: function() { 
  //   return [
  //     Meteor.subscribe('notifications'), 
  //     Meteor.subscribe('appointments'), 
  //     Meteor.subscribe('appointmentSubmissions')
  //   ]
  // }
});

Router.route('/', {
  name: 'index'
});

Router.route('/playground', {
  name: 'playground'
});

Router.route('/playground/simple-cart', {
  name: 'simpleCart'
});

Router.route('/playground/shopping-cart', {
  name: 'playgroundExercise'
});

Router.route('/playground/ajax', {
  name: 'ajaxExercise'
});

Router.route('/playground/phone', {
  name: 'Phone'
});

Router.route('/playground/highcharts-annotation', {
  name: 'highchartsAnnotation'
});

Router.onAfterAction( function(){
  $('body').addClass('index');
  $('body').attr('id', 'page-top');
});