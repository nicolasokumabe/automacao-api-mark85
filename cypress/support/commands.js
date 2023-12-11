// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('postUser', (user) => {
    cy.api({
        url: '/users',
        method: 'POST',
        body: user,
        failOnStatusCode: false
    }).then(response => { return response })
})

Cypress.Commands.add('postSession', (user) => {
    cy.api({
        url: '/sessions',
        method: 'POST',
        body: { email: user.email, password: user.password },
        failOnStatusCode: false
    }).then(response => { return response })
})

Cypress.Commands.add('postTask', (task, token) => {
    cy.api({
        url: '/tasks',
        method: 'POST',
        body: task,
        headers: {
            authorization: token
        },
        failOnStatusCode: false
    }).then(response => { return response })
})

Cypress.Commands.add('getTasks', (token) => {
    cy.api({
        url: '/tasks',
        method: 'GET',
        headers: {
            authorization: token
        },
        failOnStatusCode: false
    }).then(response => { return response })
})

Cypress.Commands.add('getUniqueTask', (taskId, token) => {
    cy.api({
        url: '/tasks/' + taskId,
        method: 'GET',
        headers: {
            authorization: token
        },
        failOnStatusCode: false
    }).then(response => { return response })
})

Cypress.Commands.add('deleteTask', (taskId, token) => {
    cy.api({
        url: '/tasks/' + taskId,
        method: 'DELETE',
        headers: {
            authorization: token
        },
        failOnStatusCode: false
    }).then(response => { return response })
})

Cypress.Commands.add('putTaskDone', (taskId, token) => {
    cy.api({
        url: `/tasks/${taskId}/done`,
        method: 'PUT',
        headers: {
            authorization: token
        },
        failOnStatusCode: false
    }).then(response => { return response })
})

Cypress.Commands.add('purgeQueueMessages', () => {
    cy.api({
        url: 'https://fish.rmq.cloudamqp.com/api/queues/mrcwistd/tasks/contents',
        method: 'DELETE',
        body: {
            vhost: 'mrcwistd',
            name: 'tasks',
            ode: 'purge'
        },
        headers: {
            authorization: 'Basic bXJjd2lzdGQ6eWtoOEdwc2xQQ3NNYmVrRWRDZUhRQUJsTUpHRHJIa3k='
        },
        failOnStatusCode: false
    }).then(response => { return response })
})

Cypress.Commands.add('getMessageQueue', () => {
    cy.api({
        url: 'https://fish.rmq.cloudamqp.com/api/queues/mrcwistd/tasks/get',
        method: 'POST',
        body: {
            vhost: 'mrcwistd',
            name: 'tasks',
            truncate: '50000',
            ackmode: 'ack_requeue_true',
            encoding: 'auto',
            count: '1'
        },
        headers: {
            authorization: 'Basic bXJjd2lzdGQ6eWtoOEdwc2xQQ3NNYmVrRWRDZUhRQUJsTUpHRHJIa3k='
        },
        failOnStatusCode: false
    }).then(response => { return response })
})