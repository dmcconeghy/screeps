const roleWorker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        // Have we just spawned? 
        console.log("Role worker is trying to run")

        function transferClosestSource() {
            const consumers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_EXTENSION || 
                            structure.structureType == STRUCTURE_SPAWN || 
                            structure.structureType == STRUCTURE_TOWER
                            && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;                            
                }
            })
            
            const closestConsumer = creep.pos.findClosestByRange(consumers);

            if (closestConsumer) {
                if (creep.transfer(closestConsumer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.memory.memory.mode = 'traveling';
                    creep.moveTo(closestConsumer, {visualizePathStyle: {stroke: '#ffffff'}});
                } else {
                    creep.memory.memory.mode = 'transferring';
                    creep.memory.memory.target = closestConsumer.pos;
                }
            }

            if (creep.store.getFreeCapacity() === creep.store.getCapacity()) {
                creep.memory.memory.mode = 'harvesting';
            }
        }
    
        // if (creep.memory.memory.mode === 'spawned') {

        //     const energySources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);

        //     const closestSource = creep.pos.findClosestByRange(energySources);
        //     if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
        //         creep.memory.memory.mode = 'traveling';
        //         creep.moveTo(closestSource, {visualizePathStyle: {stroke: '#ffaa00'}});
        //     } else {
        //         creep.memory.memory.mode = 'harvesting';
        //         creep.memory.memory.target = closestSource;
        //     }
        // } else if (creep.memory.memory.mode === 'harvesting') {
        //     // Are we harvesting ? Keep doing that until we're full.
        //     if (creep.store.getFreeCapacity() === creep.store.getCapacity()) {
        //         harvestClosestSource();
        //     } else if (creep.store.getFreeCapacity() === 0) {
        //         // We're full, so transfer to the closest consumer.
        //         transferClosestSource();
        //     }
        // } 

        // if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
        //     creep.memory.mode = 'traveling';
        //     creep.memory.target = closestSource;
            
        //     console.log(`I tried to move to ${JSON.stringify(closestSource)}.`);
        // } 
        
        // else {
        //     creep.memory.mode = 'harvesting';
        //     creep.memory.target = closestSource.pos;
        //     console.log(`I tried to harvest ${JSON.stringify(closestSource)}.`);
        // }



        // function harvestClosestSource() {
            
            

        //     if (creep.store.getFreeCapacity() === 0) {
        //         creep.memory.mode = 'transfering';
        //         transferClosestSource();
        //     }
        // }

        

        // if (creep.memory.mode === 'harvesting'){
        //     harvestClosestSource()
        // } else if (creep.memory.mode === 'transfering'){
        //     transferClosestSource()
        // }
        
      
    }
};      

module.exports = roleWorker;