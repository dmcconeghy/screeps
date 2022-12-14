const logicManual = {
    /**
     * 
     * @param {Creep} creep
     * 
     * This file is for manually manipulating a specific drone, such as a claimer. 
     *  
     */

    run: function(creep) {
        console.log('logicManual:run');

        // const creep = Game.creeps['manual'];

        // if(creep.room.controller) {
        //     if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(creep.room.controller);
        //     }
        // }

        // this.spawn.spawnCreep([CLAIM, MOVE, MOVE, MOVE, MOVE], 'manual' + Game.time, {memory: {role: 'manual', working: false}});

        
        // const exitDir = creep.room.findExitTo(FIND_EXIT_TOP);
        // const exit = creep.pos.findClosestByRange(FIND_EXIT_TOP);
        // creep.moveTo(exit);

        // or simply:
        // creep.moveTo(28, 1, {reusePath: 50}, {visualizePathStyle: {stroke: '#ffaa00'}} );
        // creep.moveTo(new RoomPosition(25,25, anotherCreep.pos.roomName));

        // if(creep.room.id === 'E52S23') {
        // if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        //     creep.moveTo(creep.room.controller);
        // }

        // if(creep.room.id === 'E52S23') {
            // creep.moveTo(20, 26, {reusePath: 50}, {visualizePathStyle: {stroke: '#ffaa00'}} );
        // }
        // console.log(JSON.stringify(creep.room.controller))
        // creep.claimController( Game.getObjectById('5bbcb0279099fc012e63baa0'));

        if(creep.room.controller) {
            if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }

        if(creep.room.controller) {
            console.log("I'm trying to claim the controller");
            if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                console.log("I had to move into range to claim the controller");
                creep.moveTo(creep.room.controller);
            }
        }

    }


}

module.exports = logicManual;