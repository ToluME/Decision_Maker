const db = require('../connection');

// Get all users
const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => data.rows);
};

// Create a new poll
const createPoll = (email, admin_link, submission_link) => {
  return db.query(`
    INSERT INTO polls (email, admin_link, submission_link)
    VALUES ($1, $2, $3)
    RETURNING *;
  `, [email, admin_link, submission_link])
    .then(data => data.rows[0]);
};

// Submit a vote for a choice
const submitVote = (choice_id, rank) => {
  return db.query(`
    INSERT INTO votes (choice_id, rank)
    VALUES ($1, $2)
    RETURNING *;
  `, [choice_id, rank])
    .then(data => data.rows[0]);
};

module.exports = {
  getUsers,
  createPoll,
  submitVote
};
