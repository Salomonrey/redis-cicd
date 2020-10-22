const request = require('supertest')
const app = require('../app')
let server = request(app);

describe('Post Endpoints', () => {
  it('should get doctors list', async done => {
    // const file = new File(['dummy content'], 'example.png', {type: 'image/png'})
    const res = await server.get('/doctors')
    expect(res.status).toBe(200)
    expect(res.body.length>0).toBe(true)
    done()
  })
})

describe('Post Endpoints', () => {
  it('should get hospital list', async done => {
    const res = await server.get('/hospitals')
    expect(res.status).toBe(201)
    expect(res.body.length>0).toBe(true)
    done()
  })
})
