let { format } = await npm("date-fns")
let { context } = await npm("@actions/github")
let { Octokit } = await npm("@octokit/rest")

let { owner, repo } = context.repo

let github = new Octokit({
  auth: await env("REPO_TOKEN"),
})

let url = await url("Enter url:")

let dateTag = format(new Date(), "yyyy-MM-dd-HH-mm")
let releaseResponse = await github.rest.repos.createRelease({
  owner,
  repo,
  tag_name: dateTag,
})

let headers = {
  "content-type": "image/png",
}

let uploadResponse = await github.rest.repos.uploadReleaseAsset({
  headers,
  owner,
  repo,
  release_id: releaseResponse.data.id,
  name: path.basename(url),
  data: await download(url),
})

console.log(`url: ${uploadResponse.data.browser_download_url}`)
