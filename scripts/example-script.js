let { format } = await npm("date-fns")
let sharp = await npm("sharp")

let octokit = github.getOctokit(await env("GITHUB_TOKEN"))

console.log({ octokit })

let url = await arg("Enter url:")
let width = await arg("Enter width:")
let height = await arg("Enter height:")

let dateTag = format(new Date(), "yyyy-MM-dd-HH-mm")
let releaseResponse = await octokit.rest.repos.createRelease({
  ...github.context.repo,
  tag_name: dateTag,
})

let headers = {
  "content-type": "image/png",
}

console.log(`Downloading image from ${url}`)
let buffer = await download(url)
console.log(`Resizing image to ${width}x${height}`)
let data = await sharp(buffer).resize(+width, +height)
console.log(`Uploading image to release`)

let uploadResponse = await octokit.rest.repos.uploadReleaseAsset({
  headers,
  ...github.context.repo,
  release_id: releaseResponse.data.id,
  name: path.basename(url),
  data,
})

console.log(`url: ${uploadResponse.data.browser_download_url}`)
