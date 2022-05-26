resource "local_file" "output" {
  content  = <<EOT
![https://frameonesoftware.com](./server/static/frame-one-software-boilerplate.svg)

## Pull the Newest Container
`docker pull gcr.io/frame-one-software-placeholder/image:latest`

## Example Deployment
The following is a link to an active deployment of the docker container running on cloud run.

[${google_cloud_run_service.example-cloud-run.status[0].url}](${google_cloud_run_service.example-cloud-run.status[0].url})

EOT
  filename = "${path.root}/../README.md"
}