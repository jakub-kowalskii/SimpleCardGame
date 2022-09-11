import * as random from 'random';
var Nickname, P1, P2, myDeck;

class Card extends object {
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

class Deck extends object {
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
        this.cards.append(new Card(tarcza, symbol));
      }
    }
  }

  shuffle(num = 1) {
    var lenght, randnum;
    lenght = this.cards.length;

    for (var i = 0, _pj_a = num; i < _pj_a; i += 1) {
      for (var a = lenght - 1, _pj_b = 0; a < _pj_b; a += -1) {
        randnum = random.randint(0, 1);

        if (a === randnum) {
          continue;
        }

        [this.cards[a], this.cards[randnum]] = [this.cards[randnum], this.cards[a]];
      }
    }
  }

  deal() {
    return this.cards.pop();
  }

}

class Player extends object {
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
        this.hand.append(card);
      } else {
        return false;
      }
    }

    return true;
  }

  showHand() {
    console.log("Karty {} to: {}".format(this.name, this.hand));
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

function Nickname() {
    var input = document.getElementById("Nickname").value;
    alert(input);
}

myDeck = new Deck();
myDeck.shuffle();
P1 = new Player(`${Nickname}`, 0);
P2 = new Player("Your opponent", 0);

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
  console.log(`${P1.name} scored ${P1.result} and ${P2.name} scored ${P2.result}. ${P1.name} wins!`);
} else {
  if (P1.result < P2.result) {
    console.log(`${P1.name} scored ${P1.result} and ${P2.name} scored ${P2.result}. ${P2.name} wins!`);
  } else {
    console.log(`${P1.name} scored ${P1.result} and ${P2.name} scored ${P2.result}. It's a draw!`);
  }
}
