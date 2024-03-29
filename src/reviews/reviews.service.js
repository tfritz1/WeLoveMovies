const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCriticInfo = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
})

function read(reviewId) {
  return knex("reviews as r")
    .select("*")
    .where({ review_id: reviewId })
    .first()
}

function update(reviewId, updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .update(updatedReview, "*")
}

function getUpdatedReview(reviewId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id: reviewId })
    .first()
    .then((result) => {
      const updatedReview = addCriticInfo(result)
      updatedReview.critic_id = updatedReview.critic.critic_id
      return updatedReview
    })
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del()
}

module.exports = {
  update,
  getUpdatedReview,
  read,
  delete: destroy,
};
