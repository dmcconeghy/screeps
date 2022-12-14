const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleHauler = require('role.hauler');
const roleRepairer = require('role.repairer');
const roleWorker = require('role.worker');
const logicSpawn = require('logic.spawn');



module.exports.loop = function () {
    
    // Clear memory of dead creeps
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }
    
    // Spawning logic 
    logicSpawn.run(Game.spawns['Spawn1']);

    // Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], undefined, {
    //     memory: {role: 'harvester'}
    // });
    
    // Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,MOVE], undefined, {role: 'harvester'});
    
    
    var tower = Game.getObjectById('6359fdf2f4df97610e877799');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    

    for(let name in Game.creeps) {

        let creep = Game.creeps[name];

        if(Game.creeps[name].memory.memory.role == 'worker') {
            roleWorker.run(creep);
        } else if(creep.memory.memory.role == 'harvester') {
            roleHarvester.run(creep);
        } else if(creep.memory.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        } else if(creep.memory.memory.role == 'builder') {
            roleBuilder.run(creep);
        } else if(creep.memory.memory.role == 'hauler') {
            roleHauler.run(creep);
        } else if(creep.memory.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        
    }
}