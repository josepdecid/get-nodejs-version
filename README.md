<p align="center">
  <img src="icon.png" width=150>
</p>

# Get NodeJS version - GitHub Action

![release](https://img.shields.io/github/v/release/josepdecid/get-nodejs-version?style=for-the-badge)
![license](https://img.shields.io/github/license/josepdecid/get-nodejs-version?style=for-the-badge)

![open issues](https://img.shields.io/github/issues-raw/josepdecid/get-nodejs-version?style=for-the-badge)
![closed issues](https://img.shields.io/github/issues-closed-raw/josepdecid/get-nodejs-version?style=for-the-badge)

This repository implements a GitHub action to retrieve the NodeJS version from the `package.json` file. According to the [properties specification](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#engines), you can specify the version of node that your project works on
with the `engines > node` property in `package.json`:

```json
{
  "engines": {
    "node": "16.13.0"
  }
}
```

### Why would I want to use this?

There may be cases where you want to extract the version to use in your project to set up the Node environment to run some actions (tests, builds, deploys...) in other GitHub actions and workflows, so it is run exactly with the same version that you are using in your local environement. Check the [_usage_](#usage) section to see some examples for this.

## Usage

If you want to use this action, I expect you to be somehow familiar with _GitHub actions_. If this is not the case for some strange reason, you can get introduced with the [official docs](https://docs.github.com/en/actions).

You can add this action step in the steps definition of any workflow file in `.github/workflows/*.yml`, but you'll need to fetch the repository with the well-known [`actions/checkout`](https://github.com/marketplace/actions/checkout) first.

```yaml
- name: Check out repo
  uses: actions/checkout@v2

- name: Read node from package.json
  uses: josepdecid/get-nodejs-version@<VERSION>
  id: get-node-version
```

After that, you can access the step output variables, which contain the NodeJS version extracted from the `package.json` file. To access the variable, you need to set an id to the step (e.g. `get-node-version`), which we will use later to access the output from the following step with `{{ steps.get-node-version.outputs.version }}`. You can obtain the full version with `version`, but you can also access the `major`, `minor`, and `patch` versions individually.

In the following example, we can see how to use the extracted version to set up the node environment that the next steps will use to build the application, run the tests, or whatever action we can think of that requires a specific version of NodeJS:

```yaml
- name: Set up Node.js
  uses: actions/setup-node@v2
  with:
    node-version: ${{ steps.get-node-version.outputs.version }}
```

## Contribute

You can contribute and improve this project by reporting any issues or bugs in the [Issues tab](https://github.com/josepdecid/get-nodejs-version/issues). However, you can also do that by adding new features or expanding already existing ones.

### Contribution guidelines:

TODO: **Coming soon...**

## License

[MIT](https://github.com/josepdecid/get-nodejs-version/blob/main/LICENSE)
