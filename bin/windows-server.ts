#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { WindowsServerStack } from '../lib/windows-server-stack';

const app = new App();
fetch('https://api.ipify.org').then(response => response.text()).then(
    myPublicIP => new WindowsServerStack(app, 'WindowsServerStack', undefined, myPublicIP)
);

