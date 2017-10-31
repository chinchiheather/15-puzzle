export class Helpers {

  /**
   * Taken from https://stackoverflow.com/a/6274381/521531
   * Uses modern version of the Fisher-Yates algorithm to shuffle array in place
   */
  static shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  }
}
