const db = require('../connection');

const Poll = {
  // the create method is used to create a new poll
  create: async (user_id, title, admin_link, submission_link) => {
    try {
      //query to insert into polls table
      const query = `
        INSERT INTO polls (id, user_id, title, admin_link, submission_link)
        VALUES (DEFAULT, $1, $2, $3, $4)
        RETURNING *;
      `;
      // values to be inserted into the query
      const values = [user_id, title, admin_link, submission_link];

      const { rows } = await db.query(query, values);
      return {
        ...rows[0], //Returning the newly created poll object
      };
    } catch (error) {
      throw error;
    }
  },
  findAdminID: async (admin_link) => {
    try {
      //query to insert into polls table
      const query = `
        SELECT *
        FROM polls
        WHERE admin_link = $1;
      `;
      // values to be inserted into the query
      const values = [admin_link];

      const { rows } = await db.query(query, values);
      return {
        ...rows[0], //Returning the newly created poll object
      };
    } catch (error) {
      throw error;
    }
  },
  submissionID: async (submission_link) => {
    try {
      //query to insert into polls table
      const query = `
        SELECT *
        FROM polls
        WHERE submission_link = $1;
      `;
      // values to be inserted into the query
      const values = [submission_link];

      const { rows } = await db.query(query, values);
      return {
        ...rows[0], //Returning the newly created poll object
      };
    } catch (error) {
      throw error;
    }
  },

  getVotesForPoll: async (pollId) => {
    try {
      const query = `
        SELECT choice_id, voter_name, rank
        FROM votes
        WHERE poll_id = $1;
      `;
      const values = [pollId];

      const { rows } = await db.query(query, values);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  //Fetch poll details using the submisson link
  findSubmissionLink: async (submissionLink) => {
    try {
      const query = `
        SELECT *
        FROM polls
        WHERE submission_link = $1;
      `;
      const values = [submissionLink];

      const { rows } = await db.query(query, values);
      return rows[0]; // Returning the poll object
    } catch (error) {
      throw error;
    }
  },

  // Method to update vote count for a choice in the votes table
  updateVoteForChoice: async (pollId, choiceId, voterName, rank) => {
    try {
      const query = `
        INSERT INTO votes (poll_id, choice_id, voter_name, rank)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (poll_id, choice_id, voter_name) DO UPDATE
        SET rank = EXCLUDED.rank;
      `;
      const values = [pollId, choiceId, voterName, rank];

      await db.query(query, values);
    } catch (error) {
      throw error;
    }
  },
  
// Get results for a specific poll
getPollResults: async (pollId) => {
  try {
    const query = `
      SELECT * 
      FROM choices
      WHERE poll_id = $1;
    `;
    const values = [pollId];
    const { rows } = await db.query(query, values);
    return rows;
  } catch (error) {
    throw error;
  }
}
};


module.exports = Poll;
