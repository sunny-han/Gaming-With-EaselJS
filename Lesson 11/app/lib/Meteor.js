'use strict';

var createSubClass = require('./util/create_subclass')
    , collisionService = require('./collisions')
    , Container = createjs.Container;


module.exports = createSubClass(Container, 'Meteor', {
    initialize: Meteor$initialize
});


function Meteor$initialize(x, y) {
    Container.prototype.initialize.apply(this, arguments);
    
    this.name = 'meteor';
    this.x = x;
    this.y = y;

    this.body = new createjs.Bitmap('img/meteor.png');
    this.body.x = -49;
    this.body.y = -48;
    this.addChild(this.body);

    collisionService.addActor(this, 'circle', {radius: 48});
    this.on('collision', onCollision);
}


function onCollision(event) {
    var other = event.data.other;
    if (other.name == 'hero') {
        collisionService.removeActor(this);
        this.parent.removeChild(this);
    }
}
