const roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    const targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax
        });
        
        targets.sort((a,b) => a.hits - b.hits);
        
        if(targets.length > 0) {
            if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
                creep.say('🚧');
            }
        } else {
            const closestDroppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                if (creep.store.getFreeCapacity() !== 0) {
                    if (closestDroppedEnergy) {
                        if (creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(closestDroppedEnergy, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    } 
                
                } else {
                    const targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                    });

                    if (targets.length > 0) {
                        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                            creep.say('🚚');
                        }
                    } else {
                        // creep.say('⌛');
                        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                            creep.say('⏫');
                        }
                    }        
                }      
            
        }

    }
};

module.exports = roleBuilder;

