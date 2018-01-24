const crypto = require('crypto');
class Blockchain {
  constructor() { 
    this.chain = []
    this.currentTransactions = []
    this.addBlock(1, 100)
  }

  pow(lastProof) {
    let proof = 0
    while (!this.validatePow(lastProof, proof)) {
      proof += 1
    }
    return proof
  }

  validatePow(lastProof, proof) {
    const guess = `${lastProof}${proof}`
    const guessHash = this.sha256(guess);
    return guessHash.slice(0, 4) === '0000'
  }

  addBlock(proof, previousHash=null) {
    const block = {
      index: this.chain.length+1,
      timestamp: new Date().getTime(),
      transactions: this.currentTransactions,
      proof,
      previousHash: previousHash || this.hash(this.lastBlock)
    }
    this.currentTransactions = []
    this.chain.push(block)
    return block
  }

  addTransaction(sender, recipent, amount) {
    this.currentTransactions.push({
      sender,
      recipent,
      amount,
    })
    return this.lastBlock.index+1
  }

  hash(block) {
    const blockString = JSON.stringify(block, Object.keys(block).sort())
    return this.sha256(blockString)
  }

  sha256(str) {
    return crypto.createHmac('sha256', str).digest('hex')
  }

  get lastBlock() {
    if (this.chain.length)
      return this.chain[this.chain.length-1]
    else
      return {}
  }
}

module.exports = Blockchain
