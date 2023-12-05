describe('POST /tasks', () => {

    beforeEach(function () {
        cy.fixture('tasks').then(function (tasks) {
            this.tasks = tasks
        })
    })

    it('register a new task', function () {
        const { user, task } = this.tasks.create

        cy.task('deleteUser', user.email)
        cy.postUser(user)

        cy.postSession(user)
            .then(response => {
                cy.task('deleteTask', task.name, user.email)

                cy.postTask(task, response.body.token)
                    .then(response => {
                        expect(response.status).to.eq(200)
                    })
            })
    })
})