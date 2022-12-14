const helpers = require('helpers')
const logicSpawn = require('logic.spawn');
const logicTower = require('logic.tower');
const logicCreeps = require('logic.creeps');
const visualLabels = require('./visual.labels');

module.exports.loop = function () {

    helpers.clearMemoryOfDeadCreeps();

    logicSpawn.run();
    
    logicTower.run();

    logicCreeps.run();

    visualLabels.run();

    if (_.size(Game.rooms['E52S24'].find(FIND_TOMBSTONES) > 0)) {
        console.log('logicMain: There are tombstones in the room.');
        console.log(JSON.stringify(Game.rooms['E52S24'].find(FIND_TOMBSTONES)))
    }
}

