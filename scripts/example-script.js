let { format } = await npm("date-fns")
let sharp = await npm("sharp")

let { owner, repo } = github.context.repo

let octokit = github.getOctokit(await env("GITHUB_TOKEN"))

let url = await arg("Enter url:")
let width = await arg("Enter width:")
let height = await arg("Enter height:")

let dateTag = format(new Date(), "yyyy-MM-dd-HH-mm")
let releaseResponse = await octokit.rest.repos.createRelease({
  owner,
  repo,
  tag_name: dateTag,
})

let headers = {
  "content-type": "image/png",
}

let buffer = await download(url)
let data = await sharp(buffer).resize(width, height)

let uploadResponse = await octokit.rest.repos.uploadReleaseAsset({
  headers,
  owner,
  repo,
  release_id: releaseResponse.data.id,
  name: path.basename(url),
  data,
})

console.log(`url: ${uploadResponse.data.browser_download_url}`)
