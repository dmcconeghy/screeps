const helpers = require('helpers')
const logicManual = require('logic.manual');
const logicRoles = require('logic.roles');

const logicCreeps = {
    
    run: function() {
        
        // Give all creeps their work orders.
        this.workOrders();
        
        // Manually change creep role labels for testing.
        helpers.showCreepRoles(false);
    },

    workOrders: function() {
        for (let name in Game.creeps) {

            let creepRole = Game.creeps[name].memory.role
            let creep = Game.creeps[name];
            
            if (creepRole === 'drone-harvester') {
                // Game.creeps[name].say('🚚');
                logicRoles.droneHarvester(creep);
                
            } else if (creepRole === 'drone-courier') {
                // Game.creeps[name].say('🚚');
                logicRoles.droneCourier(creep);

            } else if (creepRole === 'drone-builder') {
                // Game.creeps[name].say('🚧 build');
                logicRoles.droneBuilder(Game.creeps[name]);

            } else if (creepRole === 'drone-upgrader' || creepRole === 'small-upgrader') {
                // Game.creeps[name].say('⏫ upgrade');
                logicRoles.droneUpgrader(creep);

            } else if (creepRole === 'small-harvester') {
                // Game.creeps[name].say('🔄 harvest');
                logicRoles.harvester(creep);

            } else if (creepRole === 'small-sweeper' || creepRole === 'sweeper') {
                // Game.creeps[name].say('🧹 sweeper');
                logicRoles.sweeper(creep);

            } else if (creepRole === 'small-builder' || creepRole === 'remote-builder') {
                 Game.creeps[name].say('🚧 build');
                // logicRoles.builder(creep);
                logicRoles.builder(creep);
            } else if (creepRole === 'manual'){
                // Game.creeps[name].say(' claim');
                logicManual.run(creep);
            } else if (creepRole === 'small-supplier') {
                // Game.creeps[name].say(' supply');
                logicRoles.supplier(creep);
            } else if (creepRole === 'attacker') {
                // Game.creeps[name].say(' attack');
                logicRoles.attacker(creep);

            } else {
                console.log('logicCreeps:WorkOrders No role found for creep ' + name);
            }
        }    

    },

    

}

module.exports = logicCreeps;