describe('User flow', () => {
    it('should register, login, upload, get, get all and delete a song', () => {
            cy.fixture('data/song.mp3').then((audioFile) => {
                cy.fixture('data/image.png').then((coverFile) => {
                    const user = {
                        username: 'test-flow2',
                        email: 'test@testflow2.com',
                        password: 'password'
                      };
                    // Register user
                    cy.request('POST', 'http://localhost:3002/api/user', user)
                        .its('status').should('equal', 201)
                        .then((response) => {
                            cy.request('POST', 'http://localhost:3002/api/auth', user)
                                .its('status').should('equal', 200)
                                .then((response) => {
                                    const userId = response.user.id;
                                    const token = response.token;

                                    // Upload song
                                    const formData = new FormData();
                                    formData.append('name', 'Test Song');
                                    formData.append('artist', 'Test Artist');
                                    formData.append('audio_file', audioFile);
                                    formData.append('cover_art', coverFile);

                                    cy.request({
                                        method: 'POST',
                                        url: `http://localhost:3002/api/song/${userId}`,
                                        body: formData,
                                        headers: {
                                            'Content-Type': 'multipart/form-data',
                                            'Authorization': `Bearer ${token}`,
                                        },
                                    })
                                        .its('status').should('equal', 201)
                                        .then((response) => {
                                            const songId = response.song.id;
                                            // Get song by id
                                            cy.request('GET', `http://localhost:3002/api/song/${songId}`)
                                                .its('status').should('equal', 200)
                                                //.its('body').should('deep.equal', formData);

                                            // Get all songs
                                            cy.request('GET', 'http://localhost:3002/api/songs')
                                                .its('status').should('equal', 200)
                                                .its('body').should('include', formData);

                                            // Delete song
                                            cy.request({
                                                method: 'DELETE',
                                                url: `http://localhost:3002/api/song/${songId}`,
                                                headers: {
                                                    'Authorization': `Bearer ${token}`,
                                                },
                                            })
                                                .its('status').should('equal', 200);
                                        });
                                });
                        });
                });
            });
        });
});
