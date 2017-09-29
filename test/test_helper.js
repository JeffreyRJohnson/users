const mongoose = require('mongoose');

mongoose.Promise = Promise;

before((done) => {
    mongoose.connect('mongodb://localhost/users_test', {
        useMongoClient: true,
        promiseLibrary: global.Promise
    });
    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
            console.log('Warning', error);
        });
});



beforeEach((done) => {
    const { users, comments, blogposts } = mongoose.connection.collections;
    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            });
        });
    });
});