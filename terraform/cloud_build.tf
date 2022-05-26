data "google_project" "project" {}

locals {
  gcr_image_path = "gcr.io/${data.google_project.project.project_id}/image"
}

resource "google_cloudbuild_trigger" "trigger" {
  name        = "build-and-deploy"
  description = "Will pull and push a new version to the Google Cloud Repository and make it public."
  filename    = "cloudbuild.yaml"
  github {
	owner = "Frame-One-Software"
	name  = "frame-one-software-placeholder"
	push {
	  tag = ".*"
	}
  }
  substitutions = {
	_GCR_IMAGE_PATH = local.gcr_image_path
	_CLOUD_RUN_NAME = google_cloud_run_service.example-cloud-run.name
	_CLOUD_RUN_REGION = "us-central1"
  }
}

# Set the necessary permissions for the cloud build service agent
resource "google_project_iam_member" "service_account_iam_member_cloub_build_service_agent" {
  project = data.google_project.project.project_id
  role    = "roles/cloudbuild.serviceAgent"
  member  = "serviceAccount:${data.google_project.project.number}@cloudbuild.gserviceaccount.com"
}

resource "google_project_iam_member" "service_account_iam_member_cloud_run_admin" {
  project = data.google_project.project.project_id
  role    = "roles/run.admin"
  member  = "serviceAccount:${data.google_project.project.number}@cloudbuild.gserviceaccount.com"
}

resource "google_project_iam_member" "developer_iam_member_service_account_user" {
  project = data.google_project.project.project_id
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${data.google_project.project.number}@cloudbuild.gserviceaccount.com"
}
