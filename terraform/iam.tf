locals {

  # List of people that need extra permissions
  admins = toset([
    "spencer@frameonesoftware.com",
    "victor.li@frameonesoftware.com"
  ])

  # List of developers that need access
  developers = toset([
	"raymond.chiu@frameonesoftware.com",
    "jeff.hall@frameonesoftware.com",
    "matthew.hu@frameonesoftware.com",
    "richard.hung@frameonesoftware.com",
    "susan.li@frameonesoftware.com"
  ])

  # List of emails that just need view access
  viewers = toset([
    "jerry.kou@frameonesoftware.com",
  ])
}

resource "google_project_iam_member" "owners" {
  for_each = local.admins
  project = data.google_project.project.name
  role    = "roles/owner"
  member  = "user:${each.value}"
}

resource "google_project_iam_member" "security_admins" {
  for_each = local.admins
  project = data.google_project.project.name
  role    = "roles/compute.securityAdmin"
  member  = "user:${each.value}"
}

resource "google_project_iam_member" "editors" {
  for_each = local.developers
  project = data.google_project.project.name
  role    = "roles/editor"
  member  = "user:${each.value}"
}

resource "google_project_iam_member" "storage_admins" {
  for_each = local.admins
  project = data.google_project.project.name
  role    = "roles/storage.objectAdmin"
  member  = "user:${each.value}"
}

resource "google_project_iam_member" "storage_developers" {
  for_each = local.developers
  project = data.google_project.project.name
  role    = "roles/storage.objectAdmin"
  member  = "user:${each.value}"
}

resource "google_project_iam_member" "viewers" {
  for_each = local.viewers
  project = data.google_project.project.name
  role    = "roles/storage.objectAdmin"
  member  = "user:${each.value}"
}

