---
name: "[Premade] Init Web Project"
about: This is a pre-made issue for a common task of creating a web react project.
title: "[Web] Init React Web Project"
labels: web
assignees: ''

---

# Todos
- [ ] Update Create-React-App or use `npx` with newest stable node version (https://nodejs.org/en/) to init an empty react project (https://create-react-app.dev/docs/adding-typescript/) **Make sure to name the project web, not the name of the project itself wehn initing**
- [ ] Remove the bloat from the initial version
  - [ ] eslint
  - [ ] testing libraries
- [ ] Update the index.html to reflect the env variables, an appropriate description, and an appropriate name in the tab bar
- [ ] Setup Redux with out standard setup
  - [ ] Token Management
  - [ ] Loading incrementing/decremeting
  - [ ] AddError
- [ ] Import our standard components for loading and token management
- [ ] Setup the navigation with the pages we know about so far in the designs, if designs are not done, then just init an empty homepage
- [ ] Create the appropriate theme directory with colours from component guidelines in typescript and scss
- [ ] Add in Dockerfile/Dockerfile.local and add to docker-compose.yml
- [ ] Add entry into the cloudbuild.yaml
- [ ] Copy over the standard server.js
