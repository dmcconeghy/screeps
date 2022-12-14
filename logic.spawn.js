const helpers = require('helpers');
const rolesSpawn = require('roles.spawn');

const logicSpawn = {

    /**
     * @param {Spawn} spawn
     * 
     * 
     * logicSpawn.run(spawn) spawns creeps in a predetermined order
     * This order can take our room from no creeps to ~18 creeps. 
     * It's our failsafe for a stable and productive room.
     * It does not take into account the room's current needs or threats.
     * 
     * TODO: Create the creep count as a dictionary of creep roles and counts.
     * TODO: Abstract this logic for spawning creeps in different rooms.
     * TODO: Add logic to spawn creeps based on the room's energy capacity and creep count.
     * 
     * The creep count is currently hard-coded and should approach ~17+ creeps.
     * TODO: Calculate the right number of drones for the amount of energy in the room.
     * 
     * TODO: Reduce counts of drones/small creeps as we shift toward larger creeps. 
     *       Failsafes are important here to prevent the room from crashing.
     * 
     */

    spawn: Game.spawns['Spawn1'],

    run: function() {

        // TODO: Create a dictionary of creep roles and counts instead of repeated calls.

        const getTotalNumberOfCreeps = helpers.getTotalNumberOfCreeps();
        
        const numberOfDroneHarvesters = helpers.getNumberOfCreepsByRole('drone-harvester');
        const numberOfDroneCouriers = helpers.getNumberOfCreepsByRole('drone-courier');
        const numberOfDroneBuilders = helpers.getNumberOfCreepsByRole('drone-builder');
        const numberOfDroneUpgraders = helpers.getNumberOfCreepsByRole('drone-upgrader');

        const numberOfSmallHarvesters = helpers.getNumberOfCreepsByRole('small-harvester');
        const numberOfSmallSweepers = helpers.getNumberOfCreepsByRole('small-sweeper');
        const numberOfSmallBuilders = helpers.getNumberOfCreepsByRole('small-builder');
        const numberOfSmallUpgraders = helpers.getNumberOfCreepsByRole('small-upgrader');
        const numberOfSmallSuppliers = helpers.getNumberOfCreepsByRole('small-supplier');

        const numberOfDroneHarvestersAndCouriers = numberOfDroneHarvesters + numberOfDroneCouriers;

        // If there are fewer than 6 creeps, spawn various drones.
        if (getTotalNumberOfCreeps < 6) { 
           
            // If there are no creeps in the colony, spawn two drone-harvesters.
            if (numberOfDroneHarvestersAndCouriers < 3 && this.spawn.room.energyAvailable >= 200) {
                console.log('logicSpawn: Spawning a drone-harvester.');
                rolesSpawn.spawnDrone('harvester');
            }

            // If there are no ugpraders, spawn two drone-upgraders.
            if (numberOfDroneHarvestersAndCouriers <= 4 && numberOfDroneUpgraders < 3) {
                console.log('logicSpawn: Spawning a drone-upgrader.');
                rolesSpawn.spawnDrone('upgrader')
            }

            // If there are no builders, spawn two drone-builders.
            if (numberOfDroneHarvestersAndCouriers <= 4 && numberOfDroneBuilders < 3) {
                console.log('logicSpawn: Spawning a drone-builder.');
               rolesSpawn.spawnDrone('builder')
            }
        } 
        
        // If there are 6 or more creeps, spawn various small creeps.
        else if (getTotalNumberOfCreeps >=6 && this.spawn.room.energyAvailable > 300) {

            if (numberOfDroneHarvestersAndCouriers < 3) {
                console.log('logicSpawn: Spawning a drone-harvester.');
                rolesSpawn.spawnDrone('harvester');
            } 

             // If there are no ugpraders, spawn two drone-upgraders.
            else if (numberOfDroneUpgraders < 2) {
                console.log('logicSpawn: Spawning a drone-upgrader.');
                rolesSpawn.spawnDrone('upgrader')
            }

            // If there are no builders, spawn two drone-builders.
            else if (numberOfDroneBuilders < 2) {
                console.log('logicSpawn: Spawning a drone-builder.');
                rolesSpawn.spawnDrone('builder')
            }

            // Next build two dedicated small-harvesters at 300 energy each.
            else if (numberOfSmallHarvesters < 2) { 
                console.log('logicSpawn: Spawning a small-harvester.');
                rolesSpawn.spawnSmallHarvester();
            }

            // Next build two dedicated drone-builders at 400 energy each.
            // Requires 400 energy: spawn a dedicated sweeper
            else if (numberOfSmallSweepers < 2 && this.spawn.room.energyAvailable >= 400) {
                console.log('logicSpawn: Spawning a small-sweeper.');
                rolesSpawn.spawnSmallSweeper();
            }

            // Next build one dedicated drone-builders at 500 energy each.

            else if (numberOfSmallBuilders < 1 && this.spawn.room.energyAvailable >= 500) {
                console.log('logicSpawn: Spawning a small-builder.');
                rolesSpawn.spawnSmallBuilder();
            } 

            // Next build two dedicated small-upgraders at 800 energy each

            else if (numberOfSmallUpgraders < 3 && this.spawn.room.energyAvailable >= 600) {
                console.log('logicSpawn: Spawning a small-upgrader.');
                rolesSpawn.spawnSmallUpgrader();
            }

            else if (numberOfSmallSuppliers < 1 && this.spawn.room.energyAvailable >= 600) {
                console.log('logicSpawn: Spawning a small-supplier.');
                rolesSpawn.spawnSmallSupplier();
            }

            } 
        
        if (this.spawn.spawning != null) {
            console.log(`logicSpawn: SPAWN REPORT`);
            console.log(`logicSpawn: No more creeps to spawn. Review Spawn Logic for ${getTotalNumberOfCreeps} creeps.`);
            console.log(`logicSpawn: Available Energy: ${this.spawn.room.energyAvailable}`);
            console.log(`LogicSpawn: Total Number of Creeps: ${getTotalNumberOfCreeps},
                logicSpawn: Drone-Harvesters: ${numberOfDroneHarvesters},
                logicSpawn: Drone-Couriers: ${numberOfDroneCouriers},
                logicSpawn: Drone-Builders: ${numberOfDroneBuilders},
                logicSpawn: Drone-Upgraders: ${numberOfDroneUpgraders},
                logicSpawn: Small-Harvesters: ${numberOfSmallHarvesters},
                logicSpawn: Small-Sweepers: ${numberOfSmallSweepers},
                logicSpawn: Small-Builders: ${numberOfSmallBuilders},
                logicSpawn: Small-Upgraders: ${numberOfSmallUpgraders},
                logicSpawn: Small-Suppliers: ${numberOfSmallSuppliers}`);
        } 
        
    }
}

module.exports = logicSpawn;