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

Router.onAfterAction( function(){
  $('body').addClass('index');
  $('body').attr('id', 'page-top');
});