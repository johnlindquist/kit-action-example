let { format } = await npm("date-fns")
let g = await npm("@actions/github")

try {
  let { owner, repo } = g.context.repo
  console.log({ owner, repo })
  let github = g.getOctokit(process.env.GITHUB_TOKEN)

  console.log({ github })

  let releaseResponse =
    await github.rest.repos.createRelease({
      owner,
      repo,
      tag_name: format(new Date(), "yyyy-MM-dd-HH-mm"),
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
    await github.rest.repos.uploadReleaseAsset({
      owner,
      repo,
      release_id: releaseResponse.data.id,
      name: `john.png`,
      data: await readFile("./john.png"),
    })

  console.log(`🤔 uploadResponse`)
  console.log(uploadResponse.data)

  console.log(`url: ${response.data.browser_download_url}`)
} catch (error) {
  console.log(error)
}
