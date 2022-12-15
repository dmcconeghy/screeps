const roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // Where is the closest energy supply of dropped energy?

        const closestDroppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        
        // If we have free capacity, move to transfer dropped energy.
        // If we have no free capacity, move to transfer energy to the closest demand.

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
                if (creep.transfer(targets[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                    // creep.say('🚚');
                }
            }        
        }        
	}
};

module.exports = roleHauler;