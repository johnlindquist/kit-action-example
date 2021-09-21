let { GitHub } = await import("@actions/github")

let github = new GitHub(process.env.GITHUB_TOKEN)
let response = github.repos.uploadReleaseAsset({
  url: `https://johnlindquist.com/images/logo/john@2x.png`,
  name: `john.png`,
  assetPath: `./john.png`,
})

console.log(`url: ${response.data.browser_download_url}`)
