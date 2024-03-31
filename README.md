# Long Ao Dai - SSH Command Executor Action

This GitHub Action allows you to execute SSH commands on a remote server.

## Usage

To use this action in your workflow, you can add it as a step in your YAML file like this:

Path file: `.github/workflows/deploy.yml`
```yaml
name: SSH Pull Code

on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Setup SSH key
        uses: longaodai/ssh@main
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          password: ${{ secrets.PASSWORD }}
          commands: 'cd app && git pull origin'
```

In this example, the action will execute the commands provided in the commands input on the remote server specified by the `host`, `username`, and `password` inputs.

## Inputs
`host`: (Required) The hostname or IP address of the remote server.

`username`: (Required) The username used for SSH authentication.

`password`: (Required) The password used for SSH authentication.

`commands`: (Required) The commands to be executed on the remote server. You can provide multiple commands separated by a `&&` character.

## Secrets

Make sure to add the following secrets to your repository:

`HOST`: The hostname or IP address of the remote server.

`USERNAME`: The username used for SSH authentication.

`PASSWORD`: The password used for SSH authentication.
