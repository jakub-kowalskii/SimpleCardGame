class Card {
  constructor(tarcza, symbol) {
    this.tarcza = tarcza;
    this.symbol = symbol;
  }

  __unicode__() {
    return this.show();
  }

  toString() {
    return this.show();
  }

  __repr__() {
    return this.show();
  }

  show() {
    var symbol;

    if (this.symbol === 1) {
      symbol = "As";
    } else {
      if (this.symbol === 11) {
        symbol = "Walet";
      } else {
        if (this.symbol === 12) {
          symbol = "Królowa";
        } else {
          if (this.symbol === 13) {
            symbol = "Król";
          } else {
            symbol = this.symbol;
          }
        }
      }
    }

    return "{} {}".format(symbol, this.tarcza);
  }

}

class Deck {
  constructor() {
    this.cards = [];
    this.build();
  }

  show() {
    for (var card, _pj_c = 0, _pj_a = this.cards, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
      card = _pj_a[_pj_c];
      console.log(card.show());
    }
  }

  build() {
    this.cards = [];

    for (var tarcza, _pj_c = 0, _pj_a = ["kier", "trefl", "karo", "pik"], _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
      tarcza = _pj_a[_pj_c];

      for (var symbol = 1, _pj_d = 14; symbol < _pj_d; symbol += 1) {
        this.cards.push(new Card(tarcza, symbol));
      }
    }
  }

  shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;

  }

  deal() {
    return this.cards.pop();
  }

}

class Player {
  constructor(name, result = 0) {
    this.name = name;
    this.hand = [];
    this.result = result;
  }

  draw(deck, num = 1) {
    var card;

    for (var i = 0, _pj_a = num; i < _pj_a; i += 1) {
      card = deck.deal();

      if (card) {
        this.hand.push(card);
      } else {
        return false;
      }
    }

    return true;
  }

  showHand() {
    console.log(this.name, this.hand);
    let nazwa = document.createElement("p");
    nazwa.innerHTML = this.name;
    document.getElementById(this.name).appendChild(nazwa);
    this.hand.forEach(element => {
      var elem = document.createElement("img");
      elem.setAttribute("height", "100");
      elem.setAttribute("width", "80");
      let source = element.symbol + "_" + element.tarcza;
      elem.src = 'Card_deck/' + source + '.png';
      document.getElementById(this.name).appendChild(elem);
    });
  
    return this;
  }

  discard() {
    return this.hand.pop();
  }

  score() {
    for (var card, _pj_c = 0, _pj_a = this.hand, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
      card = _pj_a[_pj_c];

      if (card.tarcza === "kier") {
        this.result += card.symbol;
      } else {
        if (card.tarcza === "trefl") {
          this.result += card.symbol * 2;
        } else {
          if (card.tarcza === "karo") {
            this.result += card.symbol * 3;
          } else {
            this.result += card.symbol * 4;
          }
        }
      }
    }
  }

}

let x = function Nickname() {
  var input = document.getElementById("Nickname").value;
  document.getElementById("human").id = input;
  alert(input);
  myDeck = new Deck();
  shuffledDeck = myDeck.shuffle(myDeck.cards)
  console.log(shuffledDeck)
  P1 = new Player(`${input}`, 0);
  P2 = new Player("Alexa", 0);

  for (var e = 1, _pj_a = 11; e < _pj_a; e += 1) {
      if (e % 2 !== 0) {
          P1.draw(myDeck, 1);
      } else {
          P2.draw(myDeck, 1);
      }
  }

  P1.score();
  P2.score();
  P1.showHand();
  P2.showHand();
  if (P1.result > P2.result) {
      let result = `${P1.name} scored ${P1.result} and ${P2.name} scored ${P2.result}. ${P1.name} wins!`;
      document.getElementById("result").innerHTML = result
  } else {
      if (P1.result < P2.result) {
          let result = `${P1.name} scored ${P1.result} and ${P2.name} scored ${P2.result}. ${P2.name} wins!`;
          document.getElementById("result").innerHTML = result
      } else {
          let result = `${P1.name} scored ${P1.result} and ${P2.name} scored ${P2.result}. It's a draw!`;
          document.getElementById("result").innerHTML = result
      }
  }
}


