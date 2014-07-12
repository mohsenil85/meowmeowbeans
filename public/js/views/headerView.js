var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var header = require('./../../templates/header.html');

module.exports = Backbone.View.extend({
  el: '.header',

  render: function(){
    this.$el.html(_.template($(header).html()));
  }

});
