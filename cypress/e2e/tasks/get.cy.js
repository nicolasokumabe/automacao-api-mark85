describe('GET /tasks', () => {

    beforeEach(function () {
        cy.fixture('tasks/get').then(function (tasks) {
            this.tasks = tasks
        })
    })

    it('get my tasks', function () {

        const { user, tasks } = this.tasks.list

        cy.task('deleteTasksLike', 'Estud4r')

        cy.task('deleteUser', user.email)
        cy.postUser(user)

        cy.postSession(user)
            .then(respUser => {
                // cy.postTask(tasks[0], respUser.body.token)
                // cy.postTask(tasks[1], respUser.body.token)
                // cy.postTask(tasks[2], respUser.body.token)

                tasks.forEach(function (t) {
                    cy.postTask(t, respUser.body.token)
                })

                cy.api({
                    url: '/tasks',
                    method: 'GET',
                    headers: {
                        authorization: respUser.body.token
                    },
                    failOnStatusCode: false
                }).then(response => {
                    expect(response.status).to.eq(200)
                }).its('body')
                    .should('be.an', 'array')
                    .and('have.length', tasks.length)
            })

    })
})

describe('GET /tasks/:id', () => {
    beforeEach(function () {
        cy.fixture('tasks/get').then(function (tasks) {
            this.tasks = tasks
        })
    })

    it('get unique task', function () {
        const { user, task } = this.tasks.unique


        cy.task('deleteTask', task.name, user.email)
        cy.task('deleteUser', user.email)
        cy.postUser(user)

        cy.postSession(user)
            .then(userResp => {

                cy.postTask(task, userResp.body.token)
                    .then(taskResp => {

                        cy.api({
                            url: '/tasks/' + taskResp.body._id,
                            method: 'GET',
                            headers: {
                                authorization: userResp.body.token
                            },
                            failOnStatusCode: false
                        }).then(response => {
                            expect(response.status).to.eq(200)
                        })
                    }) 
            })
    })
})