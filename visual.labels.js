const helpers = require('helpers')

const visualLabels = {

    run: function() {
        new RoomVisual('E52S24').text('Room E52S24', 5, 5, {color: 'white', font: 1});
        new RoomVisual('E52S24').text('Creeps: ' + helpers.getTotalNumberOfCreeps(), 5, 6, {color: 'white', font: 1});
    } 
}

module.exports = visualLabels;