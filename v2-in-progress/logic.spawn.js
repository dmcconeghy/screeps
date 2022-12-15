const logicSpawner = {
    run: function(spawn) {
        // These are the minimums for a room to function.
        //  Begin with workers. 
        
        let minimumNumberOfWorkers = 3;
        let minimumNumberOfHarvesters = 2;
        let minimumNumberOfUpgraders = 3;
        let minimumNumberOfBuilders = 2;
        let minimumNumberOfHaulers = 0;
        let minimumNumberOfRepairers = 2;

        let largeHarvesterCount = 0;
        let largeHaulerCount = 0;
        
        let workerCount = 0;
        let harvesterCount = 0;
        let upgraderCount = 0;
        let builderCount = 0;
        let haulerCount = 0;
        let repairerCount = 0;
            
        for (let c in Game.creeps) {
            if (Game.creeps[c].memory.role === 'harvester'){
                harvesterCount++;
            } else if (Game.creeps[c].memory.role === 'upgrader'){
                upgraderCount++;
            } else if (Game.creeps[c].memory.role === 'builder'){
                builderCount++
            } else if (Game.creeps[c].memory.role === 'hauler'){
                haulerCount++
            } else if (Game.creeps[c].memory.role === 'repairer'){
                repairerCount++
            } else if (Game.creeps[c].memory.role === 'largeHarvester'){
                largeHarvesterCount++;
            } else if (Game.creeps[c].memory.role === 'largeHauler'){
                largeHaulerCount++;
            } else if (Game.creeps[c].memory.role === 'worker'){
                workerCount++;
            }
            
        }

        // console.log('Harvesters: ' + harvesterCount + 
        //             ' Upgraders: ' + upgraderCount + 
        //             ' Builders: ' + builderCount + 
        //             ' Haulers: ' + haulerCount + 
        //             ' Repairers: ' + repairerCount +
        //             ' Workers: ' + workerCount);
        
        // Workers > Harvesters > Upgraders > Haulers > Builders > Repairers    
        if (workerCount < minimumNumberOfWorkers) {
            spawn.createCreep([WORK, CARRY, MOVE], ('worker' + Game.time), {memory: {role: 'worker', mode: 'spawned', target: null}});
        } else if (harvesterCount < minimumNumberOfHarvesters) {
            spawn.createCreep([WORK,WORK,MOVE,MOVE], undefined, {role: 'harvester', mode: 'harvesting'});
        } else if (upgraderCount < minimumNumberOfUpgraders) { 
            spawn.createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});   
        } else if (haulerCount < minimumNumberOfBuilders){
            spawn.createCreep([CARRY,CARRY,MOVE,MOVE], undefined, {role: 'hauler'});
        } else if (builderCount < minimumNumberOfHaulers){
            spawn.createCreep([WORK,CARRY,CARRY,MOVE], undefined, {role: 'builder'});       
        } else if (repairerCount < minimumNumberOfRepairers){
            spawn.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'repairer'});
        } else {
            console.log("No more basic creeps to spawn");
        } 
        

        // Spawn a larger creep if the energy is available
        if (harvesterCount >= minimumNumberOfHarvesters && largeHarvesterCount < 2 && Game.spawns['Spawn1'].store[RESOURCE_ENERGY] >= 300) {
            spawn.createCreep([WORK,WORK,WORK,WORK,MOVE], undefined, {role: 'harvester', size: 'large'});
        } else if (largeHarvesterCount >= 2 && largeHaulerCount < 2 && Game.spawns['Spawn1'].store[RESOURCE_ENERGY] >= 300) {
            spawn.createCreep([MOVE,MOVE,MOVE,CARRY,CARRY,CARRY], undefined, {role: 'hauler', size: 'large'});
        }

        // Larger upgrader option
        // else if (upgraderCount >= 3 && upgraderCount < 4){
        //     Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE,WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        // } 

        // Larger builder option
        // else if (builderCount >= 2 && builderCount < 4){
        //     Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE,WORK,CARRY,MOVE], undefined, {role: 'builder'});
        // }

       
    }
}

module.exports = logicSpawner;