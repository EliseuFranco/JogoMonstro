new Vue({
  el: "#app",
  data: {
    player: 100,
    monster: 100,
    start: true,
    logs: [],
    rules: true,
  },
  computed: {
    hasWinner() {
      return this.player <= 0 || this.monster <= 0;
    },
  },
  watch: {
    hasWinner(winner) {
      if (winner) {
        this.start = true;
      }
    },
  },
  methods: {
    startGame() {
      this.start = false;
      (this.player = 100), (this.monster = 100);
      this.logs = [];
    },
    getAttack(player, min, max, special, source, target) {
      const plus = 2;
      const atack = special
        ? Math.floor(Math.random() * (max + plus - min) + (min + plus))
        : Math.floor(Math.random() * (max - min) + min);

      if (this[player] - atack <= 0) {
        this[player] = 0;
      } else {
        this[player] -= atack;
      }
      this.registerLogs(`O ${source} atacou ${target} com ${atack}`, source);
    },
    attacks(special) {
      this.getAttack("monster", 5, 10, special, "jogador", "monster");
      this.getAttack("player", 7, 12, false, "monster", "player");
    },
    healthAndHurt() {
      const heal = Math.floor(Math.random() * (10 - 5) + 5);
      const atack = Math.floor(Math.random() * (12 - 7) + 7);
      if (this.player + heal > 100) {
        this.player = 100;
      } else {
        this.player += heal;
        this.registerLogs(`O jogador ganhou ${heal}`, "jogador");
      }
      this.player -= atack;
      this.registerLogs(`O Monstro atacou o player com ${atack}`, "monster");
    },

    registerLogs(data, cls) {
      this.logs.unshift({ data, cls });
    },
  },
});
