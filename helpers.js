const helpers = {
    
    // Clear memory of dead creeps
   clearMemoryOfDeadCreeps: function () {
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    },

    getClosestSource: function(creep) {
        if (creep.room.name != 'E52S24') {
            creep.moveTo(new RoomPosition(25, 25, 'E52S24'));
        } else {
            return creep.pos.findClosestByPath(FIND_SOURCES);
        }
    },

    getClosestConsumer: function(creep, manualStructureType = null) {

        if (manualStructureType) {
            return creep.pos.findClosestByPath(manualStructureType, {
                filter: (structure) => structure.structureType == manualStructureType && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });
        } else {
            return creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER || 
                        structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
        }
        
    },

    getClosestContainer: function(creep) {
        return creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_CONTAINER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
            }
        })
    },

    getClosestContainerWithEnergy: function(creep) {
        return creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_CONTAINER) &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0)
            }
        })   
    },

    harvestClosestSource: function(creep, manualChoice = null) {

        if (manualChoice) {
            sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
            // If we're not next to the manually overriden source, move to it.
            if (creep.harvest(sources[manualChoice]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[manualChoice], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            // Harvest from the closest source.
            // const closestSource = 
            // const closestContainer = this.getClosestContainer(creep);


            const closestSupply = () => this.getClosestSource(creep);

            // If we're not next to the source, move to it.
            if (creep.harvest(closestSupply()) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestSupply(), {visualizePathStyle: {stroke: '#ffaa00'}});
            }

            // const closestContainer = helpers.getClosestContainerWithEnergy(creep);

            // if (closestContainer && creep.memory.role !== 'drone-courier') {
            //     if (creep.withdraw(closestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(closestContainer, {visualizePathStyle: {stroke: '#ffaa00'}});
            //     }
            // } else {
                
                
            // }
        }
        
    },

    getNumberOfCreepsByRole: function(role) {
        let totalNumberOfCreeps = 0;
        for (let name in Game.creeps) {
            let creep = Game.creeps[name];
            if (creep.memory.role === role) {
                totalNumberOfCreeps++;
            }
        }
        return totalNumberOfCreeps;
    },

    getTotalNumberOfCreeps: function() {
        return _.size(Game.creeps); 
        // return _.sum(Game.creeps, (c) => true);   
    },

    getEnergyStructures: function() {
        return  Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
    },

    getConstructionSites: function() {
        return Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);
    },

    getClosestConstructionSite: function(creep) {
        return creep.pos.findClosestByPath(this.getClosestConstructionSites())
    }, 

    showCreepRoles: function(toggle = true) {
        if (toggle) {
            for (let name in Game.creeps) {
                let creep = Game.creeps[name];
                creep.say(creep.memory.role);
            }
        }

    } 


}

module.exports = helpers;




    // zeroToSixCreeps: function() {
    //     // If there are no creeps in the colony, spawn two drone-harvesters.
    //     if (totalNumberOfCreeps < 2 && numberOfDroneHarvesters < 2) {
    //         console.log('logicSpawn: Spawning a drone-harvester.');
    //         this.spawnDrone('harvester');
    //     }

    //     // If there are no ugpraders, spawn two drone-upgraders.
    //     if (numberOfDroneHarvesters >= 2 && numberOfDroneUpgraders < 3) {
    //         console.log('logicSpawn: Spawning a drone-upgrader.');
    //         this.spawnDrone('upgrader')
    //     }

    //     // If there are no builders, spawn two drone-builders.
    //     if (numberOfDroneHarvesters >=2 && numberOfDroneBuilders < 3) {
    //         console.log('logicSpawn: Spawning a drone-builder.');
    //         this.spawnDrone('builder')
    //     }
    // },   

    // countOff: function() {
    //     let output = '';
    //     for (let name in Game.creeps) {
    //         output += ` logicSpawn: ${name} is a ${Game.creeps[name].memory.role} \n`;
    //     }

    //     console.log(output)
    // },

    // allocateDrones: function(role, count) {
    //     if (helpers.totalNumberOfCreeps() >= count) {
    //         for (let c; c < count; c++) {
    //             if (Game.creeps[c].memory.role === role) {
    //                 c -= 1;
    //                 continue
    //             } else {
    //                 Game.creeps[c].memory.role = role;
    //             }
               
    //         }
    //     }
    // },
    
    // Basic drone. Can harvest, carry, build, and upgrade.