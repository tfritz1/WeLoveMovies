const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const {reviewId} = req.params
  const review = await service.read(reviewId)
  if (review) {
    res.locals.review = review
    return next()
  }
  return next({ status: 404, message: `Review cannot be found.`})
}

async function update(req, res) {
  const {reviewId} = req.params
  await service.update(reviewId, req.body.data)
  res.json({data: await service.getUpdatedReview(reviewId)})
}

async function destroy(req, res) {
  const {reviewId} = req.params
  await service.delete(reviewId)
  res.sendStatus(204)
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
