const helpers = require('helpers')


const rolesSpawn = {

    spawn: Game.spawns['Spawn1'],

    spawnDrone: function(role) {
        this.spawn.spawnCreep([WORK, CARRY, MOVE], 'drone' + Game.time, {memory: {role: 'drone-' + role, working: false}});
    },

    // TODO: Add logic to spawn harvesters of different sizes according to how much energy is available.

    // 350 energy harvester
    spawnSmallHarvester: function() {
        this.spawn.spawnCreep(
            [WORK, WORK, WORK, MOVE], 
            's_harvester' + Game.time, 
            {memory: 
                {role: 'small-harvester', working: false}
            }, 
            {energyStructures: 
                [helpers.getEnergyStructures()]
            }
        );
        // Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'drone' + Game.time, {memory: {role: 'small-harvester', working: false}});
        
    },

    // // 400 energy harvester
    // spawnMediumHarvester: function() {
    //     this.spawn.spawnCreep([WORK, WORK, WORK, MOVE, MOVE], 'harvester' + Game.time, {memory: {role: 'medium-harvester', working: false}});
    //     /**
    //      * Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, MOVE], 'harvester' + Game.time, {memory: {role: 'medium-harvester', working: false}}, {energyStructures: [Game.spawns['Spawn1'], Game.getObjectById('636159f2d4b18a7df43b4664'), Game.getObjectById('636168ba5bcf9d2d39068b7a')]});
    //      * */ 
    // },

    // TODO: Add logic to spawn sweepers of different sizes according to how much energy is available.

    // 400 energy small sweeper
    spawnSmallSweeper: function() {
        this.spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'small-sweeper' + Game.time, {memory: {role: 'small-sweeper', working: false}});
        // Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'sweeper' + Game.time, {memory: {role: 'sweeper', working: false}});
    },

    // TODO: Add logic to spawn builders of different sizes according to how much energy is available.

    // 500 energy small builder
    spawnSmallBuilder: function(){
        this.spawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'small-builder' + Game.time, {memory: {role: 'small-builder', working: false}});
        // Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], 'builder' + Game.time, {memory: {role: 'small-builder', working: false}});
    }, 

    // 600 energy small upgrader
    spawnSmallUpgrader: function() {
        this.spawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'small-upgrader' + Game.time, {memory: {role: 'small-upgrader', working: false}});
        // Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'upgrader' + Game.time, {memory: {role: 'small-upgrader', working: false}});
    },

    // 400 energy small-supplier 
    spawnSmallSupplier: function() {
        this.spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'small-supplier' + Game.time, {memory: {role: 'small-supplier', working: false}});
        // Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'supplier' + Game.time, {memory: {role: 'small-supplier', working: false}});
    },

    // Remote Builder. Extra energy cost devoted to move.
    spawnRemoteBuilder: function() {
        this.spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], 'remote-builder' + Game.time, {memory: {role: 'remote-builder', working: false}});
        // Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], 'remote-builder' + Game.time, {memory: {role: 'remote-builder', working: false}}); 
    }, 

    // Attack Drone. Extra energy cost devoted to move and attack
    spawnAttackDrone: function() {
        this.spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK], 'attacker' + Game.time, {memory: {role: 'attacker', working: false}});
        // Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK], 'attacker' + Game.time, {memory: {role: 'attacker', working: false}});
    }
}
    
module.exports = rolesSpawn;