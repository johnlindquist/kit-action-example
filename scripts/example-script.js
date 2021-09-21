console.log(`👀 Starting...`)

let { GitHub, context } = await npm("@actions/github")

console.log(
  `🟢 AFTER npm ${process.env.GITHUB_TOKEN.slice(0, 5)}`
)

let github = new GitHub(process.env.GITHUB_TOKEN)
let { owner, repo } = context.repo

console.log({ owner, repo })
console.log({ github })

let releaseResponse = await github.repos.createRelease({
  owner,
  repo,
  target_commitish: context.sha,
  tag_name: `some-tag`,
})

let uploadResponse = github.repos.uploadReleaseAsset({
  url: releaseResponse.data.upload_url,
  name: `john.png`,
  assetPath: `./john.png`,
  file: await download(
    `https://johnlindquist.com/images/logo/john@2x.png`
  ),
})

console.log(`url: ${response.data.browser_download_url}`)
