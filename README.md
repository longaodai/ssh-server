# Long Ao Dai - SSH Command Executor Action

This GitHub Action allows you to execute SSH commands on a remote server.

## Usage

### **Case 1:** SSH by Password

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
      - name: SSH Server
        uses: longaodai/ssh-server@v2.0.0
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          password: ${{ secrets.PASSWORD }}
          commands: 'cd app && git pull origin'
```

### **Case 2:** SSH by Private Key

To use this action in your workflow, you can add it as a step in your YAML file like this:

You can follow setup in post of HionCoding: [HionCoding Auto Deploy Project](https://hioncoding.com/post/auto-deployment-with-github-actions-for-cpanel-vps)

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
      - name: SSH Server
        uses: longaodai/ssh-server@v2.0.0
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          ssh-private-key: ${{ secrets.SSHKEY }}
          commands: 'cd app && git pull origin'
```
 _In this example, the action will execute the commands provided in the commands input on the remote server specified by the `host`, `username`, and (`password` or `ssh-private-key`) inputs._
## Inputs
`host`: (Required) The hostname or IP address of the remote server.

`username`: (Required) The username used for SSH authentication.

`password`: (Required if you want to connect by password) The password used for SSH authentication.

`ssh-private-key`: (Required if you want to connect by private key) The private key used for SSH authentication.

`commands`: (Required) The commands to be executed on the remote server. You can provide multiple commands separated by a `&&` character.

## Secrets

Make sure to add the following secrets to your repository:

`HOST`: The hostname or IP address of the remote server.

`USERNAME`: The username used for SSH authentication.

`PASSWORD`: The password used for SSH authentication. (Required if you want to connect by password)

`SSHKEY`: The private key used for SSH authentication. (Required if you want to connect by private key)

## Contributing
We would love for you to contribute to `longaodai/ssh-server`, pull requests are welcome !


## License
The scripts and documentation in this project are released under the [MIT License](https://github.com/longaodai/ssh-server/blob/main/LICENSE)
