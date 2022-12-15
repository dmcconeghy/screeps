const roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // function harvestClosestSource() {
        //     const closestSource = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
        //     if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
        //         creep.memory.mode = 'traveling';
        //         creep.moveTo(closestSource, {visualizePathStyle: {stroke: '#ffaa00'}});
        //     } else {
        //         creep.memory.mode = 'harvesting';
        //         creep.memory.target = closestSource.pos;
        //     }

        //     if (creep.store.getFreeCapacity() === 0) {
        //         creep.memory.mode = 'building';
        //     }
        // }

    //     function buildClosestConstructionSite() {
    //         const consumers = creep.room.find(FIND_STRUCTURES, {
    //             filter: (structure) => {
    //                 return structure.structureType == STRUCTURE_EXTENSION || 
    //                         structure.structureType == STRUCTURE_SPAWN || 
    //                         structure.structureType == STRUCTURE_TOWER
    //                         && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;                            
    //             }
    //         })
            
    //         const closestConsumer = creep.pos.findClosestByRange(consumers);

    //         if (closestConsumer) {
    //             if (creep.transfer(closestConsumer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    //                 creep.memory.mode = 'traveling';
    //                 creep.moveTo(closestConsumer, {visualizePathStyle: {stroke: '#ffffff'}});
    //             } else {
    //                 creep.memory.mode = 'transferring';
    //                 creep.memory.target = closestConsumer.pos;
    //             }
    //         }

    //         if (creep.store.getFreeCapacity() === creep.store.getCapacity()) {
    //             creep.memory.mode = 'harvesting';
    //         }
    //     }
        
    //     // Do we have a non-zero capacity to CARRY resources?
    //     if (creep.store.getCapacity() > 0) {

    //         // Are we harvesting ? Keep doing that until we're full.
    //         if (creep.memory.mode = 'harvesting' && creep.store.getFreeCapacity() !== 0) {
    //             harvestClosestSource();
    //         } else if (creep.store.getFreeCapacity() === 0) {
    //             // We're full, so transfer to the closest consumer.
    //             transferClosestSource();
    //         }
            
    //         // Are we transfering? Keep doing that until we're empty.
    //         if (creep.memory.mode === 'transfering' && creep.store.getUsedCapacity() !== 0) {
    //             transferClosestSource();
    //         } else if (creep.store.getUsedCapacity() === 0) {
    //             // We're empty, so harvest from the closest source.
    //             harvestClosestSource();

    //         }
            
    //         // Are we traveling? Keep doing that until we're at our target.
    //         if (creep.memory.mode = 'traveling') {

    //             // Have we arrived at our destination?
    //             if (creep.pos === creep.memory.target) {
                    
    //                 if (creep.transfer(closestStructure, RESOURCE_ENERGY) !== ERR_NOT_IN_RANGE) {
    //                     creep.say('🔋 transfer');
    //                     creep.memory.mode = 'transfering';
    //                 } else {
    //                     creep.say('🔄 harvest');
    //                     creep.memory.mode = 'harvesting';
    //                 }
    //             } 

    //             // We're still traveling. Keep going.
    //         } else {          
    //                 creep.moveTo(creep.memory.target, {visualizePathStyle: {stroke: '#ffaa00'}});
    //             }            
    //     } else {
    //         // We have no capacity to CARRY resources. We ONLY harvest.
    //         harvestClosestSource();
    //     }
    // }



    //     const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    //     if(target) {
    //         if(creep.build(target) == ERR_NOT_IN_RANGE) {
    //             creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
    //             creep.say('🚧');
    //         }
        // } else {
        //     const repairTargets = creep.room.find(FIND_STRUCTURES, { 
        //         filter: (structure) => { 
        //             return ((structure.hits < 5000) && (structure.hits > 0))
        //         }
        //     });
        //     if(repairTargets.length) {
        //         if(creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(repairTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        //             creep.say('🚧');
        //         }
        //     } else {
        //         const closestDroppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        //         if (creep.store.getFreeCapacity() !== 0) {
        //             if (closestDroppedEnergy) {
        //                 if (creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE) {
        //                     creep.moveTo(closestDroppedEnergy, {visualizePathStyle: {stroke: '#ffffff'}});
        //                 }
        //             } 
                
        //         } else {
        //             const targets = creep.room.find(FIND_STRUCTURES, {
        //                 filter: (structure) => {
        //                     return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
        //                         structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        //                 }
        //             });

        //             if (targets.length > 0) {
        //                 if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //                     creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        //                     creep.say('🚚');
        //                 }
        //             } else {
        //                 // creep.say('⌛');
        //                 if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        //                     creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        //                     creep.say('⏫');
        //                 }
        //             }        
        //         }      

        //             }
        // }
	    
    }
    
};

module.exports = roleBuilder;

