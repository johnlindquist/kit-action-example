let { format } = await npm("date-fns")
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

let headers = {
  "content-type": "image/png",
}

let uploadResponse =
  await github.rest.repos.uploadReleaseAsset({
    headers,
    owner,
    repo,
    release_id: releaseResponse.data.id,
    name: "john@2x.png",
    data: await download(
      `https://johnlindquist.com/images/logo/john@2x.png`
    ),
  })

console.log(
  `url: ${uploadResponse.data.browser_download_url}`
)
