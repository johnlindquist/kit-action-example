let { format } = await npm("date-fns")
let { statSync } = await import("fs")
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

  let imagePath = home("john.png")
  await writeFile(
    imagePath,
    await download(
      `https://johnlindquist.com/images/logo/john@2x.png`
    )
  )

  let headers = {
    "content-type": "image/png",
    "content-length": statSync(imagePath).size,
  }

  let uploadResponse =
    await github.rest.repos.uploadReleaseAsset({
      headers,
      owner,
      repo,
      release_id: releaseResponse.data.id,
      name: "",
      data: await readFile(imagePath),
      label: "",
    })

  console.log(`🤔 uploadResponse`)
  console.log(uploadResponse.data)

  console.log(`url: ${response.data.browser_download_url}`)
} catch (error) {
  console.log(error)
}

export {}
