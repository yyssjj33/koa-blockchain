class Blockchain {
  constructor() { 
    this.chain = []
    this.currentTransactions = []
  }

  addBlock() {

  }

  addTransaction(sender, recipent, amount) {
    this.currentTransactions.append
  }

  hash(block) {

  }

  get lastBlock() {
    if (this.chain.length)
      return this.chain[this.chain.length-1]
    else
      return {}
  }
}

module.exports = Blockchain
