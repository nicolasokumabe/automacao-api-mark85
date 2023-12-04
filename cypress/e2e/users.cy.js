describe('POST /users', () => {

  it('register a new user', () => {

    const user = {
      name: 'Nicolas Kumabe',
      email: 'nicolas@yahoo.com',
      password: 'pwd123'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user)
      .then(response => {
        expect(response.status).to.eq(200)
      })
  })
})

