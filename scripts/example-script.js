let { format } = await npm("date-fns")
let { context } = await npm("@actions/github")
let { Octokit } = await npm("@octokit/rest")
let sharp = await npm("sharp")

let { owner, repo } = context.repo

let github = new Octokit({
  auth: await env("GITHUB_TOKEN"),
})

let url = await arg("Enter url:")
let width = await arg("Enter width:")
let height = await arg("Enter height:")

let dateTag = format(new Date(), "yyyy-MM-dd-HH-mm")
let releaseResponse = await github.rest.repos.createRelease({
  owner,
  repo,
  tag_name: dateTag,
})

let headers = {
  "content-type": "image/png",
}

let buffer = await download(url)
let data = await sharp(buffer).resize(width, height)

let uploadResponse = await github.rest.repos.uploadReleaseAsset({
  headers,
  owner,
  repo,
  release_id: releaseResponse.data.id,
  name: path.basename(url),
  data,
})

console.log(`url: ${uploadResponse.data.browser_download_url}`)
