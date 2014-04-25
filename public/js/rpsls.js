function MakePlayer() {
        this.stats = { player: 0, opponent: 0, ties: 0, total: 0 };
        this.seen = { rock: 0, paper: 0, scissors: 0, spock: 0, lizard: 0};
        this.maxHold = 10;
        this.lastXMoves = [];
}

MakePlayer.prototype.relations = {
    'rock': {'scissors': 'crushes', 'lizard': 'crushes'},
    'paper': {'rock': 'covers', 'spock': 'disproves'},
    'scissors': {'paper': 'cut', 'lizard': 'decapitate'},
    'spock': {'rock': 'vaporizes', 'scissors': 'smashes'},
    'lizard': {'spock': 'poison', 'paper': 'eat'}
};

MakePlayer.prototype.counters = {
    'rock': ['paper', 'spock'],
    'paper': ['scissors', 'lizard'],
    'scissors': ['rock', 'spock'],
    'spock': ['paper', 'lizard'],
    'lizard': ['rock', 'scissors']
};

MakePlayer.prototype.keys = ['rock', 'paper', 'scissors', 'spock', 'lizard'];

MakePlayer.prototype.reset = function () {
    var that = this;

    // reset the seen values.
    $.each(Object.keys(this.seen), function (i, k) {
        that.seen[k] = 0;
    });

    // reset the stats.
    $.each(Object.keys(this.stats), function (i, k) {
        that.stats[k] = 0;
    });
};

MakePlayer.prototype.getMostUsed = function () {
    var mostUsed,
        that = this,
        currentMax = -1;

    $.each(this.keys, function (i, k) {
        var localMax = that.seen[k];

        if (localMax > currentMax) {
            mostUsed = [k];
            currentMax = localMax;
        } else if (localMax === currentMax) {
            mostUsed.push(k);
        }
    });

    return mostUsed;
};

MakePlayer.prototype.getMovePool = function () {
        var that = this,
            movePool = [];

        $.each(moves, function (i, m) {
            $.each(that.counters[m], function (j, c) {
                if (moves.indexOf(c) === -1 && movePool.indexOf(c) === -1) {
                    movePool.push(c);
                }
            });
        });

        return movePool;
    };

MakePlayer.prototype.randomMove = function () {
        var keys = moveArray || this.keys;

        console.log("Random");

        return keys[Math.floor(Math.random() * keys.length)];
    };

MakePlayer.prototype.smartMove = function () {
        var movePool = this.getMovePool(this.getMostUsed());

        console.log("Smart");

        return this.randomMove(movePool.length > 0 ? movePool : undefined);
    };

MakePlayer.prototype.smarterMove = function () {

        var mostUsed = this.getMostUsed(),
            i = this.lastXMoves.length - 1,
            lastMove = this.lastXMoves[i--],
            currentChain = 1,
            tmp,
            movePool,
            that = this;

        console.log("Smarter");

        // Look for a long chain for the last moves.
        for(; i >= 0; i--) {
            tmp = this.lastXMoves[i];

            if (tmp === lastMove) {
                currentChain++;
            } else {
                break;
            }
        }

        // We had the same thing appear three or more times in a row.
        // Let's counter that.
        if (currentChain >= 3) {
            movePool = this.getMovePool([lastMove]);
        } else { // Add in the latest move 
            if (lastMove && mostUsed.indexOf(lastMove) === -1) {
                mostUsed.push(lastMove);
            }

            movePool = this.getMovePool(mostUsed)
        }

        return this.randomMove(movePool.length > 0 ? movePool : undefined);
    };

MakePlayer.prototype.prettyPercent = function (num) {
        if (this.stats.total !== 0) {
            return parseFloat(Math.round(num / this.stats.total + 'e+4') + 'e-2');
        } else {
            return 0.0;
        }
    };

MakePlayer.prototype.determineWinner = function (p1, p2, cb) {
        var outcomes,
            relations = this.relations,
            stats = this.stats;

        ++stats.total;

        this.seen[p1]++;
        this.seen.total++;
        this.lastXMoves.push(p1);

        // Sliding array of last maxHold moves.
        if (this.lastXMoves.length === this.maxHold) {
            this.lastXMoves = this.lastXMoves.slice(1);
        }

        if (p1 === p2) {
            ++stats.ties;

            cb("No one wins. It's a tie!");
        } else {
            outcomes = relations[p1];

            if (p2 in outcomes) {
                ++stats.player;

                cb(p1 + ' ' + outcomes[p2] + ' ' + p2 + '. Player 1 wins!');
            } else {
                ++stats.comp;

                outcomes = relations[p2];
                cb(p2 + ' ' + outcomes[p1] + ' ' + p1 + '. Player 2 wins!');
            }
        }
    };
