---
name: "[Premade] Deploy Terraform Configuration"
about: This is an issue for planning out any terraform confoguration for the initial
  deploy
title: "[Dev Ops] Deploy Terraform Configuration"
labels: dev ops
assignees: ''

---

**This issue has a list of things that should be done before the first terraform deploy. Feel free to add to the bottom with additional implementation if the project requires anything outside of the basic ecosystem**

# Terraform Checklist
- [ ] Remove any auto generated files if they were accidentely committed on the merged over boilerplate code
- [ ] Add any missing values into `variable.tf` in the root of terraform
- [ ] Add the missing domain values to the `main.tf` in the root of terraform
- [ ] Adjust any atlas settings if necessary (usually only needed if client isn't okay with deploying a production environemnt right away since those costs can be high
- [ ] Setup a storage bucket with a globally unique name in the `main.tf` file so the tf-state can be stored their
- [ ] Make absolutely sure the `project`, `region` and `zone` variables are set properly from the `variable.tf` as these cannot be undone after intitial apply without a major overhaul
- [ ] Run a `terraform plan` and then `terraform apply` using an appropriately logged in Google Account locally
