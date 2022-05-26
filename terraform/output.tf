resource "local_file" "output" {
  content  = <<EOT
![https://frameonesoftware.com](./server/static/frame-one-software-boilerplate.svg)

# Frame One Software Placeholder
There are numerous times during the dev ops deployments, that a placeholder container is needed. In the past, Frame One Software has used `us-docker.pkg.dev/cloudrun/container/hello`, but it is lacking a personal branding and openness to add features. The Frame One Software Placeholder is a public docker container that can be used in all of the same cases, but is catered to the tech stack of the Frame One Software Boilerplate.

## `${local.gcr_image_path}:latest`

## Example Deployment
The following is a link to an active deployment of the docker container running on cloud run.

[${google_cloud_run_service.example-cloud-run.status[0].url}](${google_cloud_run_service.example-cloud-run.status[0].url})

## How to Run

To run the container locally, you must pull to get the latest deployment
```bash
docker pull ${local.gcr_image_path}:latest
```
then you can run the latest deployment with
```bash
docker run --env PORT=8080 --publish 8080:8080 ${local.gcr_image_path}
```

You can run these both together quickly with...
```bash
docker pull ${local.gcr_image_path}:latest && docker run --env PORT=8080 --publish 8080:8080 ${local.gcr_image_path}
```

### Docker Compose
Adding the following to a docker compose will allow pulling the image for use.

```yml
version: "3.8"

services:
  remote:
    image: gcr.io/frame-one-software-placeholder/image:latest
    ports:
      - "8080:8080"
    environment:
      PORT: 8080
```

### Other Versions
The image is public and all previous tags can be viewed here...

[https://console.cloud.google.com/gcr/images/${data.google_project.project.project_id}/global/image](https://console.cloud.google.com/gcr/images/${data.google_project.project.project_id}/global/image)


EOT
  filename = "${path.root}/../README.md"
}