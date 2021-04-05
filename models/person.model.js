module.exports = mongoose => {
  const Person = mongoose.model(
    "person",
    mongoose.Schema(
      {
        name: String,
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        imageURL: String,
        info: String,
        kiss: Number,
        marry: Number,
        kill: Number
      },
      { timestamps: true }
    )
  )

  return Person
}