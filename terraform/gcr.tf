resource "google_container_registry" "registry" {}

data "google_iam_policy" "viewer" {
  binding {
    role = "roles/storage.objectViewer"
    members = [
      "allUsers",
    ]
  }
}

resource "google_storage_bucket_iam_policy" "public_access" {
  bucket = google_container_registry.registry.id
  policy_data = data.google_iam_policy.viewer.policy_data
}