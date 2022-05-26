resource "local_file" "output" {
  content  = <<EOT
![https://frameonesoftware.com](./server/static/frame-one-software-boilerplate.svg)

EOT
  filename = "${path.root}/../README.md"
}