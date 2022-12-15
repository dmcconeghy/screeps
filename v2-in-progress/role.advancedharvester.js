var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        /** Controls the behavior of a harvester by state: harvesting, traveling or transfering.
         * 
         * Where is demand?
         * Where is the closest source?
         * 
         * Is it traveling, harvesting or transfering?
         * 
         */

        /**
         * 
         * Don't forget to modify main.js to spawn harvesters with the correct memory.
         * 
         *  Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {
                role: 'harvester', 
                harvesting: false,
                transfering: false,
                traveling: true,
                destination: Game.spawns['Spawn1'].pos.findClosestByPath(FIND_SOURCES_ACTIVE)
            });
         * 
         * 
         */



        // Where can the harvester transfer its supply?
        // Locate Spawn, Extensions, or Towers with free capacity.
        const energyConsumers = creep.room.find(
            FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_EXTENSION || 
                            structure.structureType == STRUCTURE_SPAWN || 
                            structure.structureType == STRUCTURE_TOWER
                            && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;                            
                }
            }
        );
        
        // Where is the closest energy source?
        const closestEnergySource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        
        // If traveling, keep traveling to destination in memory.
        // If we arrived, change our state to harvesting or transfering.
        if (creep.memory.traveling === true && creep.memory.destination !== undefined) {
            console.log(`${creep.name} is traveling to ${creep.memory.destination}`);
            if (creep.harvest(creep.memory.destination) == ERR_NOT_IN_RANGE && creep.transfer(creep.memory.destination, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.memory.destination, {visualizePathStyle: {stroke: '#ffaa00'}});
            } else {
                // If creep is at destination, stop traveling.
                creep.memory.traveling = false;

                // Empty? Time to harvest. Full? Time to transfer.
                creep.store.getFreeCapacity() === 0 ? creep.memory.transfering = true : creep.memory.harvesting = true;
            } 
        }

        // Harvesting but not full? Keep harvesting. 
        // If full, receive a new target to transfer energy to.
        if (creep.memory.harvesting === true){

            creep.harvest(creep.memory.destination);

            // Is the creep full?
            if (creep.store.getFreeCapacity() === 0) {
                // Stop harvesting.
                creep.memory.harvesting = false;

                // Clear the creep's memory of the energy supply.
                creep.memory.destination = undefined;

                // Get new demand target to transfer to, selecting the first with energy demands.
                // TODO: additional logic to select the most efficient target.
                for (const consumer of energyConsumers) {
                    if (consumer.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                        if(creep.transfer(consumer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.memory.traveling = true;
                            creep.moveTo(consumer);

                            // Set the creep's destination to the consumer with demand.
                            // Exit the loop once we have a target.
                            creep.memory.destination = consumer;
                            break;
                        }
                    }
                }
            }
        }

        // Transfering but not empty? Keep transfering. 
        // TODO: if the demand is fulfilled but the harvester is not empty, get a new target.
        // If empty, receive a new supply source to harvest from.
        if (creep.memory.transfering === true){

            // Is the creep empty?
            if(creep.store[RESOURCE_ENERGY] === 0){

                //Stop transfering.           
                creep.memory.transfering = false;

                // Get new supply target for harvesting
                if(creep.memory.supply === undefined){

                    // Set the creep's destination to the closest source.
                    creep.memory.destination = closestEnergySource;

                    // Set the creep's memory to traveling.
                    creep.memory.traveling = true;
                } 
            }           
        }
 
    }
    
};

module.exports = roleHarvester;