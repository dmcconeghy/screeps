const logicTower = {
    /**
     * Towers repair dmanged structures and attack hostile enemies.
     * 
     * TODO: Flags for emergency repair / energy delivery.
     */

    run: function() {
        const tower = Game.getObjectById('6359fdf2f4df97610e877799');
        const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
}

module.exports = logicTower;

