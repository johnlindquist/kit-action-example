let { format } = await npm("date-fns")
let { statSync } = await import("fs")
let { context } = await npm("@actions/github")
let { Octokit } = await npm("@octokit/rest")

let { owner, repo } = context.repo

let github = new Octokit({
  auth: await env("REPO_TOKEN"),
})

let dateTag = format(new Date(), "yyyy-MM-dd-HH-mm")
let releaseResponse = await github.rest.repos.createRelease(
  {
    owner,
    repo,
    tag_name: dateTag,
  }
)

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
    name: "john.png",
    data: await readFile(imagePath),
  })

console.log(
  `url: ${uploadResponse.data.browser_download_url}`
)
