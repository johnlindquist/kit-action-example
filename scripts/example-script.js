let response = await get(
  "https://api.github.com/users/johnlindquist/repos"
)

console.log(response.data)
