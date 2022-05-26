locals {
  service_account_name = "${data.google_project.project.number}-compute@developer.gserviceaccount.com"
}


resource "google_cloud_run_service" "example-cloud-run" {
  name                       = "frame-one-software-placeholder"
  location                   = "us-central1"
  autogenerate_revision_name = true

  template {
	spec {
	  service_account_name = local.service_account_name
	  timeout_seconds      = 30
	  containers {
		image = local.gcr_image_path
		resources {
		  limits = {
			memory = "512Mi"
			cpu    = 1
		  }
		}

		env {
		  name  = "REACT_APP_TEST_VARIABLE_0"
		  value = "zero"
		}

		env {
		  name  = "REACT_APP_TEST_VARIABLE_1"
		  value = "one"
		}

		env {
		  name  = "REACT_APP_TEST_VARIABLE_2"
		  value = "two"
		}
	  }
	}
  }

  metadata {
	annotations = {
	  "autoscaling.knative.dev/maxScale" = "5"
	  "run.googleapis.com/ingress"       = "all"
	}

  }

  traffic {
	percent         = 100
	latest_revision = true
  }

  lifecycle {
	ignore_changes = [
	  template[0].metadata[0].annotations["run.googleapis.com/client-name"],
	  template[0].metadata[0].annotations["run.googleapis.com/client-version"],
	  template[0].metadata[0].annotations["client.knative.dev/user-image"],
	  template[0].spec[0].service_account_name
	]
  }

  timeouts {
	create = "2m"
	update = "2m"
  }
}

# Create public access
data "google_iam_policy" "iam_policy_no_auth_access" {
  binding {
	role    = "roles/run.invoker"
	members = [
	  "allUsers",
	]
  }
}

# Add no auth to all instances
resource "google_cloud_run_service_iam_policy" "iam_policy_no_auth_access_service" {
  location    = "us-central1"
  project     = data.google_project.project.project_id
  service     = google_cloud_run_service.example-cloud-run.name
  policy_data = data.google_iam_policy.iam_policy_no_auth_access.policy_data
}