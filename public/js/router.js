"use strict";
var $ = require('jquery');
var Backbone = require('backbone');

var HeaderView = require('./views/headerView');
module.exports = Backbone.Router.extend({
  routes: {
    "": "home",
    "signin": "signin"
  },
  initailize: function(){
    var headerView = new HeaderView().render();
  },

  home: function(){
    console.log('homepage');

  }

});
