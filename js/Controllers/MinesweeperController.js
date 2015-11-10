minesweeper.controller('MinesweeperController', function MinesweeperController($scope){
    $scope.minefield = createMinefield();
    //when a space is clicked, mark it as uncovered and check if the player has won
    $scope.uncoverSpot = function(spot){
        spot.isCovered = false;
        if(hasWon($scope.minefield)){
            $scope.isWinMessageVisible = true;
        }
    }
});
