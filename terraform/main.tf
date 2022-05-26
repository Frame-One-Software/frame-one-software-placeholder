# setup all providers
provider "google" {
  project = "frame-one-software-placeholder"
  region  = "us-central1"
  zone    = "us-central1-a"
}

# configure the storage of the state for the terraform project
terraform {
  backend "gcs" {
	# must be unique across all of gcloud, so you will need to change this for each project
	bucket = "frame-one-software-placeholder-terraform"
	prefix = "terraform/state"
  }
}