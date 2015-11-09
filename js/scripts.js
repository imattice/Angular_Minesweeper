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
                spot.isCovered = true;
                spot.content = 'empty';
                row.spots.push(spot);
            }
            minefield.rows.push(row);
        }
        placeManyRandomMines(minefield);
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
