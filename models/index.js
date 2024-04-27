const user = require('./user');
const post = require('./post');
const comment = require('./comment');

user.hasMany(post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

post.belongsTo(user, {
    foreignKey: 'user_id'
});

post.hasMany(comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

comment.belongsTo(post, {
    foreignKey: 'post_id'
});

module.exports = { user, post, comment };