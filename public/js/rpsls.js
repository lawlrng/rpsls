var R = {
    relations: {
            'rock': {'scissors': 'crushes', 'lizard': 'crushes'},
            'paper': {'rock': 'covers': 'spock': 'disproves'},
            'scissors': {'paper': 'cut', 'lizard': 'decapitate'},
            'spock': {'rock': 'vaporizes', 'scissors': 'smashes'},
            'lizard': {'spock': 'poison', 'paper': 'eat'}
    },

    stats = { comp: 0, player: 0, ties: 0, total: 0},

    randomMove = function () {
        var keys = Object.keys(relations);
        return keys[Math.floor(Math.random() * keys.length)];
    },

    determineWinner(p1, p2, cb) {
        var outcomes;

        stats.total += 1;

        if (p1 === p2) {
            cb("No one wins!", 0);

            stats.ties += 1;
        } else {
            outcomes = relations[p1];

            if (p2 in outcomes) {
                cb(p1 + ' ' + outcomes[p2] + ' ' + p2, 1);

                stats.player += 1;
            } else {
                outcomes = relations[p2];
                cb(p2 + ' ' + outcomes[p1] + ' ' + p1, -1);

                stats.comp += 1;
            }
        }
    }
}
