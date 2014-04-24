var R = {
    relations: {
            'rock': {'scissors': 'crushes', 'lizard': 'crushes'},
            'paper': {'rock': 'covers', 'spock': 'disproves'},
            'scissors': {'paper': 'cut', 'lizard': 'decapitate'},
            'spock': {'rock': 'vaporizes', 'scissors': 'smashes'},
            'lizard': {'spock': 'poison', 'paper': 'eat'}
    },

    counters: {
        'rock': ['paper', 'spock'],
        'paper': ['scissors', 'lizard'],
        'scissors': ['rock', 'spock'],
        'spock': ['paper', 'lizard'],
        'lizard': ['rock', 'scissors']
    },

    keys: ['rock', 'paper', 'scissors', 'spock', 'lizard'],

    stats: { comp: 0, player: 0, ties: 0, total: 0},

    seen: {'rock': 0, 'paper': 0, 'scissors': 0, 'spock': 0, 'lizard': 0},

    reset: function () {
        var that = this;

        // reset the seen values.
        $.each(Object.keys(this.seen), function (i, k) {
            that.seen[k] = 0;
        });

        // reset the stats.
        $.each(Object.keys(this.stats), function (i, k) {
            that.stats[k] = 0;
        });
    },

    randomMove: function (moveArray) {
        var keys = moveArray || this.keys;

        console.log("Calling dumb move!");
        console.log(keys);

        return keys[Math.floor(Math.random() * keys.length)];
    },

    smartMove: function () {
        var mostUsed = [],
            movePool = [],
            that = this,
            currentMax = -1;

        // determine a list of most used moves.
        $.each(this.keys, function (i, k) {
            var localMax = that.seen[k];

            if (localMax > currentMax) {
                mostUsed = [k];
                currentMax = localMax;
            } else if (localMax === currentMax) {
                mostUsed.push(k);
            }
        });

        // filter most used move counters down to only ones that will win.
        // Avoiding ties.
        $.each(mostUsed, function (i, m) {
            $.each(that.counters[m], function (j, c) {
                if (mostUsed.indexOf(c) === -1 && movePool.indexOf(c) === -1) {
                    movePool.push(c);
                }
            });
        });

        console.log(movePool);
        return this.randomMove(movePool.length > 0 ? movePool : undefined);
    },


    // Borrowed from MDN.
    prettyPercent: function (num) {
        if (this.stats.total !== 0) {
            return parseFloat(Math.round(num / this.stats.total + 'e+4') + 'e-2');
        } else {
            return 0.0;
        }
    },

    determineWinner: function(p1, p2, cb) {
        var outcomes,
            relations = this.relations,
            stats = this.stats;

        ++stats.total;

        this.seen[p1]++;

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
    }
};
