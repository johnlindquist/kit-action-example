let { format } = await npm("date-fns")
let g = await npm("@actions/github")

try {
  let { owner, repo } = g.context.repo
  console.log({ owner, repo })
  let github = g.getOctokit(process.env.GITHUB_TOKEN)

  console.log({ github })

  let dateTag = format(new Date(), "yyyy-MM-dd-HH-mm")
  let releaseResponse =
    await github.rest.repos.createRelease({
      owner,
      repo,
      tag_name: dateTag,
    })

  console.log(`🤔 releaseResponse`)
  console.log(releaseResponse.data)

  await wait(5000)

  let uploadResponse = await github.request(
    "POST /repos/{owner}/{repo}/releases/{release_id}/assets",
    {
      headers: { "Content-Type": "application/json" },
      owner,
      repo,
      release_id: releaseResponse.data.id,
      name: `package.json`,
      data: await readFile(home("package.json")),
    }
  )
  // await github.rest.repos.uploadReleaseAsset({
  //   owner,
  //   repo,
  //   release_id: releaseResponse.data.id,
  //   name: `package.json`,
  //   data: await readFile(home("package.json")),
  // })

  console.log(`🤔 uploadResponse`)
  console.log(uploadResponse.data)

  console.log(`url: ${response.data.browser_download_url}`)
} catch (error) {
  console.log(error)
}
