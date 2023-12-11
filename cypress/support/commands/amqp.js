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