var R = {
    relations: {
            'rock': {'scissors': 'crushes', 'lizard': 'crushes'},
            'paper': {'rock': 'covers', 'spock': 'disproves'},
            'scissors': {'paper': 'cut', 'lizard': 'decapitate'},
            'spock': {'rock': 'vaporizes', 'scissors': 'smashes'},
            'lizard': {'spock': 'poison', 'paper': 'eat'}
    },

    stats: { comp: 0, player: 0, ties: 0, total: 0},

    randomMove: function () {
        var keys = Object.keys(this.relations);
        return keys[Math.floor(Math.random() * keys.length)];
    },

    // Borrowed from MDN.
    prettyPercent: function (num) {
        return parseFloat(Math.round(num / this.stats.total + 'e+4') + 'e-2');
    },

    determineWinner: function(p1, p2, cb) {
        var outcomes,
            relations = this.relations,
            stats = this.stats;

        ++stats.total;

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
