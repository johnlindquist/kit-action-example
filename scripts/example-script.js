console.log(`👀 Starting...`)

let { GitHub, context } = await npm("@actions/github")

console.log(
  `🟢 AFTER npm ${process.env.GITHUB_TOKEN.slice(0, 5)}`
)
let { owner, repo } = context.repo

console.log({ owner, repo, GitHub })

console.log(`🧠 Right before init Github`)

try {
  let github = new GitHub(process.env.GITHUB_TOKEN)

  console.log({ github })

  let releaseResponse = await github.repos.createRelease({
    owner,
    repo,
    tag_name: `some-tag`,
  })

  console.log(`🤔 releaseResponse`)
  console.log(releaseResponse.data)

  await writeFile(
    "./john.png",
    await download(
      `https://johnlindquist.com/images/logo/john@2x.png`
    )
  )

  let uploadResponse =
    await github.repos.uploadReleaseAsset({
      owner,
      repo,
      url: releaseResponse.data.upload_url,
      name: `john.png`,
      assetPath: `./john.png`,
      file: await readFile("./john.png"),
    })

  console.log(`🤔 uploadResponse`)
  console.log(uploadResponse.data)

  console.log(`url: ${response.data.browser_download_url}`)
} catch (error) {
  console.log(error)
}
