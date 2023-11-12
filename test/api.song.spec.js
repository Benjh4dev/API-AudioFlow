/*
describe('API de canciones', () => {
    it('Debería devolver un código de estado 200 y canciones válidas', () => {
      cy.request('GET', 'http://localhost:3002/api/song')
        .then((response) => {
          
          expect(response.status).to.equal(200);
  
          
          expect(response.body.songs).to.be.an('array').that.is.not.empty;
  
          
          response.body.songs.forEach((song) => {
            
            expect(song).to.have.property('id');
            expect(song).to.have.property('coverURL');
            expect(song).to.have.property('duration');
            expect(song).to.have.property('user_id');
            expect(song).to.have.property('artist');
            expect(song).to.have.property('audioURL');
  
           
            expect(song.id).to.be.a('string');
            expect(song.coverURL).to.be.a('string');
            expect(song.duration).to.be.a('number');
            expect(song.user_id).to.be.a('string');
            expect(song.artist).to.be.a('string');
            expect(song.audioURL).to.be.a('string');
          });
        });
    });
    it('Debería crear una nueva canción y luego recuperarla', () => {
        // First, make a POST request to create a new song
        cy.fixture('data/song.mp3').then((audioFile) => {
            cy.fixture('data/image.png').then((coverFile) => {
                const formData = new FormData();
                formData.append('name', 'Canción de prueba');
                formData.append('artist', 'Artista de prueba');
                formData.append('audio_file', audioFile);
                formData.append('cover_url', coverFile);

                cy.request({
                    method: 'POST',
                    url: 'http://localhost:3002/api/song/MaGOrjYfVkFVZbuck5yl',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1hR09yallmVmtGVlpidWNrNXlsIiwiaWF0IjoxNjk5NTcwMTUwLCJleHAiOjE2OTk1NzczNTB9.FRGOe7idVRaXiWxmnxRS_CQMn-2uALNHeQHXQ5cHU-Q',
                    },
                }).then((response) => {
                    console.log(response)
                    // Verify that the response has a 201 status code
                    expect(response.status).to.equal(201);

                    // Retrieve the ID of the newly created song
                    const songId = response.body.id;

                    // Make a GET request to retrieve the song by ID
                    cy.request(`GET`, `http://localhost:3002/api/song/${songId}`).then(
                        (response) => {
                            // Verify that the retrieved song matches the original data
                            expect(response.status).to.equal(200);
                            expect(response.body.name).to.equal('Canción de prueba');
                            expect(response.body.artist).to.equal('Artista de prueba');
                        }
                    );
                });
            });
        });
    });

  });
  
*/
