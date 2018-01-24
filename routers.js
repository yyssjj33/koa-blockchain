const Router = require('koa-router');
const router = new Router();

const Blockchain = require('./model/Blockchain');
const blockchain = new Blockchain();

const uuidv4 = require('uuid/v4');

const nodeId = uuidv4().replace(/-/g, '');

router.get('/mine', (ctx) => {
  const lastBlock = blockchain.lastBlock
  const lastProof = lastBlock.proof
  proof = blockchain.pow(lastProof)

  blockchain.addTransaction( '0', nodeId, 1)

  const previousHash = blockchain.hash(lastBlock)
  const block = blockchain.addBlock(proof, previousHash)

  ctx.status = 200
  ctx.body = {
    status: 'success',
    data: {
      message: "New Block Forged",
      index: block.index,
      transactions: block.transactions,
      proof: block.proof,
      previousHash: block.previous_hash,
    }
  }
})

router.post('/transactions/new', (ctx) => {
  const postData = ctx.request.body
  const requiredKeys = ['sender', 'recipent', 'amount']
  for (let key of Object.keys(postData)) {
    if (requiredKeys.indexOf(key) < 0) {
      ctx.status = 400
      ctx.body = {
        status: 'fail',
        data: "Missing values"
      }
      return
    }
  }
  const index = blockchain.addTransaction(postData['sender'], postData['recipent'], postData['amount'])
  ctx.status = 201
  ctx.body = {
    status: 'success',
    message: `Transaction will be added to Block ${index}'`
  }
})

router.get('/chain', (ctx) => {
  ctx.status = 200
  ctx.body = {
    chain: blockchain.chain,
    length: blockchain.chain.length,
  }
})

module.exports = router