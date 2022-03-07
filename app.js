const app = Vue.createApp({
  data: function () {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessage: [],
    };
  },
  computed: {
    monsterBarStyle() {
      if (this.monsterHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyle() {
      if (this.playerHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // drwas
        this.winner = "draw";
      } else if (value <= 0) {
        // player lost
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // draw
        this.winner = "draw";
      } else if (value <= 0) {
        // player won
        this.winner = "player";
      }
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackVal = Math.floor(Math.random() * (12 - 5)) + 5;
      this.monsterHealth -= attackVal;
      this.addLogMessage("player", "attack", attackVal);
      this.attackPlayer(); //monster attacking back
    },
    attackPlayer() {
      const attackVal = Math.floor(Math.random() * (15 - 8)) + 8;
      this.playerHealth -= attackVal;
      this.addLogMessage("monster", "attack", attackVal);
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackVal = Math.floor(Math.random() * (10 - 25)) + 25;
      this.monsterHealth -= attackVal;
      this.addLogMessage("player", "special attack!", attackVal);
    },
    heal() {
      const playerHealValue = Math.floor(Math.random() * (8 - 20)) + 20;
      const monsterHealValue = Math.floor(Math.random() * (7 - 18)) + 18;
      if (this.playerHealth + playerHealValue > 100) {
        this.playerHealth = 100;
      } else if (this.monsterHealth + monsterHealValue > 100) {
        this.monsterHealth = 100;
      } else {
        this.playerHealth += playerHealValue;
        this.monsterHealth += monsterHealValue;
      }
      this.addLogMessage("player", "heal", playerHealValue);
      this.addLogMessage("monster", "heal", monsterHealValue);
    },
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
    },
    addLogMessage(by, action, value) {
      this.logMessage.unshift({ by: by, action: action, value: value });
    },
  },
});

app.mount("#app");
