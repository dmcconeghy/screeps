const helpers = require('helpers')

const logicRoles = {
    // Logic for creeps by role. 
    // TODO: Plenty of refactoring. EG. more helper functions. Are we empty? Are we full? Etc.
    // TODO: Behavior near sources is problematic. Brainstorm solutions for granular control of access. 
    // TODO: tombstone energy pickup? Or drop before death.  

    droneHarvester: function(creep) {
        // Do we have free capacity? 
        if (creep.store.getFreeCapacity() > 0) {

            // In room 'E52S24', send drones to the upper left source.
            helpers.harvestClosestSource(creep, 0);

        // We're full, become a courier to transfer to the closest consumer.
        } else if(creep.store.getUsedCapacity() === creep.store.getCapacity()) {
            // console.log('harvester: ' + creep.name + ' is full.');
            creep.memory.role = 'drone-courier';   
        } 
        
    }, 

    droneCourier: function(creep) {
        /**
         * Courier drones appear when a harvester is full changes roles from 'drone-harvester' to 'drone-courier. 
         * Courier drones transfer energy to the closest container, if there is one.
         * If there is no container, they transfer to the closest consumers (builders, upgraders, etc.)
         * When the courier is empty, it changes roles back to 'drone-harvester'.
         */

        // TODO: Couriers sometimes get stuck waiting with some energy but a full target. 
        // These partially filled couriers should find the next target instead or revert to harvesting.
        // Potential fix on line 100. 

        const closestConsumer = helpers.getClosestConsumer(creep);
        const closestContainer = helpers.getClosestContainer(creep);
    

        // Are we empty? 
        if (creep.store.getUsedCapacity() === 0) {
            // console.log('courier: ' + creep.name + ' is empty.');
            creep.memory.role = 'drone-harvester';
        // We have some energy. Is there a container nearby?
        } else if (closestContainer && closestContainer.store[RESOURCE_ENERGY] < closestContainer.store.getCapacity()) {         
            if (creep.transfer(closestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestContainer, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        
        // There's no container nearby. Is there a consumer nearby?
        } else if (creep.store.getFreeCapacity() !== creep.store.getCapacity()) {
            if (creep.transfer(closestConsumer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(closestConsumer, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }

    },

    droneUpgrader: function(creep) {
        // if (_.size(creep.body) > 3){
        //     creep.say('uu');
        // } else {
        //     creep.say('u');
        // }
        
        if (creep.memory.upgrading === false) {

            // If we are not full, harvest.
            if (creep.store.getFreeCapacity() !== 0) {      
                
                const droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                if (droppedEnergy) {
                    if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(droppedEnergy, {visualizePathStyle: {stroke: '#000000'}});
                    }
                } else {
                    helpers.harvestClosestSource(creep, 1);
                }
            } else {
                creep.memory.upgrading = true;
            }
        } else {
            // If we are full, upgrade.
            if (creep.store.getUsedCapacity() !== 0) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                creep.memory.upgrading = false;
            }
        }
        
    },

    droneBuilder: function(creep) {
        if (creep.memory.working === false) {

            // If we are not full, harvest.
            if (creep.store.getFreeCapacity() !== 0) {
                
                helpers.harvestClosestSource(creep, 0);
            } else {
                creep.memory.working = true;
            }
        
        } else {
            // If we are full, build.
            if (creep.store.getUsedCapacity() !== 0) {
                const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length) {
                    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else if (!targets.length) {
                    // Look for repair targets.
                    const repairTargets = creep.room.find(FIND_STRUCTURES, {
                        filter: object => object.hits < object.hitsMax
                    });
                    if (repairTargets.length) {
                        if (creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(repairTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    } else {
                        // creep.memory.role = 'drone-upgrader';
                        console.log('builder: ' + creep.name + ' has no work.');
                    }
                }
            } else {
                creep.memory.working = false;
            }
        } 
    },

    harvester: function(creep) {
        // Harvesters drop their energy on the ground.
        // In room 'E52S24', send dedicated harvesters to the lower right source.
        helpers.harvestClosestSource(creep, 1);
        
    },

    sweeper: function(creep) {
        // Sweepers pick up dropped energy. 
        // TODO: Sometims sweepers are full of energy but have no target because everything is full.
        // They can't work, but they could transfer the energy to a creep?
        // Or the could default to a location to wait until we need energy?
        // TODO: recover energy from tombstones
        

        // Are we empty?
        if (creep.store.getUsedCapacity() === 0) {
            // console.log('sweeper: ' + creep.name + ' is empty.');
            creep.memory.sweeping = true;
        }

        // Are we full?
        if (creep.store.getFreeCapacity() === 0) {
            // console.log('sweeper: ' + creep.name + ' is full.');
            creep.memory.sweeping = false;
        }
        
        // If we're sweeping, pick up dropped energy.
        if (creep.memory.sweeping === true) {
    
            const droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            if (droppedEnergy) {
                if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy, {visualizePathStyle: {stroke: '#000000'}});
                }
            }

        }

        // If we're not sweeping, transfer to the closest consumer.
        if (creep.memory.sweeping === false) {

            const closestConsumer = helpers.getClosestConsumer(creep);
            if(creep.transfer( closestConsumer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo( closestConsumer, {visualizePathStyle: {stroke: '#000000'}});
            }
        }
        
    }, 

    builder: function(creep) {

        if (creep.memory.working === false) {

            // If we are not full, harvest.
            if (creep.store.getFreeCapacity() !== 0) {
                
                // In room 'E52S24', send dedicated builders to the upper left source.
                helpers.harvestClosestSource(creep, 0);
            } else {
                creep.memory.working = true;
            }
        
        // We must be working.
        } else {

            // When we're full. Find something to build.
            // We will always build the first construction site in the list.
            if (creep.store.getUsedCapacity() !== 0) {
                const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length) {
                    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }

                // We have nothing to build because there are no construction sites. 
                // As a fallback we act like suppliers.
                } else {

                    const closestConsumer = helpers.getClosestConsumer(creep);
                    const closestContainer = helpers.getClosestContainer(creep);
                
                    // Are we empty? Time to harvest again. 
                    if (creep.store.getUsedCapacity() === 0) {
                        creep.memory.working=false;
                    // We have some energy. Is there a container nearby?
                    } else if (closestContainer){         
                        if (creep.transfer(closestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(closestContainer, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    // There's no container nearby. Is there a consumer nearby?
                    } else if (creep.store.getFreeCapacity() === 0) {
                        if (creep.transfer(closestConsumer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(closestConsumer, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }

                }
            // When we're empty, we stop building (or delivering).
            } else {
                creep.memory.working = false;
            }
        } 
    },

    supplier: function(creep) {
        // Are we empty or fueling?
        if (creep.store.getFreeCapacity() !== 0 || creep.memory.working === true) {
            // console.log('supplier: ' + creep.name + ' is fueling.');

            const closestContainer = helpers.getClosestContainerWithEnergy(creep);

            if (closestContainer && creep.store.getFreeCapacity() !== 0) {
                if (creep.withdraw(closestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestContainer, {visualizePathStyle: {stroke: '#ffffff'}});
                    
                } else {
                    creep.memory.working = false;
                }
            }

        // Are we full or delivering?
        } else if (creep.store.getFreeCapacity() === 0 || creep.memory.working === false) {
            // console.log('supplier: ' + creep.name + ' is delivering.');
            creep.memory.working === false
            const closestConsumer = helpers.getClosestConsumer(creep);
        
            if (closestConsumer && creep.store.getFreeCapacity() !== creep.store.getCapacity()) {
                if (creep.transfer(closestConsumer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestConsumer, {visualizePathStyle: {stroke: '#ffffff'}});
                    
                }
            } else {
                creep.memory.working = true;

            }
        }
    }, 

    attacker: function(creep) {

        const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

        if(target) {
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            creep.moveTo(Game.flags.Flag2);
        }
    }
};

module.exports = logicRoles;