module.exports = mongoose => {
  const Category = mongoose.model(
    "category",
    mongoose.Schema(
      {
        name: String
      },
      { timestamps: true }
    )
  )

  return Category
}