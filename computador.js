export default class Computador {
  constructor() {}

  comboVencedores = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
  ];

  play(espacos, divs, level) {
      switch (level) {
          case 1:
              this.playInEasyLevel(espacos, divs);
              break;
          case 2:
              this.playInMiddleLevel(espacos, divs);
              break;
          case 3:
              this.playInHardLevel(espacos, divs);
              break;
      }
  }

  playInEasyLevel(espacos, divs) {
      divs[this.getRandomAvailableSpace(espacos)].click();
  }

  playInMiddleLevel(espacos, divs) {
      if (this.getRemainingSpaces(espacos).length === 9) {
          divs[this.getRandomAvailableSpace(espacos)].click();
      } else if (this.getRemainingSpaces(espacos).length === 8) {
          if (!espacos[4]) return divs[4].click();
          divs[this.getRandomAvailableSpace(espacos)].click();
      } else if (this.getSpaceToWin(espacos)) {
          divs[this.getSpaceToWin(espacos)].click();
      } else if (this.getBlockingSpace(espacos)) {
          divs[this.getBlockingSpace(espacos)].click();
      } else {
          divs[this.getRandomAvailableSpace(espacos)].click();
      }
  }

  playInHardLevel(espacos, divs) {
      if (this.getRemainingSpaces(espacos).length === 9) {
          divs[4].click();
      } else if (this.getRemainingSpaces(espacos).length === 8) {
          if (!espacos[4]) return divs[4].click();
          divs[this.getRandomCorner()].click();
      } else if (this.getSpaceToWin(espacos)) {
          divs[this.getSpaceToWin(espacos)].click();
      } else if (this.getBlockingSpace(espacos)) {
          divs[this.getBlockingSpace(espacos)].click();
      } else if (this.getSpaceToCreateChance(espacos)) {
          divs[this.getSpaceToCreateChance(espacos)].click();
      } else {
          divs[this.getRandomAvailableSpace(espacos)].click();
      }
  }

  getRandomAvailableSpace(espacos) {
      const availableSpaces = espacos
          .map((val, index) => (val === null ? index : null))
          .filter(val => val !== null);
      return availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
  }

  getRemainingSpaces(espacos) {
      return espacos.filter(space => space === null);
  }

  getSpaceToWin(espacos) {
      for (const combo of this.comboVencedores) {
          const [a, b, c] = combo;
          if (espacos[a] === "o" && espacos[b] === "o" && !espacos[c]) return c;
          if (espacos[a] === "o" && espacos[c] === "o" && !espacos[b]) return b;
          if (espacos[b] === "o" && espacos[c] === "o" && !espacos[a]) return a;
      }
      return null;
  }

  getBlockingSpace(espacos) {
      for (const combo of this.comboVencedores) {
          const [a, b, c] = combo;
          if (espacos[a] === "x" && espacos[b] === "x" && !espacos[c]) return c;
          if (espacos[a] === "x" && espacos[c] === "x" && !espacos[b]) return b;
          if (espacos[b] === "x" && espacos[c] === "x" && !espacos[a]) return a;
      }
      return null;
  }

  getRandomCorner() {
      const corners = [0, 2, 6, 8];
      return corners[Math.floor(Math.random() * corners.length)];
  }

  getSpaceToCreateChance(espacos) {
      for (const combo of this.comboVencedores) {
          const [a, b, c] = combo;
          if (!espacos[a] && !espacos[b] && espacos[c] === "o") return a;
          if (!espacos[a] && espacos[b] === "o" && !espacos[c]) return c;
          if (espacos[a] === "o" && !espacos[b] && !espacos[c]) return b;
      }
      return null;
  }
}
