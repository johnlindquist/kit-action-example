let { format } = await npm("date-fns")
let g = await npm("@actions/github")

try {
  let { owner, repo } = g.context.repo
  console.log({ owner, repo })
  let github = g.getOctokit(process.env.GITHUB_TOKEN)

  console.log({ github })

  let dateTag = format(new Date(), "yyyy-MM-dd-HH-mm-SS")
  let releaseResponse =
    await github.rest.repos.createRelease({
      owner,
      repo,
      tag_name: dateTag,
    })

  console.log(`🤔 releaseResponse`)
  console.log(releaseResponse.data)

  await github.rest.repos.uploadReleaseAsset({
    headers: { "Content-Type": "application/json" },
    owner,
    repo,
    release_id: releaseResponse.data.id,
    name: `package.json`,
    file: await readFile(home("package.json")),
  })

  console.log(`🤔 uploadResponse`)
  console.log(uploadResponse.data)

  console.log(`url: ${response.data.browser_download_url}`)
} catch (error) {
  console.log(error)
}
