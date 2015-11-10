var minesweeper = angular.module('minesweeper', []);


//create gameboard
    function createMinefield() {
        var minefield = {};
        minefield.rows = [];

        //creates each row in the minefield
        for(var i=0; i<9; i++){
            var row = {};
            row.spots = [];

            //each row has 9 spots that are not revealed
            for(var j=0; j<9; j++){
                var spot = {};
                spot.isCovered = false;
                spot.content = 'empty';
                row.spots.push(spot);
            }
            minefield.rows.push(row);
        }
        placeManyRandomMines(minefield);
        calculateAllNumbers(minefield);

        return minefield;
    }

//finds a specific spot
    function getSpot(minefield, row, column){
        return minefield.rows[row].spots[column];
    }

//places mine
    function placeRandomMine(minefield) {
        //create mines
        var row = Math.round(Math.random() * 8);
        var column = Math.round(Math.random() * 8);

        var spot = getSpot(minefield, row, column);
        spot.content = 'mine';
    }

//places many mines
    function placeManyRandomMines(minefield) {
        for(var i=0; i<10; i++){
            placeRandomMine(minefield);
        }
    }

//calculates the amount of mines in the area
    // function calculateNumber(minefield, row, column) {
    //     debugger;
    //     //if this spot contins a mine, then we do not place a number here
    //     var thisSpot = getSpot(minefield, row, column);
    //     if(thisSpot.content == 'mine') {
    //         return;
    //     }
    //
    //     var mineCount = 0;

    function calculateNumber(minefield, row, column) {
        var thisSpot = getSpot(minefield, row, column);
        // if this spot contains a mine then we can't place a number here
        if(thisSpot.content == "mine") {
            return;
        }

        var mineCount = 0;
        // check row above if this is not the first row
        if(row > 0) {
            // check column to the left if this is not the first column
            if(column > 0) {
                // get the spot above and to the left
                //  ___ ___ ___
                // |_+_|___|___|
                // |___|_X_|___|
                // |___|___|___|
                var spot = getSpot(minefield, row - 1, column - 1);
                if(spot.content == "mine") {
                    mineCount++;
                }
            }

            // get the spot right above
            //  ___ ___ ___
            // |___|_+_|___|
            // |___|_X_|___|
            // |___|___|___|
            var spot = getSpot(minefield, row - 1, column);
            if(spot.content == "mine") {
                mineCount++;
            }
            //only check these spots if the selected spot is not the last column
            if(column < 8) {
                // get the spot above and to the right
                //  ___ ___ ___
                // |___|___|_+_|
                // |___|_X_|___|
                // |___|___|___|
                var spot = getSpot(minefield, row - 1, column + 1);
                if(spot.content == "mine") {
                    mineCount++;
                }
            }
        }

        //only check these spots if the selected spot is not the first column
        if(column > 0) {
            // get the spot to the left
            //  ___ ___ ___
            // |___|___|___|
            // |_+_|_X_|___|
            // |___|___|___|
            var spot = getSpot(minefield, row, column - 1);
            if(spot.content == "mine") {
                mineCount++;
            }
        }
        //only check these spots if the selected spot is not the last column
        if(column < 8) {
            // get the spot to the right
            //  ___ ___ ___
            // |___|___|___|
            // |___|_X_|_+_|
            // |___|___|___|
            var spot = getSpot(minefield, row, column + 1);
            if(spot.content == "mine") {
                mineCount++;
            }
        }
        // Only check these spots if the selected spot is not in the bottom row
        if(row < 8) {
            //only check these spots if the selected spot is not the first column
            if(column > 0) {
                // get the spot below and to the left
                //  ___ ___ ___
                // |___|___|___|
                // |___|_X_|___|
                // |_+_|___|___|
                var spot = getSpot(minefield, row + 1, column - 1);
                if(spot.content == "mine") {
                    mineCount++;
                }
            }
            // get the spot right below
            //  ___ ___ ___
            // |___|___|___|
            // |___|_X_|___|
            // |___|_+_|___|
            var spot = getSpot(minefield, row + 1, column);
            if(spot.content == "mine") {
                mineCount++;
            }
            if(column < 8) {
                //  ___ ___ ___
                // |___|___|___|
                // |___|_X_|___|
                // |___|___|_+_|
                // get the spot below and to the right
                var spot = getSpot(minefield, row + 1, column + 1);
                if(spot.content == "mine") {
                    mineCount++;
                }
            }
        }
        if(mineCount > 0) {
            thisSpot.content = mineCount;
        }
    }
// calculates how many mines are around each square and assigns it a mine count
    function calculateAllNumbers(minefield){
        for(var y=0; y<9; y++){
            for(var x=0; x<9; x++){
                calculateNumber(minefield, x, y);
            }
        }
    }
