---
title: "Designing GitHub workflows for automated releases"
author: thomas
author_url: https://github.com/thomaseizinger
author_image_url: https://avatars1.githubusercontent.com/u/5486389
tags: [github,automation,gitflow,releases]
---

Applied in the right circumstances, using GitFlow as your branching model can make life significantly easier.
The COMIT team decided to adopt GitFlow for [`comit-rs`](https://github.com/comit-network/comit-rs) quite some time ago because it allows development to continue while a release is in progress, hence removing friction from our development flow.

This post gives a quick overview of how we are using GitHub actions to automate most of the aspects around drafting releases.

<!--truncate-->

When drafting a release, there is two things we want to have control over:

1. The next version number
2. The Git revision

Everything else around drafting a release can be implied from these two pieces of information.
Good automation gives you control over what you care about and hides all the other stuff from you.

The [`RELEASING.md`](https://github.com/comit-network/comit-rs/blob/dev/RELEASING.md#technical-documentation) document in the repository already explains some of the design aspects around the process we implemented but there are a few things that I would like to place emphasis on.

## Using a dedicated bot user

[By default](https://docs.github.com/en/actions/reference/authentication-in-a-workflow#about-the-github_token-secret), GitHub actions injects an access token into your workflows as `secrets.GITHUB_TOKEN`.
This token is used to authenticate against the GitHub API and shows up as the `github-actions[bot]` user.
This is quite convenient but also has limitations.
Rightfully, GitHub is [preventing](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#triggering-new-workflows-using-a-personal-access-token) you from creating recursive workflows.
For example, if one of your workflows pushes a new branch, a CI workflow usually triggered by the `push` event will not run.

This is one of the reasons why we are using a dedicated [bot user](https://github.com/comit-botty-mc-botface) for our releases.
In GitFlow, drafting a new release starts by creating a release branch like `release/0.10.0`.
Our automation does this for us, pushes the branch and opens a PR against `master` (remember that in GitFlow, development happens on a `dev` or `develop` branch).
If we would be using the standard `GITHUB_TOKEN` for this, our CI workflow would not be triggered for the release branch.
That is a pity because obviously, we would like to verify that the revision we are about to release actually works and should hence be tested!
 A nice benefit of using GitFlow is that we could actually have a dedicated release-CI workflow that performs more exhaustive checks and is triggered by any push to a `release/*` branch.
 We are not doing that yet but it is something to keep in mind.

By using a dedicated bot user, we can work around this limitation and our CI workflow is properly triggered after the bot pushes the release branch.

To use a dedicated bot user:

1. create a personal access token for that user
2. create a secret that is accessible to the repository that contains your workflow
3. reference the secret in the required workflow steps: https://github.com/comit-network/comit-rs/blob/acabab36058b4e3d3ae54bde10fd7ce5db66f1a5/.github/workflows/create-cnd-gh-release.yml#L30

GitHub actually supports [organization-wide](https://github.blog/2020-05-22-keep-your-secrets-synced-across-multiple-repositories-with-organization-secrets/) secrets.
If you don't want to create a new token for every one of your repositories, you can store the token as an organization secret and it will be accessible to all repositories.

## Using `workflow_dispatch` triggers

In a previous version of our release process, we used issues as the initial trigger.
I wrote about this on [my personal blog](https://blog.eizinger.io/12274/using-github-actions-and-gitflow-to-automate-your-release-process) in detail in case you are interested.

Fortunately, GitHub has since moved on and [added](https://github.blog/changelog/2020-07-06-github-actions-manual-triggers-with-workflow_dispatch/) the `workflow_dispatch` event.
This allows us to create a workflow with user input that can be triggered at the click of a button.

As you might have already guessed, this is what we [did](https://github.com/comit-network/comit-rs/blob/acabab36058b4e3d3ae54bde10fd7ce5db66f1a5/.github/workflows/draft-new-cnd-release.yml#L3-L8).
Given a version, the user with write access can trigger the release process which kicks-off the release process.

Personally, I find the ability to trigger workflows this way pretty cool as it opens up a lot of opportunities to automate aspects of your development cycle.

## Modular workflows

Our release process is split into three different workflows:

1. The initial workflow, triggered by the `workflow_dispatch` event
2. Creating a GitHub release, triggered by the release-branch being merged into `master`
3. Building the binaries and attaching them, triggered by the `release` event

This separation has several nice benefits:

### Maintainability

It makes the individual files smaller, making them easier to understand and maintain.

### Reusability

Modular workflows are easier to reuse.
For example, we recently [added](https://github.com/comit-network/ambrosia/pull/82) automated releases to [Ambrosia](https://github.com/comit-network/ambrosia) - a frontend for cnd that we are currently developing.
We are not using GitFlow for Ambrosia.
Contrary to `comit-rs`, releases in Ambrosia are triggered by creating manually creating a GitHub release.
As such, we just needed a workflow that builds and attaches binaries to a release.
This is exactly what the workflow (3) in `comit-rs` does and hence we were able to largely copy the design of this workflow.

### Easier testing

Different trigger events allow for easier testing of the individual workflows.
Testing GitHub action workflows is usually quite the pain.
However, the above split made it actually quite easy to trigger just the workflow I was building.

### The parallel-job dilemma

For our releases, we wanted to build our binaries for Linux, MacOS and Windows.
Running [the same job on multiply platforms](https://github.com/comit-network/comit-rs/blob/acabab36058b4e3d3ae54bde10fd7ce5db66f1a5/.github/workflows/release-cnd.yml#L11-L14) is quite easy with GitHub action's [job matrix](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstrategy).
By default, this executes each step in the job on each platform.
Unfortunately, this doesn't play well with [`@actions/create-release`](https://github.com/actions/create-release) and [`@actions/upload-release-asset`](https://github.com/actions/upload-release-asset).

1. The release can only be created once.
2. The asset has to be built and uploaded for each platform.
3. To upload the asset, we need access to the `upload_url` output of the `create-release` action.

Esp. the combination if (1) and (3) means we cannot use [conditional steps](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsif) to only create the release once because we would be missing the step output for the upload.
To compose these actions together properly, we would need to create two jobs, one for creating the release and one for building and uploading the asset.
But to upload the asset we need the `upload_url` from the `create-release` action output.
Step outputs are not carried over between jobs so we would have to do something like writing the URL to file and use [`@actions/upload-artifact`](https://github.com/actions/upload-artifact) to move it to the next job.

For me, there are certain moments in software development where - despite knowing a solution - a part of me refuses to build it because it is so absurdly complicated for what it should achieve that I keep searching for a different solution.
Writing a URL to a file, uploading it as an artifact and downloading it again in a different job was one of these solutions.

Fortunately, I came across [this](https://github.com/actions/create-release#example-workflow---create-a-release) section of the `@actions/create-release` documentation where it says:

> This will create a Release, as well as a release event, which could be handled by a third party service, or by GitHub Actions for additional uses, for example the @actions/upload-release-asset GitHub Action.

Eureka!
By splitting my workflow into two, I no longer needed to worry about the above problem.
I would simply have [one workflow](https://github.com/comit-network/comit-rs/blob/dev/.github/workflows/create-cnd-gh-release.yml) that creates the release and is only run on a single platform and a [second workflow](https://github.com/comit-network/comit-rs/blob/dev/.github/workflows/release-cnd.yml) that is triggered by the `release` event and runs on all platforms we want to build our binary on.
The `release` event contains the `upload_url` so we can simply pass it into the `@actions/upload-release-asset` action.

## Local actions for code-reuse

Whilst having modular workflows was a good experience, it did create some code duplication between the different workflows.
With GitHub actions, the unit of code reuse is a GitHub action.
However, releasing a GitHub action to the marketplace felt like an overkill for this problem.
Fortunately, a step can [reference](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#example-using-action-in-the-same-repository-as-the-workflow) an action that is stored within the same repository.

This allowed me to extract [two](https://github.com/comit-network/comit-rs/tree/dev/.github/actions) otherwise duplicated sections of different workflows into dedicated actions and reuse them.

## Releasing several components from the same repository

The `comit-rs` repository is a Cargo workspace and therefore home to several crates.
Two of them are binaries that are released using the workflows discussed in this post.
In the future, we might also release crates to https://crates.io/ from the repository.

Regarding the two binaries, I had to make a decision in the workflow design:

The release process is very similar, do I make one configurable workflow or duplicate most of the code?

In the end, I settled with two separate workflows that are almost identical.
While one could complain about this duplicated code, I don't think it is very harmful in this case.

1. The two workflows are similar for now but that doesn't mean they always will be.
There is already one difference: `cnd` is also published as a docker image, whereas `nectar` isn't.
It is little details like that which would require configuration of the workflow, making it harder to maintain.
2. Testing workflows is mostly a manual process.
Not having to worry about different configuration combinations greatly simplifies maintenance.
3. It is much easier to follow along what the workflow does if there are several "hardcoded" values like [the prefix of the tag](https://github.com/comit-network/comit-rs/blob/acabab36058b4e3d3ae54bde10fd7ce5db66f1a5/.github/workflows/release-cnd.yml#L32-L37).

## Testing workflows

Testing workflows can be cumbersome because all we are writing is untyped yaml.
I ended up forking the repository in my personal account for the testing.
This allowed me to iterate fairly quickly because I was able to remove all branch protections from the repository.
As such, I could force push to `dev` and `master` and test my workflows using the real trigger events.
This is something I could have never done in the main repository and therefore it greatly sped up development.

## Conclusion

This turned out a bit longer than I originally expected!
However, I hope that sharing my thoughts around the design process in more details helps you in writing better and more effective GitHub actions.

Happy automating - Thomas. 
