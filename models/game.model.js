module.exports = mongoose => {
  const Game = mongoose.model(
    "game",
    mongoose.Schema(
      {
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        kiss: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
        marry: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
        kill: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' }
      },
      { timestamps: true }
    )
  )

  return Game
}