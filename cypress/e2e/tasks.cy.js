describe('POST /tasks', () => {

    beforeEach(function () {
        cy.fixture('tasks').then(function (tasks) {
            this.tasks = tasks
        })
    })

    it('register a new task', function () {

        const { user, task } = this.tasks.create

        cy.postSession(user)
            .then(response => {
                cy.log(response.body.token)

                cy.api({
                    url: '/tasks',
                    method: 'POST',
                    body: task,
                    headers: {
                        authorization: response.body.token
                    },
                    failOnStatusCode: false
                }).then(response => {
                    expect(response.status).to.eq(200)
                })
            })
    })
})