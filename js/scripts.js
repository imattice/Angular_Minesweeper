var minesweeper = angular.module('minesweeper', []);


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
            row.spots.push(spot);
        }

        minefield.rows.push(row);
    }
    return minefield;
}
