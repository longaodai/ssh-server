const {Client} = require('ssh2');
const core = require('@actions/core');

const host = core.getInput('host')
const username = core.getInput('username')
const password = core.getInput('password')
const privateKey = core.getInput('ssh-private-key')
const commands = core.getInput('commands') ? core.getInput('commands') : 'ls -la'

// Configure the connection parameters
let connectionParams = {
    host: host,
    username: username,
};
if (password) {
    connectionParams.password = password
} else {
    connectionParams.privateKey = privateKey
}

// Create a new SSH client instance
const sshClient = new Client();
sshClient.on('ready', () => {
    console.log('Connected via SSH!');
    execute()
});
sshClient.on('error', (err) => {
    console.error('Error connecting via SSH:', err);
});

function execute() {
    if (!commands) {
        console.log('Connect SSH closed');
        sshClient.end();
        return
    }

    sshClient.exec(commands, (err, stream) => {
        if (err) {
            sshClient.end();
            throw err;
        }
        stream
            .on('close', (code, signal) => {
                console.log('Command execution closed');
                sshClient.end();
            })
            .on('data', (data) => {
                console.log('Command output:', data.toString());
            })
            .stderr.on('data', (data) => {
            console.error('Command error:', data.toString());
        });
    });
}

// Connect to the SSH server
sshClient.connect(connectionParams);



