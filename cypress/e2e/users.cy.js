describe('POST /users', ()=> {

  it('register a new user', ()=> {

    const user = {
      name: 'Nicolas Kumabe',
      email: 'nicolas@yahoo.com',
      password: 'pwd123'
    }
    
    cy.request({
      url: '/users',
      method: 'POST',
      body: user,
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(200)
    })

  })


})