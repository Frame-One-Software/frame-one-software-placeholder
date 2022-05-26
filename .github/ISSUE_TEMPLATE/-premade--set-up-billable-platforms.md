---
name: "[Premade] Set up Billable Platforms"
about: This is a checklist of things to setup together with the client
title: "[Dev Ops] Set up Billable Platforms"
labels: dev ops
assignees: ''

---

The following platforms will need to be setup with the client. This issue can be used as a checklist when in a meeting with the client to setup each part that is needed

**This list is a standard list we use for most projects. You most likely will need to add or remove some from the list based on circumstances**

## Google Cloud Platform (GCP)
- [ ] Create Google Organization or equivalent account to be the owner of the GCP Project
- [ ] Enable billing on that account and have the client input their Credit Card info
- [ ] Add our team members as you see fit as "Owner" roles on the organization and/or project. Sometimes we require an extra permission in storage, however it seems change all the time, what this permission is
- [ ] Do a quick test by enabling Cloud Run. This will fail if billing isn't setup properly

## MongoDB Atlas
- [ ] Create a MongoDB Atlas account
- [ ] Create an orgnization under it
- [ ] Add any team members as you see fit. Whomever is in charge of booting instances, needs to be an owner.
- [ ] Have the client insert their billing information

## Domain Provider
- [ ] Have the client give you access to the domain provider either by adding you as a user or they give you their credentials.
- [ ] Login and take a screenshot of the current DNS settings, paste them in this github issue for reference

## Twilio (Optional)
- [ ] Have them setup a twilio account
- [ ] Make a project and add yourself or any team members you see fit
- [ ] Rename their project away from the default name or else it will be impossible to differentiate all of the clients, witjh the default name
- [ ] Have the client put in their billing information
- [ ] Buy a phone number with the client
- [ ] Create an API key and put into the terraform and local.env

## Sendgrid (Optional)
- [ ] Have them setup a sendgrid account
- [ ] Have them invite you. You will need a whole new account every time (use the email + trick).
- [ ] Have them input their billing information
- [ ] Connect their domain and create a Sender. Add this sender to the terraform and local.env
- [ ] Generate an API key and put in terraform and the local.env

## Infura (Optional)
- [ ] Have them make an infura account. Have them give you the credentials
- [ ] Have them input their billing information
- [ ] If using other chains besides ethereum, make them select the proper addons (pretty sure polygon is the only one that has the free addon)
